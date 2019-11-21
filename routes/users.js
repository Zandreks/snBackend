var express = require("express"),
  router = express.Router(),
  db = require("../dbConect").client,
  queryBuild = require("../dbConect").queryBuild,
  chekUser = require("../chekUser");

/* GET users listing. */
router.get("/", chekUser, async (req, res, next) => {
  try {
    var results = await db.query(queryBuild('SELECT * FROM "Users"'));
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
