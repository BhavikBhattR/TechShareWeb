
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email, LinkedIn } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;
const Contact = () => {
    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Feel free to reach me !</Typography>    
                <Text variant="h5">
                    Here are my handle links, reach me if you want to connect with me.
                    <ul>
                    <li>
                        <Link href="mailto:bhattbhavikr340@gmail.com?Subject=This is a subject" target="_blank" color="inherit" style={{textDecoration: 'none'}}>
                            Send me an Email <Email />
                        </Link>
                        </li>
                    <li>
                        <Link href="https://www.linkedin.com/in/bhavik-bhatt-7b7785227/" color="inherit" target="_blank" style={{textDecoration: 'none'}}>
                            Connect with me on Linkedin <LinkedIn/>
                        </Link>
                        </li>
                        <li>
                        <Link href="https://www.instagram.com/bhavik_rajeshkumar/" color="inherit" target="_blank" style={{textDecoration: 'none'}}>
                            Connect with me on instagram <Instagram/>
                        </Link>
                        </li>
                    </ul>
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;