import { useReducer } from "react";
import styled from "styled-components";
import { FormItem } from "./FormItem";
import { ActionType, State } from "./types";

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;
  width: 700px;
  background-color: #f5f5f5;
  padding: 50px;
`;

const initialState: State = {
  formItems: [
    {
      type: "email",
      value: "test@test.com",
    },
    {
      type: "email",
      value: "test@test.com",
    },
  ],
};

const getForm = (state: State) => {
  return state.formItems.map(({ type, value }, index) => {
    return <FormItem type={type} value={value} key={index} />;
  });
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "addFormItem": {
      return state;
    }
    case "deleteFormItem": {
      return state;
    }
    default: {
      return state;
    }
  }
};

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <FormWrap>{getForm(state)}</FormWrap>;
};
