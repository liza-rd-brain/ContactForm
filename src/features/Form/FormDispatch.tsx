import React from "react";
import { ActionType } from "../../types";

export const FormDispatch = React.createContext<React.Dispatch<ActionType>>(
  undefined as any
);
