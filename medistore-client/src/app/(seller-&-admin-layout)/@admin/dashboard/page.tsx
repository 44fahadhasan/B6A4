import { getStatsForAdmin } from "@/actions/stats.action";
import StatCard from "@/components/shared/stat-card";
import StatRow from "@/components/shared/stat-row";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, ShoppingCart, Store, TrendingUp, Users } from "lucide-react";

export default async function AdminDashboardPage() {
  const { data, message, success } = await getStatsForAdmin();

  if (!success) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {message}
      </h4>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Marketplace overview and system health
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={data.users.total}
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="Pharmacies"
          value={data.marketplace.pharmacies}
          icon={<Store className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="Medicines"
          value={data.marketplace.medicines}
          icon={<Pill className="h-5 w-5 text-muted-foreground" />}
        />
        <StatCard
          title="Total Orders"
          value={data.orders.total}
          icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <StatRow label="Customers" value={data.users.customers} />
            <StatRow label="Sellers" value={data.users.sellers} />
            <StatRow label="Admins" value={data.users.admins} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <StatRow
              label="Pending"
              value={data.orders.pending}
              badge="secondary"
            />
            <StatRow
              label="Delivered"
              value={data.orders.delivered}
              badge="outline"
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
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold">৳ {data.revenue.total}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-xl font-medium">৳ {data.revenue.today}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
