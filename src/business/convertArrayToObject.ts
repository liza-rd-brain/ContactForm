import { FormDataType, FormItemValues } from "../types";

export const convertArrayToObject = (formValues: FormDataType) => {
  if (formValues) {
    const { type: typeList, value: valueList } = formValues;

    const convertedArrayToObject = typeList.reduce<FormItemValues<string>[]>(
      (prevArray, itemType, index) => {
        const newFormItem: FormItemValues<string> = {
          type: itemType,
          value: valueList[index],
        };

        return [...prevArray, newFormItem];
      },
      []
    );

    return convertedArrayToObject;
  } else {
    return null;
  }
};
