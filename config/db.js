const mongoose = require("mongoose");

// const Database_URL = "mongodb://127.0.0.1:27017/MoonPayx?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1";
const Database_URL = "mongodb+srv://root:root@cluster0.ca2cg9i.mongodb.net/Moonpay?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(Database_URL).then(()=>console.log('!!MongoDB Connected!!')).catch((err)=> console.log(err.message));
