import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

import { queryClient } from "./queryClient";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({
  children,
}: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}