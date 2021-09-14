import styled from "styled-components";
import "./index.css";

import { Form } from "./Form";

const Container = styled.div`
  display: flex;
  margin: 150px auto 0 auto;
  justify-content: center;
`;

export const App = () => {
  return (
    <Container>
      <Form />
    </Container>
  );
};
