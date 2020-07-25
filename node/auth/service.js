"use strict"

import Service from "@donsky/node-service"

import { actions } from "./actions"
import config from "./config"

Service.configure( config )
new Service( actions )