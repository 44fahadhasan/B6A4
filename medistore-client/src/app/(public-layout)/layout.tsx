import { Footer } from "@/components/layout/public/footer/footer";
import { Header } from "@/components/layout/public/header/header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-305px)]">{children}</div>
      <Footer />
    </>
  );
}
