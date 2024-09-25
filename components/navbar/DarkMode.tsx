"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {/* rotate-0 scale-100: 通常時（ライトモード）は回転なしで通常のサイズで表示。*/}
          {/* dark:-rotate-90 dark:scale-0: ダークモード時は90度回転して縮小（非表示に）。 */}
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all
           dark:-rotate-90 dark:scale-0"
          />
          {/* absolute: 絶対位置指定で太陽アイコンの上に重ねて配置。 */}
          {/* rotate-90 scale-0: 通常時（ライトモード）は90度回転して縮小（非表示に）。 */}
          {/* dark:rotate-0 dark:scale-100: ダークモード時は回転なしで通常のサイズで表示。 */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
