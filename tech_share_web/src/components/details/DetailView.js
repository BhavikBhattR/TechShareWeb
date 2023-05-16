import { Box, Typography, styled  } from "@mui/material";

import { useParams, Link } from "react-router-dom";

import { useEffect, useState, useContext } from "react";

import { DataContext } from "../../context/DataProvider";

import { API } from "../../services/api";

import {Edit, Delete} from '@mui/icons-material';

import { useNavigate } from "react-router-dom";

import Comments from "./Comments/Comments";

//start
const Holder = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
    flex-grow: 1;
    // flex-wrap: wrap;
    // padding: 10px;
    height: 100vh;
    background-color: #FFF5EE;
    box-sizing: box-border;
`

const ImageContainer = styled(Box)`
    box-sizing: border-box;
    // display: flex;
    // justify-content: center;
    // padding-left: 10px;
    position: relative;
    // flex-direction: column;
    margin: 25px 0px 0;
`

const Image = styled('img')({
    height: "40vh",
    width: "100%",
    objectFit: "contain",
    overflow: "auto"
})

const PrevButton = styled('button')({
    position: "absolute",
    top: "50%",
    left: 17,
    background: 'grey',
    background: "rgba(0,0,0,0.5)",
    color: "white",
    height: 40
})

const NextButton = styled('button')({
    position: "absolute",
    right: 17,
    top: "50%",
    height: 40,
    background: "rgba(0,0,0,0.5)",
    color: "white"
})

const Title = styled(Typography)`
    font-family: "Gotham";
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    background: #8fbc8b;
    color: black;
    padding: 7px 0px 7px;
    // margin: 10px 20px 20px 0px;
    margin-top: 15px;
    margin-bottom: -15px;
    width: 100%;
    border-radius: 20px;
    // padding: 1px 0px 0px 1px;
    box-sizing: border-box;
`

const EditButton = styled(Edit)`
    margin: 20px 5px 0px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
` 

const DeleteButton = styled(Delete)`
    margin: 20px 5px 0px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
` 

const Description = styled(Box)`
    border: 1px solid black;
    color: black;
    margin: 15;
    padding: 50;
    background-color: #FFF5EE;
    borderRadius: 10;
    padding-left: 10px;
    margin-left: 10px;
    margin-right: 10px;
    box-sizing: border-box;
`

const MetaContainer = styled(Box)`
    padding: 18px;
    color: #878787;
    margin-bottom: 20px;
    & > p{
       margin: -4px
    }
`



const DetailView = () => {

    const {id} = useParams();
    
    const [post, setPost] = useState({ })
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, updateLoader] = useState(true);

    const {account, setAccount} = useContext(DataContext);

    const navigate = useNavigate();


    const changePic = (sign) => {
        if(sign === '<'){
            if(currentImageIndex === 0){
                setCurrentImageIndex(post.images.length - 1)
            }else{
                setCurrentImageIndex(currentImageIndex - 1)
            }
        }else{
            if(currentImageIndex === post.images.length - 1){
                setCurrentImageIndex(0)
            }else{
                setCurrentImageIndex(currentImageIndex + 1)
            }
        }
    }

    const deleteBlog = async() => {
        const formData = new FormData()
        formData.append("_id", post._id)
        let response = await API.deletePost(formData)

        if(response.isSuccess){
            navigate('/'); 
        }
    }

    useEffect(()=>{
            const loadUIAfterDataDownloaded = async()=>{
                const getPostDetails = async() => {
                    console.log('func ran')
                    console.log('id in detail view', id)
                    let idToSend = id.slice(1, id.length + 1)
                    if(idToSend.length !== 24){
                        idToSend = id
                    }
                    let response = await API.getPostById(idToSend);
                    console.log(response, 'response for getting a post by id')
                    console.log(response.code)
                    if(response.isSuccess){
                        console.log('post_updated', typeof response.data.post.images)
                        const displayablePost = response.data.post.images[0] !== "" 
                        ? {...response.data.post, ['images']: response.data.post.images[0].split(',')}
                        : {...response.data.post}
                        console.log(displayablePost, 'displayable post')
                        setPost(displayablePost)
                        console.log(post, 'post')
                    }
                } 
                await getPostDetails()
                updateLoader(false);
            }
            loadUIAfterDataDownloaded()
        }, []
    )

  
    {
        return loading === true ? <div>Loading....</div> :  
        <Holder>
                <Title>{post.title}</Title>
                    {
                        <Box>
                               { 
                                (post.images.length > 0 && post.images[0] !== '' ) &&   
                                <Box>
                                   <ImageContainer>
                                    <Typography style={{fontSize: 17}}>Media file/s attached with this post:</Typography>
                                   <Image src={post.images[currentImageIndex]} alt="Media image"/>
                                   <div>
                                   <PrevButton onClick={() => changePic('<')}>{'<'}</PrevButton>
                                   <NextButton onClick={() => changePic('>')}>{'>'}</NextButton>
                                   </div>
                                   </ImageContainer>
                                   </Box> 
                               } 
                                 <Box style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                            <MetaContainer>
                                            <Typography>Written by: {post.userName}</Typography>
                                            <Typography>{'Posted on: ' + new Date(post.createdDate).toDateString()}</Typography>
                                            </MetaContainer>
                                        <Box style={{display: "flex", justifyContent: "right", flexWrap: "wrap"}}>
                                            {
                                                 account.userName === post.userName &&
                                                <>
                                                    <Link to={`/update/${post._id}`}>
                                                    <EditButton color="primary"/>
                                                    </Link>
                                                    <DeleteButton color="error" onClick={() => deleteBlog()}/>
                                                </>
                                            }
                                        </Box>
                                   </Box>
                        </Box>
                    }
        <Typography style={{paddingLeft: 10}}>Description:</Typography>
        <Description>
            <Typography>{post.description}</Typography>
        </Description>
        <Comments post={post}/>
    </Holder>
    }
}

export default DetailView;