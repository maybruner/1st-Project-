import mongoose from "mongoose";

function connect(){
    mongoose.connect ("mongodb+srv://may257788:090901Maybruner!@cluster0.qnh3t.mongodb.net/first_project")
.then((data) => {
    console.log ("mongo is connected..." )
}).catch ((err) => {
    console.log (err)
})
}

export default connect;