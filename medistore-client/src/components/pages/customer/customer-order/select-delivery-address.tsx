"use client";

import { Badge } from "@/components/ui/badge";
import { TDeliveryAddress } from "@/form-schemas/delivery-address-form.schema";
import { cn } from "@/lib/utils";
import { CheckCircle2, MapPin, Phone } from "lucide-react";
import MangeDeliveryAddress from "../mange-delivery-address";

interface SelectDeliveryAddressProps {
  addresses: (TDeliveryAddress & { id: string })[];
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}

const SelectDeliveryAddress = ({
  addresses,
  selectedId,
  setSelectedId,
}: SelectDeliveryAddressProps) => {
  return (
    <div className="space-y-3 max-h-87.5 overflow-y-auto no-scrollbar">
      {addresses.length > 0 ? (
        addresses.map((address) => {
          const isSelected = selectedId === address.id;

          return (
            <div
              key={address.id}
              onClick={() => setSelectedId(address.id)}
              className={cn(
                "cursor-pointer rounded-xl border p-4 transition",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "hover:border-muted-foreground/30",
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="font-medium">
                      {address.label || "Delivery Address"}
                    </p>
                    {address.isDefault && (
                      <Badge variant="secondary">Default</Badge>
                    )}
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {address.addressLine}, {address.area}, {address.city}
                  </p>

                  <p className="mt-1 text-sm flex items-center gap-1">
                    <Phone className="h-3.5 w-3.5" />
                    {address.contactNumber}
                  </p>
                </div>

                {isSelected && (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-8 space-y-3 text-muted-foreground">
          <p>No delivery address found.</p>
          <p>Please add one from your profile.</p>
          <MangeDeliveryAddress />
        </div>
      )}
    </div>
  );
};

export default SelectDeliveryAddress;
