import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    overflow: auto;
    height: 250px;
    & > p{
        padding: 0 5px 5px 5px;
    };
`

const Image = styled('img')({
    width: '100%',
    objectFit: "cover",
    height: 150
})

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px
`

const Heading = styled(Typography)`
    font-weight: 600;
`

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const Post = ({post}) => {
    return(
        <Container>
            {
                post.images  &&  <Image src={post.images[0] === '' ? "https://res.cloudinary.com/dibsjiozz/image/upload/v1682073927/cld-sample-2.jpg" : post.images[0]} alt="blog"/>
            }
            <Text>{"Related to: " + post.attachedFields}</Text>
            <Text>{"written By:" + post.userName}</Text>
            <Heading>{"Title:" + post.title}</Heading>
        </Container>
    )
}



export default Post;