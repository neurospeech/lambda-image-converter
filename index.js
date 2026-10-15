import App from "./dist/App";

exports.handler = (event, context) => App.run(event.body ?? event.queryStringParameters);