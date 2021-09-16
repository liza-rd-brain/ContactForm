import styled from "styled-components";
import "./index.css";

import { Form } from "./Form";
import { useContext, useReducer } from "react";
import React from "react";
import {
  ActionType,
  AppState,
  FormDataType,
  FormItemListType,
  FormItemValues,
  FormValuesType,
} from "./types";

const Container = styled.div`
  display: flex;
  margin: 150px auto 0 auto;
  justify-content: space-around;
  & > * {
    margin: 0 30px;
  }
`;

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

const getConvertedValuesString = (convertedValues: FormItemValues[]) => {
  if (convertedValues.length > 0) {
    const convertedDataString = JSON.stringify(convertedValues, null, 2);
    return convertedDataString;
  } else {
    return null;
  }
};

const MessageList = (props: AppState) => {
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

export const reducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case "sendForm": {
      const formData = action.payload;
      const formValues = getFormValues(formData);

      return { ...state, formValues, convertedValues: [] };
    }

    case "convertData": {
      const formVlaues = state.formValues;
      const convertedValues = convertArrayToObject(formVlaues);

      if (convertedValues) {
        return { ...state, convertedValues };
      } else {
        return state;
      }
    }
  }
  return state;
};

const initialState = {
  formValues: null,
  convertedValues: [],
};

//TODO: Add generic type?
const getFormValues = (formData: FormItemListType) => {
  const formValues = formData.reduce<FormValuesType>(
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

const convertArrayToObject = (formValues: FormDataType) => {
  if (formValues) {
    const { type: typeList, value: valueList } = formValues;

    const convertedArrayToObject = typeList.reduce<FormItemValues[]>(
      (prevArray, itemType, index) => {
        const newFormItem: FormItemValues = {
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

export const AppDispatch = React.createContext<React.Dispatch<ActionType>>(
  undefined as any
);
export const App = () => {
  const [state, appDispatch] = useReducer(reducer, initialState);

  return (
    <AppDispatch.Provider value={appDispatch}>
      <Container>
        <Form />
        <MessageList
          formValues={state.formValues}
          convertedValues={state.convertedValues}
        />
      </Container>
    </AppDispatch.Provider>
  );
};
