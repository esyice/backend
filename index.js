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


  const { text, code } = req.body;
  console.log(`Text: ${text}, Code: ${code}`);

  res.status(200).json({ message: "Data received successfully" });

  await Texts.create({
    text : req.body.text,
    code : req.body.code
  })

  console.log ("Data created successfully" );

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
app.post("/api/getText", async(req ,res)=>{
  try{
    const notFound = "Text not found!";
    const getCode = req.body;
    const getText = await Texts.findOne(getCode)
    if (getText) {
      res.json({succes: true , data: getText})
    } else{
      res.json({success: false , data: notFound })
    }
  } catch (error){
    console.log(error);
  }
  
  

  
})



app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
