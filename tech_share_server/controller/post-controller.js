import Post from "../models/post.js "

export const createPost = async(req,res,next)=> {

    try{
        console.log(req.body, "REQ BODY")
        const post = await new Post(req.body);
        await post.save()

        return res.status(200).json({
            msg: "post created successfully"
        })
    }catch(error){
       res.status(500).json({
        msg: 'post not saved'
       })
    }

}