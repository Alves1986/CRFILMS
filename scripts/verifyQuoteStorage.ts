import { appRouter } from "../server/routers";

const onePixelPng = new Uint8Array([
  137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82,
  0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137,
  0, 0, 0, 13, 73, 68, 65, 84, 8, 215, 99, 248, 207, 192, 240,
  31, 0, 5, 0, 1, 255, 137, 153, 61, 29, 0, 0, 0, 0, 73, 69,
  78, 68, 174, 66, 96, 130,
]);

async function verifyStorage() {
  const caller = appRouter.createCaller({} as never);
  const uploaded = await caller.quote.uploadAttachments({
    files: [{ name: "verificacao-storage.png", mimeType: "image/png", bytes: onePixelPng }],
  });

  if (uploaded.length !== 1 || !uploaded[0]?.url.startsWith("/manus-storage/quote-attachments/")) {
    throw new Error("O armazenamento não retornou a URL esperada para o anexo de orçamento.");
  }

  console.log(JSON.stringify({ uploaded: uploaded[0] }, null, 2));
}

verifyStorage().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
