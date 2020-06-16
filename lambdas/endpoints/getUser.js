const Responses = require('../common/API_Responses')

exports.handler = async event => {
    if(!event.pathParameters || !event.pathParameters.ID){
        //failed with id
        return Responses._400({message: 'Missing the ID from the path'})
    }
    let ID = event.pathParameters.ID;
    if(data[ID]){
        //return data
        return Responses._200(data[ID])
    }
    // failed as id not in the data
    return Responses._400({message: 'No ID in data'})
};

const data = {
    101: { name: 'Anna Jones', age: 24, job: 'journalist'},
    390: { name: 'Chris Smith ', age: 43, job: 'doctor'},
    768: { name: 'Tom Hague', age: 58, job: 'teacher'}
};