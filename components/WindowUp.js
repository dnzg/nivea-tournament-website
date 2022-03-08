import { useEffect, useState } from "react";
import styled from "styled-components";
import { getData } from "utils/firebase";
import Button from "./Button";
import React from "react";

export default function WindowUp({
  title,
  content,
  button,
  subbuttontext,
  close,
  action,
  type,
}) {
  const [contentText, setContent] = useState();

  useEffect(() => {
    if (content) {
      async function getContent(id) {
        setContent(await getData("games", id));
      }
      getContent(content);
    }
  }, [content]);

  return (
    <Overlay>
      <WindowBlock>
        <img
          src="/images/close.svg"
          onClick={() => close(false)}
          className="close"
        />
        <h2>{title}</h2>
        {type === "bh" && contentText?.bh ? (
          <Content dangerouslySetInnerHTML={{ __html: contentText.bh }} />
        ) : contentText?.rules ? (
          <Content dangerouslySetInnerHTML={{ __html: contentText.rules }} />
        ) : (
          <></>
        )}

        {button === "" || !button ? (
          <></>
        ) : (
          <>
            <Button onClick={() => action()}>{button}</Button>
            <br />
            <span className="subb">{subbuttontext}</span>
          </>
        )}
      </WindowBlock>
    </Overlay>
  );
}

const Overlay = styled.div`
  z-index: 99999;
  position: fixed;
  backdrop-filter: blur(12px);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WindowBlock = styled.div`
  background: #18181b;
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  width: 60%;
  margin: auto;
  padding: 32px 32px 80px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 80%;

  @media screen and (max-width: 650px) {
    width: 95%;
  }

  .close {
    position: absolute;
    right: -28px;
    top: -28px;
    cursor: pointer;
    width: 24px;
    height: 24px;
    @media screen and (max-width: 650px) {
      right: 0;
    }
  }

  .subb {
    width: 70%;
  }
`;

const Content = styled.div`
  background: #313134;
  padding: 22px 42px;
  overflow-y: scroll;
  border-radius: 6px;
  margin: 24px 0;
  min-height: 50vh;
  width: 100%;
`;
