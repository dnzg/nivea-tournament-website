import styled from "styled-components";

export default function MoreInfoAdd({ game, id }) {
  return (
    <Container>
      <div className="inside">
        <div className="left">
          <span className="priz">Призовой фонд</span>
          <br />
          <h3 style={{ marginBottom: 32 }}>{game.prizfund}</h3>
          {game.places ? (
            game.places.map((place, idx) => (
              <div className="place" key={idx}>
                <img src={`/images/place${idx}.png`} />
                <div className="money">
                  <h4>{place}</h4>
                  <span>{idx + 1} место</span>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="right">
          <div className="prizz">
            <span className="priz">Награда за голову</span>
            <br />
            <h3>{game.bhunt}</h3>
          </div>
          <div className="onekill">
            1 {id === "dota2" || id === "csgo" ? "победа" : "килл"}
            <br />=<br />1 доля
          </div>
          <div className="info">
            <h4
              dangerouslySetInnerHTML={{
                __html: game.name,
              }}
            />
            <span>{game.description}</span>
          </div>
          <div className="canyou">
            Сможешь ли ты победить
            <br />и принести его голову?
          </div>
          <img src={`/images/Bg${game.nick}.png`} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  /* background: red; */
  width: 100%;
  max-width: 100%;
  min-width: 100%;
  overflow: hidden;

  h3 {
    font-size: 64px;
    font-weight: 800;
    display: block;
    margin: 0 0 24px;
  }

  .priz {
    font-size: 24px;
    font-weight: bold;
  }

  .inside {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 650px) {
      flex-direction: column;
    }
  }

  .left {
    max-width: 30%;
    min-width: 30%;
    width: 30%;
    margin-left: calc((100% - 1280px) / 2);
    margin-right: 15%;
    /* background: blue; */

    @media screen and (max-width: 650px) {
      max-width: 100%;
      width: 100%;
      margin: 0 12px;
    }

    .place {
      flex-direction: row;
      display: flex;
      align-items: center;
      margin: 0 0 32px;

      img {
        width: 30%;
        margin: 0 42px 0 0;
        @media screen and (max-width: 650px) {
          width: 120px;
          margin: 0 32px 0 0;
        }
      }

      .money {
        text-align: center;
        @media screen and (max-width: 650px) {
          width: 100%;
        }
        h4 {
          font-weight: 800;
          font-size: 36px;
        }
        span {
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
  }

  .right {
    /* background: green; */
    max-width: 55%;
    min-width: 55%;
    width: 55%;
    position: relative;

    @media screen and (max-width: 650px) {
      max-width: 90%;
      width: 90%;
      margin: 0 12px;
    }

    img {
      width: 100%;
      /* height: 70%; */
      height: 640px;
      object-fit: contain;
      object-position: right;
      right: -125px;
      top: -50px;
      position: relative;
    }

    .onekill {
      font-size: 36px;
      line-height: 1;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
      display: inline-block;
      position: absolute;
      top: 23%;
      left: 27%;

      @media screen and (max-width: 650px) {
        font-size: 24px;
        top: 20%;
        left: 17%;
      }
    }

    .canyou {
      display: inline-block;
      width: 70%;
      font-weight: 800;
      font-size: 28px;
      text-align: right;
      text-transform: uppercase;
      position: absolute;
      /* bottom: -5%; */
      z-index: 2;
      bottom: 5%;
      right: 25%;

      @media screen and (max-width: 650px) {
        bottom: 10%;
        font-size: 18px;
        text-align: center;
        width: 100%;
        right: 0;
        left: 0;
      }
    }

    .info {
      display: inline-block;
      position: absolute;
      bottom: 25%;
      left: 0;
      height: 180px;
      width: 75%;
      margin: auto;
      z-index: 2;
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

      @media screen and (max-width: 650px) {
        /* bottom: 0; */
        height: 250px;
      }

      h4 {
        font-weight: bold;
        font-size: 36px;
        text-transform: uppercase;

        @media screen and (max-width: 650px) {
          font-size: 24px;
        }
      }

      span {
        font-weight: normal;
        font-size: 20px;
        line-height: 1.5;

        @media screen and (max-width: 650px) {
          font-size: 16px;
        }
      }
    }

    .prizz {
      text-align: right;
    }
  }
`;
