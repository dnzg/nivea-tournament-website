import styled from "styled-components";

export default function SupportForm({ children, title }) {
  return (
    <Form>
      <h2>{!title ? "Задать вопрос" : title}</h2>
      {children}
    </Form>
  );
}

const Form = styled.div`
  margin: 32px auto;
  width: calc(100% - 128px);
  max-width: 1152px;
  background: ${(props) => props.theme.bg.darkPrimary};
  border-radius: 20px;
  padding: 32px 40px 64px;

  @media screen and (max-width: 650px) {
    width: 100%;
  }

  h2 {
    margin: 0 0 24px;
  }

  textarea {
    width: 80%;
    background: ${(props) => props.theme.bg.dark};
    border-radius: 10px;
    color: ${(props) => props.theme.text.primary};
    border: 2px solid rgba(0, 0, 0, 0);
    outline: none;
    resize: none;
    padding: 14px 18px;
    margin: 0 0 24px;
    font-size: ${(props) => props.theme.fontSizes[0]};
    transition: all 0.2s ease-in-out;

    &::placeholder {
      color: ${(props) => props.theme.text.secondary};
    }

    &:focus {
      border: 2px solid rgba(255, 255, 255, 0.25);
      transition: all 0.2s ease-in-out;
    }
  }

  form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
  }

  .pencil {
    height: 12px;
    width: 12px;
    margin-left: 6px;
  }
`;
