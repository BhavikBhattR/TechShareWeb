import { useEffect, useState } from "react";
import {API} from "../../../services/api.js"
import {Box, Container, Grid, styled} from '@mui/material';
import {Link} from "react-router-dom"

//component

import Post from "./Post.js";

const PostContainer = styled(Box)`
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-wrap: wrap;
`

const Posts = ({selectedCategoriesToDisplay}) => {
    const [posts, setPosts] = useState([]);

    useEffect( () => {
         const fetchFilteredData = async() =>{
            console.log(selectedCategoriesToDisplay)
            const formData = new FormData();
            formData.append("selectedFields", [...selectedCategoriesToDisplay]);
           let response = await API.getPosts(formData);
           if(response.isSuccess){
                setPosts(response.data.posts)
           }
        }
        fetchFilteredData();
    }
        , [selectedCategoriesToDisplay]
    )

    useEffect(()=>{
        const fetchData = async() => {
            const formData = new FormData();
            formData.append("selectedFields", []);
           let response = await API.getPosts(formData);
           if(response.isSuccess){
            
                setPosts(response.data.posts)
           }
        }
        fetchData();
    }, [])

    return(
        <PostContainer>
            {
               posts && posts.length > 0 ?
               posts.map(post=>(
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link to={`details/:${post._id}`} style={{textDecoration: "none", color:"inherit"}}>
                            <Post post={post}/>
                        </Link>
                    </Grid>
                ))
               :
               <Box style={{color: '#878787', margin: 'auto', fontSize: 18}}>You have got no posts!!</Box>
            }
        </PostContainer>
    )
}

export default Posts;