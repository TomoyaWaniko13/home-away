import { ReactNode } from 'react';
import { ThemeProvider } from '@/app/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// 57. Setup Dark Mode with Shadcn/ui
// 60. SignOutLink Component

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster />
      <ThemeProvider attribute={'class'} defaultTheme={'system'} enableSystem={true}>
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
