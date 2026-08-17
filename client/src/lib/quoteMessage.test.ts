import { describe, expect, it } from "vitest";
import { buildQuoteWhatsAppUrl } from "./quoteMessage";

describe("buildQuoteWhatsAppUrl", () => {
  it("organiza os campos preenchidos e os links das fotos para o WhatsApp", () => {
    const url = new URL(buildQuoteWhatsAppUrl({
      nome: "Ana Silva",
      telefone: "42 99999-0000",
      servico: "Películas automotivas",
      aplicacao: "SUV",
      cidade: "Telêmaco Borba",
      prazo: "Neste mês",
      necessidade: "Quero reduzir o calor no carro.",
    }, ["/manus-storage/orcamento-ana.jpg"], "https://crfilms.example"));

    const message = url.searchParams.get("text");
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5542991489798");
    expect(message).toContain("Nome: Ana Silva");
    expect(message).toContain("Serviço de interesse: Películas automotivas");
    expect(message).toContain("https://crfilms.example/manus-storage/orcamento-ana.jpg");
  });
});
