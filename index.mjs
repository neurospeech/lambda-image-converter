import App from "./dist/App.js";

export const handler = (event, context) => App.run(event.body ?? event.queryStringParameters);