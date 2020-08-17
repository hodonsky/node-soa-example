"use strict"

import authToken from "./actions/authToken"
import config from "./config"
import getEmail from "./actions/getEmail"
import getToken from "./actions/getToken"
import Service from "@donsky/node-service"

Service.configure( config )
const service = new Service( { getToken, authToken, getEmail } )

service.on( "reconnecting", () => console.log( "...reconnecting" ) )
service.on( "error", console.log )