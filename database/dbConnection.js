import mongoose from "mongoose";

// Database connection
export const dbConnection =  () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACCK_JOB_SEKKING_APP",
    }).then(()=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
       console.log(`error while connecting to database: ${err}`); 
    });
}