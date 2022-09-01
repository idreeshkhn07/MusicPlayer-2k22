const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const fileUpload = require("express-fileupload");

app.use(express.json({ limit: "25mb" }));

const userRoute = require("./routes/userRoute");
const musicRoute = require("./routes/musicRoute");

app.use("/api/users", userRoute);
app.use("/api/musics", musicRoute);

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const port = process.envPORT || 5001;

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node js server on port at ${port}!`));
