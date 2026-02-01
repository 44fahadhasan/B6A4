"use client";

import { getCategoriesList } from "@/actions/category.action";
import { createMedicine } from "@/actions/medicine.action";
import FormModal from "@/components/shared/form-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { medicineFormSchema } from "@/form-schemas/medicine-form.schema";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddMedicine() {
  const [categories, setCategories] = useState<
    {
      id: string;
      label: string;
      value: string;
    }[]
  >([]);

  const formId = "medicine-create";
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      strength: "",
      packSize: "",
      drugCode: "",
      brandName: "",
      dosageForm: "",
      description: "",
      manufacturer: "",
      genericName: "",
      categorieId: "",
      isFeatured: false,
      isControlledDrug: false,
      isPrescriptionRequired: false,
    },
    validators: {
      onSubmit: medicineFormSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Create Medicine, please wait...");

      try {
        const { success, message } = await createMedicine(value);

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

  useEffect(() => {
    (async () => {
      const { success, data } = await getCategoriesList();
      if (success) {
        setCategories(data);
      }
    })();
  }, []);

  return (
    <FormModal
      formType="add"
      formId={formId}
      className="sm:max-w-3xl"
      triggerLabel="Add Medicine"
      submitLabel="Create Medicine"
      modalTitle="Add New Medicine"
      modalDescription="Create a new medicine to manage your pharmacy inventory efficiently."
      formComp={
        <form
          id={formId}
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Medicine Name *
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Napa 500"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="slug">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Slug *</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="napa-500"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="genericName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Generic Name *</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Paracetamol"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="brandName">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Brand Name</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Beximco, Square"
                  />
                </Field>
              )}
            </form.Field>
            <div className="col-span-full">
              <form.Field name="description">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Medicine Description
                      </FieldLabel>
                      <FieldDescription>
                        Add key information such as usage, benefits, and
                        important notes.
                      </FieldDescription>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Used to reduce fever and relieve pain. Example: Take 1 tablet every 8 hours."
                        className="min-h-30"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <form.Field name="strength">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Strength</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="500mg, 250mg"
                  />
                </Field>
              )}
            </form.Field>
            <form.Field name="dosageForm">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Dosage Form *</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tablet, Syrup, Capsule"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="packSize">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Pack Size</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="10 tablets, 100ml bottle"
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field name="manufacturer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Manufacturer *</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Square Pharmaceuticals, Beximco"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="categorieId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="vertical" data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category *</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={isInvalid}
                        className="min-w-37.5"
                      >
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        {categories.map(({ id, label }) => (
                          <SelectItem key={id} value={id}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <form.Field name="isPrescriptionRequired">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                    />
                    <FieldLabel htmlFor={field.name}>
                      Prescription Required
                    </FieldLabel>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="isControlledDrug">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                    />
                    <FieldLabel htmlFor={field.name}>
                      Controlled Drug
                    </FieldLabel>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="isFeatured">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field orientation="horizontal" data-invalid={isInvalid}>
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={isInvalid}
                      checked={field.state.value}
                      onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                      }
                    />
                    <FieldLabel htmlFor={field.name}>
                      Featured Medicine
                    </FieldLabel>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      }
    />
  );
}
