import { useContext } from "react";

import styled from "styled-components";

import { AppDispatch } from "../AppDispatch";
import { AppState, FormDataType, FormItemValues } from "../types";

const MessageListWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const MessageListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  border: 3px solid #949494;
  border-radius: 3px;
`;

const MessageListHeader = styled.h3`
  color: #4b4b4b;
`;

const FormData = styled.pre`
  width: 300px;
  border: 2px solid #949494;
  border-radius: 3px;
  padding: 10px;
  min-height: 100px;
`;

const ConvertButton = styled.button`
  border-color: #949494;
  border-radius: 5px;
  color: #4b4b4b;
  padding: 10px;
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
  const { formValues, convertedValues, message } = props;
  return (
    <MessageListWrap>
      <MessageListContainer>
        <MessageListHeader>Результат заполнения формы</MessageListHeader>

        <FormData>{message || getFormValuesString(formValues)}</FormData>
        <ConvertButton
          type="button"
          disabled={Boolean(message)}
          onClick={() => {
            appDispatch({
              type: "convertData",
            });
          }}
        >
          convertArrayToObject
        </ConvertButton>
        {<FormData> {getConvertedValuesString(convertedValues)}</FormData>}
      </MessageListContainer>
    </MessageListWrap>
  );
};
