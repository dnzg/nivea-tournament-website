import { BASE_URL, STEAM_KEY } from "config";
const SteamAuth = require("node-steam-openid");

export default async function steamApi(req, res) {
  const uid = req.query.uid;
  const steam = new SteamAuth({
    realm: BASE_URL, // Site name displayed to users on logon
    returnUrl: BASE_URL + "/api/steam?type=return&uid=" + uid, // Your return route
    apiKey: STEAM_KEY,
  });

  if (req.query.type === "auth") {
    const redirectUrl = await steam.getRedirectUrl();
    return res.redirect(redirectUrl);
  } else if (req.query.type === "return") {
    try {
      const steamUser = (await steam.authenticate(req))["_json"];
      const STEAM_HASH = Buffer.from(
        JSON.stringify({
          _raw: steamUser,
          id: steamUser.steamid,
          nickname: steamUser.personaname,
          name: steamUser.realname,
          avatar: steamUser.avatarfull,
        }),
        "utf-8"
      ).toString("base64");
      // console.log(STEAM_HASH);
      res.redirect(BASE_URL + "/?steam=" + STEAM_HASH);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.status(400).json({ err: "ERROR" });
  }
}
