import { getOrdersForSeller } from "@/actions/orders.action";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TOrderParams } from "@/services/orders.service";
import { Inbox, MoreHorizontalIcon } from "lucide-react";
import OrderStatusModal from "./order-status-modal";
import SellerOrderDetailsModal from "./seller-order-details-modal";

export default async function SellerOrderTable({
  params,
}: {
  params: TOrderParams;
}) {
  const { success, data, message } = await getOrdersForSeller(params);

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  return (
    <div className="space-y-5">
      <Pagination meta={data.meta} />
      <Card className="px-3 md:px-5 lg:px-7">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Order No</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Pharmacy Status</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Ordered At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Inbox />
                      </EmptyMedia>
                      <EmptyTitle>No Orders Found</EmptyTitle>
                      <EmptyDescription>
                        No customer has placed any order for your pharmacy yet.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data.orders.map((phOrder: any, idx: number) => {
                const order = phOrder.order;
                const items = order.pharmacieOrders[0]?.orderItems || [];

                const totalQty = items.reduce(
                  (sum: number, i: any) => sum + i.quantity,
                  0,
                );

                return (
                  <TableRow key={order.orderNumber}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      {order.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {order.user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        {items.slice(0, 2).map((item: any, i: number) => (
                          <p key={i}>
                            {item.medicine.name} × {item.quantity}
                          </p>
                        ))}
                        {items.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{items.length - 2} more
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{totalQty}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ৳ {order.grandTotal}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className="capitalize"
                        variant={
                          phOrder.status === "pending"
                            ? "secondary"
                            : phOrder.status === "confirmed"
                              ? "default"
                              : phOrder.status === "shipped"
                                ? "outline"
                                : phOrder.status === "delivered"
                                  ? "ghost"
                                  : "destructive"
                        }
                      >
                        {phOrder.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="capitalize" variant="outline">
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="space-y-1">
                          <DropdownMenuItem asChild>
                            <SellerOrderDetailsModal orderId={order.id} />
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <OrderStatusModal
                              orderId={order.id}
                              phOrderId={phOrder.id}
                              status={phOrder.status}
                            />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
