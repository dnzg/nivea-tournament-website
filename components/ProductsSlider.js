import { useEffect, useState } from "react";
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

export default function ProductsSlider() {
  const [goods, setGoods] = useState(pregoods);
  const [current, setCurrent] = useState(2);

  const useWidth = () => {
    const [width, setWidth] = useState(0); // default width, detect on server.
    useEffect(() => {
      setWidth(window.innerWidth);
    }, []);
    const handleResize = () => setWidth(window.innerWidth);
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [handleResize]);
    return width;
  };

  // console.log(useWidth());

  const leftButtonFunc = () => {
    if (current === 0) setCurrent(goods.length - 1);
    else setCurrent(current - 1);
  };

  const rightButtonFunc = () => {
    if (current === goods.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <>
      <Container>
        <WrapGoods>
          <h1 style={{ textTransform: "uppercase" }}>
            Продукты
            <br />
            Nivea Men Ultra
          </h1>

          <Slider>
            {current === 0 ? (
              <></>
            ) : (
              <LeftButton onClick={() => leftButtonFunc()} />
            )}
            <GoodsContainerWrap>
              <GoodsContainer
                style={{
                  width: (1 + (goods.length - 5) * 0.2) * useWidth(),
                  padding:
                    current === 0
                      ? "0 0 0 80px"
                      : current === goods.length - 1
                      ? "0 100px 0 0"
                      : 0,
                }}
              >
                {goods.map((good, idx) => (
                  <Good
                    onClick={() => setCurrent(idx)}
                    data={good}
                    idx={idx}
                    key={idx}
                    current={current}
                  />
                ))}
              </GoodsContainer>
            </GoodsContainerWrap>
            {current === goods.length - 1 ? (
              <></>
            ) : (
              <RightButton onClick={() => rightButtonFunc()} />
            )}
          </Slider>
        </WrapGoods>
      </Container>
    </>
  );
}

const Container = styled.div`
  background-image: url(/images/bggoods.jpg);
  background-size: contain;
  background-position: center;
  /* padding-bottom: 80%; */
  background-repeat: no-repeat;
  min-height: 1300px;
  position: relative;
  width: 100%;
  position: relative;
  z-index: 3;
  margin: 100px 0 0;

  @media screen and (max-width: 650px) {
    width: 95%;
  }
`;

const WrapGoods = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @media screen and (max-width: 650px) {
    position: static;
  }
`;

const Slider = styled.div`
  width: 100%;
  overflow: hidden;
  display: inline-block;
  position: relative;
  min-height: 100%;
  margin-top: -8%;
`;

const LeftButton = styled.div`
  position: absolute;
  left: 64px;
  top: 0;
  bottom: 0;
  margin: auto;
  background-image: url(/images/left.png);
  background-size: cover;
  background-position: center;
  width: 38px;
  height: 75px;
  cursor: pointer;
  z-index: 9999;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const RightButton = styled.div`
  position: absolute;
  right: 64px;
  top: 0;
  bottom: 0;
  margin: auto;
  background-image: url(/images/left.png);
  transform: rotate(180deg);
  background-size: cover;
  background-position: center;
  width: 38px;
  height: 75px;
  cursor: pointer;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const GoodsContainerWrap = styled.div`
  position: absolute;
  overflow: hidden;
  left: 0;
  padding-left: 140px;
  right: 140px;
  margin: auto;
  min-height: 100%;
  top: 0;
  bottom: 0;
  transition: all 1s ease-in-out;

  @media screen and (max-width: 650px) {
    width: 100%;
    left: 0;
    right: 0;
    padding-left: 0;
    position: static;
  }
`;

const GoodsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  top: 0;
  bottom: 0;
  margin: auto;
  transition: all 1s ease-in-out;

  @media screen and (max-width: 650px) {
    position: static;
    width: 100% !important;
    flex-direction: column;
  }
`;

function Good({ data, idx, current, onClick }) {
  const type =
    idx === current - 3 || idx === current + 3
      ? "little"
      : idx === current - 2 || idx === current + 2
      ? "little"
      : idx === current - 1 || idx === current + 1
      ? "medium"
      : idx === current
      ? "large"
      : "off";

  return (
    <GoodWrap type={type} onClick={onClick}>
      <GoodContainer type={type}>
        <span>NIVEA MEN ULTRA</span>
        <img src={`/images/prods/${data.img}`} />
        <span>{data.title}</span>
        <sub>{data.type}</sub>
      </GoodContainer>
      <div className="foot">
        <span>{data.description}</span>
        <br />
        {data.link && idx === current ? (
          <Link href={data.link}>
            <a target="_blank">
              <ButtonWhite fontSize={type !== "large" ? "0px" : "24px"}>
                Купить
              </ButtonWhite>
            </a>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </GoodWrap>
  );
}

const GoodWrap = styled.div`
  width: ${(props) =>
    props.type === "little"
      ? "6%"
      : props.type === "medium"
      ? "10%"
      : props.type === "large"
      ? "18%"
      : "2%"};
  margin: ${(props) =>
    props.type === "large" ? "0 1.5% -300px 0" : "0 1.5% 0 0"};
  transition: all 1s ease-in-out;

  @media screen and (max-width: 650px) {
    width: 100% !important;
    margin: 0;
  }

  .foot {
    width: 100%;
    transition: all 1s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    opacity: ${(props) => (props.type === "large" ? 1 : 0)};
    margin: ${(props) => (props.type === "large" ? "48px 0 0 0" : "0")};

    span {
      display: block;
      margin: ${(props) => (props.type === "large" ? "0 0 48px" : "0px")};
      transition: all 1s ease-in-out;
      font-weight: 700;
      font-size: ${(props) => (props.type === "large" ? "24px" : "0")};
    }

    @media screen and (max-width: 650px) {
      display: none;
    }
  }
`;

const GoodContainer = styled.div`
  background-color: black;
  width: 100%;
  padding: ${(props) =>
    props.type === "little"
      ? "12px"
      : props.type === "medium"
      ? "24px"
      : props.type === "large"
      ? "48px"
      : "0"};
  display: ${(props) =>
    props.type === "little"
      ? "flex"
      : props.type === "medium"
      ? "flex"
      : props.type === "large"
      ? "flex"
      : "none"};
  flex-direction: column;
  border-radius: 15px;
  transition: all 1s ease-in-out;
  position: relative;
  z-index: 2;
  user-select: none;

  img {
    width: 100%;
    transition: all 1s ease-in-out;
    user-drag: none;
    user-select: none;
  }

  span {
    font-weight: 800;
    /* font-size: ${(props) => (props.type === "large" ? "24px" : "0px")}; */
    font-size: ${(props) =>
      props.type === "little"
        ? "8px"
        : props.type === "medium"
        ? "12px"
        : props.type === "large"
        ? "24px"
        : "0px"};
    line-height: 1.35;
    text-align: center;
    text-transform: uppercase;
    transition: all 1s ease-in-out;
    /* opacity: ${(props) => (props.type === "large" ? 1 : 0)}; */
    user-select: none;

    @media screen and (max-width: 650px) {
      font-size: 16px !important;
    }
  }

  sub {
    font-weight: 800;
    font-size: ${(props) => (props.type === "large" ? "16px" : "0px")};
    margin: 2px 0 0;
    text-align: center;
    text-transform: uppercase;
    transition: all 1s ease-in-out;
    opacity: ${(props) => (props.type === "large" ? 1 : 0)};
    user-select: none;

    @media screen and (max-width: 650px) {
      font-size: 14px !important;
      opacity: 1;
    }
  }

  &::after {
    z-index: 1;
    content: "";
    position: absolute;
    border: 3px solid #004cff;
    border-radius: 30px;
    left: -18px;
    right: -18px;
    bottom: -18px;
    top: -18px;
    opacity: ${(props) => (props.type === "large" ? 1 : 0)};
    transition: all 1s ease-in-out;

    @media screen and (max-width: 650px) {
      border: 0px;
    }
  }
`;
