import React, { useState, useEffect, useContext } from "react";
import Header from "components/Header";
import UserContext from "components/UserContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import Button from "components/Button";
import Intro2 from "components/Intro2";

export default function Tournaments() {
  const { user } = useContext(UserContext);

  return (
    <>
      <HeaderUS />
      {/* <Intro2 type="small" /> */}
      <Container>
        <Tours>
          <Tour
            href="/tournaments/warzone"
            style={{ backgroundImage: "url(/images/wzbg.jpg)" }}
            id="wz1"
          >
            <div className="dark" />
            <div className="shadow">
              <div className="innershadow">
                <img className="icon" src="/images/games/wz.png" />
                <h2>Call of Duty: Warzone Pacific</h2>
                <span className="fund">250 000 ₽</span>
                <div className="priz">
                  <img src="/images/prize.svg" />
                  <span>Призовые места</span>
                </div>
                <span className="fund">100 000 ₽</span>
                <div className="priz">
                  <img src="/images/target.svg" />
                  <span>За голову RECRENT</span>
                </div>
                <span className="desc">
                  Один из лучших игроков мира в Call of Duty: Warzone Pacific. В
                  его активе 4 победы на турнирах Twitch Rivals и золото BoomTV
                  Champions Challenge
                </span>
                <div className="dates">
                  <img src="/images/cal.svg" />

                  <span>16.12 — 24.12</span>
                </div>
                <Button>Подробнее</Button>
              </div>
            </div>
          </Tour>

          <Tour
            href="/tournaments/dota2"
            style={{ backgroundImage: "url(/images/d2bg.jpg)" }}
            id="d2"
          >
            <div className="shadow">
              <div className="innershadow">
                <img className="icon" src="/images/games/d2.png" />
                <h2>Dota 2</h2>
                <span className="fund">250 000 ₽</span>
                <div className="priz">
                  <img src="/images/prize.svg" />
                  <span>Призовые места</span>
                </div>
                <span className="fund">75 000 ₽</span>
                <div className="priz">
                  <img src="/images/target.svg" />
                  <span>За голову NS</span>
                </div>
                <span className="desc">
                  Бывший прo-игрок Dota 2, один из опытнейших саппортов мира.
                  Десятикратный чемпион ASUS Open, четырёхкратный чемпион MYM
                  Prime Defending, серебряный призёр ESWC 2010.
                </span>
                <div className="dates">
                  <img src="/images/cal.svg" />

                  <span>14.12 — 19.12</span>
                </div>
                <Button>Подробнее</Button>
              </div>
            </div>
          </Tour>

          <Tour
            href="/tournaments/csgo"
            style={{ backgroundImage: "url(/images/csbg.jpg)" }}
            id="cs3"
          >
            <div className="shadow">
              <div className="innershadow">
                <img className="icon" src="/images/games/cs.png" />
                <h2>CS:GO</h2>
                <span className="fund">250 000 ₽</span>
                <div className="priz">
                  <img src="/images/prize.svg" />
                  <span>Призовые места</span>
                </div>
                <span className="fund">75 000 ₽</span>
                <div className="priz">
                  <img src="/images/target.svg" />
                  <span>За голову FANDER</span>
                </div>{" "}
                <span className="desc">
                  Профессиональный киберспортсмен в CS:GO, состоял в командах
                  WINside, PRO100, NALANE, Cerberus
                </span>
                <div className="dates">
                  <img src="/images/cal.svg" />

                  <span>14.12 — 20.12</span>
                </div>
                <Button>Подробнее</Button>
              </div>
            </div>
          </Tour>
        </Tours>
      </Container>
    </>
  );
}

const Tours = styled.div`
  background: black;
  min-height: 760px;
  width: 100%;
  position: relative;

  @media screen and (max-width: 650px) {
    display: flex;
    flex-direction: column;
  }
`;

const Tour = styled(motion.a)`
  transition: all 0.25s ease-in-out;
  position: absolute;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 33.3333%;
  top: 0;
  bottom: 0;

  .shadow {
    position: relative;
  }

  .innershadow {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
    padding: 96px 32px;

    @media screen and (max-width: 650px) {
      position: relative;
      z-index: 10002;
    }
  }

  .icon {
    display: none;
    width: 15vw;
    border-radius: 100%;
    box-shadow: 0 0 75px #004cff;
    opacity: 1;
    height: 15vw;
    transition: all 0.25s ease-in-out;
  }

  h2 {
    font-weight: 800;
    font-size: 30px;
    transition: all 0.25s ease-in-out;
    margin: 0 0 12px;
  }

  .fund {
    font-weight: 800;
    font-size: 58px;
  }

  .priz,
  .dates {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 0 24px;

    img {
      width: 28px;
    }

    span {
      font-size: 18px;
      margin: 0 0 0 12px;
    }
  }

  .desc {
    width: 80%;
    margin: 0px 0 0;
    opacity: 0;
    /* height: 0; */
    transition: all 0.3s ease-in-out;
  }

  .dates {
    margin: 24px 0 24px;
  }

  .shadow::before {
    content: "";
    top: 10%;
    bottom: 10%;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 0;
    background-color: #000;
    filter: blur(35px);
    z-index: 0;
    opacity: 0.5;
    @media screen and (max-width: 650px) {
      /* display: none; */
      opacity: 0.25 !important;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  &:nth-child(1) {
    left: 0;
    right: 66.6666%;
  }

  &:nth-child(2) {
    clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);
    left: 29%;
    width: 42%;
    right: 29.9%;
    z-index: 2;

    @media screen and (max-width: 650px) {
      clip-path: none;
      width: 100%;
    }
  }

  &:nth-child(3) {
    left: 66.6666%;
    right: 0;
  }

  &:nth-child(1)::after,
  &:nth-child(2)::after,
  &:nth-child(3)::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 3;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    backdrop-filter: blur(5px);
    @media screen and (max-width: 650px) {
      display: none;
    }
  }
  /* 
  #wz1:hover ~ #d2::after,
  #wz1:hover ~ #cs3::after {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }

  #d2:hover ~ #wz1::after,
  #d2:hover ~ #cs3::after {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  }

  #cs3:hover ~ #d2::after,
  #cs3:hover ~ #wz1::after {
    opacity: 1;
    transition: all 0.3s ease-in-out;
  } */

  @media screen and (max-width: 650px) {
    position: static;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    position: absolute;
    z-index: 10003;
    width: 66.6666%;
    transition: all 0.55s ease-in-out;

    @media screen and (max-width: 650px) {
      position: static;
      width: 100%;
    }

    @media screen and (min-width: 650px) {
      .desc {
        width: 50%;
        margin: -10px 0 20px;
        opacity: 1;
        line-height: 1.5;
        height: auto;
      }

      &:nth-child(1) {
        clip-path: polygon(0 0, 100% 0, 92.5% 100%, 0% 100%);
        @media screen and (max-width: 650px) {
          clip-path: none;
        }
      }

      &:nth-child(2) {
        left: 16.6666%;
        right: 16.6666;
        clip-path: polygon(15% 0, 100% 0, 85% 100%, 0% 100%);

        .shadow::before {
          left: 0;
          margin: auto;
          right: 0;
        }

        .innershadow {
          align-items: center !important;
          text-align: center !important;
        }
        @media screen and (max-width: 650px) {
          clip-path: none;
        }
      }

      &:nth-child(3) {
        right: 0;
        left: 33.3333%;
        clip-path: polygon(7.5% 0, 100% 0, 100% 100%, 0% 100%);
        @media screen and (max-width: 650px) {
          clip-path: none;
          .shadow::before {
            left: 0;
          }

          .innershadow {
            align-items: flex-start !important;
            text-align: left !important;
          }
        }
      }

      .shadow {
        .innershadow {
          position: relative;
          z-index: 10002;
          padding: 96px 128px 128px;
          text-align: right;
          align-items: flex-end;

          @media screen and (max-width: 650px) {
            padding: 48px 32px;
          }
        }

        &::before {
          content: "";
          top: 10%;
          bottom: 10%;
          left: 50%;
          right: 0;
          position: absolute;
          background-color: #000;
          filter: blur(35px);
          z-index: 0;
          opacity: 0.5;
          @media screen and (max-width: 650px) {
            display: none;
          }
        }
      }

      .icon {
        opacity: 0;
        width: 0;
        height: 0;
        transition: all 0.25s ease-in-out;
      }

      h2 {
        font-size: 52px;
        transition: all 0.25s ease-in-out;
        margin: 0 0 32px;
        @media screen and (max-width: 650px) {
          font-size: 36px;
        }
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderUS = styled.div`
  background-image: url(/images/usobg.jpg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-bottom: 27.847%;

  img {
    width: 80%;
  }
`;
