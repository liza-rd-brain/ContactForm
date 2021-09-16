export type State = {
  formItemList: FormItemType[];
  counterId: number;
};

export type FormItemType = {
  id: number;
  type: SelectType;
  value: string;
};

export type FormItemValues = {
  type: SelectType;
  value: string;
};

export type ArrayFormValuesType = [SelectType[], string[]];

export type FormValuesType = {
  type: Array<SelectType>;
  value: Array<string>;
};

export type SelectType = "email" | "phone" | "link";
export type SelectListType = Array<SelectType>;

export type ButtonControllerType = "addFormItem" | "deleteFormItem";

export type ActionType =
  | { type: ButtonControllerType; payload: number }
  | { type: "changeSelect"; payload: { type: SelectType; index: number } }
  | { type: "changeInput"; payload: { value: string; id: number } };
