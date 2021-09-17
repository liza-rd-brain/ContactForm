import { useReducer } from "react";

import styled, { css } from "styled-components";

import "./index.css";

import { ActionType, AppState } from "./types";
import { Form } from "./features/Form";
import { MessageList } from "./features/MessageList";
import { getFormValues } from "./business/getFormValues";
import { convertArrayToObject } from "./business/convertArrayToObject";
import { AppDispatch } from "./AppDispatch";

const Container = styled.div`
  display: flex;
  margin: 150px auto 0 auto;
  justify-content: space-around;
  & > * {
    margin: 0 30px;
  }
`;

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
