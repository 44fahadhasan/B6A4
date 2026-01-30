"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { customerNavs } from "@/routes/customer.rotue";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CustomerTab() {
  const pathname = usePathname();

  return (
    <Tabs defaultValue={pathname} orientation="vertical" className="h-full">
      <TabsList>
        {customerNavs.map((item, idx) => (
          <React.Fragment key={idx}>
            <TabsTrigger value={item.path}>
              <Link href={item.path}>{item.label}</Link>
            </TabsTrigger>
          </React.Fragment>
        ))}
      </TabsList>
    </Tabs>
  );
}
