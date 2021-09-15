export type State = {
  formItems: FormItemType[];
};

export type FormItemType = {
  id: number;
  type: ItemsType;
  value?: string;
};

export type ItemsType = "email" | "phone" | "link";

export type ButtonControllerType = "addFormItem" | "deleteFormItem";

export type ActionType =
  | { type: ButtonControllerType; value: number }
  | { type: "changeSelect"; value: { type: ItemsType; index: number } };
