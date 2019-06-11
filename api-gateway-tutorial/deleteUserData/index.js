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
            "id": id
        }
    }
    
    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 200;
    } catch(err) {
        responseBody = `Unable to delete user data ${err}`;
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