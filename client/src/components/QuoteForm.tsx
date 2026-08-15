import { trpc } from "@/lib/trpc";
import { ArrowUpRight, Check, ImagePlus, Loader2, MessageCircle, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";

const WHATSAPP_NUMBER = "5542991489798";
const MAX_ATTACHMENTS = 4;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type SelectedAttachment = {
  file: File;
  previewUrl: string;
};

export function QuoteForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const activePreviews = useRef(new Set<string>());
  const [attachments, setAttachments] = useState<SelectedAttachment[]>([]);
  const [formError, setFormError] = useState("");
  const uploadAttachments = trpc.quote.uploadAttachments.useMutation();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []);
    event.target.value = "";
    setFormError("");

    if (!selected.length) return;
    if (attachments.length >= MAX_ATTACHMENTS) {
      setFormError(`Você pode enviar até ${MAX_ATTACHMENTS} imagens.`);
      return;
    }

    const invalid = selected.find(file => !ALLOWED_TYPES.includes(file.type) || file.size > MAX_ATTACHMENT_BYTES);
    if (invalid) {
      setFormError("Use imagens JPG, PNG ou WebP de até 5 MB cada.");
      return;
    }

    const remaining = MAX_ATTACHMENTS - attachments.length;
    const additions = selected.slice(0, remaining).map(file => {
      const previewUrl = URL.createObjectURL(file);
      activePreviews.current.add(previewUrl);
      return { file, previewUrl };
    });

    if (selected.length > remaining) {
      setFormError(`Foram adicionadas ${remaining} imagem(ns). O limite é de ${MAX_ATTACHMENTS} arquivos.`);
    }
    setAttachments(current => [...current, ...additions]);
  };

  const removeAttachment = (previewUrl: string) => {
    URL.revokeObjectURL(previewUrl);
    activePreviews.current.delete(previewUrl);
    setAttachments(current => current.filter(attachment => attachment.previewUrl !== previewUrl));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (field: string) => String(formData.get(field) || "").trim();
    const whatsappWindow = window.open("", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    try {
      const uploaded = attachments.length
        ? await uploadAttachments.mutateAsync({
            files: await Promise.all(
              attachments.map(async attachment => ({
                name: attachment.file.name,
                mimeType: attachment.file.type as "image/jpeg" | "image/png" | "image/webp",
                bytes: new Uint8Array(await attachment.file.arrayBuffer()),
              })),
            ),
          })
        : [];

      const attachmentLines = uploaded.length
        ? ["", "Fotos para referência:", ...uploaded.map((attachment, index) => `${index + 1}. ${window.location.origin}${attachment.url}`)]
        : [];
      const message = [
        "Olá, CR Films! Gostaria de solicitar um orçamento.",
        "",
        `Nome: ${value("nome")}`,
        `WhatsApp: ${value("telefone")}`,
        `Serviço de interesse: ${value("servico")}`,
        `Veículo, máquina ou ambiente: ${value("aplicacao") || "Não informado"}`,
        `Cidade: ${value("cidade") || "Não informado"}`,
        `Prazo desejado: ${value("prazo") || "Não informado"}`,
        "",
        `Necessidade: ${value("necessidade")}`,
        ...attachmentLines,
      ].join("\n");
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      if (whatsappWindow) {
        whatsappWindow.location.href = url;
      } else {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      whatsappWindow?.close();
      setFormError(error instanceof Error ? error.message : "Não foi possível enviar as imagens. Tente novamente.");
    }
  };

  return (
    <form className="quote-form" onSubmit={handleSubmit}>
      <div className="quote-form__top"><span>BRIEFING DE ORÇAMENTO</span><span>Campos com <b>*</b> são obrigatórios</span></div>
      <div className="quote-form__grid">
        <label>Nome completo <b>*</b><input name="nome" type="text" autoComplete="name" placeholder="Como podemos te chamar?" required /></label>
        <label>Seu WhatsApp <b>*</b><input name="telefone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" required /></label>
        <label>Qual serviço você procura? <b>*</b><select name="servico" defaultValue="" required><option value="" disabled>Selecione uma opção</option><option>Películas automotivas</option><option>PPF — proteção de pintura</option><option>Películas residenciais ou comerciais</option><option>Películas para máquinas agrícolas</option><option>Películas para máquinas florestais</option><option>Outro atendimento</option></select></label>
        <label>Veículo, máquina ou ambiente<input name="aplicacao" type="text" placeholder="Ex.: SUV, trator, sala comercial..." /></label>
        <label>Cidade<input name="cidade" type="text" placeholder="Onde será o atendimento?" /></label>
        <label>Quando pretende realizar?<select name="prazo" defaultValue=""><option value="">Ainda estou avaliando</option><option>Nos próximos dias</option><option>Neste mês</option><option>Sem urgência</option></select></label>
        <label className="quote-form__full">Conte um pouco mais <b>*</b><textarea name="necessidade" rows={5} placeholder="Descreva sua necessidade, preferência ou dúvida." required /></label>
      </div>

      <div className="quote-attachments">
        <div className="quote-attachments__heading"><span>FOTOS PARA REFERÊNCIA <small>OPCIONAL</small></span><span>JPG, PNG ou WebP · até 5 MB · máximo {MAX_ATTACHMENTS}</span></div>
        <input ref={inputRef} className="quote-attachments__input" id="quote-attachments" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleFileChange} />
        <label className="quote-attachments__dropzone" htmlFor="quote-attachments">
          <ImagePlus size={21} />
          <span><b>Selecionar imagens</b><small>Envie fotos do veículo, vidro, máquina ou ambiente.</small></span>
          <ArrowUpRight size={18} />
        </label>
        {attachments.length > 0 && <div className="quote-attachments__previews">{attachments.map(attachment => <div className="quote-attachments__preview" key={attachment.previewUrl}><img src={attachment.previewUrl} alt={`Prévia de ${attachment.file.name}`} /><span>{attachment.file.name}</span><button type="button" onClick={() => removeAttachment(attachment.previewUrl)} aria-label={`Remover ${attachment.file.name}`}><X size={14} /></button></div>)}</div>}
        {formError && <p className="quote-attachments__error" role="alert">{formError}</p>}
      </div>

      <div className="quote-form__footer"><p><Check size={15} /> Seus dados e links das imagens serão usados apenas para montar esta mensagem de orçamento.</p><button type="submit" className="site-quote" disabled={uploadAttachments.isPending} aria-busy={uploadAttachments.isPending}>{uploadAttachments.isPending ? <Loader2 className="quote-form__loader" size={17} /> : <MessageCircle size={17} />}<span>{uploadAttachments.isPending ? "Enviando imagens..." : "Enviar ao WhatsApp"}</span><ArrowUpRight size={17} /></button></div>
    </form>
  );
}
