const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/api/share", (req, res) => {
  console.log("Received data:", req.body); // ✅ Log the entire request body

  // Check if `text` and `code` exist
  if (!req.body.text || !req.body.code) {
    return res.status(400).json({ error: "Text and Code are required" });
  }

  // Access `text` and `code` safely
  const { text, code } = req.body;
  console.log(`Text: ${text}, Code: ${code}`);

  res.status(200).json({ message: "Data received successfully" });
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
