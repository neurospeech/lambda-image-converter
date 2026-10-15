import App from "./dist/App";

export const handler = (event, context) => App.run(event.body ?? event.queryStringParameters);