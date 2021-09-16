import styled from "styled-components";
import "./index.css";

import { Form } from "./Form";
import { useReducer } from "react";
import React from "react";
import {
  ActionType,
  AppState,
  FormItemListType,
  FormItemValues,
  FormState,
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

const FormData = styled.div`
  width: 300px;
  height: 100px;
  border: 1px solid #000;
`;

const MessageList = (props: AppState) => {
  const formDataObj = getFormValues(props.formData);
  const formDataString = JSON.stringify(formDataObj);

  return (
    <MessageListWrap>
      <MessageListHeader>Результат заполнения формы</MessageListHeader>
      <FormData>{formDataString}</FormData>
      <button type="button">convertArrayToObject</button>
      <FormData> </FormData>
    </MessageListWrap>
  );
};

export const reducer = (state: AppState, action: ActionType) => {
  switch (action.type) {
    case "sendForm": {
      console.log("action.payload", action.payload);
      return { ...state, formData: action.payload };
    }
  }
  return state;
};

const initialState = {
  formData: [],
};

//TODO:take out to App
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

  console.log("formValues", formValues);

  return formValues;
};

const convertArrayToObject = (formValues: FormValuesType) => {
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

  console.log("convertedArrayToObject", convertedArrayToObject);
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
        <MessageList formData={state.formData} />
      </Container>
    </AppDispatch.Provider>
  );
};
