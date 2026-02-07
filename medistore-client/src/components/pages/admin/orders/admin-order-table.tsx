import { getOrdersForAdmin } from "@/actions/orders.action";
import Pagination from "@/components/shared/pagination";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
import { Inbox } from "lucide-react";

export default async function AdminOrderTable({
  params,
}: {
  params: TOrderParams;
}) {
  const { success, data, message } = await getOrdersForAdmin(params);

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
              <TableHead>Pharmacy</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Pharmacy Status</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Ordered At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Inbox />
                      </EmptyMedia>
                      <EmptyTitle>No Orders Found</EmptyTitle>
                      <EmptyDescription>
                        No orders have been placed yet.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data.orders.map((orderData: any, idx: number) => {
                const phOrder = orderData.pharmacieOrders[0] || {};
                const items = phOrder.orderItems || [];
                const totalQty = items.reduce(
                  (sum: number, i: any) => sum + i.quantity,
                  0,
                );
                return (
                  <TableRow key={orderData.id}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell className="font-medium">
                      {orderData.orderNumber}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{orderData.user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {orderData.user.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {phOrder.pharmacie?.name || "-"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {phOrder.pharmacie?.email || "-"}
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
                      ৳ {orderData.grandTotal}
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
                        {phOrder.status || "-"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className="capitalize" variant="outline">
                        {orderData.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(orderData.createdAt).toLocaleDateString()}
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
