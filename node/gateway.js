"use strict"

import Gateway from "@donsky/node-gateway"

const gateway = new Gateway()
gateway.on( "ready", msg => msg |> console.log )
gateway.on( "error", err => err |> console.error )
gateway.listen(process.env.EXPOSE_PORT)

export default gateway