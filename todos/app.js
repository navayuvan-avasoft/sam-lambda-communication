const { json } = require("express");
const express = require("express");
const app = express();
require("run-middleware")(app);

const serverless = require("serverless-http");

const todoRouter = require("./src/todo.router");

app.use(express.json());

app.use("/todos", todoRouter);

app.use("/todos/*/functions/TodosFunction/invocations", (req, res) => {
  const body = JSON.parse(Buffer.from(req.body).toString());
  app.runMiddleware(
    body.path,
    {
      method: body.httpMethod,
      body: body.body,
      original_req: req,
      original_res: res,
    },
    function (code, data) {
      console.log(data);
      res.json(data);
    }
  );
});

const handler = serverless(app);

module.exports.lambdaHandler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};

// module.exports.lambdaHandler = serverless(app);

//sam local invoke -e ./apigateway/apigateway_event.json ApiGatewayFunction
//sam local start-api
