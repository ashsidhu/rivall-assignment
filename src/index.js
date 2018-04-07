require("dotenv").config();
import app from "./app";

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Express app running at http://127.0.0.1:${port}/`);
});
