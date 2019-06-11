'use strict'
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

exports.handler = async function (event, context, callback) {
    const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10'});
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    let { id, first_name, last_name } = JSON.parse(event.body);

    const params = {
        TableName: 'users',
        Item: {
            id: id,
            first_name: first_name,
            last_name: last_name
        }
    }
    
    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(err) {
        responseBody = `Unable to put user data`;
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