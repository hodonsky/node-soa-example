import Gateway from "@donsky/node-gateway"
import authActions from "./auth/actions"

export default new Gateway([ ...authActions ])