import { getStatsForSeller } from "@/actions/stats.action";
import StatCard from "@/components/shared/stat-card";
import StatRow from "@/components/shared/stat-row";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Pill, ShoppingCart, TrendingUp } from "lucide-react";

export default async function SellerDashboardPage() {
  const { data, message, success } = await getStatsForSeller();

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Seller Dashboard</h2>
          <p className="text-muted-foreground">
            Real-time overview of your pharmacy business
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-1 text-sm">
          Pharmacy ID: {data.pharmacyId.slice(-6)}
        </Badge>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Medicines"
          value={data.products.medicines}
          icon={<Pill className="h-6 w-6 text-muted-foreground" />}
        />
        <StatCard
          title="Total Orders"
          value={data.orders.total}
          icon={<ShoppingCart className="h-6 w-6 text-muted-foreground" />}
        />
        <StatCard
          title="Pending Orders"
          value={data.orders.pending}
          icon={<Package className="h-6 w-6 text-muted-foreground" />}
        />
        <StatCard
          title="Total Revenue"
          value={data.revenue.total}
          icon={<TrendingUp className="h-6 w-6 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <StatRow
              label="Pending"
              value={data.orders.pending}
              badge="secondary"
            />
            <StatRow
              label="Confirmed"
              value={data.orders.confirmed}
              badge="default"
            />
            <StatRow
              label="Shipped"
              value={data.orders.shipped}
              badge="outline"
            />
            <StatRow
              label="Delivered"
              value={data.orders.delivered}
              badge="ghost"
            />
            <StatRow
              label="Cancelled"
              value={data.orders.cancelled}
              badge="destructive"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-semibold tracking-tight">
                ৳ {data.revenue.total}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-xl font-medium">৳ {data.revenue.today}</p>
            </div>
            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              Revenue is calculated only from delivered orders.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
