import { useEffect, useContext } from "react";
import UserContext from "components/UserContext";
import { updateData, auth, writeData, getData } from "utils/firebase";
import Router, { useRouter } from "next/router";
import { updateProfile } from "@firebase/auth";
import * as ga from "utils/ga";

export default function Attach() {
  const router = useRouter();
  const asPath = Object.entries(router.query);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function check() {
      // console.log(asPath);
      if (user && asPath[0] && asPath[0].length === 2) {
        if (asPath[0][0] === "discord") {
          const discordUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          if (user && user.uid && (await getData("users", user.uid)))
            await updateData("users", user.uid, { discord: discordUser });
          if (!user.photoURL && discordUser.avatar) {
            updateProfile(auth.currentUser, {
              photoURL: `https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`,
            }).then(() => {
              Router.push("/profile");
            });
          }
          ga.event({
            action: "discord-added",
          });
          Router.push("/profile");
        } else if (asPath[0][0] === "bnet") {
          const bnetUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          if (user && user.uid && (await getData("users", user.uid)))
            await updateData("users", user?.uid, { bnet: bnetUser });
          ga.event({
            action: "bnet-added",
          });
          Router.push("/profile");
        } else if (asPath[0][0] === "steam") {
          const steamUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          if (user && user.uid && (await getData("users", user.uid)))
            await updateData("users", user?.uid, { steam: steamUser });
          if (!user.photoURL && steamUser.avatar) {
            updateProfile(auth.currentUser, {
              photoURL: steamUser.avatar,
            }).then(() => {
              Router.push("/profile");
            });
          }
          ga.event({
            action: "steam-added",
          });
          Router.push("/profile");
        }
      } else if (asPath[0] && asPath[0].length === 2) {
        if (asPath[0][0] === "discord") {
          const discordUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          await customToken(
            discordUser.id,
            discordUser.username,
            asPath[0][0],
            discordUser
          );
        } else if (asPath[0][0] === "bnet") {
          const bnetUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          await customToken(
            bnetUser.id,
            bnetUser.battletag,
            asPath[0][0],
            bnetUser
          );
        }
      }
    }
    check();
  }, [asPath]);

  return "Loading...";
}
