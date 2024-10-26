const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
const classRoutes = require("./Routes/classRoutes.js");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/class", classRoutes);


// Test route
app.get("/", async (req, res) => {
    res.send("Server is working!");
});


const url = `mongodb+srv://akiltajwar:LDIUstCT3JW5TWpL@cluster0.hhhwk.mongodb.net/demo-project?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
    .connect(url)
    .then(() => {
        // Listen for requests
        console.log("Successfully Connected to DB");
        app.listen(4000, () => {
            // Added default port 4000
            console.log(`Listening on PORT ${4000}`);
        });
    })
    .catch((error) => {
        console.log("Error connecting to DB: " + error.message);
    });
