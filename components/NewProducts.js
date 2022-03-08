import styled from "styled-components";
import { ButtonWhite } from "./Button";
import Link from "next/link";
const pregoods = [
  {
    title: "Лосьон после бритья",
    img: "prod1.png",
    description: "Лосьон с углём дарит твоей коже лучший деф и хил.",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_aftershave_lotion",
  },
  {
    title: "Пена для бритья",
    img: "prod2.png",
    description:
      "Формула пены для бритья с активным углем очищает кожу, подготавливая ее к бритью, а тебя — к ультраскилловой катке.",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_shaving_foam",
  },
  {
    title: "Гель для бритья",
    img: "prod3.png",
    description: "Скользи на шорт вместе с гелем для бритья Nivea Men Ultra! ",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_shaving_gel",
  },
  {
    title: "Антиперспирант",
    type: "Ролик",
    img: "prod4.png",
    description:
      "А антиперспирант будет кемперить 48 часов на страже свежести! Переходи на черный!",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_antiperspirant_roll",
  },
  {
    title: "Антиперспирант",
    type: "Спрей",
    img: "prod5.png",
    description:
      "Дезодорант Nivea Men Ultra — твоя имба в борьбе с неприятным запахом и потом.",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_antiperspirant_spray",
  },
  {
    title: "Гель для душа",
    type: "Ролик",
    img: "prod6.png",
    description:
      "Гель для душа Nivea Men Ultra 2 в 1 пушит за двоих — освежи им и тело, и голову.",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_shower_gel",
  },
  {
    title: "Шампунь",
    img: "prod7.png",
    description:
      "Ultra-очищающий шампунь Nivea Men – твой лучший саппорт в битве за свежесть.",
    link: "https://www.ozon.ru/highlight/skidki-na-tovary-nivea-330687/?&utm_source=SP_Landing_page&utm_campaign=vendor_BDF_Gaming_Support_Q4&utm_term=carousel_shampoo",
  },
];
function shiftLeft() {
  const boxes = document.querySelectorAll(".box");
  const tmpNode = boxes[0];
  boxes[0].className = "box move-out-from-left";

  setTimeout(function () {
    if (boxes.length > 5) {
      tmpNode.classList.add("box--hide");
      boxes[5].className = "box move-to-position5-from-left";
    }
    boxes[1].className = "box move-to-position1-from-left";
    boxes[2].className = "box move-to-position2-from-left";
    boxes[3].className = "box move-to-position3-from-left";
    boxes[4].className = "box move-to-position4-from-left";
    boxes[0].remove();

    document.querySelector(".cards__container").appendChild(tmpNode);
  }, 300);
}

function shiftRight() {
  const boxes = document.querySelectorAll(".box");
  boxes[4].className = "box move-out-from-right";
  setTimeout(function () {
    const noOfCards = boxes.length;
    if (noOfCards > 4) {
      boxes[4].className = "box box--hide";
    }

    const tmpNode = boxes[noOfCards - 1];
    tmpNode.classList.remove("box--hide");
    boxes[noOfCards - 1].remove();
    let parentObj = document.querySelector(".cards__container");
    parentObj.insertBefore(tmpNode, parentObj.firstChild);
    tmpNode.className = "box move-to-position1-from-right";
    boxes[0].className = "box move-to-position2-from-right";
    boxes[1].className = "box move-to-position3-from-right";
    boxes[2].className = "box move-to-position4-from-right";
    boxes[3].className = "box move-to-position5-from-right";
  }, 300);
}

//670px

export default function NewProducts3() {
  return (
    <ContainerProducts>
      <h1 style={{ textTransform: "uppercase", marginBottom: 100 }}>
        Продукты
        <br />
        Nivea Men Ultra
      </h1>
      <div className="container">
        <div className="button" onClick={() => shiftRight()}>
          <img src="/images/left.png" />
        </div>
        <div className="cards-wrapper">
          <ul className="cards__container">
            {pregoods.map((good, idx) => (
              <li key={idx} className={idx > 4 ? "box box--hide" : "box"}>
                <div className="goodContainer">
                  <span>NIVEA MEN ULTRA</span>
                  <img src={`/images/prods/${good.img}`} />
                  <span>{good.title}</span>
                  <sub>{good.type}</sub>
                </div>
                <div className="foot">
                  <span>{good.description}</span>
                  <br />
                  {good.link ? (
                    <Link href={good.link}>
                      <a target="_blank">
                        <ButtonWhite
                          fontSize="14px"
                          className="buyIt"
                          view="ui"
                        >
                          КУПИТЬ
                        </ButtonWhite>
                      </a>
                    </Link>
                  ) : (
                    <></>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="button button-right" onClick={() => shiftLeft()}>
          <img src="/images/left.png" />
        </div>
      </div>
    </ContainerProducts>
  );
}
const ContainerProducts = styled.div`
  background: url(/images/bggoods.jpg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: inline-block;
  text-align: center;
  margin: 120px 0;
  z-index: 0;
  position: relative;
  width: 100%;
  min-height: 32rem;

  @media screen and (max-width: 650px) {
    margin: 12px 0 64px;
  }

  .container {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    max-width: 1300px;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    width: 100%;
  }

  .button {
    margin-left: 0 3%;
    width: 2rem;
    cursor: pointer;
  }

  .button-right {
    transform: rotate(180deg);
  }

  .button--inactive {
    opacity: 0.2;
  }

  .button img {
    width: 60%;
  }

  .cards-wrapper {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
  }

  .cards__container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 25rem;
    width: 100%;
  }

  .goodContainer {
    background-color: black;
    border-radius: 15px;
    width: 100%;
    box-shadow: 0px 0px 2rem 0px rgba(0, 76, 255, 0.35);
    padding: 10%;
    flex-direction: column;
    border-radius: 15px;
    transition: all 0.5s ease-in-out;
    position: relative;
    z-index: 2;
    user-select: none;
    text-align: center;

    img {
      width: 100%;
      transition: all 0.5s ease-in-out;
      margin: 12px 0;
      user-drag: none;
      user-select: none;
    }

    span {
      font-weight: 800;
      font-size: 14px;
      line-height: 1.35;
      text-align: center;
      text-transform: uppercase;
      transition: all 0.5s ease-in-out;
      display: block;
      user-select: none;

      @media screen and (max-width: 650px) {
        font-size: 12px !important;
      }
    }

    sub {
      font-weight: 800;
      font-size: 16px;
      margin: 2px 0 0;
      text-align: center;
      display: block;
      text-transform: uppercase;
      transition: all 0.5s ease-in-out;
      user-select: none;

      @media screen and (max-width: 1020px) {
        font-size: 12px !important;
        opacity: 1;
      }
    }

    &::after {
      z-index: 1;
      content: "";
      position: absolute;
      /* border: 3px solid #004cff; */
      border-radius: 30px;
      left: -18px;
      right: -18px;
      bottom: -18px;
      top: -18px;
      /* opacity: ${(props) => (props.type === "large" ? 1 : 0)}; */
      transition: all 0.5s ease-in-out;

      @media screen and (max-width: 650px) {
        border: 0px;
      }
    }
  }

  .box {
    /*     margin: -1.5rem; */
    min-width: 29%;
    @media screen and (max-width: 700px) {
      min-width: 28%;
    }
    min-height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: 0.5s all ease-in-out;
    opacity: 1;

    .foot {
      margin: 24px 0 0;
      text-align: center;
      display: none;
      span {
        font-size: 16px !important;
      }
      .buyIt {
        margin: 18px 0 0;
        display: none;
      }
    }

    &:nth-child(3) {
      transition: 0.5s all ease-in-out;
      margin: 0 0 -120px;

      .goodContainer {
        border: 3px solid #004cff;
        margin: 0 0;
      }

      span {
        font-size: 20px;
        @media screen and (max-width: 1020px) {
          font-size: 14px;
        }
      }
      .foot {
        display: block;
        .buyIt {
          display: block;
        }
      }
    }
  }

  .box:nth-child(1),
  .box:nth-child(5) {
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
  .box:nth-child(2),
  .box:nth-child(4) {
    @media screen and (max-width: 500px) {
      display: none;
    }
  }

  .box:nth-child(2n) {
    transform: scale(0.85);
    z-index: -1;
  }

  .box:nth-child(2) {
    left: 5%;
  }

  .box:nth-child(4) {
    left: -5%;
  }

  .box:nth-child(4n + 1) {
    transform: scale(0.75);
    z-index: -2;
    opacity: 0.5;
  }

  .box:nth-child(1) {
    left: 15%;
  }

  .box:nth-child(5) {
    left: -15%;
  }

  .box--hide {
    opacity: 0;
    display: none;
    transition: 0.5s all ease-in-out;
  }

  .move-out-from-left {
    animation: moveOutLeft 0.5s ease-in-out;
    transition: 0.5s all ease-in-out;
  }

  .move-out-from-right {
    animation: moveOutRight 0.75s ease-in-out;
    transition: 0.5s all ease-in-out;
  }

  .move-to-position5-from-left {
    animation: moveToP5Left 0.5s ease-in-out;
  }

  .move-to-position4-from-left {
    animation: moveToP4Left 0.5s ease-in-out;
  }

  .move-to-position3-from-left {
    animation: moveToP3Left 0.5s ease-in-out;
  }

  .move-to-position2-from-left {
    animation: moveToP2Left 0.5s ease-in-out;
  }

  .move-to-position1-from-left {
    animation: moveToP1Left 0.5s ease-in-out;
  }

  .move-to-position5-from-right {
    animation: moveToP5Right 0.5s ease-in-out;
  }
  .move-to-position4-from-right {
    animation: moveToP4Right 0.5s ease-in-out;
  }
  .move-to-position3-from-right {
    animation: moveToP3Right 0.5s ease-in-out;
  }
  .move-to-position2-from-right {
    animation: moveToP2Right 0.5s ease-in-out;
  }
  .move-to-position1-from-right {
    animation: moveToP1Right 0.5s ease-in-out;
  }

  @keyframes moveOutLeft {
    0% {
      transform: scale(0.5) translateX(0%);
      transition: 0.5s all ease-in-out;
      opacity: 1;
    }
    50% {
      transform: scale(0.25) translateX(-150%);
      transition: 0.5s all ease-in-out;
      opacity: 0.5;
    }
    100% {
      transform: scale(0.15) translateX(0%);
      transition: 0.5s all ease-in-out;
      opacity: 0;
    }
  }

  @keyframes moveOutRight {
    0% {
      transform: scale(0.5) translateX(0%);
      transition: 0.5s all ease-in-out;
      opacity: 1;
    }
    50% {
      transform: scale(0.25) translateX(150%);
      transition: 0.5s all ease-in-out;
      opacity: 0.5;
    }
    100% {
      transform: scale(0.15) translateX(0%);
      transition: 0.5s all ease-in-out;
      opacity: 0;
    }
  }

  @keyframes moveToP5Left {
    from {
      transform: scale(0.75) translateX(100%);
    }
    to {
      transform: scale(0.75) translateX(0);
    }
  }

  @keyframes moveToP4Left {
    from {
      transform: scale(0.75) translateX(100%);
    }
    to {
      transform: scale(0.85) translateX(0);
    }
  }

  @keyframes moveToP3Left {
    from {
      transform: scale(0.85) translateX(100%);
    }
    to {
      transform: scale(1) translateX(0);
    }
  }

  @keyframes moveToP2Left {
    from {
      transform: scale(1) translateX(100%);
    }
    to {
      transform: scale(0.85) translateX(0);
    }
  }

  @keyframes moveToP1Left {
    from {
      transform: scale(0.85) translateX(100%);
    }
    to {
      transform: scale(0.75) translateX(0);
    }
  }

  @keyframes moveToP1Right {
    from {
      transform: scale(0.75) translateX(-100%);
    }
    to {
      transform: scale(0.75) translateX(0);
    }
  }

  @keyframes moveToP2Right {
    from {
      transform: scale(0.75) translateX(-100%);
    }
    to {
      transform: scale(0.85) translateX(0);
    }
  }

  @keyframes moveToP3Right {
    from {
      transform: scale(0.85) translateX(-100%);
    }
    to {
      transform: scale(1) translateX(0);
    }
  }

  @keyframes moveToP4Right {
    from {
      transform: scale(1) translateX(-100%);
    }
    to {
      transform: scale(0.85) translateX(0);
    }
  }

  @keyframes moveToP5Right {
    from {
      transform: scale(0.85) translateX(-100%);
    }
    to {
      transform: scale(0.75) translateX(0);
    }
  }
`;

const GoodContainer = styled.div``;
