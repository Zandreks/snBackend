var db = require('./dbConect').client,
    queryBuild = require('./dbConect').queryBuild
var chekUser = async (req, res, next) => {
    let { token, id } = req.body
    try {
        let results = await db.query(queryBuild('SELECT * FROM "UsersToken" WHERE "token" = $1 LIMIT 1', [token]))
        let idUser = results.rows.length > 0 ? results.rows[0].idUser : ''
        if (id == idUser) {
            next()
        } else {
            res.status(500).json({ message: 'token not', type: 'logout' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}
module.exports = chekUser