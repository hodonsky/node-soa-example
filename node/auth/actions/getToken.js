"use strict"

import lambda from "./getTokenFn"
import { default as config, errorAVRO } from "../config"

export default {
  topic: config.topic,
  auth: false,
  method: "post",
  route: "/auth",
  action: "getToken",
  lambda: lambda,
  requestTransformers: [
    ({ request: { body: { username, password } }, header: { 'user-agent': userAgent }, ip }) =>
      ({ username, password, meta: { ip, userAgent } })
  ],
  responseTransformers:[
    ({response:{ token }}) => ({ token })
  ],
  requestAVRO: [
    { name: "username", type: "string" },
    { name: "password", type: "string" },
    {
      name: "meta",
      type: {
        type  : "record",
        fields: [ { name: "ip", type: "string" }, { name: "userAgent", type: "string" } ]
      }
    }
  ],
  responseAVRO: [
    { name: "token", type: "string" }
  ]
}