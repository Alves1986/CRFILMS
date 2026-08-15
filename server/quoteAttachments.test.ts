import { describe, expect, it } from "vitest";
import {
  MAX_QUOTE_ATTACHMENT_BYTES,
  sanitizeQuoteAttachmentName,
  validateQuoteAttachment,
} from "./quoteAttachments";

describe("quote attachment validation", () => {
  it("normalizes filenames for safe storage paths", () => {
    expect(sanitizeQuoteAttachmentName("Foto do trator (1).JPG")).toBe("Foto-do-trator-1-.JPG");
  });

  it("accepts a small image buffer", () => {
    expect(() => validateQuoteAttachment({ name: "foto.jpg", mimeType: "image/jpeg", bytes: new Uint8Array([1, 2, 3]) })).not.toThrow();
  });

  it("rejects files over the defined upload limit", () => {
    const oversized = new Uint8Array(MAX_QUOTE_ATTACHMENT_BYTES + 1);
    expect(() => validateQuoteAttachment({ name: "foto.jpg", mimeType: "image/jpeg", bytes: oversized })).toThrow("até 5 MB");
  });
});
