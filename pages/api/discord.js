const queryString = require("query-string");
import axios from "axios";
import { BASE_URL, CLIENT_ID, CLIENT_SECRET } from "config";
const URL = "https://discord.com/api/v8/oauth2/";

export default function discord(req, res) {
  const code = req.query.code;
  axios
    .post(
      URL + "token",
      queryString.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: BASE_URL + "/api/discord",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    )
    .then((result) => {
      axios
        .get(URL + "@me", {
          headers: {
            Authorization: `${result.data.token_type} ${result.data.access_token}`,
          },
        })
        .then((result_token) => {
          const data = result_token.data.user;
          const DISCORD_HASH = Buffer.from(
            JSON.stringify(data),
            "utf-8"
          ).toString("base64");

          res.redirect("/?discord=" + DISCORD_HASH);
        })
        .catch((err) => {
          res.status(400).json({ err: err.response.data });
        });
    })
    .catch((err) => {
      res.status(400).json({ err: err.response.data });
    });
}
