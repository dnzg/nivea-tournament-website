import styled from "styled-components";
import Link from "next/link";

export default function Footer() {
  return (
    <Container>
      <div className="wrapper">
        <div className="left">
          <h3>© 2021 Nivea Men</h3>
          <span>
            Все права защищены
            <br />
            <br />© 2021 Activision Publishing, Inc. ACTIVISION, CALL OF DUTY,
            CALL OF DUTY WARZONE и WARZONE являются товарными знаками Activision
            Publishing, Inc. Все остальные товарные знаки и торговые
            наименования являются собственностью соответствующих владельцев.
            <br />
            <br />
            Иллюстрационные материалы турниров созданы с помощью нейросети
            app.wombo.art.
          </span>
        </div>
        <div className="right">
          <Link href="/privacy-policy">
            <a target="_blank">Положение о конфиденциальности</a>
          </Link>
          <br />
          <Link href="/rules">
            <a target="_blank">Условия использования</a>
          </Link>
          <br />
          <Link href="mailto:dz@extensi.one">
            <a target="_blank">Связаться с нами</a>
          </Link>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #000f4b;
  width: 100%;
  padding: 64px 0 84px;

  @media screen and (max-width: 650px) {
    padding: 48px 12px 64px;
  }

  .wrapper {
    width: 95%;
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 650px) {
      flex-direction: column;
      align-items: flex-start;
      width: 95%;
    }

    .left {
      max-width: 50%;
      @media screen and (max-width: 650px) {
        max-width: 100%;
      }

      h3 {
        text-transform: uppercase;
        font-size: 24px;
        margin: 0 0 8px;
        @media screen and (max-width: 650px) {
          font-size: 16px;
        }
      }

      span {
        color: rgba(255, 255, 255, 0.75);
        font-size: 14px;
        line-height: 1.4;
        @media screen and (max-width: 650px) {
          font-size: 12px;
        }
      }
    }

    .right {
      font-size: 14px;
      line-height: 1.65;
      @media screen and (max-width: 650px) {
        font-size: 12px;
        margin: 24px 0 0;
      }
    }
  }
`;
