const {Client}  = require('pg') 
let queryBuild =(text, values)=>{
    return{
        text,
        values
    }
}
var connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_BASE}`
const client = new Client({
    connectionString: connectionString
})
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected DB')
    }
})
module.exports.client =client
module.exports.queryBuild = queryBuild
