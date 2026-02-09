import { prisma } from "../../config/prisma";

const getStatsForAdmin = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    totalCustomers,
    totalSellers,
    totalAdmins,

    totalPharmacies,
    totalCategories,
    totalMedicines,

    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,
    todayRevenue,
  ] = await prisma.$transaction([
    // Users
    prisma.user.count(),
    prisma.user.count({ where: { role: "customer" } }),
    prisma.user.count({ where: { role: "seller" } }),
    prisma.user.count({ where: { role: "admin" } }),

    // Marketplace
    prisma.pharmacie.count(),
    prisma.categorie.count(),
    prisma.medicine.count(),

    // Orders
    prisma.order.count(),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.order.count({ where: { status: "delivered" } }),
    prisma.order.count({ where: { status: "canceled" } }),

    // Revenue (only delivered orders)
    prisma.order.aggregate({
      where: { status: "delivered" },
      _sum: {
        totalAmount: true,
      },
    }),

    // Today's Revenue
    prisma.order.aggregate({
      where: {
        status: "delivered",
        createdAt: {
          gte: today,
        },
      },
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      customers: totalCustomers,
      sellers: totalSellers,
      admins: totalAdmins,
    },
    marketplace: {
      pharmacies: totalPharmacies,
      categories: totalCategories,
      medicines: totalMedicines,
    },
    orders: {
      total: totalOrders,
      pending: pendingOrders,
      delivered: deliveredOrders,
      cancelled: cancelledOrders,
    },
    revenue: {
      total: totalRevenue._sum.totalAmount || 0,
      today: todayRevenue._sum.totalAmount || 0,
    },
  };
};

const getStatsForSeller = async (pharmacyId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    totalMedicines,

    totalOrders,
    pendingOrders,
    confirmedOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,

    totalRevenue,
    todayRevenue,
  ] = await prisma.$transaction([
    // Products
    prisma.medicine.count({
      where: { pharmacieId: pharmacyId },
    }),

    // Orders (Seller specific)
    prisma.pharmacieOrder.count({
      where: { pharmacieId: pharmacyId },
    }),
    prisma.pharmacieOrder.count({
      where: { pharmacieId: pharmacyId, status: "pending" },
    }),
    prisma.pharmacieOrder.count({
      where: { pharmacieId: pharmacyId, status: "confirmed" },
    }),
    prisma.pharmacieOrder.count({
      where: { pharmacieId: pharmacyId, status: "shipped" },
    }),
    prisma.pharmacieOrder.count({
      where: { pharmacieId: pharmacyId, status: "delivered" },
    }),
    prisma.pharmacieOrder.count({
      where: { pharmacieId: pharmacyId, status: "canceled" },
    }),

    // Revenue (from delivered pharmacy orders)
    prisma.pharmacieOrder.aggregate({
      where: {
        pharmacieId: pharmacyId,
        status: "delivered",
      },
      _sum: {
        subtotal: true,
      },
    }),

    prisma.pharmacieOrder.aggregate({
      where: {
        pharmacieId: pharmacyId,
        status: "delivered",
        createdAt: {
          gte: today,
        },
      },
      _sum: {
        subtotal: true,
      },
    }),
  ]);

  return {
    pharmacyId,

    products: {
      medicines: totalMedicines,
    },

    orders: {
      total: totalOrders,
      pending: pendingOrders,
      confirmed: confirmedOrders,
      shipped: shippedOrders,
      delivered: deliveredOrders,
      cancelled: cancelledOrders,
    },

    revenue: {
      total: totalRevenue._sum.subtotal || 0,
      today: todayRevenue._sum.subtotal || 0,
    },
  };
};

export const StatService = {
  getStatsForAdmin,
  getStatsForSeller,
};
