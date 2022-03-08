import styled from "styled-components";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import RegWindow from "components/RegWindow";
import AuthWindow from "./AuthWindow";
import MiniProfile from "./MiniProfile";
import Router from "next/router";
import { ButtonWhite } from "./Button";
import { signOutLink } from "utils/firebase";

export default function Header({
  user,
  isOpenReg,
  setOpenReg,
  isOpenAuth,
  setOpenAuth,
  areThereNotifies,
}) {
  const [asPath, setAsPath] = useState();
  const [mobileMenu, setMobileMenu] = useState(false);

  const asp = Router?.router?.asPath;

  useEffect(() => {
    setAsPath(Router?.router?.asPath);
  }, [asp]);

  const links = [
    { href: "/", text: "Главная" },
    { href: "/tournaments", text: "Турниры" },
  ];

  let title = undefined;

  links.map((link) => {
    if (link.href === asPath) {
      title = link.text;
    }
  });

  return (
    <Row>
      <Head>
        <title>Ultra Skill Open{title ? " / " + title : ""}</title>
      </Head>
      <div className="menu">
        <ButtonMenu
          onClick={() => {
            setMobileMenu(true);
          }}
        >
          <svg width="17" height="13" viewBox="0 0 17 13">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.0625 1.38549C0.0625 0.838181 0.4675 0.3945 0.967094 0.3945H15.1579C15.6575 0.3945 16.0625 0.838181 16.0625 1.38549C16.0625 1.9328 15.6575 2.37648 15.1579 2.37648H0.967094C0.4675 2.37648 0.0625 1.9328 0.0625 1.38549ZM0.0625 6.39452C0.0625 5.84721 0.4675 5.40353 0.967094 5.40353H15.1579C15.6575 5.40353 16.0625 5.84721 16.0625 6.39452C16.0625 6.94183 15.6575 7.38551 15.1579 7.38551H0.967094C0.4675 7.38551 0.0625 6.94183 0.0625 6.39452ZM0.0625 11.4035C0.0625 10.8562 0.4675 10.4125 0.967094 10.4125H15.1579C15.6575 10.4125 16.0625 10.8562 16.0625 11.4035C16.0625 11.9508 15.6575 12.3945 15.1579 12.3945H0.967094C0.4675 12.3945 0.0625 11.9508 0.0625 11.4035Z"
              fill="white"
            />
          </svg>
        </ButtonMenu>
        {mobileMenu ? (
          <MenuMobile>
            <div
              className="tapClose"
              onClick={() => {
                setMobileMenu(false);
              }}
            />
            <div className="insideMenu">
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                className="closeMenu"
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.98669 0.66309C2.41865 0.0950523 1.49768 0.0950504 0.929646 0.663086C0.361608 1.23112 0.361606 2.15209 0.929642 2.72013L14.4466 16.2371L0.929762 29.754C0.361727 30.322 0.361731 31.243 0.92977 31.811C1.49781 32.3791 2.41878 32.3791 2.98681 31.811L16.5036 18.2941L30.0203 31.8109C30.5884 32.379 31.5093 32.379 32.0774 31.8109C32.6454 31.2429 32.6454 30.3219 32.0774 29.7539L18.5606 16.2371L32.0775 2.72013C32.6455 2.15209 32.6455 1.23112 32.0775 0.663084C31.5094 0.0950494 30.5885 0.0950533 30.0204 0.663092L16.5036 14.18L2.98669 0.66309Z"
                  fill="#003CC8"
                />
              </svg>

              <div className="logoMobile" />
              <div className="menuList">
                <Link href="/">
                  <a className="menulistA" onClick={() => setMobileMenu(false)}>
                    Главная
                  </a>
                </Link>
                <Link href="/tournaments">
                  <a className="menulistA" onClick={() => setMobileMenu(false)}>
                    Турниры
                  </a>
                </Link>
                {user ? (
                  <>
                    <Link href="/support">
                      <a
                        className="menulistA"
                        onClick={() => setMobileMenu(false)}
                      >
                        Поддержка
                      </a>
                    </Link>
                    <Link href="/profile">
                      <a
                        className="menulistA"
                        onClick={() => setMobileMenu(false)}
                      >
                        Личный кабинет
                      </a>
                    </Link>
                    <div className="authregblock">
                      <ButtonWhite
                        view="ui"
                        fontSize="inherit"
                        style={{ margin: "12px 0" }}
                        onClick={() => signOutLink()}
                      >
                        Выйти из аккаунта
                      </ButtonWhite>
                    </div>
                  </>
                ) : (
                  <div className="authregblock">
                    <RegWindow
                      setOpenReg={setOpenReg}
                      setOpenAuth={setOpenAuth}
                      isOpenReg={isOpenReg}
                      styleButton={{ width: "100%" }}
                      setMobileMenu={setMobileMenu}
                    />
                    <AuthWindow
                      setOpenReg={setOpenReg}
                      setOpenAuth={setOpenAuth}
                      isOpenAuth={isOpenAuth}
                      isMobile={true}
                      setMobileMenu={setMobileMenu}
                    />
                  </div>
                )}
              </div>
            </div>
          </MenuMobile>
        ) : (
          <></>
        )}

        {links.map((link, idx) => (
          <LinkMenu
            style={{
              fontWeight: asPath === link?.href ? "bold" : "normal",
            }}
            key={"a" + idx}
          >
            <Link key={idx} href={link?.href}>
              <a>{link.text}</a>
            </Link>
          </LinkMenu>
        ))}

        {user ? (
          <LinkMenu
            style={{
              fontWeight: asPath === "/support" ? "bold" : "normal",
            }}
          >
            <Link href="/support">
              <a>Поддержка</a>
            </Link>
          </LinkMenu>
        ) : (
          <></>
        )}
      </div>
      <div className="authreg">
        {user ? (
          <>
            <MiniProfile user={user} areThereNotifies={areThereNotifies} />
          </>
        ) : (
          <>
            <AuthWindow
              setOpenReg={setOpenReg}
              setOpenAuth={setOpenAuth}
              isOpenAuth={isOpenAuth}
            />
            <RegWindow
              setOpenReg={setOpenReg}
              setOpenAuth={setOpenAuth}
              isOpenReg={isOpenReg}
            />
          </>
        )}
      </div>
    </Row>
  );
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 64px;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  /* position: relative;
  z-index: 9999; */

  @media screen and (max-width: 650px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 18px 12px;
    /* display: none; */
    .authreg {
      /* display: none; */
    }
    .authregblock {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 32px auto 0;
    }
  }

  .authreg {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .menu {
    display: flex;
    flex-direction: row;
  }
`;

const LinkMenu = styled.div`
  cursor: pointer;
  margin: 0 56px 0 0;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const ButtonMenu = styled.div`
  background: #000f4b;
  border-radius: 100%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (min-width: 650px) {
    display: none;
  }
`;

const MenuMobile = styled.div`
  position: fixed;
  z-index: 10010;
  width: 100%;
  display: inline-block;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-in-out;

  @media screen and (min-width: 650px) {
    display: none;
  }

  .tapClose {
    width: 100%;
    height: 80%;
    bottom: 0;
    z-index: 10009;
    position: fixed;
    cursor: pointer;
  }

  .insideMenu {
    position: fixed;
    z-index: 10010;
    background-color: #000f4b;
    width: 100%;
    padding-bottom: 64px;
    border-radius: 0 0 20px 20px;

    .closeMenu {
      width: 24px;
      height: 24px;
      position: absolute;
      z-index: 10010;
      right: 24px;
      top: 24px;
      cursor: pointer;
    }
  }

  .logoMobile {
    background-image: url(/images/logoMobile.svg);
    width: 95%;
    padding-bottom: 25.8%;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto;
  }
  .menuList {
    width: 100%;
    display: flex;
    flex-direction: column;

    .menulistA {
      border-bottom: 1px solid #003cc8;
      margin: 0 12px;
      padding: 28px 0;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
    }
  }
`;
