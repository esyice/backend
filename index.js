require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cron = require("node-cron");
const port = process.env.PORT;
const url = process.env.URL;
const cors = require("cors")

// Middleware to parse JSON request bodies
app.use(express.json());

// Allow CORS from your frontend
app.use(cors({
  origin: 'https://text.ezice.online', // ✅ allow your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// connectiong db
mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch((error) => console.log("error:", error));
// connectiong db

// making schemaa

const TextSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// making schemaa

// making model

const Texts = mongoose.model("Texts", TextSchema);

// making model

// app.post("/api/share", async (req, res) => {
//   const { text, code } = req.body;
  
//   // Log the request body for debugging
//   console.log("Received body:", req.body);

//   // Check if `text` and `code` are missing
//   if (!text || !code) {
//     return res.status(400).json({ error: "Both 'text' and 'code' are required." });
//   }

//   try {
//     // Save the data to MongoDB
//     await Texts.create({ text, code });

//     console.log("Data created successfully");
//     res.status(201).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


app.post("/api/share", async (req, res) => {
  const { text, code } = req.body;
  console.log(`Text: ${text}, Code: ${code}`);


  await Texts.create({
    text: req.body.text,
    code: req.body.code,
  });

  res.status(200).json({ message: "Data received successfully" });
  console.log("Data created successfully");
});

// app.post("/find-data", async (req, res) => {
//     try {
//         const requestData = req.body;

//         const result = await DataModel.findOne(requestData);

//         if (result) {
//             res.json({ success: true, data: result });
//         } else {
//             res.json({ success: false, message: "No matching data found" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });
app.post("/api/getText", async (req, res) => {
  try {
    const notFound = "Text not found!";
    const getCode = req.body;
    const getText = await Texts.findOne(getCode);
    if (getText) {
      res.json({ succes: true, data: getText });
    } else {
      res.json({ success: false, data: notFound });
    }
  } catch (error) {
    console.log(error);
  }
});

// * * * * *
// │ │ │ │ └── weekday...........[0 (SUN) - 6 (SAT)]
// │ │ │ └──── month.............[1 (JAN) - 12 (DEC)]
// │ │ └────── dayOfMonth........[1 - 31]
// │ └──────── hour..............[0 - 23]
// └────────── minute............[0 - 59]

// Scheduled task to delete all data every 10 minutes
//cron.schedule("*/10 * * * *", async () => {
 // try {
   // await Texts.deleteMany({}); // Deletes all documents in the collection
//  } catch (error) {
  //  console.error("Error deleting data:", error);
//  }
//});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
