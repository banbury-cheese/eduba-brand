"use client";

import * as DirectionPrimitive from "@radix-ui/react-direction";
import * as React from "react";

export type Direction = "ltr" | "rtl";

export interface DirectionProviderProps {
  dir: Direction;
  children?: React.ReactNode;
}

export function DirectionProvider({ dir, children }: DirectionProviderProps) {
  return <DirectionPrimitive.Provider dir={dir}>{children}</DirectionPrimitive.Provider>;
}

export const useDirection = DirectionPrimitive.useDirection;
