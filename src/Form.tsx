import React, { useEffect } from "react";
import { useReducer } from "react";
import styled from "styled-components";
import { FormItem } from "./FormItem";
import { ActionType, FormItemType, State } from "./types";

const INITIAL_ID = 0;
const INITIAL_COUNTER = INITIAL_ID + 1;
const DEFAULT_TYPE = "email";

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
      id: INITIAL_ID,
      type: "email",
    },
    /*     {
      id: INITIAL_COUNTER + 1,
      type: "email",
    },
    {
      id: INITIAL_COUNTER + 2,
      type: "email",
    }, */
  ],
  counter: INITIAL_COUNTER,
};

const getForm = (state: State) => {
  return state.formItems.map(({ id, type, value }, index) => {
    return (
      <FormItem id={id} type={type} value={value} index={index} key={id} />
    );
  });
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "addFormItem": {
      /**
       *  Element number below which need to add a new one?
       */

      /**
       * Need to find out which element is current
       * Then insert after it new Form
       *
       */
      const upperElementId = action.value;

      const newFormItems = state.formItems.reduce<FormItemType[]>(
        (prevFormItems, currFormItem) => {
          const { id } = currFormItem;

          if (id === upperElementId) {
            const newFormItem: FormItemType = {
              id: state.counter,
              type: currFormItem.type,
              value: currFormItem.value,
            };

            return [...prevFormItems, currFormItem, newFormItem];
          } else {
            return [...prevFormItems, currFormItem];
          }
        },
        []
      );

      console.log(newFormItems);

      return { ...state, formItems: newFormItems, counter: state.counter++ };
    }
    case "deleteFormItem": {
      /**
       *  Element number to be removed
       */
      const currId = action.value;

      const newFormItems = state.formItems.filter((formItem, itemIndex) => {
        const { id } = formItem;
        return id !== currId;
      });

      const newState = {
        ...state,
        formItems: newFormItems,
      };

      return newState;
    }
    case "changeSelect": {
      const { type: newType, index } = action.value;

      const newFormItems = state.formItems.map((formItemsElem, itemIndex) => {
        if (itemIndex === index) {
          return { ...formItemsElem, type: newType };
        } else return formItemsElem;
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

  return (
    <FormDispatch.Provider value={dispatch}>
      <FormWrap>{getForm(state)}</FormWrap>
    </FormDispatch.Provider>
  );
};
