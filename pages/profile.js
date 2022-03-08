import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useForm } from "react-hook-form";
import UserContext from "components/UserContext";
import { getData, auth, uploadData, updateData } from "utils/firebase";
import Container from "components/Container";
import { DISCORD_API_URL, STEAM_API_URL, BNET_API_URL } from "config";
import {
  sendEmailVerification,
  updateEmail,
  updateProfile,
} from "@firebase/auth";
import { getDownloadURL } from "firebase/storage";
import Router, { useRouter } from "next/router";
import SupportForm from "components/Support";
import Button from "components/Button";
import * as ga from "utils/ga";

export default function Profile() {
  const { user } = useContext(UserContext);
  const [isError, setErrorstate] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const [userData, setUserData] = useState();
  const watchAllFields = watch();

  const setError = () => {
    setErrorstate(true);
    setTimeout(() => {
      setErrorstate(false);
    }, 4000);
  };

  const onSubmit = (data) => {
    updateData("users", user?.uid, {
      aid: data.aid,
    }).then(() => {
      Router.reload();
    });
  };

  const sendVerif = () => {
    console.log("sent");
    sendEmailVerification(auth.currentUser).then(() => {
      Router.reload();
    });
  };

  const addEmail = (data) => {
    updateEmail(user, data.email).then(() => {
      updateData("users", user?.uid, {
        email: data.email,
      }).then(() => {
        ga.event({
          action: "added-email",
          params: {
            email: data.email,
          },
        });
        if (!user.emailVerified) {
          sendVerif();
        }
      });
    });
  };

  useEffect(() => {
    if (user) {
      async function setData() {
        setUserData(await getData("users", user?.uid));
      }
      setData();
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      //console.log(userData);
    }
  }, [userData]);

  useEffect(() => {
    const data = watchAllFields;
    // console.log(data);

    if (
      data.image &&
      data.image.length === 1 &&
      data.image[0].type.split("/")[0] === "image"
    ) {
      const uploadTask = uploadData(`userpics/${user.uid}`, data?.image[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
          res = error;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            }).then(() => {
              Router.reload();
            });
          });
        }
      );
    } else {
      return false;
    }
  }, [watchAllFields]);

  return user ? (
    <GlobalContainer>
      <Container>
        {userData ? (
          <>
            {user.emailVerified && userData?.discord && userData?.games ? (
              userData?.steam || (userData?.bnet && userData?.aid) ? (
                <WarnBlue>
                  Похоже, вы заполнили все правильно. Скоро мы с вами свяжемся.
                  <br />
                  <br />
                  Чтобы принять участие в турнире, тебе нужно вступить в наш
                  Discord:{" "}
                  <b>
                    <Link href="https://discord.gg/fVTVV2g8SB">
                      discord.gg/fVTVV2g8SB
                    </Link>
                  </b>
                </WarnBlue>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}

            {isError ? (
              <Warn>Для изменения Activision ID обратитесь в поддержку.</Warn>
            ) : (
              <></>
            )}

            {!userData?.email ? (
              <Warn>Добавьте Email.</Warn>
            ) : !user.emailVerified ? (
              <Warn>Подтвердите Email.</Warn>
            ) : (
              <></>
            )}

            {!userData?.discord && userData?.games ? (
              <Warn>Привяжите Discord.</Warn>
            ) : (
              <></>
            )}

            {userData?.games &&
            userData?.games.includes("dota2") &&
            !userData?.steam ? (
              <Warn>
                Для участия в турнире по Dota 2 привяжите аккаунт Steam.
              </Warn>
            ) : (
              <></>
            )}

            {userData?.games &&
            userData?.games.includes("csgo") &&
            !userData?.steam ? (
              <Warn>
                Для участия в турнире по CS:GO привяжите аккаунт Steam.
              </Warn>
            ) : (
              <></>
            )}

            {userData?.games &&
            userData?.games.includes("warzone") &&
            !userData?.bnet ? (
              <Warn>
                Для участия в турнире по Call of Duty: Warzone Pacific привяжите
                аккаунт Battle.net.
              </Warn>
            ) : (
              <></>
            )}

            {userData?.games &&
            userData?.games.includes("warzone") &&
            !userData?.aid ? (
              <Warn>
                Для участия в турнире по Call of Duty: Warzone Pacific напишите
                свой никнейм Activision ID.
              </Warn>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        <SupportForm title="Контакты">
          <div className="row">
            <div>
              Email:{" "}
              {userData?.email ? (
                <>
                  {userData?.email} (
                  {user?.emailVerified ? (
                    "подтвержден"
                  ) : (
                    <>
                      не подтвержден —{" "}
                      <span
                        style={{
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => sendVerif()}
                      >
                        отправить повторное письмо с подтверждением
                      </span>
                    </>
                  )}
                  )
                </>
              ) : (
                <form
                  onSubmit={handleSubmit(addEmail)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    type="email"
                    className="aid"
                    placeholder="Email"
                    {...register("email")}
                  />
                  <Button
                    type="submit"
                    style={{ marginLeft: 12, marginTop: -4 }}
                    styleBtn={{
                      padding: "12px 12px 8px 12px",
                    }}
                  >
                    <svg
                      width="24"
                      height="17"
                      viewBox="0 0 24 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.945312 7.39053L8.67698 15.1218L22.2783 1.52051"
                        stroke="white"
                        strokeWidth="2.208"
                      />
                    </svg>
                  </Button>
                </form>
              )}
              <br />
              <br />
              Activision ID:{" "}
              {userData?.aid ? (
                <>
                  {userData?.aid}{" "}
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="pencil"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setError(true)}
                  >
                    <path
                      d="M3.00138 19L23.0106 0L32 8.98528L13.006 29L3.00138 19Z"
                      fill="#C4C4C4"
                    />
                    <path d="M0 32V22L10.0046 32H0Z" fill="#C4C4C4" />
                  </svg>
                </>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "300px",
                  }}
                >
                  <input
                    type="text"
                    className="aid"
                    placeholder="Nivea#0001"
                    {...register("aid")}
                  />
                  <Button
                    type="submit"
                    style={{ marginLeft: 12, marginTop: -4 }}
                    styleBtn={{
                      padding: "12px 12px 8px 12px",
                    }}
                  >
                    <svg
                      width="24"
                      height="17"
                      viewBox="0 0 24 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.945312 7.39053L8.67698 15.1218L22.2783 1.52051"
                        stroke="white"
                        strokeWidth="2.208"
                      />
                    </svg>
                  </Button>
                </form>
              )}
              <Connect>
                <div className="platform">
                  {userData?.discord ? (
                    <>
                      <div className="discord">
                        <img src="/images/bdiscord.svg" />
                      </div>
                      <span>Discord</span>
                    </>
                  ) : (
                    <Link href={DISCORD_API_URL}>
                      <a>
                        <div className="discord dark">
                          <svg
                            width="27"
                            height="28"
                            viewBox="0 0 27 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.4063 2.17822V14.0649M13.4063 14.0649V25.9517M13.4063 14.0649L25.293 14.0649M13.4063 14.0649L1.51953 14.0649"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          <img src="/images/bdiscord.svg" />
                        </div>
                        <span>Discord</span>
                      </a>
                    </Link>
                  )}
                </div>

                <div className="platform">
                  {userData?.steam ? (
                    <>
                      <div className="steam">
                        <img src="/images/bsteam.svg" />
                      </div>
                      <span>Steam</span>
                    </>
                  ) : (
                    <Link href={STEAM_API_URL + user?.uid}>
                      <a target="_blank">
                        <div className="steam dark">
                          <svg
                            width="27"
                            height="28"
                            viewBox="0 0 27 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.4063 2.17822V14.0649M13.4063 14.0649V25.9517M13.4063 14.0649L25.293 14.0649M13.4063 14.0649L1.51953 14.0649"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          <img src="/images/bsteam.svg" />
                        </div>
                        <span>Steam</span>
                      </a>
                    </Link>
                  )}
                </div>

                <div className="platform">
                  {userData?.bnet ? (
                    <>
                      <div className="bnet">
                        <img src="/images/bbnet.svg" />
                      </div>
                      <span>Battle.net</span>
                    </>
                  ) : (
                    <Link href={BNET_API_URL}>
                      <a>
                        <div className="bnet dark">
                          <svg
                            width="27"
                            height="28"
                            viewBox="0 0 27 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.4063 2.17822V14.0649M13.4063 14.0649V25.9517M13.4063 14.0649L25.293 14.0649M13.4063 14.0649L1.51953 14.0649"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          <img src="/images/bbnet.svg" />
                        </div>
                        <span>Battle.net</span>
                      </a>
                    </Link>
                  )}
                </div>
              </Connect>
            </div>

            <label htmlFor="image">
              <UserpicContainer>
                <div className="change">
                  <img src="/images/photo.svg" />
                  <span>Изменить</span>
                </div>
                <Userpic
                  src={user.photoURL ? user.photoURL : "/images/user.png"}
                />
              </UserpicContainer>
            </label>

            <input
              type="file"
              name="image"
              placeholder="Image"
              style={{ margin: "24px 0 0", display: "none" }}
              id="image"
              accept="image/png, image/jpeg"
              {...register("image")}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            className="blocks"
          >
            <Tourns>
              <h4>Мои турниры</h4>
              <div className="games">
                <div className="game">
                  <span>Call of Duty: Warzone Pacific</span>
                  {userData?.games &&
                  userData?.games.includes("warzone") &&
                  userData?.aid &&
                  userData?.bnet &&
                  userData?.discord ? (
                    <img src="/images/gal.svg" />
                  ) : userData?.games && userData?.games.includes("warzone") ? (
                    <img src="/images/clock.svg" />
                  ) : (
                    <Link href="/tournaments/warzone">
                      <a>Принять участие</a>
                    </Link>
                  )}
                </div>

                {userData?.games &&
                userData?.games.includes("dota2") &&
                userData?.steam &&
                userData?.discord ? (
                  <div className="game">
                    <span>Dota 2</span>
                    <img src="/images/gal.svg" />
                  </div>
                ) : userData?.games && userData?.games.includes("dota2") ? (
                  <div className="game">
                    <span>Dota 2</span>
                    <img src="/images/clock.svg" />
                  </div>
                ) : (
                  <></>
                )}

                {userData?.games &&
                userData?.games.includes("csgo") &&
                userData?.steam &&
                userData?.discord ? (
                  <div className="game">
                    <span>CS:GO</span>
                    <img src="/images/gal.svg" />
                  </div>
                ) : userData?.games && userData?.games.includes("csgo") ? (
                  <div className="game">
                    <span>CS:GO</span>
                    <img src="/images/clock.svg" />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Tourns>

            <Tourns>
              <h4>Мои трофеи</h4>
              <div className="games">
                <div className="game">
                  <span>RECRENT</span>
                  <Kills>
                    {userData?.kills?.recrent
                      ? userData?.kills?.recrent
                      : "0 киллов"}
                  </Kills>
                </div>

                <div className="game">
                  <span>NS</span>
                  <Kills>
                    {userData?.kills?.ns ? userData?.kills?.ns : "0 киллов"}
                  </Kills>
                </div>

                <div className="game">
                  <span>FANDER</span>
                  <Kills>
                    {userData?.kills?.fander
                      ? userData?.kills?.fander
                      : "0 киллов"}
                  </Kills>
                </div>
              </div>
            </Tourns>
          </div>
        </SupportForm>
      </Container>
    </GlobalContainer>
  ) : (
    <></>
  );
}

const Kills = styled.div`
  background: #003cc8;
  border-radius: 3px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 12px;
  justify-content: center;
  text-align: center;
  padding: 4px 12px;
`;

const GlobalContainer = styled.div`
  background-image: url(/images/courtsbg.jpg);
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  .aid {
    background-color: ${(props) => props.theme.bg.dark};
    border: none;
    outline: none;
    padding: 12px;
    border-radius: 6px;
    margin: 4px 0 6px;
    color: ${(props) => props.theme.text.primary};
    border: 3px solid rgba(0, 0, 0, 0);
    transition: all 0.3s ease-in-out;
    width: 100%;

    &::placeholder {
      color: ${(props) => props.theme.text.secondary};
    }

    &:focus {
      background: ${(props) => props.theme.bg.black};
      border: 3px solid ${(props) => props.theme.bg.primary};
      transition: all 0.2s ease-in-out;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;

    @media screen and (max-width: 650px) {
      flex-direction: column-reverse;
    }
  }
`;

const Userpic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 100%;
`;

const UserpicContainer = styled.div`
  width: 160px;
  height: 160px;
  position: relative;
  border-radius: 100%;
  cursor: pointer;
  overflow: hidden;
  @media screen and (max-width: 650px) {
    margin: 0 0 24px;
  }

  &:hover {
    .change {
      opacity: 1;
      transition: all 0.25s ease-in-out;
    }
  }

  .change {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: all 0.25s ease-in-out;

    img {
      opacity: 0.75;
    }

    span {
      font-size: 16px;
      font-weight: bold;
      margin: 8px 0 0;
    }
  }
`;
const Connect = styled.div`
  display: flex;
  flex-direction: row;
  margin: 48px 0 0;

  .platform {
    margin: 0 32px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      .dark {
        opacity: 0.8;
        svg {
          transform: rotate(90deg);
          transition: all 0.3s ease-in-out;
        }
      }
    }

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .dark {
      background: #000f4b;
      svg {
        transition: all 0.13s ease-in-out;
      }
      img {
        opacity: 0.5;
      }
    }

    div {
      margin: 0 0 6px;
      background: #003cc8;
      width: 54px;
      height: 54px;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      svg {
        position: absolute;
        z-index: 2;
      }
    }

    span {
      font-size: 14px;
      font-weight: 700;
    }
  }
`;
const Tourns = styled.div`
  background: #313134;
  border-radius: 10px;
  padding: 32px 36px;
  margin: 42px 12px 0;
  width: 100%;

  h4 {
    font-size: 24px;
  }

  .games {
    display: flex;
    flex-direction: column;

    .game {
      margin: 12px 0 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;

      a {
        text-decoration: underline;
        text-align: right;
      }
    }
  }
`;
const Warn = styled.div`
  background-color: rgba(158, 0, 0, 0.85);
  padding: 24px 32px;
  border-radius: 6px;
  margin: 24px auto;
  width: calc(100% - 128px);
  max-width: 1152px;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;
const WarnBlue = styled.div`
  background-color: ${(props) => props.theme.bg.secondary};
  padding: 24px 32px;
  border-radius: 6px;
  margin: 24px auto;
  width: calc(100% - 128px);
  max-width: 1152px;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;
