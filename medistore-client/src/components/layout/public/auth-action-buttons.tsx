"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRole } from "@/constants/role.const";
import { authClient } from "@/lib/auth-client";
import { adminNavs } from "@/routes/admin.rote";
import { customerNavs } from "@/routes/customer.rotue";
import { sellerNavs } from "@/routes/seller.route";
import { INavItem } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthActionButtons() {
  const [dropdowns, setDropdowns] = useState<INavItem[]>([]);

  const router = useRouter();
  const { data, error, isPending } = authClient.useSession();

  const handleSingOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const assignRole = (role: string) => {
    switch (role) {
      case UserRole.customer:
        setDropdowns(customerNavs);
        break;

      case UserRole.seller:
        setDropdowns(sellerNavs);
        break;

      case UserRole.admin:
        setDropdowns(adminNavs);
        break;

      default:
        setDropdowns([]);
        break;
    }
  };

  useEffect(() => {
    if (!isPending && data) {
      assignRole((data.user as any).role);
    }
  }, [data, isPending]);

  return (
    <>
      {isPending ? (
        <Skeleton className="size-10 rounded-full" />
      ) : error ? (
        <p className="text-destructive">Reload Page</p>
      ) : data ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar size="lg">
              <AvatarImage
                src={data.user.image!}
                alt={data.user.name}
                className="grayscale"
              />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p>Hello! {data.user.name}</p>
                <p>{data.user.email}</p>
              </DropdownMenuLabel>
              {dropdowns.map((dropdown: INavItem, idx) => (
                <DropdownMenuItem key={idx} asChild>
                  <Link href={dropdown.path}>{dropdown.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                onClick={() => handleSingOut()}
                className="w-full"
                variant="outline"
              >
                Sing Out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Button asChild variant="outline">
            <Link href="/sing-in">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/customer-singup">Sign Up</Link>
          </Button>
        </>
      )}
    </>
  );
}
