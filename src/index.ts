import express, { response } from "express";

const app = express();
const port: number = 3000;

app.get("/", (request, response) => {
  response.send("Hello world!");
  response.json()
});

app.listen("/", ()=>{
    console.log("Hello vietnam!!!!")
})