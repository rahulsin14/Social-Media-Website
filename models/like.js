const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        require:true,
        enum:['Post','Comment']
    }
})

const Like=mongoose.model('Like',likeSchema);

module.exports=Like;