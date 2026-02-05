import { cn } from "@/lib/utils";
import { CheckCircle2, Wallet } from "lucide-react";
import { useState } from "react";

const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive the medicine",
    icon: Wallet,
    isDefault: true,
  },
];

export default function SelectPaymentMethod() {
  const [selectedPayment, setSelectedPayment] = useState("cod");

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        const isSelected = selectedPayment === method.id;
        return (
          <div
            key={method.id}
            onClick={() => setSelectedPayment(method.id)}
            className={cn(
              "cursor-pointer rounded-xl border p-4 transition flex items-start justify-between",
              isSelected
                ? "border-primary bg-primary/5"
                : "hover:border-muted-foreground/30",
            )}
          >
            <div className="flex gap-3">
              <div className="mt-1">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{method.name}</p>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            </div>
            {isSelected && <CheckCircle2 className="h-5 w-5 text-primary" />}
          </div>
        );
      })}
    </div>
  );
}
