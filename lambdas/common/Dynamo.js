const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (ID, TableName){
        const params = {
            TableName,
            Key: {ID}
        };

        const data = await documentClient.get(params).promise()
        if(!data || !data.Item){
            throw Error(`There was an error fetching the data of the ID of the ${ID} in table ${TableName}`)
        }
        return data.Item
    },
    async write (data, TableName){
        if(!data.ID){
            throw Error("No Id on the data")
        }
        const params = {
            TableName,
            Item: data
        }
        const res = await documentClient.put(params).promise()
        if(!res){
            throw Error(`There was an error inserting the ID of the ${data.ID} in table ${TableName}`)
        }
        return data
    }
};

module.exports = Dynamo