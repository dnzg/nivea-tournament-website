import axios from "axios";
import { BASE_URL, BNET_ID, BNET_SECRET } from "config";
const queryString = require("query-string");
const OAUTH_SCOPES = "openid";
const redirect_uri = BASE_URL + "/api/bnet";
const BATTLE_URL = "https://us.battle.net/oauth";

export default function bnet(req, res) {
  if (req.query.type === "auth") {
    const url = `${BATTLE_URL}/authorize?response_type=code&client_id=${BNET_ID}&redirect_uri=${redirect_uri}`;
    res.redirect(url);
  } else if (req.query.code) {
    const url = `${BATTLE_URL}/token`;
    const basicAuth =
      "Basic " + Buffer.from(BNET_ID + ":" + BNET_SECRET).toString("base64");

    try {
      axios
        .post(
          url,
          queryString.stringify({
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: redirect_uri,
            scope: OAUTH_SCOPES,
          }),
          { headers: { Authorization: basicAuth } }
        )
        .then((result) => {
          try {
            axios
              .get(`${BATTLE_URL}/userinfo`, {
                headers: {
                  Authorization: `Bearer ${result.data.access_token}`,
                },
              })
              .then((res1) => {
                const data = res1.data;
                const BNET_HASH = Buffer.from(
                  JSON.stringify(data),
                  "utf-8"
                ).toString("base64");
                res.redirect(BASE_URL + "/?bnet=" + BNET_HASH);
              });
          } catch (error) {
            res.status(400).json({ error: error.response.data });
          }
        });
    } catch (error) {
      res.status(400).json({ error: error.response.data });
    }
  } else {
    res.status(400).json({ err: "ERROR" });
  }
}
