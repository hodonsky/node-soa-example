"use strict"
import getTokenFromGoogleOAuth from "./getTokenFromGoogleOAuth"
import getTokenFromLocalAuth from "./getTokenFromLocalAuth"

export const actions = { getTokenFromGoogleOAuth, getTokenFromLocalAuth }
export default [ getTokenFromGoogleOAuth, getTokenFromLocalAuth ]