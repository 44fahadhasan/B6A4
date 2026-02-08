"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

export default function AccountInfo() {
  const { data } = authClient.useSession();

  const form = useForm({
    defaultValues: {
      name: data?.user.name,
      image: data?.user.image,
    },
    validators: {
      onSubmit: z.object({
        name: z.string().min(1, "Name name is required"),
        image: z.string(),
      }),
    },
    onSubmit: async ({ value }) => {
      const id = toast.loading("Update profile, please wait...");

      try {
        const { error } = await authClient.updateUser(value);

        if (error) {
          return toast.error(error.message || error.statusText, { id });
        }

        toast.success("Profile update success!", { id });
      } catch (error) {
        toast.error("Something went wrong", { id });
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Account Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name *</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your full name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <Field>
              <FieldLabel>Email Address</FieldLabel>
              <Input disabled type="email" defaultValue={data?.user.email} />
            </Field>
            <div className="col-span-full">
              <form.Field name="image">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Profile Image URL
                      </FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://avatar.com/profile.png"
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
          {form.state.values.image && (
            <div className="flex items-center gap-4">
              <img
                src={form.state.values.image}
                alt="Profile"
                className="h-20 w-20 rounded-full object-cover border"
              />
              <p className="text-sm text-muted-foreground">
                Profile image preview
              </p>
            </div>
          )}
          <div className="flex justify-end">
            <Button type="submit" className="px-8">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
