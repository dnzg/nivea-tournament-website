import styled from "styled-components";
import ColorScheme from "styles/Theme";

export default function Button({
  children,
  style,
  styleBtn,
  onClick,
  type,
  bgColor,
  borderColor,
  img,
}) {
  return (
    <ButtonOut
      onClick={onClick}
      type={type}
      style={style}
      bgColor={bgColor}
      borderColor={borderColor}
    >
      <ButtonContainer
        className="buttoncontainer"
        bgColor={bgColor}
        style={styleBtn}
      >
        {img ? <img src={img} /> : <></>}
        {children}
      </ButtonContainer>
      <div className="blur" />
    </ButtonOut>
  );
}

const ButtonOut = styled.button`
  position: relative;
  display: inline-block;
  user-select: none;
  border: none;
  outline: none;
  background: none;

  .blur {
    background-color: ${(props) =>
      props.bgColor ? props.bgColor : props.theme.bg.secondary};
    display: inline-block;
    filter: blur(50px);
    border-radius: 100px;
    opacity: 0;
    z-index: 9998;
    width: 100%;
    height: 150%;
    position: absolute;
    top: -25%;
    left: 0;
    right: 0;
    transition: all 0.35s ease-in-out;
  }

  &:hover,
  &:active {
    .blur {
      opacity: 0.65;
      transition: all 0.12s ease-in-out;
    }
  }

  &:hover {
    .buttoncontainer {
      border: 3px solid
        ${(props) => (props.borderColor ? props.borderColor : "#3370ff")};
      transition: all 0.2s ease-in-out;
    }
  }
`;

const ButtonContainer = styled.div`
  user-select: none;
  cursor: pointer;
  /* min-width: 200px; */
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.bg.secondary};
  font-weight: ${(props) => props.theme.fontWeights["bold"]};
  font-size: ${(props) => props.theme.fontSizes[0]};
  color: ${(props) => props.theme.text.primary};
  padding: 12px 36px;
  border-radius: 5px;
  border: 3px solid rgba(0, 0, 0, 0);
  position: relative;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
  position: relative;

  img {
    height: 24px;
    position: absolute;
    left: 10px;
    top: 0;
    bottom: -2px;
    margin: auto;
  }

  &:active {
    background-color: white;
    border: 3px solid rgba(0, 0, 0, 0) !important;
    color: ${(props) => props.theme.bg.primary};
    transition: all 0.2s ease-in-out;
  }
`;

export function ButtonWhite({
  children,
  fontSize,
  view,
  style,
  onClick,
  className,
}) {
  return (
    <ButtonWhiteContainer
      fontSize={fontSize}
      view={view}
      style={style}
      onClick={onClick}
      className={className}
    >
      {children}
    </ButtonWhiteContainer>
  );
}

const ButtonWhiteContainer = styled.div`
  border: 6px solid #fff;
  color: #fff;
  text-transform: ${(props) => (props.view === "ui" ? "none" : "uppercase")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "24px")};
  font-weight: 700;
  text-align: center;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  border-radius: 10px;
  width: ${(props) => (props.view === "ui" ? "100%" : "auto")};
  padding: ${(props) => (props.view === "ui" ? "12px 36px" : "24px 150px")};
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: #000;
    transition: all 0.2s ease-in-out;
  }
`;
