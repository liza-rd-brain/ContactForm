import { FormItemType } from "./types";

import styled from "styled-components";
import { css } from "styled-components";

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

const Select = styled.div`
  ${testElement}
`;

const Input = styled.div`
  ${testElement}
`;

export const FormItem = (props: FormItemType) => {
  return (
    <FormItemWrap>
      <Select />
      <Input />
    </FormItemWrap>
  );
};
