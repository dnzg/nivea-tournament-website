import styled from "styled-components";

export default function ErrorBlock({ children, style }) {
  return <Container style={style}>{children}</Container>;
}

const Container = styled.div`
  background-color: rgba(158, 0, 0, 0.85);
  padding: 24px 32px;
  border-radius: 6px;
`;
