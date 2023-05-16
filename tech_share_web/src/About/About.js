import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import ReactPlayer from 'react-player';


const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 20px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const About = () => {

    return (
        <Box>
            <Wrapper>
                <Typography variant="h4" style={{marginBottom: 10}}>About Product</Typography>
                <Text variant="h6" style={{marginBottom: 40}}>This is the Tech-Blog platform where user can share or view the tech blogs of their favourite technologies. This website idea is inspired by ios application project- ShareTech. You can find the github link of that project here-
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/BhavikBhattR/ShareTech" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                    Here is the demo of that application.
                </Text>

            <div className="player-wrapper">
      <ReactPlayer
        className="react-player"
        url="https://res.cloudinary.com/dibsjiozz/video/upload/v1684190170/1676157334337_dqu9tb.mp4"
        playing
        controls
        width="100%"
        // height="20%"
      />
    </div>
    <Typography variant="h4" style={{marginTop: 10}}>Features in this product</Typography>
                <Text variant="h6">
                   <ul>
                    <li>
                        User can post the technical blog by selecting the technologies' tags related to the content they want to share.
                    </li>
                    <li>
                        Just like sharing, while observing posts, user can select the tags to see the tech blogs of their favourite technologies.
                    </li>
                    <li>
                        User can send multiple images (img/png/jpeg) with the tech blog.
                    </li>
                    <li>
                        User can edit or delete the blog if he/she finds that something is missing in the blog.
                    </li>
                    <li>
                        Other user can comment on the blog if they have something to share on the blog.
                    </li>
                   </ul>
                </Text>

                <Typography variant="h4" style={{marginTop: 10}}>Plans for the product</Typography>
                <Text variant="h6">
                   <ul>
                    <li>
                        I want to make this complete web version of my ios application.
                    </li>
                    <li>
                        First of all chat feature, likes on the blogs and user profile search are on the plans as they are available on ios application.
                    </li>
                    <li>
                        Then the feature of live streaming of discussion on technologies will be very good addition.
                    </li>
                    <li>
                        Posts with most likes/comments should trend on user feed.
                    </li>
                   </ul>
                </Text>
                <Typography variant="h4">About Developer</Typography>
                <Text variant="h6">My name is Bhavik Bhatt. I'm a Software Engineer based in India. 
                    I build website and applications.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link style={{textAlign: 'center'}} href="https://github.com/BhavikBhattR" color="inherit" target="_blank"><GitHub style={{textAlign: 'center'}} /></Link>
                    </Box>
                    <br/>
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/bhavik_rajeshkumar/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:bhattbhavikr340@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
                    
            </Wrapper>
        </Box>
    )
}

export default About;