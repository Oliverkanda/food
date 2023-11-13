import React from "react";
import { MainShell } from "@/components/MainShell";
import { GetChannel, GetCheckout } from "@/client/api";

type CatalogLayoutProps = {
  children: React.ReactNode;
};

export default async function CatalogLayout({ children }: CatalogLayoutProps) {
  const [channel, checkout] = await Promise.all([
    GetChannel(),
    GetCheckout("123"),
  ]);

  return (
    <MainShell channel={channel} checkout={checkout}>
      {children}
    </MainShell>
  );
}
