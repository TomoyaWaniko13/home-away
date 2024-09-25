import { ReactNode } from "react";
import { ThemeProvider } from "@/app/theme-provider";

// 57. Setup Dark Mode with Shadcn/ui

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ThemeProvider
        attribute={"class"}
        defaultTheme={"system"}
        enableSystem={true}
      >
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
