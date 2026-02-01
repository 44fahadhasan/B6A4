"use client";

import Pagination from "@/components/shared/pagination";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { TCategoryParams } from "@/services/category.service";
import { UserWithRole } from "better-auth/plugins";
import { Inbox } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserTable({ params }: { params: TCategoryParams }) {
  const [error, setError] = useState<{
    code?: string | undefined;
    message?: string | undefined;
    status: number;
    statusText: string;
  } | null>(null);
  const [data, setData] = useState<
    | {
        users: UserWithRole[];
        total: number;
        limit: number | undefined;
        offset: number | undefined;
      }
    | {
        users: never[];
        total: number;
      }
    | null
  >(null);

  useEffect(() => {
    try {
      (async () => {
        const { data, error } = await authClient.admin.listUsers({
          query: {
            sortBy: "name",
            sortDirection: "asc",
            searchField: "email",
            searchOperator: "starts_with",
            searchValue: params.search || "",
            limit: params.limit || 12,
            offset: ((params.page || 1) - 1) * (params.limit || 12),
          },
        });
        setError(error || null);
        setData(data);
      })();
    } catch (error) {
      setError({
        status: 500,
        statusText: "Internal Server Error",
        message: (error as Error).message || "Something went wrong",
      });
    }
  }, [params]);

  if (error) {
    return (
      <h4 className="text-xl font-medium text-center text-destructive">
        {error.message || error.statusText}
      </h4>
    );
  }

  return (
    <div className="space-y-5">
      <Pagination
        meta={{
          page: params.page || 1,
          limit: params.limit || 12,
          total: data?.total || 0,
        }}
      />
      <Card className="px-3 md:px-5 lg:px-7">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-left">S. No.</TableHead>
              <TableHead>User Details</TableHead>
              <TableHead>Role & Status</TableHead>
              <TableHead>Email Verification</TableHead>
              <TableHead className="text-right">Registered On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Inbox />
                      </EmptyMedia>
                      <EmptyTitle>No Users Found</EmptyTitle>
                      <EmptyDescription>
                        No users are registered yet. Once users sign up, they
                        will appear here.
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </TableCell>
              </TableRow>
            ) : (
              data?.users.map((user: any, idx: number) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      <p className="capitalize">Role: {user.role}</p>
                      <p>
                        Status:{" "}
                        {user.banned ? `Banned (${user.banReason})` : "Active"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p>{user.emailVerified ? "Verified" : "Not Verified"}</p>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
