const express = require("express");
const app = express();
const serverless = require("serverless-http");

const todoRouter = require("./src/todo.router");

app.use(express.json());

app.use("/todos", todoRouter);

app.use("/todos/*/functions/TodosFunction/invocations", todoRouter);

const handler = serverless(app);

module.exports.lambdaHandler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};

// module.exports.lambdaHandler = serverless(app);

//sam local invoke -e ./apigateway/apigateway_event.json ApiGatewayFunction
//sam local start-api
