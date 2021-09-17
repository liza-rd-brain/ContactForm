import { FormItemValues, SelectListType, SelectType } from "../../types";

import styled from "styled-components";
import { css } from "styled-components";
import { useContext } from "react";
import { FormDispatch } from "./FormDispatch";

type FormItemPropsType = FormItemValues & {
  index: number;
  canDeleteItem: Boolean;
  canCopyItem: Boolean;
};

const FormItemWrap = styled.div`
  display: flex;
  border: 1px grey black;
  justify-content: space-between;
  align-items: center;
`;

const CommonFormElement = css`
  display: flex;
  width: 300px;
  height: 50px;
  border: 2px solid #949494;
  border-radius: 4px;
  color: #4b4b4b;
  padding: 0 1em;
  &:focus,
  &:focus-visible {
    border-color: #949494;
  }
`;

const Select = styled.select`
  ${CommonFormElement}
  text-transform: capitalize;
  appearance: none;
  display: list-item;

  user-select: none;
`;

const Input = styled.input`
  ${CommonFormElement}
`;

const Option = styled.option``;

const ButtonWrap = styled.div`
  width: 120px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  font-size: 24px;
  border-color: #949494;
  border-radius: 5px;
  color: #4b4b4b;
`;

const SELECT_LIST: SelectListType = ["email", "phone", "link"];

const getOptionList = () => {
  return SELECT_LIST.map((selectItem) => {
    return (
      <Option value={selectItem} key={selectItem}>
        {selectItem}
      </Option>
    );
  });
};

export const FormItem = (props: FormItemPropsType) => {
  const dispatch = useContext(FormDispatch);

  const { index, type, value, canDeleteItem, canCopyItem } = props;

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
            payload: {
              type: event.target.value as SelectType,
              itemIndex: index,
            },
          });
        }}
      >
        {getOptionList()}
      </Select>
      <Input
        type={`${getInputType(type)}`}
        value={value}
        onChange={(event) => {
          dispatch({
            type: "changeInput",
            payload: { value: event.target.value, itemIndex: index },
          });
        }}
      />
      <ButtonWrap>
        {canCopyItem ? (
          <Button
            type="button"
            onClick={(event) => {
              dispatch({ type: "addFormItem", itemIndex: index });
            }}
          >
            +
          </Button>
        ) : null}
        {canDeleteItem ? (
          <Button
            type="button"
            onClick={(event) => {
              dispatch({ type: "deleteFormItem", itemIndex: index });
            }}
          >
            -
          </Button>
        ) : null}
      </ButtonWrap>
    </FormItemWrap>
  );
};
