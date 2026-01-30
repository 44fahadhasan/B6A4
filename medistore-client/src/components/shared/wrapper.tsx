export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20">{children}</div>
  );
}
