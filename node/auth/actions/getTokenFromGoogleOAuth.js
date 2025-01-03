"use strict"

import { version } from "../../package.json"
import lambda from "./getTokenFromGoogleOAuthFn"
import config from "../config"

export default {
  version,
  topic: config.topic,
  auth: false,
  method: "post",
  route: "/auth/googleOAuth",
  action: "getTokenFromGoogleOAuth",
  lambda: lambda,
  requestTransformers: [
    ({ request: { body: { email, accessToken, id } }, header: { 'user-agent': userAgent }, ip }) =>
      ({ email, accessToken, id, meta: { ip, userAgent } })
  ],
  responseTransformers:[
    ({response:{ token }}) => ({ token })
  ],
  requestAVRO: [
    { name: "email", type: "string" },
    { name: "accessToken", type: "string" },
    { name: "id", type: "int" },
    {
      name: "meta",
      type: {
        type  : "record",
        fields: [ { name: "ip", type: "string" }, { name: "userAgent", type: "string" } ]
      }
    }
  ],
  responseAVRO: [
    { name: "JWT", type: "string" },
    { name: "email", type: "string" },
    { name: "accessToken", type: "string" },
    { name: "id", type: "int" }
  ]
}