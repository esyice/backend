require('dotenv').config()

const express = require("express");
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT  ;

// Middleware to parse JSON request bodies
app.use(express.json());

// connectiong db
mongoose.connect("mongodb://127.0.0.1:27017/textclones")
.then(() => console.log("connected"))
.catch((error) => console.log("error:", error))
// connectiong db




// making schemaa

const TextSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
}, { timestamps: true })


// making schemaa

// making model

const Texts = mongoose.model("Texts", TextSchema)

// making model






app.post("/api/share", async (req, res) => {
  // console.log("Received data1st:", req.body); // ✅ Log the entire request body

  // Check if `text` and `code` exist
  // if (!req.body.text || !req.body.code) {
  //   return res.status(400).json({ error: "Text and Code are required" });
  // }

  // Access `text` and `code` safely
  const { text, code } = req.body;
  console.log(`Text: ${text}, Code: ${code}`);

  res.status(200).json({ message: "Data received successfully" });

  await Texts.create({
    text : req.body.text,
    code : req.body.code
  })

  console.log ("Data created successfully" );

});


// app.post("/api/share", (req, res) => {
//   // Get the data from the request
//   console.log("Received data:", req.body); 

//   // // console.log the data
//   // console.log("Your text is:", text || "No text received");
//   // console.log("Your code is:", code || "No code received");


//   // // Define the response message
//   // const message = "Data received successfully";

//   // // Log the response message before sending
//   // console.log(message);

//   // // Send the response
//   // res.send(message);
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
