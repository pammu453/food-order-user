import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to the database!")
        }).catch((err) => {
            console.log(`Error connecting to db ${err.message}`)
        })

}

export default connect;