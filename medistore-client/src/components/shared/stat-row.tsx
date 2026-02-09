import { Badge } from "../ui/badge";

export default function StatRow({
  label,
  value,
  badge,
}: {
  label: string;
  value: number;
  badge?: "secondary" | "default" | "outline" | "destructive" | "ghost";
}) {
  return (
    <div className="flex items-center justify-between">
      <p>{label}</p>
      {badge ? (
        <Badge variant={badge}>{value}</Badge>
      ) : (
        <span className="font-medium">{value}</span>
      )}
    </div>
  );
}
