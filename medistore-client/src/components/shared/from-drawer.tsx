import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

interface IFromDrawer {
  formType: "add" | "update";
  direction: "left" | "right" | "top" | "bottom";
  className?: string;
  triggerLabel: string;
  drawerTitle: string;
  drawerDescription: string;
  children: React.ReactNode;
  formId: string;
  submitLabel: string;
}

export default function FormDrawer({
  formType,
  formId,
  children,
  direction,
  className,
  drawerTitle,
  submitLabel,
  triggerLabel,
  drawerDescription,
}: IFromDrawer) {
  return (
    <Drawer direction={direction}>
      <DrawerTrigger asChild>
        <Button
          size={formType === "update" ? "default" : "xs"}
          variant={formType === "update" ? "outline" : "default"}
          className={cn(formType === "update" && "w-full")}
        >
          {formType === "add" && <PlusCircle />}
          {triggerLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn(
          "data-[vaul-drawer-direction=left]:sm:max-w-lg",
          className,
        )}
      >
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="no-scrollbar overflow-y-auto px-4">{children}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button type="submit" form={formId}>
            {submitLabel}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
