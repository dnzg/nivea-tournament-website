import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import UserContext from "./UserContext";
import Header from "components/Header";
import Footer from "./Footer";
import ToTop from "./ToTop";
import Post from "pages/tournaments/[id]";
import { getData } from "utils/firebase";

export default function AppContainer({ children }) {
  const { user } = useContext(UserContext);
  const Router = useRouter();
  const dir = Router.pathname.split("/")[1];
  const { id } = Router.query;
  const games = ["warzone", "dota2", "csgo"];

  const [isOpenReg, setOpenReg] = useState(false);
  const [isOpenAuth, setOpenAuth] = useState(false);
  const [userData, setUserData] = useState();
  const [areThereNotifies, setNotifies] = useState(false);

  useEffect(() => {
    if (user) {
      async function setData() {
        const ud = await getData("users", user?.uid);
        setUserData(ud);

        const thereNotifies =
          user.emailVerified && ud?.discord && ud?.games
            ? ud.steam || (ud.bnet && ud.aid)
              ? true
              : false
            : false;

        setNotifies(thereNotifies);
      }
      setData();
    }
  }, [user]);

  return (
    <>
      <Head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7HC2VJ');`,
          }}
        ></script>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-11KEBCCN16`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-11KEBCCN16', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <meta httpEquiv="Cache-Control" content="no-cache" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/images/fav.png" type="image/png" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        /> */}
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5352ed"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#5352ed" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" /> */}

        <title>Ultra Skill Open</title>
        <meta name="title" content="Ultra Skill Open" />
        <meta
          name="description"
          content="Час настал! Докажи, что ты лучший. Участвуй в онлайн-турнирах Ultra Skill Open по Call of Duty: Warzone Pacific, Dota 2 и CS:GO. Охоться на стримеров за дополнительные призовые в формате Bounty Hunt."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://niveamenultraskill.ru/" />
        <meta property="og:title" content="Ultra Skill Open" />
        <meta
          property="og:description"
          content="Час настал! Докажи, что ты лучший. Участвуй в онлайн-турнирах Ultra Skill Open по Call of Duty: Warzone Pacific, Dota 2 и CS:GO. Охоться на стримеров за дополнительные призовые в формате Bounty Hunt."
        />
        <meta
          property="og:image"
          content="https://niveamenultraskill.ru/images/meta4.jpg"
        />
        <meta property="og:updated_time" content="1639388535" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://niveamenultraskill.ru/" />
        <meta property="twitter:title" content="Ultra Skill Open" />
        <meta
          property="twitter:description"
          content="Час настал! Докажи, что ты лучший. Участвуй в онлайн-турнирах Ultra Skill Open по Call of Duty: Warzone Pacific, Dota 2 и CS:GO. Охоться на стримеров за дополнительные призовые в формате Bounty Hunt."
        />
        <meta
          property="twitter:image"
          content="https://niveamenultraskill.ru/images/meta4.jpg"
        />
      </Head>
      <noscript
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W7HC2VJ"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        }}
      ></noscript>
      <Header
        user={user}
        isOpenReg={isOpenReg}
        setOpenReg={setOpenReg}
        isOpenAuth={isOpenAuth}
        setOpenAuth={setOpenAuth}
        areThereNotifies={areThereNotifies}
      />
      {games.includes(id) ? (
        <Post
          isOpenReg={isOpenReg}
          setOpenReg={setOpenReg}
          isOpenAuth={isOpenAuth}
          setOpenAuth={setOpenAuth}
        />
      ) : (
        children
      )}
      <ToTop />
      <Footer />
    </>
  );
}
