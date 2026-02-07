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
import { ScrollArea } from "@/components/ui/scroll-area";
import SellerOrderDetails from "./seller-order-details";

export default function SellerOrderDetailsModal({
  orderId,
}: {
  orderId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          View Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View complete order information including customer details, items,
            pricing, and current fulfillment status.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full">
          <SellerOrderDetails orderId={orderId} />
        </ScrollArea>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
