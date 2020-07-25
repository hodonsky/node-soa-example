"use strict"

import AWS from "aws-sdk"
import { awsConfig, dynamodbConfig } from "./config"

/**
 * Hooks to DynamoDB
 */
export default class {
  /**
   * Constructor
   */
  constructor(){
    AWS.config.update({ ...dynamodbConfig, region: awsConfig.region })
    this.docClient = new AWS.DynamoDB.DocumentClient()
  }

  /**
   * Sends data into DynamoDB
   * @param {string} table - the table in which to put the item
   * @param {Object} putItem - the item to put into the table
   * @returns {Promise<string>} the response message from DynamoDB
   */
  put( table, putItem ){
    try {
      return this.docClient.put({ TableName: table, Item: putItem }).promise()
    } catch ( error ){
      throw {
        name   : `DynamoHooks::put:${error.name}`,
        message: error.message
      }
    }
  }

  /**
   * Gets data from DynamoDB
   * @param {string} table - the table from which to get the item
   * @param {Object} key - the key to get the item
   * @returns {Promise<string>} the item retrieved from DynamoDB
   */
  get( table, key ) {
    try {
      return this.docClient.get({ TableName: table, Key: key }).promise()
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
  dynamoDelete( table, key ){
    try {
      return this.docClient.delete({ TableName: table, Key: key }).promise()
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
  query( table, keyConditionExpression, expressionAttributeNames,
    attributeVals, projectionExpression ){
    const params = {
      TableName                : table,
      ProjectionExpression     : projectionExpression,
      KeyConditionExpression   : keyConditionExpression,
      ExpressionAttributeNames : expressionAttributeNames,
      ExpressionAttributeValues: attributeVals
    }

    try {
      return this.docClient.query( params ).promise()
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
  scan( table, filter, attributeVals ){
    const params = {
      TableName                : table,
      FilterExpression         : filter,
      ExpressionAttributeValues: attributeVals
    }

    try {
      return this.docClient.scan( params ).promise()
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
  update( params ){
    try {
      return this.docClient.update( params ).promise()
    } catch ( error ){
      throw {
        name   : `DynamoHooks::update:${error.name}`,
        message: error.message
      }
    }
  }
}
