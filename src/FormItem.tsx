import { FormItemType, SelectListType, SelectType } from "./types";

import styled from "styled-components";
import { css } from "styled-components";
import { useContext } from "react";
import { FormDispatch } from "./Form";

type FormItemPropsType = FormItemType & {
  index: number;
  canDeleteItem: Boolean;
};

const FormItemWrap = styled.div`
  display: flex;
  /*   height: 100px; */
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
  border-radius: 5px;
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

/**
 * Can copy when string is filled.
 */
//TODO: take out to Form!
const checkCanCopyItem = (value: string) => {
  if (value.length > 0) {
    return true;
  } else return false;
};

export const FormItem = (props: FormItemPropsType) => {
  const dispatch = useContext(FormDispatch);

  const { id, type, value, index, canDeleteItem } = props;

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
              index: index,
            },
          });
        }}
      >
        {getOptionList()}
      </Select>
      <Input
        type={`${getInputType(type)}`} /* required */
        value={value}
        onChange={(event) => {
          dispatch({
            type: "changeInput",
            payload: { value: event.target.value, id: id },
          });
        }}
      />
      <ButtonWrap>
        {checkCanCopyItem(value) ? (
          <Button
            type="button"
            onClick={(event) => {
              event.preventDefault();

              dispatch({ type: "addFormItem", payload: id });
            }}
          >
            +
          </Button>
        ) : null}
        {canDeleteItem ? (
          <Button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              dispatch({ type: "deleteFormItem", payload: id });
            }}
          >
            -
          </Button>
        ) : null}
      </ButtonWrap>
    </FormItemWrap>
  );
};
