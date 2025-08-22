import express from "express"
//import "dotenv/config" // oneliner for configuration
import { closeDB, runDB } from "./db/database.js"
import { env } from "node:process";

async function startServer() {
  try {
    await runDB();
    app.listen(port, () => {
      console.log(`Listening to port ${port}`);
      console.log(`Start the app : http://localhost:${port}`);
    });
    process.on("SIGINT", async () => {
      console.log("Cleaning up ..");
      await closeDB();
      process.exit(0);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();

const app = express();
const port: number = Number(env.port)|| 3000;
const address: string = "0.0.0.0"

app.get("/", (request, response) => {
  response.status(200).send({ message: "Hello world!" });
});

app.listen("/", () => {
  console.log("Hello vietnam!!!!");
});

app.listen(port,address, () => {
  console.log(`Listeing to port ${port}`)
})

app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send({ id: id });
});
