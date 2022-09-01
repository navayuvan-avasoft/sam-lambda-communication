const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const body = Buffer.from(req.body).toString();
  console.log(body);
  return res.json({
    todosMessage: body,
  });
});

router.get("/", (req, res) => {
  return res.json({
    todosMessage: req.query.foo,
  });
});

module.exports = router;
