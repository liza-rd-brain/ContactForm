import { FormItemType, ItemsType } from "./types";

import styled from "styled-components";
import { css } from "styled-components";
import { useContext } from "react";
import { FormDispatch } from "./Form";

const FormItemWrap = styled.div`
  display: flex;
  width: 600px;
  height: 100px;
  border: 1px grey black;
  justify-content: space-between;
  align-items: center;
`;

const testElement = css`
  display: flex;
  width: 250px;
  height: 50px;
  border: 1px solid black;
`;

const Select = styled.select`
  ${testElement}
`;

const Input = styled.input`
  ${testElement}
`;

export const FormItem = (props: FormItemType & { index: number }) => {
  console.log(props);
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
        onChange={(e) => {
          console.log(e.target.value);
          dispatch({
            type: "changeSelect",
            value: { type: e.target.value as ItemsType, index: props.index },
          });
        }}
      >
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="link">Link</option>
      </Select>
      <Input type={`${getInputType(props.type)}`} />
    </FormItemWrap>
  );
};
