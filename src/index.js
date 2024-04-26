require("express-async-errors");
require("dotenv").config();

const express = require("express")
const app = express()
const dbConnect = require("./db/dbConnect")
const cors = require("cors")


const auth = require("./routes/auth")
const news = require("./routes/news")
const admin = require("./routes/admin")
const upload = require("./routes/upload")
const course = require("./routes/course")
const library = require("./routes/library")
const event = require("./routes/event")
const teacher = require("./routes/teacher")
const additionalLesson = require("./routes/additionalLesson")
const analyst = require("./routes/analytics")

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({origin: "*", credentials: true}));

// connecting to MongoDB
dbConnect()

app.use((err, req, res, next) => {
    if(err){
        return res.status(500).json({status: "Server Error", error: err.toString()})
    }
    next()
})

app.use("/api/auth", auth)
app.use("/api/news", news)
app.use("/api/admin", admin)
app.use("/api/upload", upload)
app.use("/api/course", course)
app.use("/api/library", library)
app.use("/api/event", event)
app.use("/api/teacher", teacher)
app.use("/api/additionalLesson", additionalLesson)
app.use("/api/analytics", analyst)

app.use((req, res) => {
    res.status(404).json({message: "Bunday sahifa mavjud emas"})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Olov🔥🔥")
})