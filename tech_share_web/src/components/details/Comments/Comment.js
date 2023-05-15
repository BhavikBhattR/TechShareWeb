import {Box, Typography, styled } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../services/api";


const Component = styled(Box)`
    margin-top: 30px;
    background: rgb(204,85,0,0.2);
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 30px;
`
const Container = styled(Box)`
    display: flex;
`

const UserName = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 18px;
`

const StyledDate = styled(Typography)`
    color: #878787;
    font-size: 14px;
`

const StyledDeleteButton = styled(Delete)`
    margin-left: auto;
`

const Comment = ({comment, setToggle}) => {
    const {account, setAccount} = useContext(DataContext);

    const deleteComment = async() =>{
        console.log('brev')
        const formData = new FormData()
        formData.append('_id', comment._id)
        let response = await API.removeComment(formData);

        if(response.isSuccess){
            setToggle(prevState => !prevState)
        }
    }

    return(
        <Component>
            <Container>
                    <UserName>{comment.userName}</UserName>
                    <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                    {
                        comment.userName == account.userName && 
                        <StyledDeleteButton onClick={() => deleteComment() }/>
                    }
            </Container>
            <Box>
                <Typography>{comment.comment}</Typography>
            </Box>
        </Component>
    )
}

export default Comment;