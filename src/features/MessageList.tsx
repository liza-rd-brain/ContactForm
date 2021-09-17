import { useContext } from "react";

import styled from "styled-components";

import { AppDispatch } from "../AppDispatch";
import { AppState, FormDataType, FormItemValues } from "../types";

const MessageListWrap = styled.div`
  display: flex;
  align-items: center;
  /*   justify-content: center; */
  flex-direction: column;
  width: 400px;
  border: 1px solid #000;
`;

const MessageListHeader = styled.h3``;

const FormData = styled.pre`
  width: 300px;
  min-height: 100px;
  border: 1px solid #000;
`;

const getFormValuesString = (formData: FormDataType) => {
  if (formData) {
    const formDataString = JSON.stringify(formData, null, 2);
    return formDataString;
  } else {
    return null;
  }
};

const getConvertedValuesString = (
  convertedValues: FormItemValues<string>[]
) => {
  if (convertedValues.length > 0) {
    const convertedDataString = JSON.stringify(convertedValues, null, 2);
    return convertedDataString;
  } else {
    return null;
  }
};

export const MessageList = (props: AppState) => {
  const appDispatch = useContext(AppDispatch);
  const { formValues, convertedValues } = props;
  return (
    <MessageListWrap>
      <MessageListHeader>Результат заполнения формы</MessageListHeader>

      <FormData>{getFormValuesString(formValues)}</FormData>
      <button
        type="button"
        onClick={() => {
          appDispatch({
            type: "convertData",
          });
        }}
      >
        convertArrayToObject
      </button>
      {<FormData> {getConvertedValuesString(convertedValues)}</FormData>}
    </MessageListWrap>
  );
};
