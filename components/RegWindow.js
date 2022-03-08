import { useForm } from "react-hook-form";
import { useState } from "react";
import { writeData, auth } from "utils/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import styled from "styled-components";
import Link from "next/link";
import Button from "./Button";
import ErrorBlock from "./ErrorBlock";
import { DISCORD_API_URL } from "config";
import * as ga from "utils/ga";
import { BNET_API_URL } from "config";
import { STEAM_API_URL } from "config";

export default function RegWindow({
  isOpenReg,
  setOpenAuth,
  setOpenReg,
  styleButton,
  setMobileMenu,
}) {
  const [isError, setError] = useState("");
  const { register, watch, handleSubmit } = useForm();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        writeData("users", user.uid, {
          name: data.name,
          provider: user.providerData[0].providerId,
          email: user.email,
          created: parseInt(user.metadata.createdAt),
          updated: parseInt(user.metadata.createdAt),
        });
        if (!user.emailVerified) {
          sendEmailVerification(auth.currentUser).then(() => {});
        }
        ga.event({
          action: "new-user",
          params: {
            email: user.email,
            provider: user.providerData[0].providerId,
          },
        });

        setMobileMenu(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError(errorCode);

        setTimeout(() => {
          setError("");
        }, 10000);

        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Global>
      {isOpenReg ? (
        <>
          <RegOverlay>
            <div className="bg-overlay" onClick={() => setOpenReg(false)}></div>
            <div className="form-holder">
              <Close onClick={() => setOpenReg(false)}>
                <svg viewBox="0 0 28 28">
                  <path
                    d="M2 2.00004L25.9994 26M25.9996 2L2.00026 26"
                    stroke="#003CC8"
                    strokeWidth="4"
                  />
                </svg>
              </Close>
              <Switcher>
                <Part active={true}>Регистрация</Part>
                <Part
                  onClick={() => {
                    setOpenReg(false);
                    setOpenAuth(true);
                  }}
                >
                  Авторизация
                </Part>
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
                <label htmlFor="email">Имя</label>
                <input
                  type="name"
                  placeholder="Имя"
                  autoComplete="off"
                  {...register("name", { required: true })}
                />
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  placeholder="Пароль"
                  {...register("password", { required: true })}
                />
                <Button
                  type="submit"
                  style={{ margin: "0 auto", width: "100%" }}
                >
                  Зарегистрироваться
                </Button>
                <Tip>
                  Нажимая кнопку, вы принимаете{" "}
                  <Link href="/rules">
                    <a target="_blank">пользовательское соглашение</a>
                  </Link>{" "}
                  и соглашаетесь на обработку персональной информации на
                  условиях{" "}
                  <Link href="/privacy-policy">
                    <a target="_blank">политики конфиденциальности</a>
                  </Link>
                </Tip>
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
          </RegOverlay>
        </>
      ) : (
        <></>
      )}
      <div className="createAcc">
        <Button onClick={() => setOpenReg(true)} style={styleButton}>
          Создать аккаунт
        </Button>
      </div>
    </Global>
  );
}

const Global = styled.div`
  .createAcc {
    @media screen and (max-width: 650px) {
      display: none;
    }
  }
`;

const RegOverlay = styled.div`
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

  a {
    color: #004cff;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
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
  margin: 12px 0 32px;

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
