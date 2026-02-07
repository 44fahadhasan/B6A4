"use client";

import { addReview } from "@/actions/customer.action";
import FormModal from "@/components/shared/form-modal";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormSchema } from "@/form-schemas/review-form.schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function AddReview({ orderId }: { orderId: string }) {
  const formId = "add-review";
  const form = useForm({
    defaultValues: {
      rating: 0,
      comment: "",
    },
    validators: {
      onSubmit: reviewFormSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Add review, please wait...");

      try {
        const { success, message } = await addReview({
          ...value,
          orderId,
        });

        if (!success) {
          return toast.error(message, { id });
        }

        toast.success(message, { id });
      } catch (error) {
        toast.error("Something went wrong", { id });
      } finally {
        form.reset();
      }
    },
  });

  return (
    <FormModal
      formType="add"
      formId={formId}
      className="sm:max-w-3xl"
      triggerLabel="Review"
      submitLabel="Submit Review"
      modalTitle="Write a Review"
      modalDescription="Share your experience to help other customers and the pharmacy improve their service."
      formComp={
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field name="rating">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Rating (1–5) *</FieldLabel>
                  <Input
                    id={field.name}
                    type="number"
                    min={0}
                    max={5}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="Give a rating from 1 to 5"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="comment">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Your Review</FieldLabel>
                  <FieldDescription>
                    Share your experience with this medicine or pharmacy order.
                  </FieldDescription>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Example: Fast delivery, good packaging, and the medicine worked as expected."
                    className="min-h-30"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </form>
      }
    />
  );
}
