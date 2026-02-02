"use client";

import { createInventory } from "@/actions/inventory.action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { inventoryFormSchema } from "@/form-schemas/inventory-form.schema";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { toast } from "sonner";
import InventoryDrawer from "../../../shared/from-drawer";

export default function AddInventory({ medicineId }: { medicineId: string }) {
  const formId = "create-inventory";
  const form = useForm({
    defaultValues: {
      stock: 0,
      minStock: 0,
      lowStockThreshold: 0,
      reservedQty: 0,
      damagedQty: 0,
      returnedQty: 0,
      mrp: 0,
      discount: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      batchNumber: "",
      expiryDate: new Date(),
    },
    validators: {
      onSubmit: inventoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Create inventory, please wait...");

      try {
        const { success, message } = await createInventory({
          ...value,
          medicineId,
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
    <InventoryDrawer
      formType="add"
      formId={formId}
      direction="left"
      submitLabel="Create Stock Batch"
      triggerLabel="Add Stock"
      drawerTitle="Add New Stock Batch"
      drawerDescription="Record a new batch with quantity, price, and expiry to maintain accurate inventory for this medicine."
    >
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <form.Field name="stock">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`${field.name}`}>
                    Available Stock *
                  </FieldLabel>
                  <Input
                    id={`${field.name}`}
                    min={0}
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="120"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="minStock">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>Minimum Stock</FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="20"
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="lowStockThreshold">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>
                  Low Stock Alert
                </FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="15"
                />
              </Field>
            )}
          </form.Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form.Field name="mrp">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>MRP (৳) *</FieldLabel>
                  <Input
                    min={0}
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="12.00"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="sellingPrice">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Selling Price (৳) *
                  </FieldLabel>
                  <Input
                    min={0}
                    type="number"
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="10.00"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="purchasePrice">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>
                  Purchase Price
                </FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="8.50"
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="discount">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>Discount (৳)</FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="2.00"
                />
              </Field>
            )}
          </form.Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form.Field name="batchNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Batch Number *</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="BATCH-2026-AX1"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="expiryDate">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={`${field.name}`}>
                    Expiry Date *
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id={`${field.name}`}
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.state.value && "text-muted-foreground",
                        )}
                      >
                        {field.state.value ? (
                          format(field.state.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.state.value}
                        onSelect={(value) => {
                          field.handleChange(value!);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <form.Field name="reservedQty">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>Reserved Qty</FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="10"
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="damagedQty">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>Damaged Qty</FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="2"
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="returnedQty">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={`${field.name}`}>Returned Qty</FieldLabel>
                <Input
                  id={`${field.name}`}
                  min={0}
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  placeholder="5"
                />
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </form>
    </InventoryDrawer>
  );
}
