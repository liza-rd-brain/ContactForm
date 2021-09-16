import React from "react";
import { useReducer } from "react";
import styled from "styled-components";
import { FormItem } from "./FormItem";
import {
  ActionType,
  ArrayFormValuesType,
  FormItemType,
  FormItemValues,
  FormValuesType,
  SelectType,
  State,
} from "./types";

const INITIAL_ID = 0;
const INITIAL_COUNTER = INITIAL_ID + 1;
const DEFAULT_TYPE = "email";

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;

  min-height: 150px;
  width: 700px;
  background-color: #f5f5f5;
  padding: 50px;
  & > * {
    margin: 10px;
  }
  & > *:last-child {
    align-self: center;
    margin: 40px 0 0 0;
  }
`;

const SubmitButton = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 5px;
`;

const initialState: State = {
  formItemList: [
    {
      id: INITIAL_ID,
      type: DEFAULT_TYPE,
      value: "",
    },
  ],
  counterId: INITIAL_COUNTER,
};

const getForm = (state: State) => {
  const canDeleteItem = state.formItemList.length > 1;

  return state.formItemList.map(({ id, type, value }, index) => {
    return (
      <FormItem
        id={id}
        type={type}
        value={value}
        index={index}
        key={id}
        canDeleteItem={canDeleteItem}
      />
    );
  });
};

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "addFormItem": {
      /**
       *  Element number below which need to add a new one?
       */
      const upperElementId = action.payload;

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
      const currId = action.payload;

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
      //TODO: Clear input after changing select?
      const { type: newType, index } = action.payload;

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

    case "changeInput": {
      const { value: newValue, id: currId } = action.payload;

      const newformItemList = state.formItemList.map((formItem) => {
        const { id } = formItem;
        if (id === currId) {
          return { ...formItem, value: newValue };
        } else return formItem;
      });

      return {
        ...state,
        formItemList: newformItemList,
      };
    }

    default: {
      return state;
    }
  }
};

export const FormDispatch = React.createContext<React.Dispatch<ActionType>>(
  undefined as any
);

const getFormValues = (state: State) => {
  const formValues = state.formItemList.reduce<FormValuesType>(
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

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormDispatch.Provider value={dispatch}>
      <FormWrap>
        {getForm(state)}
        <SubmitButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            const formValues = getFormValues(state);
            convertArrayToObject(formValues);
          }}
        >
          send
        </SubmitButton>
      </FormWrap>
    </FormDispatch.Provider>
  );
};
