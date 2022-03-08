import { signInWithCustomToken, updateProfile } from "@firebase/auth";
import { FUNCTIONS_URL } from "config";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { writeData, auth, getData, updateData } from "utils/firebase";
import * as ga from "utils/ga";
import qs from "querystring";
import axios from "axios";

const UserContext = React.createContext({
  user: undefined,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const asPath = Object.entries(router.query);

  const customToken = async (uid, name, provider, providerData) => {
    const dataAuth = qs.stringify({
      uid,
      provider,
    });
    const token = (await axios.post(`${FUNCTIONS_URL}/authCustom`, dataAuth))
      .data;
    if (!token) throw new Error("Failed to fetch auth token");
    await signInWithCustomToken(auth, token).then(async (userCredential) => {
      ga.event({
        action: "custom-reg",
        params: {
          provider,
        },
      });
      const user = userCredential.user;
      if (!(await getData("users", user.uid))) {
        const dataDb = {
          name: name,
          provider,
          created: parseInt(user.metadata.createdAt),
          updated: parseInt(user.metadata.createdAt),
        };
        dataDb[provider] = providerData;
        await writeData("users", user.uid, dataDb);
        if (provider === "discord") {
          if (!user.photoURL && providerData.avatar) {
            updateProfile(auth.currentUser, {
              photoURL: `https://cdn.discordapp.com/avatars/${providerData.id}/${providerData.avatar}.png?size=128`,
            }).then(() => {
              router.push("/profile");
            });
          }
        } else if (provider === "steam") {
          if (!user.photoURL && providerData.avatar) {
            updateProfile(auth.currentUser, {
              photoURL: providerData.avatar,
            }).then(() => {
              router.push("/profile");
            });
          }
        }
      } else {
        router.push("/profile");
      }
    });
  };

  auth.onAuthStateChanged(async (user) => {
    if (!user || user === null) {
      if (router.pathname === "/profile" || router.pathname === "/support") {
        router.push("/");
      }
      if (asPath[0] && asPath[0].length === 2) {
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
        } else if (asPath[0][0] === "steam") {
          const steamUser = JSON.parse(
            Buffer.from(asPath[0][1], "base64").toString("utf-8")
          );
          await customToken(
            steamUser.id,
            steamUser.nickname,
            asPath[0][0],
            steamUser
          );
        }
      }
      return false;
    }
    setUser(user);
  });

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserContext;
export { UserProvider };
