const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    if(!event.pathParameters || !event.pathParameters.ID){
        //failed with id
        return Responses._400({message: 'Missing the ID from the path'})
    }
    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body)
    user.ID = ID

    const newUser = Dynamo.write(user, tableName).catch(err => {
        console.log("Error in dynamo write", err)
        return null
    })

    if(!newUser){
        return Responses._400({message: 'Failed to write user'})
    }
    return Responses._200({ newUser })
};