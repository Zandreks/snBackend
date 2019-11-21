var express = require("express"),
  router = express.Router(),
  db = require("../dbConect").client,
  queryBuild = require("../dbConect").queryBuild,
  randomToken = require("random-token");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/autch", async (req, res, next) => {
  let { name, email, id } = req.body;
  try {
    let results = await db.query(
      queryBuild('SELECT * FROM "Users" WHERE "idFb" = $1', [id])
    );
    if (results.rows.length > 0) {
      var token = randomToken(16); 
       await db.query(
        queryBuild(
          'INSERT INTO "UsersToken" ("idUser", token) VALUES($1, $2)',
          [id, token]
        )
      );
      res.status(200).json({ answer: true ,token});

    } else {
      try {
        await db.query(
          queryBuild(
            'INSERT INTO "Users" (fio, email, "idFb") VALUES($1, $2,$3)',
            [name, email, id]
          )
        );
        var token = randomToken(16); 
        await db.query(
         queryBuild(
           'INSERT INTO "UsersToken" ("idUser", token) VALUES($1, $2)',
           [id, token]
         )
       );
       res.status(200).json({ answer: true ,token})
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
