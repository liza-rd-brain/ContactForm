import { ButtonControllerType, FormItemType, ItemsType } from "./types";

import styled from "styled-components";
import { css } from "styled-components";
import { useContext } from "react";
import { FormDispatch } from "./Form";

type FormItemPropsType = FormItemType & { index: number };

const FormItemWrap = styled.div`
  display: flex;
  height: 100px;
  border: 1px grey black;
  justify-content: space-between;
  align-items: center;
`;

const TestElement = css`
  display: flex;
  width: 250px;
  height: 50px;
  border: 1px solid black;
`;

const Select = styled.select`
  ${TestElement}
`;

const Input = styled.input`
  ${TestElement}
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  border-radius: 5px;
`;

export const FormItem = (props: FormItemPropsType) => {
  const dispatch = useContext(FormDispatch);

  function getInputType(itemType: ItemsType) {
    switch (itemType) {
      case "email": {
        return "email";
      }
      case "phone": {
        return "tel";
      }
      case "link": {
        return "url";
      }
      default: {
        return null;
      }
    }
  }

  return (
    <FormItemWrap>
      <Select
        onChange={(event) => {
          dispatch({
            type: "changeSelect",
            value: {
              type: event.target.value as ItemsType,
              index: props.index,
            },
          });
        }}
      >
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="link">Link</option>
      </Select>
      <Input type={`${getInputType(props.type)}`} /* required */ />
      <Button
        onClick={(event) => {
          event.preventDefault();
          dispatch({ type: "addFormItem", value: props.index });
        }}
      >
        +
      </Button>
      <Button
        onClick={(event) => {
          event.preventDefault();
          dispatch({ type: "deleteFormItem", value: props.id });
        }}
      >
        -
      </Button>
    </FormItemWrap>
  );
};
