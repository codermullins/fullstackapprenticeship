import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';


export async function main (event, context) {
    const data = JSON.parse(event.body)

    const params ={
        TableName: 'resources', 

        Key: {
            resourceId: event.requestContext.identity.cognitoIdentityId,
            resourceHash: event.pathParameters.id
        },

        UpdateExpression: "SET resourceName = :resourceName, directory = :directory, schemaType = :schemaType, resourceUrl = :resourceUrl, resourceAuthor = :resourceAuthor, approved = :approved",
        ExpressionAttributeValues: {
            ":resourceName": data.attachment || null,
            ":directory": data.directory || null,
            ":schemaType": data.schemaType || null,
            ":resourceUrl": data.resourceUrl || null,
            ":resourceAuthor": data.resourceAuthor || null,
            ":approved": data.approved || null
        },

        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await dynamoDbLib.call("update", params)
        console.log('Result: ', result);
        return success ({ result })
    } catch (error) {
        return failure({ status: false })
    }
}