const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    try{
        let post=await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created!"
            })
        }
        req.flash('success','Post Published');
        return res.redirect('back');
    }catch(err){
        req.flash('error','Post Published');
        console.log('errpor creating a post ');
    }
    
    
};
module.exports.destroy=async function(req,res){
    // console.log(req.user);
    const post =await Post.findById(req.params.id);
    if(post.user==req.user.id){
        post.remove();
        await Comment.deleteMany({post:req.params.id});
        return res.redirect('back');   
    }
};
