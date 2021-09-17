import React from "react";
import { ActionType } from "./types";

export const AppDispatch = React.createContext<React.Dispatch<ActionType>>(
  undefined as any
);
