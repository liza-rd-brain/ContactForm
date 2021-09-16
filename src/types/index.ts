export type FormItemListType = FormItemType[];

export type AppState = {
  formValues: FormDataType;
  convertedValues: FormItemValues[];
};

export type FormDataType = FormValuesType | null;

export type FormValuesType = {
  type: SelectType[];
  value: string[];
};

export type FormState = {
  formItemList: FormItemListType;
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

export type SelectType = "email" | "phone" | "link";
export type SelectListType = Array<SelectType>;

export type ButtonControllerType = "addFormItem" | "deleteFormItem";

export type ActionType =
  | { type: "addFormItem"; itemIndex: number }
  | { type: "deleteFormItem"; itemId: number }
  | { type: "changeSelect"; payload: { type: SelectType; id: number } }
  | { type: "changeInput"; payload: { value: string; id: number } }
  | { type: "sendForm"; payload: FormItemListType }
  | {
      type: "convertData";
    };
