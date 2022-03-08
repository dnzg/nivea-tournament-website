import React, { useEffect, useContext } from "react";
import UserContext from "components/UserContext";
import { updateData, auth, writeData, getData } from "utils/firebase";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { updateProfile } from "@firebase/auth";
import styled from "styled-components";
import Intro2 from "components/Intro2";
import ActivateIt from "components/ActivateIt";
import NewProducts3 from "components/NewProducts";
import * as ga from "utils/ga";

export default function HomePage() {
  const router = useRouter();
  // const asPath = decodeURI(router.asPath.substr(2)).split("=");
  const asPath = Object.entries(router.query);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function check() {
      // console.log(asPath);
      if (user && asPath[0] && asPath[0].length === 2) {
        if (asPath[0][0] === "discord") {
          const discordUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          if (user && user.uid && (await getData("users", user.uid)))
            await updateData("users", user.uid, { discord: discordUser });
          if (!user.photoURL && discordUser.avatar) {
            updateProfile(auth.currentUser, {
              photoURL: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`,
            }).then(() => {
              Router.push("/profile");
            });
          }
          ga.event({
            action: "discord-added",
          });
          Router.push("/profile");
        } else if (asPath[0][0] === "bnet") {
          const bnetUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          if (user && user.uid && (await getData("users", user.uid)))
            await updateData("users", user?.uid, { bnet: bnetUser });
          ga.event({
            action: "bnet-added",
          });
          Router.push("/profile");
        } else if (asPath[0][0] === "steam") {
          const steamUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          if (user && user.uid && (await getData("users", user.uid)))
            await updateData("users", user?.uid, { steam: steamUser });
          if (!user.photoURL && steamUser.avatar) {
            updateProfile(auth.currentUser, {
              photoURL: steamUser.avatar,
            }).then(() => {
              Router.push("/profile");
            });
          }
          ga.event({
            action: "steam-added",
          });
          Router.push("/profile");
        }
      }
    }
    check();
  }, [asPath]);

  return (
    <>
      <Intro2 />
      <Hour>
        <h2>Докажи, что ты лучший!</h2>
        <h3>УЧАСТВУЙ В ОНЛАЙН-ТУРНИРАХ В ДИСЦИПЛИНАХ:</h3>
        <h3 className="blue">
          Call of Duty: WARZONE Pacific, Dota 2{" "}
          <span className="whiteAnd">и</span> CS:GO
        </h3>
        <div className="prizfond">
          <h3>Призовой фонд</h3>
          <h4>1 000 000 ₽</h4>
        </div>
        {/*             
        <h1>Докажи, что ты лучший!</h1>
        <p>
          УЧАСТВУЙ В ТУРНИРЕ И БОРИСЬ ЗА ПОБЕДУ В ДИСЦИПЛИНАХ: CALL OF DUTY:
          WARZONE PACIFIC, DOTA 2 И CS:GO
        </p>
        <h1>Призовой фонд</h1> */}
      </Hour>
      {/* <Prize>
        <span>1 000 000 ₽</span>
      </Prize> */}

      <FightEm>
        {/* <h1>
          ОХОТЬСЯ НА СТРИМЕРОВ ЗА ДОПОЛНИТЕЛЬНЫЕ ПРИЗОВЫЕ В ФОРМАТЕ BOUNTY HUNT
        </h1> */}

        <div className="mob">
          <div className="prove"></div>
          <img src="/images/kv4.jpg" className="pc" />
          <img src="/images/kvm.jpg" className="mobimg" />
          <Dates>
            <svg
              width="54"
              height="54"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M57.5882 5.35236H45.1598V0.61771C45.1598 0.292203 44.8935 0.0258789 44.5679 0.0258789H40.4251C40.0996 0.0258789 39.8333 0.292203 39.8333 0.61771V5.35236H20.8947V0.61771C20.8947 0.292203 20.6284 0.0258789 20.3029 0.0258789H16.1601C15.8346 0.0258789 15.5682 0.292203 15.5682 0.61771V5.35236H3.13978C1.83036 5.35236 0.772461 6.41025 0.772461 7.71968V56.8416C0.772461 58.1511 1.83036 59.209 3.13978 59.209H57.5882C58.8976 59.209 59.9555 58.1511 59.9555 56.8416V7.71968C59.9555 6.41025 58.8976 5.35236 57.5882 5.35236ZM54.6291 53.8825H6.09894V25.7705H54.6291V53.8825ZM6.09894 20.74V10.6788H15.5682V14.2298C15.5682 14.5553 15.8346 14.8217 16.1601 14.8217H20.3029C20.6284 14.8217 20.8947 14.5553 20.8947 14.2298V10.6788H39.8333V14.2298C39.8333 14.5553 40.0996 14.8217 40.4251 14.8217H44.5679C44.8935 14.8217 45.1598 14.5553 45.1598 14.2298V10.6788H54.6291V20.74H6.09894Z"
                fill="url(#paint0_linear_1_2)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_2"
                  x1="30.364"
                  y1="0.0258789"
                  x2="30.364"
                  y2="59.209"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#585C66" />
                  <stop offset="0.307292" stopColor="white" />
                  <stop offset="1" stopColor="#7E8292" />
                </linearGradient>
              </defs>
            </svg>

            <span>14.12 — 24.12</span>
          </Dates>
          <div className="prove" style={{ marginBottom: 42 }}>
            <h2 className="hunt">
              ОХОТЬСЯ НА СТРИМЕРОВ ЗА ДОПОЛНИТЕЛЬНЫЕ ПРИЗОВЫЕ В ФОРМАТЕ{" "}
              <span style={{ whiteSpace: "nowrap" }}>BOUNTY HUNT</span>
            </h2>
          </div>
        </div>
      </FightEm>
      <ActivateIt />
      <NewProducts3 />
      <Share>
        <h1>Поделиться</h1>
        <div className="social">
          <Link href="https://vk.com/share.php?url=https://niveamenultraskill.ru/">
            <a target="_blank">
              <div className="vk" />
            </a>
          </Link>
          <Link href="https://www.facebook.com/sharer/sharer.php?u=https://niveamenultraskill.ru/">
            <a target="_blank">
              <div className="fb" />
            </a>
          </Link>
          <Link href="https://twitter.com/intent/tweet?url=https://niveamenultraskill.ru/&text=">
            <a target="_blank">
              <div className="twi" />
            </a>
          </Link>
        </div>
      </Share>
    </>
  );
}

const Hour = styled.div`
  width: 90%;
  margin: 100px auto 0;
  text-align: center;

  h2,
  h3 {
    font-size: 5em;
    @media screen and (max-width: 650px) {
      font-size: 2.5em;
    }
    text-align: center;
    text-transform: uppercase;
    background: linear-gradient(
      180deg,
      #8b8e95 0%,
      #fdfdfd 61.46%,
      #c7c8cc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  h2 {
    margin-bottom: 24px;
  }

  h3 {
    font-size: 2.25em;
    @media screen and (max-width: 650px) {
      font-size: 1.5em;
    }
  }

  h3.blue {
    background: linear-gradient(
      180deg,
      #014782 0%,
      #00a9ff 61.46%,
      #014782 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    .whiteAnd {
      background: linear-gradient(
        180deg,
        #8b8e95 0%,
        #fdfdfd 61.46%,
        #c7c8cc 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .prizfond {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: 48px auto 0;

    @media screen and (max-width: 650px) {
      margin: 48px auto 0;
    }

    h3 {
      text-align: center;
      width: 100%;
      margin-bottom: 0;
    }

    h4 {
      margin-top: -20px;
      margin-left: 0;
      font-size: 120px;
      @media screen and (max-width: 650px) {
        font-size: 4em;
        margin-top: 0;
      }
      white-space: nowrap;
      background: linear-gradient(
        180deg,
        #014782 0%,
        #00a9ff 61.46%,
        #014782 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  @media screen and (max-width: 650px) {
    width: 100%;
    margin: 0 auto;
  }

  /* h1 {
    text-transform: uppercase;
  }

  p {
    text-transform: uppercase;
    margin: 16px auto 64px;
    width: 90%;
    font-size: 2em;
    font-weight: bold;
    @media screen and (max-width: 650px) {
      font-size: 1.5em;
    }
  } */
`;

const Prize = styled.div`
  font-size: 10vw;
  font-weight: bold;
  /* background-image: url(/images/light.jpg); */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 540px;
  text-align: center;
  margin: -120px 0 -170px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: 650px) {
    font-size: 3em;
    height: 380px;
    margin-bottom: -120px;
  }

  span {
    height: 10vw;
    @media screen and (max-width: 650px) {
      height: 30px;
    }
  }
`;

const Dates = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -64px 0 42px;

  @media screen and (max-width: 650px) {
    margin: 0 0 42px;
  }

  span {
    font-size: 42px;
    font-weight: 700;
    height: 48px;
    margin: 0 0 0 28px;
    background: linear-gradient(
      180deg,
      #8b8e95 0%,
      #fdfdfd 61.46%,
      #c7c8cc 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const FightEm = styled.div`
  margin: 0px auto 0;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;

  .mob {
    /* display: none; */
    margin: 0 0 0;

    img {
      margin: 0;
    }

    .prove {
      padding: 0 12px;

      .hunt {
        width: 80%;
        margin: 0 auto;
        font-size: 3em;

        @media screen and (max-width: 650px) {
          font-size: 2em;
        }
        span {
          background: linear-gradient(
            180deg,
            #014782 0%,
            #00a9ff 61.46%,
            #014782 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
    }

    h2,
    h3 {
      font-size: 2.5em;
      text-align: center;
      text-transform: uppercase;
      background: linear-gradient(
        180deg,
        #8b8e95 0%,
        #fdfdfd 61.46%,
        #c7c8cc 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    h2 {
      margin-bottom: 24px;
    }

    h3 {
      font-size: 1.5em;
    }

    h3.blue {
      background: linear-gradient(
        180deg,
        #014782 0%,
        #00a9ff 61.46%,
        #014782 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      .whiteAnd {
        background: linear-gradient(
          180deg,
          #8b8e95 0%,
          #fdfdfd 61.46%,
          #c7c8cc 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .prizfond {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      margin: 24px auto 0;

      h3 {
        text-align: center;
        width: 100%;
      }

      h4 {
        margin-left: 0;
        font-size: 54px;
        white-space: nowrap;
        background: linear-gradient(
          180deg,
          #014782 0%,
          #00a9ff 61.46%,
          #014782 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .mobimg {
    display: none;
  }

  @media screen and (max-width: 650px) {
    margin: 0 0 64px;
    .pc {
      display: none;
    }
    .mobimg {
      display: block;
    }
  }
  h1 {
    margin: 0 auto;
    width: 85%;
    text-transform: uppercase;
  }

  img {
    margin: 64px 0 0;
    width: 100%;
  }
`;

const Share = styled.div`
  text-align: center;
  margin: 200px auto 100px;

  h1 {
    text-transform: uppercase;
  }

  .social {
    width: 30%;
    margin: 24px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 42px;

    @media screen and (max-width: 650px) {
      width: 50%;
    }

    div {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      width: 42px;
      height: 42px;
    }

    .vk {
      background-image: url(/images/social/vk.svg);
    }

    .fb {
      background-image: url(/images/social/fb.svg);
    }

    .twi {
      background-image: url(/images/social/twi.svg);
    }
  }
`;
