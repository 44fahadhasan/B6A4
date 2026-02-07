import { getOrderForSeller } from "@/actions/orders.action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function SellerOrderDetails({
  orderId,
}: {
  orderId: string;
}) {
  const { data: order, message, success } = await getOrderForSeller(orderId);

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  const pharmacieOrder = order.pharmacieOrders[0];
  const payment = pharmacieOrder.payments[0];
  const address = order.deliveryAddress;
  const user = order.user;

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Order #{order.orderNumber}</CardTitle>
          <Badge className="capitalize">{pharmacieOrder.status}</Badge>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Info label="Subtotal" value={`৳ ${pharmacieOrder.subtotal}`} />
          <Info label="Tax" value={`৳ ${order.tax}`} />
          <Info label="Grand Total" value={`৳ ${order.grandTotal}`} />
        </CardContent>
        <CardContent className="space-y-1">
          {[
            { label: "Created At", value: pharmacieOrder.createdAt },
            { label: "Confirmed At", value: pharmacieOrder.confirmedAt },
            { label: "Shipped At", value: pharmacieOrder.shippedAt },
            { label: "Delivered At", value: pharmacieOrder.deliveredAt },
            { label: "Canceled At", value: pharmacieOrder.canceledAt },
          ]
            .filter((item) => item.value)
            .map((item) => (
              <Info
                key={item.label}
                label={item.label}
                value={new Date(item.value).toLocaleString()}
              />
            ))}
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <Badge variant="outline">Customer</Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Label:</span>
              <span>{address.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Address Line:
              </span>
              <span>{address.addressLine}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Area:</span>
              <span>{address.area}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">City:</span>
              <span>{address.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Division:
              </span>
              <span>{address.division}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Country:
              </span>
              <span>{address.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">
                Postal Code:
              </span>
              <span>{address.postalCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-muted-foreground">Phone:</span>
              <span>{address.contactNumber}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ordered Medicines</CardTitle>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicine</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Strength</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pharmacieOrder.orderItems.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.medicine.name}</TableCell>
                <TableCell>{item.medicine.brandName}</TableCell>
                <TableCell>{item.medicine.strength}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>৳ {item.price}</TableCell>
                <TableCell>৳ {item.subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Info label="Method" value={payment.method.toUpperCase()} />
            <Info label="Status" value={<Badge>{payment.status}</Badge>} />
            <Info label="Amount" value={`৳ ${payment.amount}`} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Customer Review</CardTitle>
          </CardHeader>
          <CardContent>
            {pharmacieOrder.reviews.length === 0 ? (
              <p className="text-muted-foreground">No review yet</p>
            ) : (
              pharmacieOrder.reviews.map((review: any) => (
                <div key={review.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Stars value={review.rating} />
                    <Badge variant="outline">Verified Purchase</Badge>
                  </div>
                  <p>{review.comment}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex text-yellow-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}
