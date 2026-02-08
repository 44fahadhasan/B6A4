import { getMedicine } from "@/actions/medicine.action";
import MedicineDetails from "@/components/pages/public/medicines/medicine-details";

export default async function MedicineDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data, success, message } = await getMedicine(id);

  if (!success) {
    return (
      <div className="p-10 text-center text-destructive">
        Failed to load medicine. {message}
      </div>
    );
  }

  return <MedicineDetails medicine={data} />;
}
