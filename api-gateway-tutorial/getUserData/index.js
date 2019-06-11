'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

exports.handler = async function (event, context, callback) {
    const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10'});
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;
    const params = {
        TableName: 'users',
        Key: {
            id: id
        }
    }
    
    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data.Item);
        statusCode = 200;
    } catch(err) {
        responseBody = `Unable to get user data`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
    }

    return response;
}