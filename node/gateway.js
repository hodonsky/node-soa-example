"use strict"

import Gateway from "@donsky/node-gateway"
import authActions from "./auth/actions"

const koaMiddleware = [
  require( "koa-cors"   )(),
  require( "koa-helmet" )(),
  require( "koa-morgan" )( "combined" )
]

if ( process.env.NODE_ENV === "production" ){
  koaMiddleware.push(
    require( "koa-sslify" )({
      trustProtoHeader     : true,
      redirectMethods      : [ "HEAD", "OPTIONS", "GET", "POST" ],
      specCompliantDisallow: true
    })
  )
}

Gateway.configure({ koaMiddleware })
const gateway = new Gateway([ ...authActions ])
gateway.on( "ready", msg => msg |> console.log )
gateway.on( "error", err => err |> console.error )

export default gateway