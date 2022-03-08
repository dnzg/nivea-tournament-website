const PROD_URL = "";
const NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = NODE_ENV !== "production";
// export const IS_DEV = false;
export const FUNCTIONS_URL = IS_DEV ? "" : "";
export const DB_URL = IS_DEV ? "" : "";
export const BASE_URL = IS_DEV ? "http://localhost:3000" : PROD_URL;
export const DISCORD_API_URL =
  "https://discord.com/api/oauth2/authorize?client_id=" +
  CLIENT_ID +
  "&redirect_uri=" +
  BASE_URL +
  "/api/discord&response_type=code&scope=email%20identify";
export const STEAM_API_URL = BASE_URL + "/api/steam?type=auth&uid=";
export const BNET_API_URL = BASE_URL + "/api/bnet?type=auth";

export const BNET_SECRET = ""; // BATTLE.NET SECRET
export const BNET_ID = ""; // BATTLE.NET ID
export const CLIENT_SECRET = ""; // DISCORD CLIENT SECRET
export const CLIENT_ID = ""; // DISCORD CLIENT ID
export const STEAM_KEY = ""; // STEAM CLIENT KEY
export const firebaseConfig = {};

export const gamesData = {
  warzone: {
    bg: "wz",
    title: "Call of Duty: Warzone Pacific",
    fulltitle: "Call of Duty: Warzone",
    sets: "каждый сам за себя, сквады по 4 игрока, дуо",
    dates:
      "Регистрация на турнир: 29.11.2021 - 18.12.2021<br/>Игровые дни: 16.12.2021 - 24.12.2021",
    text: " Участвуй в турнире на карте Pacific, борись за призовые места<br/>и веди охоту на Recrent, чтобы разделить награду за его голову!",
    prizfund: "250 000 ₽",
    places: ["120 000 ₽", "80 000 ₽", "50 000 ₽"],
    bhunt: "100 000 ₽",
    name: "Дмитрий Осинцев<br/>«Recrent»",
    description:
      "Один из лучших игроков мира в Call of Duty: Warzone Pacific. В его активе 4 победы на турнирах Twitch Rivals и золото BoomTV Champions Challenge",
    nick: "Recrent",
    comment: [{ name: "AiMLUL", photo: "aimul.jpg" }],
    openc: [
      1639612800000, 1639699200000, 1639785600000, 1639872000000, 1639958400000,
    ],
    closec: [1640098800000, 1640181600000],
    finalc: [1640271600000, 1640358000000],
    streamc: [1640098800000, 1640181600000, 1640271600000, 1640358000000],
    channel: "niveamenultraskill",
    winners: [
      {
        nick: "GoldBoy",
        url: "https://cdn.discordapp.com/avatars/278515900045590540/bd8fd94c8b56f520c908c99610227302.png?size=128",
      },
      {
        nick: "teemey",
        url: "https://cdn.discordapp.com/avatars/712337756118057121/3e0f92869a93d3cca7f345571120368e.png?size=128",
      },
      {
        nick: "Preepwalker",
        url: "https://cdn.discordapp.com/avatars/131091620643864576/83b9571ea75002874f57ad76a0473fe5.webp?size=240",
      },
    ],
    bounty: [
      {
        kills: 1,
        nick: "Godex",
        url: "https://cdn.discordapp.com/avatars/265262148731666432/1d4f690e051b4cd96aa9ca6507453e84.webp?size=240",
      },
      {
        kills: 1,
        nick: "GREG",
        url: "https://cdn.discordapp.com/avatars/536027959748722699/f51bc68dc629b92c2a620227efbdcb5e.png?size=128",
      },
      {
        kills: 1,
        nick: "Preepwalker",
        url: "https://cdn.discordapp.com/avatars/131091620643864576/83b9571ea75002874f57ad76a0473fe5.webp?size=240",
      },
      {
        kills: 3,
        nick: "teemey",
        url: "https://cdn.discordapp.com/avatars/712337756118057121/3e0f92869a93d3cca7f345571120368e.png?size=128",
      },
      {
        kills: 1,
        nick: "DrSpongeus",
        url: "https://cdn.discordapp.com/avatars/252167869108977666/8f5c8d16942d18ff0fa8c09e7d715862.png?size=128",
      },
      {
        kills: 1,
        nick: "1FaithOG",
        url: "https://cdn.discordapp.com/avatars/260761663865618433/1cc007ec5b89137b5881723adfa0dcae.webp?size=240",
      },
      {
        kills: 4,
        nick: "stedzera",
        url: "https://cdn.discordapp.com/avatars/341600994783920129/78ce76b610a2937f280c52b15d1d7f50.webp?size=240",
      },
      {
        kills: 1,
        nick: "jailtheba1t",
        url: "https://cdn.discordapp.com/avatars/128075221503705088/56455b4e67c5c47cd21b001acd881e76.png?size=128",
      },
      {
        kills: 2,
        nick: "MentalAffection",
        url: "https://cdn.discordapp.com/avatars/264049019037286400/f032c9f11f05997413e254f52c1dac4e.png?size=128",
      },
      {
        kills: 1,
        nick: "MEMPERATOR",
        url: "https://cdn.discordapp.com/avatars/388099008201228289/1022c76739abac5e157c773261098991.png?size=128",
      },
      {
        kills: 1,
        nick: "Egorka",
        url: "https://cdn.discordapp.com/avatars/451762903058743306/79e1bd0fd1bf59fb5f47fd38f06524e4.webp?size=240",
      },
      {
        kills: 1,
        nick: "Yuraah",
        url: "https://cdn.discordapp.com/avatars/265143426696216577/10b85c0d64c6116b18eab55e72559871.webp?size=240",
      },
      {
        kills: 1,
        nick: "Maxibon_TTV",
        url: "https://cdn.discordapp.com/avatars/741314402069905419/bdefc50b38e7e2882a6881ce091c756b.png?size=128",
      },
    ],
  },
  dota2: {
    bg: "d2",
    title: "Dota 2",
    fulltitle: "Dota 2",
    sets: "каждый сам за себя",
    dates:
      "Регистрация на турнир: 29.11.2021 - 15.12.2021, 17:00<br/>Игровые дни: 14.12.2021 - 19.12.2021",
    text: "Участвуй в турнире, борись за призовые места и охоться на NS,<br/>чтобы разделить награду за его голову!",
    prizfund: "250 000 ₽",
    places: ["120 000 ₽", "80 000 ₽", "50 000 ₽"],
    bhunt: "75 000 ₽",
    name: "Ярослав Кузнецов<br/>«NS»",
    description:
      "Бывший про-игрок Dota 2, один из опытнейших саппортов мира. Десятикратный чемпион турниров ASUS Open, четырёхкратный чемпион турнира MYM Prime Defending, серебряный призёр ESWC 2010.",
    nick: "NS",
    comment: [{ name: "GodHunt", photo: "GodHunt.jpg" }],
    openc: [1639440000000, 1639526400000],
    closec: [1639652400000, 1639738800000],
    finalc: [1639825200000, 1639911600000],
    streamc: [1639652400000, 1639738800000, 1639825200000, 1639911600000],
    channel: "GodHunt",
    winners: [
      {
        nick: "UN54FE",
        url: "https://cdn.discordapp.com/avatars/189032159812648961/c73caec53296218c373b4ab1bd69d5d8.png?size=128",
      },
      {
        nick: "SAPOZNIK",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/97/97dd2fbc70ac533d66d1e78581cffb8e8f835f89_full.jpg",
      },
      {
        nick: "NEFERPITYU",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/a1/a1dc4952e6653fb75be649f818bf94257c4e6c16_full.jpg",
      },
    ],
    bounty: [
      {
        nick: "DIMPLE",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ce/ce882217cd2649cd24422cf92337b4158a856d2e_full.jpg",
      },
    ],
    rounds: [
      {
        seeds: [
          {
            teams: [
              { name: "UN54FE", score: 2 },
              { name: "REMYXE", score: 0 },
            ],
          },
          {
            teams: [
              { name: "POP2006", score: 0 },
              { name: "NEFERPITYU", score: 2 },
            ],
          },
          {
            teams: [
              { name: "TYSHAWH", score: 0 },
              { name: "SAPOZNIK", score: 2 },
            ],
          },
          {
            teams: [
              { name: "CORALINE", score: 2 },
              { name: "UFLLY", score: 0 },
            ],
          },
          {
            teams: [
              { name: "REMYXE", score: 0 },
              { name: "POP2006", score: 2 },
            ],
          },
          {
            teams: [
              { name: "TYSHAWH", score: 0 },
              { name: "UFLLY", score: 2 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              { name: "UN54FE", score: 2 },
              { name: "NEFERPITYU", score: 0 },
            ],
          },
          {
            teams: [
              { name: "SAPOZNIK", score: 2 },
              { name: "CORALINE", score: 0 },
            ],
          },
          {
            teams: [
              { name: "CORALINE", score: 0 },
              { name: "POP2006", score: 2 },
            ],
          },
          {
            teams: [
              { name: "NEFERPITYU", score: 2 },
              { name: "UFLLY", score: 0 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              { name: "POP2006", score: 0 },
              { name: "NEFERPITYU", score: 2 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              { name: "UN54FE", score: 0 },
              { name: "SAPOZNIK", score: 2 },
            ],
          },
          {
            teams: [
              { name: "UN54FE", score: 2 },
              { name: "NEFERPITYU", score: 1 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              { name: "SAPOZNIK", score: 1 },
              { name: "UN54FE", score: 2 },
            ],
          },
        ],
      },
    ],
  },
  csgo: {
    bg: "cs",
    title: "CS:GO",
    fulltitle: "Counter-Strike: Global Offensive",
    sets: "каждый сам за себя",
    dates:
      "Регистрация на турнир: 29.11.2021 - 15.12.2021, 17:00<br/>Игровые дни: 14.12.2021 - 20.12.2021",
    text: "Участвуй в турнире на картах Aim Map, Aim Redline, Aim Faceit<br/>NoAwp, Aim Map Usp s, борись за призовые места и охоться<br/>на Fander, чтобы разделить награду за его голову!",
    prizfund: "250 000 ₽",
    places: ["120 000 ₽", "80 000 ₽", "50 000 ₽"],
    bhunt: "75 000 ₽",
    name: "ИЛЬЯ БАГРЕЕВ<br/>«FANDER»",
    description:
      "Профессиональный киберспортсмен в CS:GO, состоял в командах WINside, PRO100, NALANE, Cerberus.",
    nick: "Fander",
    comment: [
      { name: "Paradeevich", photo: "parad.jpg" },
      { name: "Gromjkeee", photo: "grom.jpg" },
    ],
    openc: [1639440000000, 1639526400000],
    closec: [1639666800000, 1639753200000, 1639839600000],
    finalc: [1639926000000, 1640012400000],
    streamc: [
      1639666800000, 1639753200000, 1639839600000, 1639926000000, 1640012400000,
    ],
    channel: "fandercs",
    bounty: [
      {
        nick: "ANIMEPACAN",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5c/5ceb82797708c7968e9537b439512d6f41239db9_full.jpg",
      },
      {
        nick: "PROPLEH",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/17/17efa05427a015f67a1ae822d8ded880ae3321a8_full.jpg",
      },
    ],
    winners: [
      {
        nick: "ANIMEPACAN",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5c/5ceb82797708c7968e9537b439512d6f41239db9_full.jpg",
      },
      {
        nick: "PROPLEH",
        url: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/17/17efa05427a015f67a1ae822d8ded880ae3321a8_full.jpg",
      },
      {
        nick: "FANDER",
        url: "https://niveamenultraskill.ru/images/hero/fander.png",
      },
    ],
    rounds: [
      {
        seeds: [
          {
            teams: [
              { name: "A1EXXS", score: 1 },
              { name: "MALOY24", score: 2 },
            ],
          },
          {
            teams: [
              { name: "FANDER", score: 2 },
              { name: "POLBANDANA", score: 0 },
            ],
          },
          {
            teams: [
              { name: "RANB0W", score: 0 },
              { name: "QW1N_K", score: 2 },
            ],
          },
          {
            teams: [
              { name: "PROPLEH", score: 0 },
              { name: "ANIMEPACAN-", score: 2 },
            ],
          },
          {
            teams: [
              { name: "A1EXXS", score: 1 },
              { name: "POLBANDANA", score: 2 },
            ],
          },
          {
            teams: [
              { name: "RANB0W", score: 1 },
              { name: "PROPLEH", score: 2 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              {
                name: "MALOY24",
                score: 1,
              },
              { name: "FANDER", score: 2 },
            ],
          },
          {
            teams: [
              {
                name: "QW1N_K",
                score: 0,
              },
              { name: "ANIMEPACAN-", score: 2 },
            ],
          },
          {
            teams: [
              {
                name: "QW1N_K",
                score: 0,
              },
              { name: "POLBANDANA", score: 2 },
            ],
          },
          {
            teams: [
              {
                name: "MALOY24",
                score: 0,
              },
              { name: "PROPLEH", score: 2 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              {
                name: "POLBANDANA",
                score: 0,
              },
              { name: "PROPLEH", score: 2 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              {
                name: "FANDER",
                score: 0,
              },
              { name: "ANIMEPACAN-", score: 2 },
            ],
          },
          {
            teams: [
              {
                name: "FANDER",
                score: 1,
              },
              { name: "PROPLEH", score: 2 },
            ],
          },
        ],
      },
      {
        seeds: [
          {
            teams: [
              {
                name: "ANIMEPACAN-",
                score: 2,
              },
              { name: "PROPLEH", score: 0 },
            ],
          },
        ],
      },
    ],
  },
};
