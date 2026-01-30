export default function Footer() {
  return (
    <footer>
      <div className="h-px bg-border" />
      <div className="py-4 text-center text-muted-foreground text-xs">
        <p>&copy; {new Date().getFullYear()} medisotre, All rights reserved</p>
      </div>
    </footer>
  );
}
