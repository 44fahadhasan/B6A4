import FeatureMedicines from "./feature-medicines";

export async function FeaturedMedicine() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance font-medium text-2xl md:text-4xl lg:text-5xl">
          Featured Medicines
        </h2>
        <p className="mt-4 text-balance text-muted-foreground text-sm md:text-base">
          Explore top medicines available at our pharmacy.
        </p>
      </div>
      <FeatureMedicines />
    </div>
  );
}
