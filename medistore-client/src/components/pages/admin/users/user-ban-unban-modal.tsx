"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function UserBanUnbanModal({
  id,
  label,
  title,
  setRefetchFlag,
  description,
  actionLabel,
}: {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  label: "ban" | "unban";
  setRefetchFlag: Dispatch<SetStateAction<boolean>>;
}) {
  const [banReason, setBanReason] = useState<string>("");

  const handleAction = async ({
    action_label,
    userId,
  }: {
    userId: string;
    action_label: "ban" | "unban";
  }) => {
    const id = toast.loading(`Please wait for ${action_label} ther user, ...`);

    try {
      if (action_label === "ban") {
        const { error } = await authClient.admin.banUser({
          userId,
          banReason,
        });

        if (error) {
          return toast.error(error.message || error.statusText, { id });
        }
      }

      if (action_label === "unban") {
        const { error } = await authClient.admin.unbanUser({ userId });

        if (error) {
          return toast.error(error.message || error.statusText, { id });
        }
      }

      setRefetchFlag((pre: boolean) => !pre);

      toast.success(`User has been ${action_label}ed successfully.`, { id });
    } catch (error) {
      toast.error((error as Error).message || "Something went wrong", { id });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="w-full capitalize"
          variant={label === "ban" ? "destructive" : "default"}
        >
          {label} User
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {label === "ban" && (
            <Textarea
              onChange={(e) => setBanReason(e.target.value)}
              placeholder="Enter the reason for banning this user (e.g., policy violations, fraud, abuse)."
              className="min-h-30"
            />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant={label === "ban" ? "destructive" : "default"}
            onClick={() => {
              // action user ban
              label === "ban" &&
                handleAction({
                  action_label: "ban",
                  userId: id,
                });

              // action user unban
              label === "unban" &&
                handleAction({
                  action_label: "unban",
                  userId: id,
                });
            }}
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
