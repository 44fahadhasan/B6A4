"use client";

import { updateInventory } from "@/actions/inventory.action";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  inventoryUpdateFormSchema,
  TInventoryUpdate,
} from "@/form-schemas/inventory-form.schema";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { toast } from "sonner";
import InventoryDrawer from "../../../shared/from-drawer";

export default function UpdateInventory({
  data,
}: {
  data: TInventoryUpdate & { id: string };
}) {
  const formId = "update-inventory";
  const form = useForm({
    defaultValues: {
      stock: data.stock ?? 0,
      minStock: data.minStock ?? 0,
      lowStockThreshold: data.lowStockThreshold ?? 0,
      reservedQty: data.reservedQty ?? 0,
      damagedQty: data.damagedQty ?? 0,
      returnedQty: data.returnedQty ?? 0,
      mrp: data.mrp ?? 0,
      discount: data.discount ?? 0,
      purchasePrice: data.purchasePrice ?? 0,
      sellingPrice: data.sellingPrice ?? 0,
      batchNumber: data.batchNumber ?? "",
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : new Date(),
      isOutOfStock: data.isOutOfStock ?? false,
      isExpired: data.isExpired ?? false,
    },
    validators: {
      onSubmit: inventoryUpdateFormSchema,
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Update inventory, please wait...");

      try {
        const { success, message } = await updateInventory({
          payload: value,
          id: data.id,
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
      formType="update"
      formId={formId}
      direction="left"
      submitLabel="Update Stock Batch"
      triggerLabel="Update Stock"
      drawerTitle="Update Stock Batch"
      drawerDescription="Modify a stock batch with quantity, price, and expiry to keep inventory accurate."
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
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <form.Field
            name="isOutOfStock"
            children={(field) => {
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
                  <FieldLabel htmlFor={field.name}>Out of Stock</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="isExpired"
            children={(field) => {
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
                  <FieldLabel htmlFor={field.name}>Expired</FieldLabel>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>
    </InventoryDrawer>
  );
}
