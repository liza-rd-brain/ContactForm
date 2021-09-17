export type AppState = {
  formValues: FormDataType;
  convertedValues: FormItemValues<string>[];
};

export type FormDataType = FormValuesType<string> | null;

export type FormValuesType<T = SelectType> = {
  type: T[];
  value: string[];
};

export type FormState = {
  formItemList: FormItemType[];
  counterId: number;
};

export type FormItemType<T = SelectType> = {
  id: number;
  type: T;
  value: string;
};

export type SelectTypeGeneric<T = SelectType> = {
  type: T;
};

export type FormItemValues<T = SelectType> = {
  type: T;
  value: string;
};

export type ArrayFormValuesType = [SelectType[], string[]];

export type SelectType = "email" | "phone" | "link";
export type SelectListType = Array<SelectType>;

export type ButtonControllerType = "addFormItem" | "deleteFormItem";

export type ActionType =
  | { type: ButtonControllerType; itemIndex: number }
  | { type: "changeSelect"; payload: { type: SelectType; itemIndex: number } }
  | { type: "changeInput"; payload: { value: string; itemIndex: number } }
  | { type: "sendForm"; payload: FormItemType[] }
  | {
      type: "convertData";
    };
