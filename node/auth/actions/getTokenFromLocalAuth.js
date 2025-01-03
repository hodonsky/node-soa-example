"use strict"

import { version } from "../../package.json"
import lambda from "./getTokenFromLocalAuthFn"
import config from "../config"

export default {
  version, // Service Version
  topic: config.topic, // folder name
  auth: false,         // not essential
  method: "post",           
  route: "/auth/localAuth",
  action: "getTokenFromLocalAuth", // file name
  lambda: lambda,
  requestTransformers: [ // could always just be ctx from koa
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
    { name: "JWT", type: "string" }
  ]
}