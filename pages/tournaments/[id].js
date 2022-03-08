import React, { useState, useEffect, useContext } from "react";
import UserContext from "components/UserContext";
import BracketPage from "components/Bracket";
import Button, { ButtonWhite } from "components/Button";
import { BASE_URL } from "config";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import WindowUp from "components/WindowUp";
import { getData, queryGet, updateData, writeData } from "utils/firebase";
import { arrayUnion } from "@firebase/firestore";
import { gamesData } from "config";
import { ContainerWidth } from "components/Container";
import MoreInfoAdd from "components/MoreInfoAdd";
import * as ga from "utils/ga";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const namesDef = [{ name: "O" }, { name: "В" }, { name: "Я" }, { name: "Д" }];

export default function Post({
  isOpenReg,
  setOpenReg,
  isOpenAuth,
  setOpenAuth,
}) {
  const { user } = useContext(UserContext);
  const now = Date.now();
  // console.log(now < 1639612800000);
  const router = useRouter();
  const { id } = router.query;
  const [gamers, setGamers] = useState(shuffle(namesDef));
  const [gamersCount, setGamersCount] = useState(23);
  const [gameData, setGame] = useState();

  useEffect(() => {
    if (id) {
      async function getContent(id) {
        setGame(await getData("games", id));
      }
      getContent(id);
    }
  }, [id]);

  useEffect(() => {
    if (gameData) {
      setGamers(gameData?.avatars?.slice(0, 4));
    }
  }, [gameData]);

  useEffect(() => {
    async function get() {
      if (id) {
        const data = await queryGet(id);
        let result = [];
        data.forEach((doc) => {
          const d = doc.data();
          switch (id) {
            case "warzone":
              if (d.bnet && d.discord && d.discord.avatar && d.aid && d.name)
                result.push({
                  name: d.name.charAt(0),
                  avatar: `https://cdn.discordapp.com/avatars/${d.discord.id}/${d.discord.avatar}.png?size=128`,
                });
              break;

            case "dota2":
              if (d.steam && d.discord && d.discord.avatar && d.name)
                result.push({
                  name: d.name.charAt(0),
                  avatar: `https://cdn.discordapp.com/avatars/${d.discord.id}/${d.discord.avatar}.png?size=128`,
                });
              break;

            case "csgo":
              if (d.steam && d.discord && d.discord.avatar && d.name)
                result.push({
                  name: d.name.charAt(0),
                  avatar: `https://cdn.discordapp.com/avatars/${d.discord.id}/${d.discord.avatar}.png?size=128`,
                });
              break;
          }
        });
        // const gameLength =
        //   result.length < 10 ? result.length * 3 : result.length;
        const gameLength = result.length;
        setGamersCount(gameLength);
        let res = shuffle(result);
        // setGamers(res.slice(0, 4));
      }
    }
    get();
  }, [id]);

  useEffect(() => {
    console.log(gamers);
  }, [gamers]);

  const [isOpenwin, setOpenWin] = useState(false);
  const [isOpenwinBH, setOpenWinBH] = useState(false);
  const [userData, setUserData] = useState();
  useEffect(() => {
    if (user) {
      async function setData() {
        setUserData(await getData("users", user?.uid));
      }
      setData();
    }
  }, [user]);

  useEffect(() => {
    if (id && !Object.keys(games).includes(id)) router.push("/tournaments");
  }, [id]);

  let games = gamesData;
  const game = games[id];

  const toDate = (epochSource, isFirst) => {
    const epoch = isFirst ? epochSource + 15 * 3600 * 1000 : epochSource;
    const date = new Date(epoch);
    const min = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    const time = ", " + date.getHours() + ":" + min;
    const res =
      date.getDate() +
      "." +
      (date.getMonth() + 1) +
      "." +
      date.getFullYear() +
      time;
    return res;
  };

  const takePartAction = (tag) => {
    if (tag === "hunt") {
      if (user) {
        setOpenWinBH(true);
      } else {
        setOpenReg(true);
      }
    } else {
      if (user) {
        setOpenWin(true);
      } else {
        setOpenReg(true);
      }
    }
  };

  const jointournament = (id) => {
    updateData("users", user.uid, {
      games: arrayUnion(id),
    });
    ga.event({
      action: "joined-tournament",
      params: {
        tournament: id,
      },
    });
    Router.push("/profile");
  };

  const declOfNum = (number) => {
    const titles = ["человек", "человека", "человек"];
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  const killsCount = (number) => {
    const titles = ["килл", "килла", "киллов"];
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  return game ? (
    <>
      {isOpenwin ? (
        <WindowUp
          title="Правила турнира"
          content={id}
          button={
            userData?.games && userData?.games.includes(id)
              ? ""
              : "Принять участие в турнире"
          }
          subbuttontext="Нажимая кнопку, я принимаю пользовательское соглашение и соглашаюсь на обработку персональной информации на условиях политики конфиденциальности"
          action={() => jointournament(id)}
          close={setOpenWin}
        />
      ) : (
        <></>
      )}

      {isOpenwinBH ? (
        <WindowUp
          title="Правила охоты"
          content={id}
          close={setOpenWinBH}
          type="bh"
        />
      ) : (
        <></>
      )}
      <HeaderPic style={{ backgroundImage: `url(/images/${game.bg}bg.jpg)` }}>
        <Switcher>
          {Object.entries(games).map((gam, idx) => (
            <Link href={`/tournaments/${gam[0]}`} key={idx}>
              <a>
                <GameTitle key={idx} isFilled={gam[1].title === game.title}>
                  {gam[1].title}
                </GameTitle>
              </a>
            </Link>
          ))}
        </Switcher>
      </HeaderPic>
      <GlobalBg>
        <GlobalWrapper
          style={
            {
              // backgroundImage: "url(/images/bgg.jpg)",
            }
          }
        >
          <InfoBlock>
            <div className="left">
              <img src="/images/uso.svg" className="uso" />
              <br />
              <img src={`/images/${game.bg}text.svg`} className="sub" />
              <br />
              <span className="sets">
                <b>Режим игры:</b> {game.sets}
              </span>
              <div className="dates">
                <img src="/images/cal.svg" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: game.dates,
                  }}
                ></span>
              </div>
            </div>

            <div className="right">
              {/* {userData?.games && userData?.games.includes(id) ? (
                <></>
              ) : id === "warzone" ? (
                <Button
                  style={{ width: "100%" }}
                  onClick={() => takePartAction()}
                >
                  Принять участие в турнире
                </Button>
              ) : (
                <></>
              )} */}

              <ButtonWhite
                view="ui"
                fontSize="inherit"
                style={{ margin: "12px 0" }}
                onClick={() => takePartAction("rules")}
              >
                Правила турнира
              </ButtonWhite>

              <ButtonWhite
                view="ui"
                fontSize="inherit"
                onClick={() => takePartAction("hunt")}
              >
                Правила охоты
              </ButtonWhite>
            </div>
          </InfoBlock>
          <TakePart dangerouslySetInnerHTML={{ __html: game.text }} />
        </GlobalWrapper>
        <div
          style={{
            // backgroundImage: "url(/images/bggg.jpg)",
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <MoreInfoAdd game={game} id={id} />

          <GlobalWrapper>
            <Participants>
              <div className="parts">
                <h4>Участники</h4>
                <div className="people">
                  <div className="man">
                    <img src={`/images/hero/${game.nick.toLowerCase()}.png`} />
                  </div>
                  {gamers?.map((man, idx) => (
                    <ManLetter
                      key={idx}
                      style={{
                        backgroundImage: `url(${man})`,
                      }}
                    >
                      {/* {man.name} */}
                    </ManLetter>
                  ))}
                  {gameData?.count ? (
                    <div className="more">
                      И еще {gameData.count} {declOfNum(gameData.count)}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <span
                  style={{
                    width: 90,
                    textAlign: "center",
                    display: "block",
                    fontWeight: 700,
                  }}
                >
                  {game.nick}
                </span>
              </div>

              <div className="comment">
                <h4>
                  {game?.comment?.length === 1 ? "Комментатор" : "Комментаторы"}
                </h4>
                <div className="commrow">
                  {game?.comment?.map((comm, idx) => (
                    <div className="comman" key={idx}>
                      <img src={`/images/${comm.photo}`} />
                      <span>{comm.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Participants>

            <Cvals>
              <h4>Открытые квалификации</h4>
              <div className="row">
                {game?.openc?.map((kval, idx) => (
                  <Cval key={idx}>{toDate(kval, true)}</Cval>
                ))}
              </div>
              <h4>Закрытые квалификации</h4>
              <div className="row">
                {game?.closec?.map((kval, idx) => (
                  <Cval key={idx}>{toDate(kval)}</Cval>
                ))}
              </div>
              <h4>Финал</h4>
              <div className="row">
                {game?.finalc?.map((kval, idx) => (
                  <Cval key={idx}>{toDate(kval)}</Cval>
                ))}
              </div>
              <h4>Трансляции</h4>
              <div className="row">
                {game?.streamc?.map((kval, idx) => (
                  <Cval key={idx}>{toDate(kval)}</Cval>
                ))}
              </div>
            </Cvals>
            {game.channel ? (
              <Link href={`https://twitch.tv/${game.channel}`}>
                <a target="_blank">
                  <WatchOnTwitch>
                    <svg
                      width="33"
                      height="37"
                      viewBox="0 0 33 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.08406 -0.000366211L0.356445 6.60212V30.3729H8.431V36.9754L15.1586 30.3729H20.5369L32.6499 18.4875V-0.000366211H7.08406ZM29.9584 17.1679L24.5777 22.4485H19.1947L14.4851 27.0705V22.4485H8.431V2.64109H29.9584V17.1679Z"
                        fill="white"
                      />
                      <path
                        d="M25.9212 7.26392H23.2297V15.1837H25.9212V7.26392ZM18.5201 7.26392H15.8286V15.1837H18.5201V7.26392Z"
                        fill="white"
                      />
                    </svg>

                    <span>
                      Смотреть
                      <br />
                      на twitch.tv/{game.channel}
                    </span>
                  </WatchOnTwitch>
                </a>
              </Link>
            ) : (
              <></>
            )}
          </GlobalWrapper>
        </div>
      </GlobalBg>
      {game.channel && gameData?.isStream ? (
        <IFrame>
          <iframe
            src={`https://player.twitch.tv/?channel=${game?.channel}&parent=${
              BASE_URL.split("/")[2].split(":")[0]
            }`}
            frameBorder="0"
            allowFullScreen={true}
            scrolling="no"
          ></iframe>
        </IFrame>
      ) : (
        <></>
      )}

      <GlobalWrapper>
        <BracketPage rounds={game?.rounds} title={game?.title} />
        {game.winners ? (
          <WhoWin>
            <h4>
              Победители турнира NIVEA MEN Ultra Skill Open
              <br />
              {game.title}
            </h4>
            <div className="col">
              {game.winners?.map((winner, idx) => (
                <div className="row">
                  <img src={winner.url} />
                  <div>
                    <h5>{winner.nick}</h5>
                    <p>{idx + 1} место</p>
                  </div>
                </div>
              ))}
            </div>
            {game.bounty ? (
              <>
                <h4>Принесли голову {game.nick}</h4>
                <div className="col">
                  {game.bounty?.map((winner, idx) => (
                    <div className="row">
                      <img src={winner.url} />
                      <div>
                        <h5>{winner.nick}</h5>
                        {winner.kills ? (
                          <p>{winner.kills + " " + killsCount(winner.kills)}</p>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </WhoWin>
        ) : (
          <></>
        )}
      </GlobalWrapper>
    </>
  ) : (
    <></>
  );
}

const HeaderPic = styled.div`
  min-height: 400px;
  background-size: cover;
  background-position: top;
  position: relative;
  &::after {
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: "";
  }
`;
const Switcher = styled.div`
  position: absolute;
  z-index: 1;
  bottom: 0;
  max-width: 1280px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;
const GameTitle = styled.div`
  background: ${(props) => (props.isFilled ? "#000" : "transparent")};
  box-shadow: ${(props) => (props.isFilled ? "0 0 35px #004CFF" : "none")};
  padding: 20px 32px;
  font-size: 48px;
  font-weight: 800;
  border-radius: 10px 10px 0 0;

  @media screen and (max-width: 650px) {
    font-size: 24px;
  }
`;
const InfoBlock = styled.div`
  margin: 86px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 650px) {
    flex-direction: column;
    margin: 86px 12px 0;
  }

  .left {
    min-width: 60%;
    @media screen and (max-width: 650px) {
      margin: 0 0 12px;
    }

    img.uso {
      height: 48px;
      margin: 0 0 12px;
      object-fit: contain;
      object-position: center;
      @media screen and (max-width: 650px) {
        width: 100%;
      }
    }
    img.sub {
      width: 90%;
      height: 36px;
      object-fit: contain;
      object-position: left;
      @media screen and (max-width: 650px) {
        width: 100%;
      }
    }

    .sets {
      display: block;
      margin: 24px 0 12px;
    }

    .dates {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        margin: 0 12px 0 0;
      }
    }
  }
`;
const GlobalWrapper = styled.div`
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  background-size: contain;
  background-position: top center;
  background-repeat: no-repeat;
`;
const GlobalBg = styled.div`
  background-image: url(/images/bggg.jpg);
  /* background: red; */
  background-position: top center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  /* padding-bottom: 167.2%; */
  position: relative;
`;
const TakePart = styled.div`
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  margin: 72px 0;

  @media screen and (max-width: 650px) {
    font-size: 20px;
    margin: 72px 12px;
  }
`;
const MoreInfo = styled.div`
  max-width: 100%;
  width: 100%;
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }

  .bhunt {
    min-width: 50%;
    position: absolute;
    height: 110%;
    right: calc((100% - 1280px) / 2);

    @media screen and (max-width: 650px) {
      width: 90%;
      margin: 0 auto;
    }
  }

  .prizz {
    text-align: right;
  }

  .place {
    flex-direction: row;
    display: flex;
    align-items: center;
    margin: 0 0 32px;

    img {
      width: 160px;
      margin: 0 70px 0 0;
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

  .prizfund {
    margin: 0 0 0 calc((100% - 1280px) / 2);
    min-width: 50%;
    @media screen and (max-width: 650px) {
      width: 90%;
      margin: 0 auto;
    }
  }
`;

const Participants = styled.div`
  margin: 70px 0 0;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 650px) {
    flex-direction: column;
    margin: 30% 12px 0;
  }
  .parts {
    min-width: 60%;
    @media screen and (max-width: 650px) {
      margin: -150px 0 0;
    }
  }
  .commrow {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 650px) {
      align-items: flex-start;
    }
  }
  .comment {
    display: flex;
    align-items: center;
    @media screen and (max-width: 650px) {
      align-items: flex-start;
      margin: 24px 0 0;
    }
    flex-direction: column;
    min-width: 40%;
  }

  h4 {
    font-weight: bold;
    font-size: 36px;
    margin: 0 0 32px;
  }
  .comman img {
    box-shadow: 0 0 30px #003cc8;
    border: 4px solid #fff;
  }
  .comman {
    margin: 0 32px !important;
  }
  .letter {
    /* background-color: #000f4b; */

    color: #fff;
    font-size: 20px;
    font-weight: 700;
    height: 90px;
    border-radius: 100%;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  }
  .man,
  .comman {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90px;
    /* float: left; */
    margin: 0 0 0 -40px;
    position: relative;

    &:nth-child(1) {
      margin: 0;
      z-index: 5;

      img {
        box-shadow: 0 0 30px #003cc8;
        border: 4px solid #fff;
      }
    }

    &:nth-child(2) {
      z-index: 4;
    }

    &:nth-child(3) {
      z-index: 3;
    }

    &:nth-child(4) {
      z-index: 2;
    }

    &:nth-child(5) {
      z-index: 1;
    }

    &:first-child {
      margin: 0;
    }

    img {
      width: 90px;
      height: 90px;
      border-radius: 100%;
      margin: 0 0 8px;
      object-fit: cover;
      object-position: center;
    }
    span {
      display: block;
      font-size: 24px;
    }
  }
  .people {
    display: flex;
    flex-direction: row;
    align-items: center;

    .more {
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      text-transform: uppercase;
      margin: 0 0 0 24px;
    }
  }
`;
const Cvals = styled.div`
  padding: 0 0 100px;

  @media screen and (max-width: 650px) {
    margin: 0 12px;
  }

  h4 {
    font-weight: bold;
    font-size: 36px;
    margin: 48px 0 16px;
  }

  .row {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;

    @media screen and (max-width: 650px) {
      flex-wrap: wrap;
    }
  }
`;
const Cval = styled.div`
  background: #003cc8;
  border-radius: 5px;
  padding: 12px 36px;
  margin: 6px 45px 6px 0;
  white-space: nowrap;

  @media screen and (max-width: 650px) {
    margin: 4px;
    padding: 6px 18px;
    font-size: 0.85em;
  }
`;
const IFrame = styled.div`
  width: 100%;
  min-height: 700px;

  iframe {
    width: 100%;
    min-height: 100vh;
  }
`;

const WatchOnTwitch = styled.div`
  margin: 0 0 64px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #a970ff;
  padding: 22px 32px;
  border-radius: 10px;

  @media screen and (max-width: 650px) {
    margin: 0 12px 64px;
  }

  svg {
    width: 36px;
    height: 36px;
    margin: 0 16px 0 0;
  }
  span {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    @media screen and (max-width: 650px) {
      font-size: 14px;
    }
  }
`;

const ManLetter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90px;
  /* float: left; */
  margin: 0 0 0 -40px;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  height: 90px;
  border-radius: 100%;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);

  &:nth-child(1) {
    margin: 0;
    z-index: 5;

    img {
      box-shadow: 0 0 30px #003cc8;
      border: 4px solid #fff;
    }
  }

  &:nth-child(2) {
    z-index: 4;
  }

  &:nth-child(3) {
    z-index: 3;
  }

  &:nth-child(4) {
    z-index: 2;
  }

  &:nth-child(5) {
    z-index: 1;
  }

  &:first-child {
    margin: 0;
  }

  img {
    width: 90px;
    height: 90px;
    border-radius: 100%;
    margin: 0 0 8px;
    object-fit: cover;
    object-position: center;
  }
  span {
    display: block;
    font-size: 24px;
  }
`;

const WhoWin = styled.div`
  padding: 0 10% 64px;
  text-align: center;

  h4 {
    font-weight: bold;
    font-size: 36px;
    margin: 48px 0 16px;
    text-transform: uppercase;
  }

  .col {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    @media screen and (max-width: 640px) {
      flex-direction: column;
    }

    .row {
      margin: 24px auto 0;
      width: 33.33%;
      display: flex;
      flex-direction: column;
      align-self: center;
      align-items: center;

      h5 {
        font-size: 32px;
      }

      p {
        background: linear-gradient(
          180deg,
          #014782 0%,
          #00a9ff 61.46%,
          #014782 100%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: 16px;
      }

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        object-position: center;
        border-radius: 100%;
        margin-bottom: 12px;
      }
    }
  }
`;
