export type State = {
  formItems: FormItemType[];
};

export type FormItemType = {
  type: ItemsType;
  value: string;
};

export type ItemsType = "email" | "phone" | "link";

export type ActionType = { type: "addFormItem" } | { type: "deleteFormItem" };
