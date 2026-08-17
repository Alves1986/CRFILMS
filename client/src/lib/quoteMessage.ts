export const QUOTE_WHATSAPP_NUMBER = "5542991489798";

export type QuoteMessageFields = {
  nome: string;
  telefone: string;
  servico: string;
  aplicacao: string;
  cidade: string;
  prazo: string;
  necessidade: string;
};

export function buildQuoteWhatsAppUrl(
  fields: QuoteMessageFields,
  attachmentPaths: string[],
  origin: string,
) {
  const attachmentLines = attachmentPaths.length
    ? ["", "Fotos para referência:", ...attachmentPaths.map((path, index) => `${index + 1}. ${origin}${path}`)]
    : [];

  const message = [
    "Olá, CR Films! Gostaria de solicitar um orçamento.",
    "",
    `Nome: ${fields.nome}`,
    `WhatsApp: ${fields.telefone}`,
    `Serviço de interesse: ${fields.servico}`,
    `Veículo, máquina ou ambiente: ${fields.aplicacao || "Não informado"}`,
    `Cidade: ${fields.cidade || "Não informado"}`,
    `Prazo desejado: ${fields.prazo || "Não informado"}`,
    "",
    `Necessidade: ${fields.necessidade}`,
    ...attachmentLines,
  ].join("\n");

  return `https://wa.me/${QUOTE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
