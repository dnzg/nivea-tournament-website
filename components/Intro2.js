import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Intro2({ type }) {
  // const useMousePosition = () => {
  //   const [mousePosition, setMousePosition] = useState({
  //     x: null,
  //     y: null,
  //   });

  //   const updateMousePosition = (ev) => {
  //     const preX = (100 * ev.clientX) / window.innerWidth - 5;
  //     const preY = (100 * ev.clientY) / 600 - 25;

  //     const x = preX < 100 && preX > 0 ? preX : 50;
  //     const y = preY < 100 && preY > -50 ? preY : 50;
  //     setMousePosition({
  //       x,
  //       y,
  //     });
  //   };

  //   useEffect(() => {
  //     window.addEventListener("mousemove", updateMousePosition);

  //     return () => window.removeEventListener("mousemove", updateMousePosition);
  //   }, []);

  //   return mousePosition;
  // };

  return (
    <IntroContainer type={type}>
      <Clip
      // style={{
      //   clipPath: `polygon(${useMousePosition().x}% ${
      //     useMousePosition().y
      //   }%, ${useMousePosition().x + 15}% ${useMousePosition().y + 28}%, ${
      //     useMousePosition().x + 11
      //   }% ${useMousePosition().y + 53}%, ${useMousePosition().x - 10}% ${
      //     useMousePosition().y + 53
      //   }%, ${useMousePosition().x - 15}% ${useMousePosition().y + 28}%)`,
      // }}
      ></Clip>
      <BadgeShBlink />
      <BadgeSh />
      <Badge type={type} />
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  background-image: url(/images/intro/bgint.jpg);
  /* background-size: ${(props) =>
    props.type === "small" ? "200%" : "contain"}; */
  background-size: contain;
  background-position: center;
  width: 100%;
  height: 700px;
  /* height: ${(props) => (props.type === "small" ? "350px" : "700px")}; */
  position: relative;
  z-index: 0;

  &::after {
    width: 100%;
    height: 50%;
    content: "";
    position: absolute;
    z-index: 5;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    bottom: 0;
  }

  @media screen and (max-width: 1260px) {
    height: 500px;
  }

  @media screen and (max-width: 870px) {
    height: 400px;
  }

  @media screen and (max-width: 650px) {
    height: 500px;
    background-size: 200%;
  }
`;

const Badge = styled.div`
  animation: blinkbadge 3s infinite;
  background-image: url(/images/intro/sh.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  transition: opacity 0.5s ease-in-out;

  @media screen and (max-width: 650px) {
    background-size: 200%;
  }

  @keyframes blinkbadge {
    0% {
      opacity: 0.75;
    }
    45% {
      opacity: 0.95;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0.75;
    }
  }
`;

const BadgeShBlink = styled.div`
  animation: blink 4s infinite;
  background-image: url(/images/intro/bsh_blink.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 4;
  transition: opacity 0.5s ease-in-out;

  @media screen and (max-width: 650px) {
    background-size: 200%;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    45% {
      opacity: 0.95;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const BadgeSh = styled.div`
  background-image: url(/images/intro/bsh.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  transition: opacity 0.5s ease-in-out;

  @media screen and (max-width: 650px) {
    background-size: 200%;
  }
`;

const Clip = styled.div`
  /* background-color: red; */
  background-image: url(/images/intro/bghigh.gif);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;

  @media screen and (max-width: 650px) {
    background-size: 200%;
  }
`;
