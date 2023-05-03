const App = require("./dist/App").default;

exports.handler = (event, context) => App.run(event.body ?? event.queryStringParameters);