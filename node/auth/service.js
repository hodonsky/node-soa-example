"use strict"

import Service from "@donsky/node-service"

import { actions } from "./actions"
import config from "./config"

(async () => {
  Service.configure( config )
  await new Service( actions )
})()