const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors");
const empmodel = require("./model/empmodel");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/employeedb").then(() => {
  console.log("MongoDB is Connected");
});

app.get ("/getemp", async (req, res) => {
    const result = await empmodel.find({})
    res.send(result);
});
app.post("/addemp",(req,res)=>{
    const result=new empmodel(req.body);
    result.save();
    res.send(`New Employee ${req.body.fname} ${req.body.lname} Add Successfully`)
})
app.post('/empdel',async(req,res)=>{
  const result=await empmodel.findOneAndDelete({_id:req.body._id})
  res.send(`${req.body.fname}${req.body.lname} Delete Successfull`)
})

app.post("/empud",async(req,res)=>{
  const result=await empmodel.findOneAndUpdate({_id:req.body._id},req.body)
  res.send(`${req.body.fname}${req.body.lname} Update  Successfull`)
})

app.listen(2070, () => {
  console.log("api is running on port 2070");
});