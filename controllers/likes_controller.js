const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/like');

module.exports.like=async function(req,res){
    let likeable;
    let deleted=false;
    if(req.params.type=='Post'){
        likeable=await Post.findById(req.query.id).populate('likes');
    }else{
        likeable=await Comment.findById(req.query.id).populate('likes');
    }
    let existingLike=Like.findOne({
        user:req.user._id,
        likeable:req.query.id,
        onModel:req.query.type
    })
    if(existingLike){
        likeable.likes.pull(existingLike);
        likeable.save();

        existingLike.remove();
        deleted=true;
    }else{
        let like=await Like.create({
            user:req.user._id,
            likeable:req.query.id,
            onModel:req.query.type
        })
        likeable.likes.push(like);
        likeable.save();
    }
    return res.json('200',{
        message:"Request succesful",
        data:{
            deleted:deleted
        }
    })
}