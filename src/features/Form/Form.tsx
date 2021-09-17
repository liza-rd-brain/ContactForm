import { useContext } from "react";
import { useReducer } from "react";
import styled from "styled-components";
import { AppDispatch } from "../../AppDispatch";
import { FormItem } from "./FormItem";
import { FormState } from "../../types";
import { formReducer } from "./formReducer";
import { FormDispatch } from "./FormDispatch";

const INITIAL_ID = 0;
const INITIAL_COUNTER = INITIAL_ID + 1;
const DEFAULT_TYPE = "email";

const FormContainer = styled.form`
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

const initialState: FormState = {
  formItemList: [
    {
      id: INITIAL_ID,
      type: DEFAULT_TYPE,
      value: "",
    },
  ],
  counterId: INITIAL_COUNTER,
};

const getForm = (state: FormState) => {
  const canDeleteItem = state.formItemList.length > 1;

  return state.formItemList.map(({ id, type, value }, index) => {
    const canCopyItem = value.length > 0;

    return (
      <FormItem
        id={id}
        index={index}
        type={type}
        value={value}
        key={id}
        canDeleteItem={canDeleteItem}
        canCopyItem={canCopyItem}
      />
    );
  });
};

export const Form = () => {
  const appDispatch = useContext(AppDispatch);
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormDispatch.Provider value={dispatch}>
      <FormContainer>
        {getForm(state)}
        <SubmitButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            appDispatch({ type: "sendForm", payload: state.formItemList });
          }}
        >
          submit
        </SubmitButton>
      </FormContainer>
    </FormDispatch.Provider>
  );
};
