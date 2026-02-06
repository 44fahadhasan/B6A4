import { getMyOrders } from "@/actions/customer.action";
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
import { cn } from "@/lib/utils";
import { IOrderQueryParams } from "@/services/customer.service";
import { format } from "date-fns";
import { Inbox } from "lucide-react";
import DetailsMyOrder from "./details-my-order";

export default async function MyOrderTable({
  params,
}: {
  params: IOrderQueryParams;
}) {
  const { success, data, message } = await getMyOrders(params);

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
              <TableHead className="w-12">S. No.</TableHead>
              <TableHead>Order No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="text-right">Tax</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-center w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Inbox />
                      </EmptyMedia>
                      <EmptyTitle>No Orders Found</EmptyTitle>
                      <EmptyDescription>
                        You haven't placed any orders yet.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data.orders.map((order: any, idx: number) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell className="font-semibold">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>{format(order.createdAt, "PPP")}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        order.status === "pending"
                          ? "border-yellow-500 text-yellow-600 bg-yellow-50"
                          : order.status === "shipped"
                            ? "border-blue-500 text-blue-600 bg-blue-50"
                            : order.status === "delivered"
                              ? "border-green-500 text-green-600 bg-green-50"
                              : "border-red-500 text-red-600 bg-red-50",
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.tax.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${order.grandTotal.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <DetailsMyOrder orderId={order.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
