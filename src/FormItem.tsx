import {
  ButtonControllerType,
  FormItemType,
  SelectListType,
  SelectType,
} from "./types";

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
  text-transform: capitalize;
`;

const Input = styled.input`
  ${TestElement}
`;

const Option = styled.option`
  /*   &::first-letter {
    text-transform: uppercase;
  } */
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  border-radius: 5px;
`;

// Take out as const-!?
const selectList: SelectListType = ["email", "phone", "link"];

const getSelectList = (type: SelectType) => {
  return selectList.map((selectItem) => {
    return (
      <Option value={selectItem} key={selectItem}>
        {selectItem}
      </Option>
    );
  });
};

export const FormItem = (props: FormItemPropsType) => {
  const dispatch = useContext(FormDispatch);

  const { id, type, value, index } = props;

  function getInputType(itemType: SelectType) {
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
        value={type}
        onChange={(event) => {
          dispatch({
            type: "changeSelect",
            value: {
              type: event.target.value as SelectType,
              index: index,
            },
          });
        }}
      >
        {getSelectList(type)}
      </Select>
      <Input type={`${getInputType(type)}`} /* required */ />
      <Button
        onClick={(event) => {
          event.preventDefault();
          dispatch({ type: "addFormItem", value: id });
        }}
      >
        +
      </Button>
      <Button
        onClick={(event) => {
          event.preventDefault();
          dispatch({ type: "deleteFormItem", value: id });
        }}
      >
        -
      </Button>
    </FormItemWrap>
  );
};
