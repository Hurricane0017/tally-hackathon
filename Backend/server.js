const express = require('express');
const routes = require("./Routes/routes.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

