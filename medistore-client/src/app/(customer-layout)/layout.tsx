import Footer from "@/components/layout/customer/customer-footer";
import CustomerTab from "@/components/layout/customer/customer-tab";
import { Header } from "@/components/layout/public/header/header";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-106px)] py-8 md:py-10 lg:py-14 flex gap-5">
        <CustomerTab />
        <div className="grow">{children}</div>
      </div>
      <Footer />
    </>
  );
}
