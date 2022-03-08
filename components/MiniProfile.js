import styled from "styled-components";
import Link from "next/link";
import { useCycle } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth, signOutLink } from "utils/firebase";
import Router, { useRouter } from "next/router";

export default function MiniProfile({ user, areThereNotifies }) {
  const [popup, setPopup] = useCycle(false, true);
  const [notif, setNotif] = useCycle(false, true);

  return (
    <Container>
      <svg
        width="18"
        height="21"
        viewBox="0 0 18 21"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setNotif();
          if (popup) setPopup(false);
        }}
      >
        <path
          d="M16.8999 14.6075C16.167 13.8199 14.7955 12.6351 14.7955 8.75407C14.7955 5.80632 12.7287 3.44659 9.94178 2.86766V2.07704C9.94178 1.40668 9.39851 0.863037 8.72853 0.863037C8.05855 0.863037 7.51529 1.40668 7.51529 2.07704V2.86766C4.72839 3.44659 2.66154 5.80632 2.66154 8.75407C2.66154 12.6351 1.29009 13.8199 0.557138 14.6075C0.329512 14.8522 0.228598 15.1447 0.230495 15.4311C0.234668 16.0533 0.722926 16.6451 1.44829 16.6451H16.0088C16.7341 16.6451 17.2228 16.0533 17.2266 15.4311C17.2285 15.1447 17.1276 14.8518 16.8999 14.6075ZM2.79243 14.8241C3.59746 13.763 4.47762 12.0042 4.48179 8.77608C4.48179 8.76849 4.47951 8.76166 4.47951 8.75407C4.47951 6.40725 6.38171 4.50505 8.72853 4.50505C11.0754 4.50505 12.9776 6.40725 12.9776 8.75407C12.9776 8.76166 12.9753 8.76849 12.9753 8.77608C12.9795 12.0046 13.8596 13.7634 14.6646 14.8241H2.79243ZM8.72853 20.2871C10.0685 20.2871 11.1554 19.2002 11.1554 17.8591H6.30166C6.30166 19.2002 7.38858 20.2871 8.72853 20.2871Z"
          fill="white"
        />
        {areThereNotifies ? (
          <circle
            cx="13.0612"
            cy="8.57515"
            r="3.6667"
            fill="#003CC8"
            stroke="black"
          />
        ) : (
          <></>
        )}
      </svg>

      {notif ? (
        <NotificationBlock>
          <NotifLine>
            {areThereNotifies ? (
              <Link href="https://discord.gg/fVTVV2g8SB">
                <a target="_blank">
                  Чтобы принять участие в турнире, тебе нужно вступить в наш
                  Discord: <b>discord.gg/fVTVV2g8SB</b>
                </a>
              </Link>
            ) : (
              <>Новых уведомлений нет</>
            )}
          </NotifLine>
        </NotificationBlock>
      ) : (
        <></>
      )}

      <div
        style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
        onClick={() => {
          setPopup();
          if (notif) setNotif(false);
        }}
      >
        <Userpic src={user.photoURL ? user.photoURL : "/images/user.png"} />
      </div>

      {popup ? (
        <Popup>
          <PopupLine href="/profile">Ваш профиль</PopupLine>
          <PopupLine onClick={() => signOutLink()}>Выйти</PopupLine>
        </Popup>
      ) : (
        <></>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Userpic = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  object-position: center;
  border-radius: 48px;
  margin: 0 12px 0 24px;
  border: 3px solid rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;

  &:hover {
    border: 3px solid #fff;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 0 32px ${(props) => props.theme.bg.secondary};
  }
`;

const Popup = styled.div`
  position: absolute;
  z-index: 1;
  background: #002c93;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  right: 0;
  top: 54px;
  width: 200%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PopupLine = styled.a`
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: 0px solid #fff;
  }
`;
const NotificationBlock = styled.div`
  position: absolute;
  z-index: 1;
  background: #002c93;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  right: 80px;
  top: 42px;
  width: 250%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const NotifLine = styled.div`
  /* cursor: pointer; */
  padding: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  /* font-weight: 700; */

  &:last-child {
    border-bottom: 0px solid #fff;
  }
`;
