const Post=require('../models/post');
const User=require('../models/user');
module.exports.home = async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    // Post.find({},function(err,posts){
    //     return res.render('home', {
    //         title: "Home",
    //         posts:posts
    //     });
    // })
try{
    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
    let users =await User.find({});
    return res.render('home', {
        title: "Home",
        posts:posts,
        all_users:users
    });        
}catch(err){
    console.log(err); return;
}
}

// module.exports.actionName = function(req, res){}