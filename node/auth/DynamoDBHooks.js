"use strict"

import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand
} from "@aws-sdk/lib-dynamodb"
import { awsConfig, dynamodbConfig } from "./config"

/**
 * Hooks to DynamoDB
 */
export default class {
  
  #docClient = null

  /**
   * Constructor
   */
  constructor(){
    this.#docClient = DynamoDBDocumentClient.from(
                      new DynamoDBClient({
                        region: awsConfig.region,
                        ...dynamodbConfig
                      })
                    )
  }

  /**
   * Sends data into DynamoDB
   * @param {string} table - the table in which to put the item
   * @param {Object} putItem - the item to put into the table
   * @returns {Promise<string>} the response message from DynamoDB
   */
  async put( table, putItem ){  
    try {
      return await this.#docClient.send( new PutCommand({ TableName: table, Item: putItem }) )
    } catch ( err ) {
      throw {
        name   : `DynamoHooks::put:${err.name}`,
        message: err.message
      }
    }
  }

  /**
   * Gets data from DynamoDB
   * @param {string} table - the table from which to get the item
   * @param {Object} key - the key to get the item
   * @returns {Promise<string>} the item retrieved from DynamoDB
   */
  async get( table, key ) {
    try {
      return await this.#docClient.send( new GetCommand({ TableName: table, Key: key }) )
    } catch ( error ){
      throw {
        name   : `DynamoHooks::get:${error.name}`,
        message: error.message
      }
    }
  }

  /**
   * Deletes data from DynamoDB
   * @param {string} table - the table from which to delete the item
   * @param {Object} key - the key of the item to delete
   * @returns {Promise<string>} the response message from DynamoDB
   */
  async dynamoDelete( table, key ){
    try {
      return await this.#docClient.delete( new DeleteCommand({ TableName: table, Key: key }) )
    } catch ( error ){
      throw {
        name   : `DynamoHooks::dynamoDelete:${error.name}`,
        message: error.message
      }
    }
  }

  /**
   * Queries data in DynamoDB
   * @param {string} table - the table from which to query the item
   * @param {string} keyConditionExpression
   * @param {Object} expressionAttributeNames
   * @param {Object} attributeVals
   * @param {string} projectionExpression
   * @returns {Promise<string>} the items from DynamoDB matching the query
   */
  async query( table, keyConditionExpression, expressionAttributeNames,
    attributeVals, projectionExpression ){
    const params = {
      TableName                : table,
      ProjectionExpression     : projectionExpression,
      KeyConditionExpression   : keyConditionExpression,
      ExpressionAttributeNames : expressionAttributeNames,
      ExpressionAttributeValues: attributeVals
    }

    try {
      return await this.#docClient.query( new QueryCommand( params ) )
    } catch ( error ){
      throw {
        name   : `DynamoHooks::query:${error.name}`,
        message: error.message
      }
    }
  }

  /**
   * Scans data in DynamoDB
   * @param {string} table - the table from which to scan the data
   * @param {string} filter
   * @param {Object} attributeVals
   * @returns {Promise<string>} the items from DynamoDB matching the parameters
   */
  async scan( table, filter, attributeVals ){
    const params = {
      TableName                : table,
      FilterExpression         : filter,
      ExpressionAttributeValues: attributeVals
    }

    try {
      return await this.#docClient.scan( new ScanCommand( params ) )
    } catch ( error ){
      throw {
        name   : `DynamoHooks::scan:${error.name}`,
        message: error.message
      }
    }
  }

  /**
   * Updates data in DynamoDB
   * @param {Object} params - the parameters to update the DB with
   * @returns {Promise<string>} the response message from DynamoDB
   */
  async update( params ){
    try {
      return await this.#docClient.update( new UpdateCommand( params ) )
    } catch ( error ){
      throw {
        name   : `DynamoHooks::update:${error.name}`,
        message: error.message
      }
    }
  }
}
