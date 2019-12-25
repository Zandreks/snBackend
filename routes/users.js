var express = require('express'),
    router = express.Router(),
    db = require('../dbConect').client,
    queryBuild = require('../dbConect').queryBuild,
    chekUser = require('../chekUser'),
    randomToken = require('random-token')

/* GET users listing. */
router.get('/', chekUser, async (req, res) => {
    try {
        var results = await db.query(queryBuild('SELECT * FROM "Users"'))
        res.status(200).json(results.rows)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

router.post('/autch', async (req, res, ) => {
    let { name, email, id } = req.body
    var token = randomToken(16)
    try {
        let results = await db.query(
            queryBuild('SELECT * FROM "Users" WHERE "idFb" = $1', [id])
        )
        if (results.rows.length > 0) {
            await db.query(
                queryBuild(
                    'INSERT INTO "UsersToken" ("idUser", token) VALUES($1, $2)',
                    [id, token]
                )
            )
            res.status(200).json({ answer: true, token })

        } else {
            try {
                await db.query(
                    queryBuild(
                        'INSERT INTO "Users" (fio, email, "idFb") VALUES($1, $2,$3)',
                        [name, email, id]
                    )
                )
                await db.query(
                    queryBuild(
                        'INSERT INTO "UsersToken" ("idUser", token) VALUES($1, $2)',
                        [id, token]
                    )
                )
                res.status(200).json({ answer: true, })
            } catch (error) {
                console.log(error)
                res.status(500).json(error)
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
module.exports = router
