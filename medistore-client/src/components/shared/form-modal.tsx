import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Edit, PlusCircle } from "lucide-react";

interface IFromModal {
  formType: "add" | "update";
  className?: string;
  triggerLabel: string;
  modalTitle: string;
  modalDescription: string;
  formComp: React.ReactNode;
  formId: string;
  submitLabel: string;
}

export default function FormModal({
  className,
  formType,
  triggerLabel,
  modalTitle,
  modalDescription,
  formId,
  submitLabel,
  formComp,
}: IFromModal) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          {formType === "add" && <PlusCircle />}
          {formType === "update" && <Edit />}
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn("max-h-[90vh] overflow-y-auto sm:max-w-sm ", className)}
      >
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>{modalDescription}</DialogDescription>
        </DialogHeader>
        {formComp}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
