
import { Padding } from "@mui/icons-material";
import { Box, TextareaAutosize, Button, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { useContext } from "react";
import { Api } from "@mui/icons-material";
import { API } from "../../../services/api";
import Comment from "./Comment";

const Container = styled(Box)`
    margin: 25px;
`

const EditCommentBox = styled(Box)`
    display: flex;
    // flex-direction: row;
    margin-top: 40px;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    // box-sizing: border-box;
    & > *{
        margin: 5px;
    }
`

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 70%;
    margin: 0 5px 0;
`

const Image = styled('img')({
    height: 50,
    width: 50,
    borderRadius: '50%'
});

const initialValues = {
    userName: '',
    postId: '',
    comment: '',
    date: new Date()
}

const Comments = ({post}) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValues);
    const {account, setAccount} = useContext(DataContext);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    const handleChange = (e) => {
        setComment({
            ...comment,
            ['comment']: e.target.value,
            ['userName'] : account.userName,
            ['postId']: post._id,
            ['date']: new Date()
        })
    }


    useEffect(()=>{
        const getComments = async() => {
            const formData = new FormData();
            console.log('post is ', post)
            formData.append('_id', post._id)
            const response = await API.getAllComments(formData);
            
            if(response.isSuccess){
                setComments(response.data.comments)
            }
        };
        getComments();
    }, [post, toggle])

    useEffect(()=>{
        const userName =  account.userName;
        const postId = post._id;
        setComment({
            ...comment,
            ['userName']: userName,
            ['postId']: postId
        })
        console.log(comment)
    }, [account])

    const addComment = async(e)=>{
        console.log('comment', comment.comment, 'userName', comment.userName, 'postId', comment.postId, 'date', comment.date)
        const formData = new FormData();
        formData.append('userName', comment.userName);
        formData.append('comment', comment.comment);
        formData.append('postId', comment.postId);
        formData.append('date', comment.date);
        let response = await API.newComment(formData);

        if(response.isSuccess){
            setComment(initialValues)
            setToggle(prevState => !prevState)
        }
    }

    return(
        <Container>
            <EditCommentBox>
                <Image src={url} alt="dp"/>
                <StyledTextArea 
                minRows={2}
                placeholder="thoughts on this blog?"
                value={comment.comment}
                onChange={(e) => handleChange(e)}
                />
                <Button variant="contained" color="primary" size="medium" style={{height: 30, padding: 20, flexBasis: 'auto'}} onClick={(e) => addComment(e)}>Comment</Button>
            </EditCommentBox>
            <Box>
                    {
                        comments && comments.length > 0 && comments.map(comment => (
                            <Comment comment={comment} setToggle={setToggle} />
                        ))
                    }
            </Box>
        </Container>
    )
}

export default Comments;