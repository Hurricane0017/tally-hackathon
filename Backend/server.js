const express = require("express");
const app = express();

// build an online-judge
// 1. User can submit code
// 2. User can run code
// 3. User can see output
// 4. User can see error
// 5. User can see compile time
// 6. User can see memory usage
// 7. User can see language
// 8. User can see time taken
// 9. User can see status
// 10. User can see input

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
