"use strict"

// import sha256 from "sha256"
// import njwt from "njwt"

// import DynamoDB from "../DynamoDBHooks"
// import config from "../config"

// const JTI_TOKEN_TABLE = "JTI_Tokens"
// const USER_CREDENTIALS_TABLE = "UserCredentials"

// const dynamoDocClient = new DynamoDB()

export default async function getTokenFromGoogleOAuth({ email, accessToken, id }){
  return { JWT: "ABCD0987", email, accessToken, id }
}