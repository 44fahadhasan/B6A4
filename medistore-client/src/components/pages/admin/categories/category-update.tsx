"use client";

import { updateCategory } from "@/actions/category.action";
import FormModal from "@/components/shared/form-modal";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { categoryFormSchema } from "@/form-schemas/category-form.schema";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

export default function UpdateCategory({ data }: { data: any }) {
  const formId = "category-update";
  const form = useForm({
    defaultValues: {
      name: data.name,
      slug: data.slug,
    },
    validators: {
      onSubmit: categoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Update category, please wait...");

      try {
        const { success, message } = await updateCategory({
          id: data.id,
          payload: value,
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
      formType="update"
      formId={formId}
      triggerLabel="Edit Category"
      submitLabel="Update Category"
      modalTitle="Update Medicine Category"
      modalDescription="Update the category to organize and manage your medicines"
      formComp={
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter category name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="slug"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter category slug"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      }
    />
  );
}
