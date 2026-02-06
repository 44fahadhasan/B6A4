"use client";

import { updatePharmacieOrder } from "@/actions/orders.action";
import FormModal from "@/components/shared/form-modal";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatus } from "@/constants/order.status";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

export default function OrderStatusModal({
  orderId,
  phOrderId,
  status = "",
}: {
  orderId: string;
  phOrderId: string;
  status: string;
}) {
  const formId = "order-status-update";
  const form = useForm({
    defaultValues: {
      status,
    },
    validators: {
      onSubmit: z.object({
        status: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Update pharmacie order status, please wait...");

      try {
        const { success, message } = await updatePharmacieOrder({
          id: phOrderId,
          payload: {
            ...value,
            orderId: orderId,
          },
        });

        if (!success) return toast.error(message, { id });

        toast.success(message, { id });
      } catch {
        toast.error("Something went wrong", { id });
      }
    },
  });

  return (
    <FormModal
      formType="update"
      formId={formId}
      className="sm:max-sm"
      triggerLabel="Update Order Status"
      submitLabel="Save Status"
      modalTitle="Update Order Status"
      modalDescription="Change the order status to reflect the current stage of processing, shipping, or delivery."
      formComp={
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field name="status">
            {(field) => (
              <Field orientation="vertical">
                <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                <Select
                  name={field.name}
                  value={field.state.value}
                  onValueChange={field.handleChange}
                >
                  <SelectTrigger id={field.name} className="min-w-37.5">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {orderStatus.map((value, idx) => (
                      <SelectItem key={idx} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          </form.Field>
        </form>
      }
    />
  );
}
