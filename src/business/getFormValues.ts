import { FormItemType, FormValuesType } from "../types";

export const getFormValues = (formData: FormItemType<string>[]) => {
  const formValues = formData.reduce<FormValuesType<string>>(
    (prevFormValues, currFormItem) => {
      return {
        type: [...prevFormValues.type, currFormItem.type],
        value: [...prevFormValues.value, currFormItem.value],
      };
    },
    { type: [], value: [] }
  );

  return formValues;
};
