import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { router, publicProcedure } from "./_core/trpc";
import { storagePut } from "./storage";

export const MAX_QUOTE_ATTACHMENTS = 4;
export const MAX_QUOTE_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const ALLOWED_QUOTE_ATTACHMENT_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const quoteAttachmentSchema = z.object({
  name: z.string().min(1).max(180),
  mimeType: z.enum(ALLOWED_QUOTE_ATTACHMENT_TYPES),
  bytes: z.instanceof(Uint8Array),
});

export type QuoteAttachmentInput = z.infer<typeof quoteAttachmentSchema>;

export function sanitizeQuoteAttachmentName(name: string) {
  const cleaned = name
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned || "imagem-anexada";
}

export function validateQuoteAttachment(file: QuoteAttachmentInput) {
  if (file.bytes.byteLength === 0) {
    throw new Error("O arquivo está vazio.");
  }
  if (file.bytes.byteLength > MAX_QUOTE_ATTACHMENT_BYTES) {
    throw new Error("Cada imagem pode ter até 5 MB.");
  }
}

export const quoteRouter = router({
  uploadAttachments: publicProcedure
    .input(z.object({ files: z.array(quoteAttachmentSchema).min(1).max(MAX_QUOTE_ATTACHMENTS) }))
    .mutation(async ({ input }) => {
      try {
        return await Promise.all(
          input.files.map(async file => {
            validateQuoteAttachment(file);
            const safeName = sanitizeQuoteAttachmentName(file.name);
            const key = `quote-attachments/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;
            const stored = await storagePut(key, file.bytes, file.mimeType);
            return { name: safeName, url: stored.url, key: stored.key, mimeType: file.mimeType };
          }),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : "Não foi possível enviar as imagens.";
        throw new TRPCError({ code: "BAD_REQUEST", message });
      }
    }),
});
