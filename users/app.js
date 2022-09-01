const express = require("express");
const region = process.env.AWS_REGION || "us-west-2";
const lambda = new (require("aws-sdk/clients/lambda"))({
  region,
  endpoint: "http://192.168.201.149:3000/todos",
});

const app = express();

const serverless = require("serverless-http");

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({
    usersMessage: req.query.foo,
  });
});

app.post("/users", (req, res) => {
  return res.json({
    usersMessage: req.body,
  });
});

app.post("/users/todos", (req, res) => {
  const Payload = {
    httpMethod: "POST",
    path: "/todos",
    headers: { "content-type": "application/json" },
    body: '{"name":"navayuvan"}',
    isBase64Encoded: false,
  };
  const FunctionName = "TodosFunction";

  lambda
    .invoke({ Payload: JSON.stringify(Payload), FunctionName })
    .promise()
    .then((response) => {
      res.json(JSON.parse(response.Payload));
    });

  // axios
  //   .post("http://192.168.201.149:3000/todos", {
  //     name: "Navayuvan",
  //   })
  //   .then((response) => {
  //     res.json(response.data);
  //   });
});

module.exports.lambdaHandler = serverless(app);
// app.listen(3000, () => {
//   console.log("server is up and running");
// });

//sam local invoke -e ./apigateway/apigateway_event.json ApiGatewayFunction
//sam local start-api
