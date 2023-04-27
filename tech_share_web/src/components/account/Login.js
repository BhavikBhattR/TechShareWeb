import {Box, TextField, Button, styled, Typography} from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useState } from 'react';

const StyledBox = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 4px 2px 4px 2px rgb(0 0 0/0.6);
margin-top: 64px
`;

const Image = styled('img')({
    width: 150,
    height: 80,
    display: 'flex',
    margin: 'auto',
    paddingTop: 20
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column; 
    & > div, & > Button, & > p{
        margin-top: 20px;
    }
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: black;
    height: 48px;
`
const SignUPButton = styled(Button)`
    text-transform: none;
    height: 48px;
    box-shadow: 0px 0px 3px 3px rgb(0 0 0/ 20%)
`

//here properties' name must be as same as value of 'name' label in Textfield of HTML from where you are getting values
const SignUPInitialValues = {
    email: '',
    userName: '',
    password: ''
}

const Login = () => {
    const imageURL = "https://res.cloudinary.com/dibsjiozz/image/upload/v1682534602/blog_home_kcaaqp.jpg";

    //State handling
    const [LoginPage, toggleLoginPage] = useState(true); 
    const [signUPValues, setSignUPValues] = useState(SignUPInitialValues)

    const LoginToggle = () => {
        toggleLoginPage(!LoginPage)
    }
    const onInputChange = (e) => {
        setSignUPValues({
            ...signUPValues,
            [e.target.name] : e.target.value
        })
    }

    const signUp = () => {
        console.log(signUPValues)
    }
    return (
        <StyledBox>
            <Box>
                <Image src={imageURL} alt='Login' width="200" height="200" />
                {
                    LoginPage == true
                    ?
                        <Wrapper>
                            <TextField variant='standard' label="Enter Username"/>
                            <TextField variant='standard' label="Enter Password"/>
                            <LoginButton variant='contained'>Login</LoginButton>
                            <Typography align='center'>OR</Typography>
                            <SignUPButton variant='text' onClick={LoginToggle}>Create an account</SignUPButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label="Enter Email"/>
                            <TextField variant='standard' onChange={(e) => onInputChange(e)} name='userName' label="Enter Username"/>
                            <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label="Enter Password"/>

                            <LoginButton variant='contained' onClick={signUp}>SignUP</LoginButton>
                            <Typography align='center'>OR</Typography>
                            <SignUPButton variant='text' onClick={LoginToggle}>Already have an account?</SignUPButton>
                        </Wrapper>
                }
            </Box>
        </StyledBox>
    )
}

export default Login;