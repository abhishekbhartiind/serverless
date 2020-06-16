const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    if(!event.pathParameters || !event.pathParameters.ID){
        //failed with id
        return Responses._400({message: 'Missing the ID from the path'})
    }
    let ID = event.pathParameters.ID;
    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('error in dynamo db', err)
    })

    if(!user){
        return Responses._400({message: 'Failed to get user'})
    }
    return Responses._200({ user })
};