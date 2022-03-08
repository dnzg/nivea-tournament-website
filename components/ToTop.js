import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ToTop() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const lim = 1000;
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > lim) {
      setVisible(true);
    } else if (scrolled <= lim) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <ButtonTop
      style={{ opacity: visible ? 1 : 0 }}
      onClick={() => scrollToTop()}
    >
      <svg
        width="18"
        height="29"
        viewBox="0 0 18 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.35517 1.00103C8.78677 0.569427 9.48654 0.569429 9.91815 1.00103L16.9516 8.03445C17.3832 8.46605 17.3832 9.16582 16.9516 9.59743C16.52 10.029 15.8202 10.029 15.3886 9.59743L10.2418 4.4507L10.2418 28.4912L8.03145 28.4912L8.03146 4.4507L2.88473 9.59743C2.45313 10.029 1.75335 10.029 1.32175 9.59743C0.890144 9.16582 0.890145 8.46605 1.32175 8.03444L8.35517 1.00103Z"
          fill="white"
        />
      </svg>
    </ButtonTop>
  );
}

const ButtonTop = styled.div`
  position: fixed;
  right: 3%;
  bottom: 40px;
  width: 84px;
  height: 84px;
  border-radius: 100%;
  background: #000f4b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 45px #004cff;
  z-index: 9999;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;
