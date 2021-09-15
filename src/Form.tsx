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
  formItemList: [
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
  counterId: INITIAL_COUNTER,
};

const getForm = (state: State) => {
  return state.formItemList.map(({ id, type, value }, index) => {
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
      const upperElementId = action.value;

      const newformItemList = state.formItemList.reduce<FormItemType[]>(
        (prevFormItemList, currFormItem) => {
          const { id } = currFormItem;

          if (id === upperElementId) {
            const newFormItem: FormItemType = {
              id: state.counterId,
              type: currFormItem.type,
              value: currFormItem.value,
            };

            return [...prevFormItemList, currFormItem, newFormItem];
          } else {
            return [...prevFormItemList, currFormItem];
          }
        },
        []
      );

      return {
        ...state,
        formItemList: newformItemList,
        counterId: state.counterId++,
      };
    }

    case "deleteFormItem": {
      /**
       *  Element number to be removed
       */
      const currId = action.value;

      const newformItemList = state.formItemList.filter((formItem) => {
        const { id } = formItem;
        return id !== currId;
      });

      return {
        ...state,
        formItemList: newformItemList,
      };
    }

    case "changeSelect": {
      //TODO: Need to change index to id for changing select
      const { type: newType, index } = action.value;

      const newformItemList = state.formItemList.map(
        (formItemElem, itemIndex) => {
          if (itemIndex === index) {
            return { ...formItemElem, type: newType };
          } else return formItemElem;
        }
      );

      const newState = {
        ...state,
        formItemList: newformItemList,
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
