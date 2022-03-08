import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Intro() {
  const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({
      x: null,
      y: null,
    });

    const updateMousePosition = (ev) => {
      setMousePosition({
        x: ev.clientX - 50,
        y: ev.clientY - 150,
      });
    };

    useEffect(() => {
      window.addEventListener("mousemove", updateMousePosition);

      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    return mousePosition;
  };
  return (
    <IntroContainer>
      <Badge />
      {/* <Overshadow /> */}
      {/* <Highlight
        style={{
          left: useMousePosition()["x"],
          top: useMousePosition()["y"],
        }}
      /> */}
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  background-image: url(/images/bgintro.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  padding-bottom: 61%;
  position: relative;
  z-index: 0;
  overflow: hidden;
`;

const Highlight = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  background-color: #234daf;
  filter: blur(150px);
  display: none;
  width: 30%;
  padding-bottom: 30%;
  border-radius: 100%;
`;

const Overshadow = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  /* background: red; */
  z-index: 3;
  position: relative;
`;

const Badge = styled.div`
  /* background-image: url(/images/badge.png); */
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 4;
`;
