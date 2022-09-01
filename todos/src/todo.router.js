const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  return res.send({
    todosMessage: JSON.parse(req.body),
  });
});

router.post("/:id", (req, res) => {
  return res.send({
    todosMessage: JSON.parse(req.body),
    id: req.params.id,
  });
});

router.get("/:id", (req, res) => {
  return res.json({
    todosMessage: req.query.foo,
  });
});

module.exports = router;
