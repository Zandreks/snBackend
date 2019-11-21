var db = require("./dbConect").client,
  queryBuild = require("./dbConect").queryBuild;

async function chekUser(req, res, next) {
  let { token, id } = req.body;
  try {
    let results = await db.query(
      queryBuild('SELECT * FROM "UsersToken" WHERE "token" = $1 LIMIT 1', [
        token
      ])
    );
    let idUser = results.rows[0].idUser;
    if (id == idUser) {
      next();
    } else {
      res.status(500).json({ message: "token not", type: "logout" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return false;
  }
}
module.exports = chekUser;
