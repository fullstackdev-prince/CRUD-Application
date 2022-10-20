const mongoose= require('mongoose')

const Db="mongodb+srv://prince:9540756469@cluster0.nkdehyf.mongodb.net/mernstack?retryWrites=true&w=majority"

mongoose.connect(Db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection start")).catch((error)=>console.log(error.message));