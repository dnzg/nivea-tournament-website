import styled from "styled-components";

export default function Container({ children }) {
  return <Cont>{children}</Cont>;
}

export function ContainerWidth({ children }) {
  return <ContWidth>{children}</ContWidth>;
}

const Cont = styled.div`
  padding: 8px 64px;

  @media screen and (max-width: 650px) {
    padding: 8px 12px;
  }
`;

const ContWidth = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
`;
