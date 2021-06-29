const server = require("./api/server.js");
require("dotenv").config();

//5000 from env file
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`\n== API running on port ${PORT} ==\n`);
});
