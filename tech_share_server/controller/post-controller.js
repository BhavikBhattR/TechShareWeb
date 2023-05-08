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
        msg: error
       })
    }

}

//db.myCollection.find({ "hobbies": { "$in": hobbiesArray } });

export const getPosts = async(req,res,next)=>{
    console.log(req.body)
    console.log(req.body.selectedFields)
    try{
          const selectedFields = req.body.selectedFields.split(',')
          console.log(selectedFields)
          let posts = req.body.selectedFields.length === 0 ? await Post.find() : 
          await Post.find(
            {   
                "attachedFields": { 
                    $in: selectedFields 
                } 
              }
            );
        return res.status(200).json({
            posts
        })
    }catch(error){
        return res.status(500).json({
            error: error
        })
    }
}