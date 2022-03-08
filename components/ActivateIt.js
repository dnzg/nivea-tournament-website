import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function ActivateIt() {
  return (
    <Container>
      <ButtonAc href="/tournaments">
        <img src="/images/buttonbg.png" />
        <div className="btn">Активировать Ultra Skill</div>
      </ButtonAc>
      <div className="steps">
        <div className="step">
          <img src="/images/1.png" />
          <span>Регистрируйся через любой игровой сервис</span>
        </div>
        <div className="step">
          <img src="/images/2.png" />
          <span>Подавай заявку на турнир по Warzone, CS:GO или Dota 2</span>
        </div>
        <div className="step">
          <img src="/images/3.png" />
          <span>Активируй Ultra Skill, побеждай и забирай награду</span>
        </div>
      </div>
      <Description>
        Ultra Skill – это символ самых крутых игровых навыков, которые являются
        залогом впечатляющих игровых моментов. NIVEA MEN поддерживает всех
        геймеров, демонстрирующих настоящее мастерство и высокий уровень
        исполнения.
      </Description>
    </Container>
  );
}

const Container = styled.div`
  background-image: url(/images/lightbg.jpg);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  text-align: center;
  padding: 72px 0 140px;
  @media screen and (max-width: 650px) {
    background-image: url(/images/lightbg_mob.jpg);
    background-size: contain;
    background-position: center;
    padding: 0 0 64px;
  }
  .steps {
    margin: 200px 0 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 650px) {
      margin: 64px 0 0;
      flex-direction: column;
    }

    .step {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 64px;

      img {
        width: 50%;
      }

      span {
        text-align: center;
        width: 100%;
        font-size: 18px;
        font-weight: 700;
        margin: -32px 0 0;
      }
    }
  }
`;

const ButtonAc = styled.a`
  margin: 0 auto;
  position: relative;
  z-index: 2;
  display: inline-block;
  /* overflow-x: hidden; */
  width: 100%;
  height: 100px;

  &:hover {
    .btn {
      background: linear-gradient(180deg, #ffffff 30%, #a4bfff 100%);
      color: #003dcc;
      transition: all 0.5s ease-in-out;
    }
    img {
      transition: all 0.25s ease-in-out;
      opacity: 1;
      width: 71%;
      height: 252%;
      @media screen and (max-width: 650px) {
        width: 100%;
        height: 250%;
      }
    }
  }

  img {
    position: absolute;
    top: 0;
    bottom: -20%;
    left: 0;
    right: 0;
    margin: auto;
    width: 70%;
    height: 250%;
    animation: blinkbadge 3s infinite;
    transition: all 0.25s ease-in-out;
    opacity: 0.9;
    @media screen and (max-width: 650px) {
      width: 100%;
    }
    @keyframes blinkactivate {
      0% {
        opacity: 0.75;
        left: -105px;
        right: -105px;
      }
      45% {
        opacity: 0.95;
        left: -110px;
        right: -110px;
      }
      75% {
        opacity: 1;
        left: -120px;
        right: -120px;
      }
      100% {
        opacity: 0.75;
        left: -105px;
        right: -105px;
      }
    }
  }

  .btn {
    position: absolute;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 55%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: linear-gradient(180deg, #ffffff 32.29%, #a4bfff 100%);
    transition: all 0.5s ease-in-out;
    border-radius: 10px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
    color: #0031a3;
    padding: 21px 120px;

    @media screen and (max-width: 650px) {
      font-size: 18px;
      padding: 21px 20px;
      width: 95%;
    }
  }
`;
const Description = styled.div`
  width: 80%;
  margin: 140px auto 0;
  font-size: 36px;
  text-align: center;
  line-height: 1.4;
  position: relative;
  z-index: 2;

  @media screen and (max-width: 650px) {
    margin: 96px auto 0;
    font-size: 18px;
    width: 90%;
  }
`;
