import "@/styles/globals.css";
import "@/styles/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

import { ThemeProvider } from "@/components/ui/theme-provider";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {/**
       * Can force specific theme by setting `defaultTheme` to "system" | "light" | "dark"
       *
       * TODO: To implement theme toggle, see:
       * @see https://ui.shadcn.com/docs/dark-mode/next#add-a-mode-toggle
       */}
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
