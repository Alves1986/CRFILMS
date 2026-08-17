import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuoteForm } from "@/components/QuoteForm";

type QuoteDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function QuoteDialog({ open, onOpenChange }: QuoteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="quote-dialog">
        <DialogHeader className="quote-dialog__header">
          <p className="eyebrow">ORÇAMENTO DIRETO</p>
          <DialogTitle>Conte o que<br /><em>você precisa.</em></DialogTitle>
          <DialogDescription>
            Preencha as informações essenciais. Após o envio, a solicitação é organizada e aberta no WhatsApp da CR Films.
          </DialogDescription>
        </DialogHeader>
        <QuoteForm />
      </DialogContent>
    </Dialog>
  );
}
