require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("./db/conn");
const users = require("./models/userSchema.js");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post("/register", async (req, res) => {
    const { name, email, age, mobile, add, occ, desc } = req.body;

    if (!name || !email || !age || !mobile || !add || !occ || !desc) {
        return res.status(400).json("Please fill all the data!");
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            return res.status(409).json("Email already exists");
        } else {
            const newuser = new users({ name, email, age, mobile, add, occ, desc });
            await newuser.save();
            res.status(201).json(newuser);
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

app.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(200).json(userdata);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// GET INDIVIDUAL USER

app.get("/getuser/:id", async (req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params

        const userindividual = await users.findById({_id : id})
        console.log(userindividual);
        res.status(201).json(userindividual)
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
})   

// UPDATE USER

app.patch("/updateuser/:id", async (req, res)=>{
    try {
        const {id} = req.params;
        const updateuser = await users.findByIdAndUpdate(id, req.body, {
            new:true
        })

        console.log("Updated user successfully!")
        console.log(updateuser);
        res.status(201).json(updateuser)
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
})

// DELETE

app.delete("/deleteuser/:id", async(req, res)=>{
    try {
        const {id} = req.params;
        const deleteuser = await users.findByIdAndDelete({_id:id})

        console.log("Updated user successfully!")
        console.log(deleteuser);
        res.status(201).json(deleteuser)
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
