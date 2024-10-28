const mongoose = require("mongoose");

const Database_URL = "mongodb://127.0.0.1:27017/MoonPayx?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1";

mongoose.connect(Database_URL).then(()=>console.log('!!MongoDB Connected!!')).catch((err)=> console.log(err.message));
