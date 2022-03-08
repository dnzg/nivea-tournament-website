import { useForm } from "react-hook-form";
import { useState } from "react";
import { auth } from "utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import Link from "next/link";
import Button, { ButtonWhite } from "./Button";
import ErrorBlock from "./ErrorBlock";
import { DISCORD_API_URL } from "config";
import * as ga from "utils/ga";
import { BNET_API_URL } from "config";
import { STEAM_API_URL } from "config";

export default function AuthWindow({
  isOpenAuth,
  setOpenReg,
  setOpenAuth,
  isMobile,
  setMobileMenu,
}) {
  const [isError, setError] = useState("");
  const { register, watch, handleSubmit } = useForm();
  const watchAllFields = watch();
  // const [isOpen, setOpen] = useState(false);
  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        ga.event({
          action: "auth",
          params: {
            email: data.email,
          },
        });
        const user = userCredential.user;
        setMobileMenu(false);
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/user-not-found") {
          setError(
            "Похоже, такого аккаунта не существует. Пожалуйста, зарегистрируйтесь"
          );
        } else if (errorCode === "auth/wrong-password") {
          setError("Похоже, пароль неверный. Попробуйте еще раз");
        }

        setTimeout(() => {
          setError("");
        }, 10000);

        // console.log(errorCode, errorMessage);
      });
  };

  return (
    <Global>
      {isOpenAuth ? (
        <>
          <AuthOverlay>
            <div
              className="bg-overlay"
              onClick={() => setOpenAuth(false)}
            ></div>
            <div className="form-holder">
              <Close onClick={() => setOpenAuth(false)}>
                <svg viewBox="0 0 28 28">
                  <path
                    d="M2 2.00004L25.9994 26M25.9996 2L2.00026 26"
                    stroke="#003CC8"
                    strokeWidth="4"
                  />
                </svg>
              </Close>
              <Switcher>
                <Part
                  onClick={() => {
                    setOpenAuth(false);
                    setOpenReg(true);
                  }}
                >
                  Регистрация
                </Part>
                <Part active={true}>Авторизация</Part>
              </Switcher>
              {isError !== "" ? (
                <ErrorBlock style={{ margin: "24px 56px 12px" }}>
                  {isError}
                </ErrorBlock>
              ) : (
                <></>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  placeholder="Пароль"
                  {...register("password", { required: true })}
                />
                <Button
                  type="submit"
                  style={{ margin: "0 auto", width: "70%" }}
                >
                  Войти
                </Button>
              </form>
              <Or>
                <span>Или</span>
              </Or>
              <Platofrms>
                <Link href={DISCORD_API_URL}>
                  <a>
                    <Button
                      bgColor="#404EED"
                      borderColor="#6B77FF"
                      img="/images/discord.svg"
                      style={{ margin: "0 auto", width: "100%" }}
                    >
                      Discord
                    </Button>
                  </a>
                </Link>
                <Link href={BNET_API_URL}>
                  <a>
                    <Button
                      bgColor="#1E8DFF"
                      borderColor="#59ABFF"
                      img="/images/bnet.svg"
                      style={{ margin: "12px auto 0", width: "100%" }}
                    >
                      Battle.net
                    </Button>
                  </a>
                </Link>
                <Link href={STEAM_API_URL}>
                  <a>
                    <Button
                      bgColor="#003CC8"
                      borderColor="#004CFF"
                      img="/images/steam.svg"
                      style={{ margin: "12px auto 0", width: "100%" }}
                    >
                      Steam
                    </Button>
                  </a>
                </Link>
              </Platofrms>
            </div>
          </AuthOverlay>
        </>
      ) : (
        <></>
      )}

      {isMobile ? (
        <ButtonWhite
          view="ui"
          fontSize="inherit"
          style={{ margin: "12px 0" }}
          onClick={() => setOpenAuth(true)}
        >
          Войти в аккаунт
        </ButtonWhite>
      ) : (
        <div
          style={{ cursor: "pointer", margin: "0 32px 0 auto" }}
          className="signin"
          onClick={() => setOpenAuth(true)}
        >
          Войти
        </div>
      )}
    </Global>
  );
}

const Global = styled.div`
  .signin {
    @media screen and (max-width: 650px) {
      display: none;
    }
  }
`;

const AuthOverlay = styled.div`
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

  form {
    display: flex;
    flex-direction: column;
    padding: 24px 56px 0;

    label {
      /* margin: 0 0 0 12px; */
      font-weight: ${(props) => props.theme.fontWeights["bold"]};
    }

    input {
      background-color: ${(props) => props.theme.bg.dark};
      border: none;
      outline: none;
      padding: 12px;
      border-radius: 6px;
      margin: 4px 0 16px;
      color: ${(props) => props.theme.text.primary};
      border: 3px solid rgba(0, 0, 0, 0);
      transition: all 0.3s ease-in-out;

      &::placeholder {
        color: ${(props) => props.theme.text.secondary};
      }

      &:focus {
        background: ${(props) => props.theme.bg.black};
        border: 3px solid ${(props) => props.theme.bg.primary};
        transition: all 0.2s ease-in-out;
      }
    }
  }

  .form-holder {
    background-color: ${(props) => props.theme.bg.darkPrimary};
    overflow: hidden;
    border-radius: 20px;
    width: 55%;
    position: relative;
    padding: 0 0 64px;
    z-index: 2;

    @media screen and (max-width: 650px) {
      width: 90%;
    }
  }

  .bg-overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background: rgba(0, 0, 0, 0.25);
  }
`;

const Close = styled.div`
  position: absolute;
  z-index: 10000;
  top: -20px;
  right: -20px;
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Switcher = styled.div`
  display: flex;
  flex-direction: row;
`;

const Part = styled.div`
  background: ${(props) =>
    props.active ? props.theme.bg.darkPrimary : props.theme.bg.dark};
  cursor: ${(props) => (props.active ? "default" : "pointer")};
  width: 50%;
  text-align: center;
  padding: 30px 0;
  font-weight: ${(props) => props.theme.fontWeights["bold"]};
  font-size: ${(props) => props.theme.fontSizes[1]};
  user-select: none;
`;

const Tip = styled.div`
  font-size: ${(props) => props.theme.fontSizes[6]};
  margin: 12px auto;
  width: 97%;
`;

const Or = styled.div`
  text-transform: uppercase;
  font-size: ${(props) => props.theme.fontSizes[0]};
  font-weight: ${(props) => props.theme.fontWeights["bold"]};
  color: ${(props) => props.theme.text.secondary};
  text-align: center;
  position: relative;
  width: 100%;
  user-select: none;
  margin: 32px 0;

  span {
    background-color: ${(props) => props.theme.bg.darkPrimary};
    position: relative;
    z-index: 2;
    padding: 0 32px;
  }

  &::before {
    z-index: 1;
    position: absolute;
    width: calc(100% - 112px);
    opacity: 0.5;
    height: 1px;
    background: ${(props) => props.theme.text.secondary};
    content: "";
    left: 56px;
    right: 56px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;

const Platofrms = styled.div`
  width: 65%;
  margin: 0 auto;
`;

const PlatformBtn = styled.div`
  position: relative;
  margin: 12px 0;
  text-align: center;
  padding: 16px;
  cursor: pointer;
  border-radius: 5px;
  font-weight: ${(props) => props.theme.fontWeights["bold"]};
  background-color: ${(props) => props.bgColor};

  svg {
    position: absolute;
    height: 22px;
    width: 22px;
    left: 12px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`;
