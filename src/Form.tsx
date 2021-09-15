import React, { useEffect } from "react";
import { useReducer } from "react";
import styled from "styled-components";
import { FormItem } from "./FormItem";
import { ActionType, State } from "./types";

const FormWrap = styled.form`
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
    },
    {
      type: "email",
    },
    {
      type: "email",
    },
    {
      type: "email",
    },
  ],
};

const getForm = (state: State) => {
  return state.formItems.map(({ type, value }, index) => {
    return <FormItem type={type} value={value} index={index} key={index} />;
  });
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "addFormItem": {
      /**
       *  Element number below which need to add a new one?
       */
      const index = action.value;

      return state;
    }
    case "deleteFormItem": {
      /**
       *  Element number to be removed
       */
      const index = action.value;

      const newFormItems = state.formItems.filter((formItem, itemIndex) => {
        return itemIndex !== index;
      });

      const newState = {
        ...state,
        formItems: newFormItems,
      };

      return newState;
    }
    case "changeSelect": {
      const { type: newType, index } = action.value;

      const newFormItems = state.formItems.map(({ type, value }, itemIndex) => {
        if (itemIndex === index) {
          return { type: newType, value };
        } else return { type, value };
      });

      const newState = {
        ...state,
        formItems: newFormItems,
      };

      return newState;
    }
    default: {
      return state;
    }
  }
};

export const FormDispatch = React.createContext<React.Dispatch<ActionType>>(
  undefined as any
);

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /*   useEffect(() => {
    indexCounter.current = 0;
    return () => {
      indexCounter.current = 0;
    };
  }); */
  return (
    <FormDispatch.Provider value={dispatch}>
      <FormWrap>{getForm(state)}</FormWrap>
    </FormDispatch.Provider>
  );
};
