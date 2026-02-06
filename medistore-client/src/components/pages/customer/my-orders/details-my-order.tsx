import { getMyOrder } from "@/actions/customer.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";

export default async function DetailsMyOrder({ orderId }: { orderId: string }) {
  const { data, message, success } = await getMyOrder(orderId);

  if (!success) {
    return <p className="text-destructive text-center">{message}</p>;
  }

  const order = data;
  const { deliveryAddress, pharmacieOrders } = order;

  const statusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-500";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-500";
      case "delivered":
        return "bg-green-50 text-green-700 border-green-500";
      case "canceled":
        return "bg-red-50 text-red-700 border-red-500";
      default:
        return "bg-gray-50 text-gray-700 border-gray-500";
    }
  };

  console.log(data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon-sm">
          <Eye />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl w-full">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            View all details for order <strong>{order.orderNumber}</strong>
          </p>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium">Order Number</p>
              <p>{order.orderNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Order Date</p>
              <p>{new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge className={statusColor(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Total</p>
              <p>{order.grandTotal.toFixed(2)}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Delivery Address</h3>
            <div className="mt-6 rounded-xl border bg-muted/30 p-4 space-y-3">
              <h3 className="text-base font-semibold">Delivery Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Label</p>
                  <p className="font-medium">
                    {deliveryAddress.label || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <p className="font-medium">{deliveryAddress.contactNumber}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-muted-foreground">Street Address</p>
                  <p className="font-medium">
                    {deliveryAddress.addressLine}, {deliveryAddress.area}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">City</p>
                  <p className="font-medium">{deliveryAddress.city}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Division</p>
                  <p className="font-medium">{deliveryAddress.division}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Country</p>
                  <p className="font-medium">{deliveryAddress.country}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Postal Code</p>
                  <p className="font-medium">{deliveryAddress.postalCode}</p>
                </div>
              </div>
            </div>
          </div>
          {pharmacieOrders.map((phOrder: any) => (
            <div key={phOrder.id} className="mt-6">
              <h3 className="text-lg font-medium mb-2">
                Pharmacy: {phOrder.pharmacie.name}
              </h3>
              <p className="text-sm mb-2">
                Status:{" "}
                <Badge className={statusColor(phOrder.status)}>
                  {phOrder.status.toUpperCase()}
                </Badge>
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>S. No.</TableHead>
                    <TableHead>Medicine ID</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {phOrder.orderItems.map((item: any, idx: number) => (
                    <TableRow key={item.id}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{item.medicine.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.medicine.genericName} •{" "}
                            {item.medicine.brandName || "N/A"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Category: {item.medicine.categorie?.name || "N/A"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {item.subtotal.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
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
