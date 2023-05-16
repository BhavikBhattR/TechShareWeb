import {Box, TextField, Button, styled, Typography} from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useState, useContext } from 'react';
import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider.js';
import { useNavigate } from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import Typed from 'react-typed';

const Background = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:  rgb(255,245,238);
    width: 100%;
    height: 100%;
`


const StyledBox = styled(Box)`
display: flex;
flex-direction: row;
justify-content: center;
// align-items: center;
// margin: auto;
box-shadow: 4px 2px 4px 2px rgb(0 0 0/0.6);
margin-top: 64px;
flex-basis: 400px;
background: white;
`;

const Wrap = styled(Box)`
    // position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: content-fit;
`

const ProgressBarContainer = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    background: rgb(14,14,14, 0.2);
    z-index: 1;
    display: flex;
    justify-content: center;
`


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

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600
`

const WelcomeText = styled(Box)`
    position: fixed;
    width: 100%;
    bottom: 10%;
    text-align: center;
`

const WelcomeMessage = styled(Typography)`
    font-size: 24px;
    font-weight: bold;
`

const Cube = styled(Box)`
`


//here properties' name must be as same as value of 'name' label in Textfield of HTML from where you are getting values


const Login = ({authenticate}) => {
    const imageURL = "https://res.cloudinary.com/dibsjiozz/image/upload/v1682534602/blog_home_kcaaqp.jpg";

    const navigate = useNavigate();

    const SignUPInitialValues = {
        email: '',
        userName: '',
        password: ''
    }
    
    const LoginInitialValues = {
        userName: '',
        password: ''
    }

    //State handling
    const [LoginPage, toggleLoginPage] = useState(true); 
    const [signUPValues, setSignUPValues] = useState(SignUPInitialValues)
    const [loginValues, setLoginValues] = useState(LoginInitialValues )
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const {account,setAccount} = useContext(DataContext);
    

    const LoginToggle = () => {
        toggleLoginPage(!LoginPage)
    }
    const onInputChange = (e) => {
        setError('')
        setSignUPValues({
            ...signUPValues,
            [e.target.name] : e.target.value
        })
    }

    const onValueChange = (e) => {
        setError('')
        setLoginValues({
            ...loginValues, [e.target.name]: e.target.value
        })
    }

    const signUp = async() => {
        setLoading(true)
        const formData = new FormData();
        formData.append("userName", signUPValues.userName);
        formData.append("password", signUPValues.password);
        formData.append("email", signUPValues.email);
        try{
            let response = await API.userSignup(formData);
            if(response.isSuccess){
                setLoading(false)
                setError('')
                setSignUPValues(SignUPInitialValues);
                LoginToggle()
            }
        }catch(error){
            setLoading(false)
            setError('Please fill out all the fields, if done correctly please try again later')
        }
    }

    const logInUser = async() => {
        setLoading(true)
        const formData = new FormData();
        console.log(logInUser)
        console.log(typeof(loginValues.userName))
        console.log('login username', loginValues.userName)
        formData.append("userName", loginValues.userName);
        formData.append("password", loginValues.password);
        console.log(formData)
        try{
            const response = await API.userLogIn(formData);
            if(response.isSuccess){
                setError('')
                console.log(response)
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)
    
                setAccount({userName: response.data.userName, email: response.data.email})
                authenticate(true)
                setLoading(false)
                navigate('/')
            }
        }catch(error){     
            setLoading(false)
            console.log('reaching')
            console.log(error) 
            if(error.code === 400){ 
                 setError('Username or Password is incorrect') 
            }else if(error.code === 500){
                setError('Error while logging in please try again later')
            }
        }
    }

    return (
        <Background>
        <Wrap>
        <StyledBox>
            <Box style={{flexBasis: 400}}>
                <Image src={imageURL} alt='Login' width="200" height="200" />
                {
                    LoginPage == true
                    ?
                        <Wrapper>
                            <TextField variant='standard' value={loginValues.userName} onChange={(e) => onValueChange(e)} name='userName' label="Enter Username"/>
                            <TextField variant='standard' value={loginValues.password} onChange={(e) => onValueChange(e)} name='password' label="Enter Password"/>
                            <LoginButton variant='contained' onClick={logInUser} >Login</LoginButton>
                            {error && <Error>{error}</Error >}
                            <Typography align='center'>OR</Typography>
                            <SignUPButton variant='text' onClick={LoginToggle}>Create an account</SignUPButton>
                        </Wrapper>
                    :
                        <Wrapper>
                            <TextField variant='standard' value={signUPValues.email} onChange={(e) => onInputChange(e)} name='email' label="Enter Email"/>
                            <TextField variant='standard' value={signUPValues.userName} onChange={(e) => onInputChange(e)} name='userName' label="Enter Username"/>
                            <TextField variant='standard' value={signUPValues.password} onChange={(e) => onInputChange(e)} name='password' label="Enter Password"/>

                            

                            <LoginButton variant='contained' onClick={signUp}>SignUP</LoginButton>
                            {error && <Error>{error}</Error >}
                            <Typography align='center'>OR</Typography>
                            <SignUPButton variant='text' onClick={LoginToggle}>Already have an account?</SignUPButton>
                        </Wrapper>
                }
            </Box>
        </StyledBox>
        {
                loading && 
                <ProgressBarContainer>
                        <CircularProgress style={{margin: "auto"}}/>
                </ProgressBarContainer>
            }
        </Wrap>
        <WelcomeText>
           <WelcomeMessage>Hello Geek, Welcome to the community ! Find the best thoughts on latest technologies here.</WelcomeMessage>   
        </WelcomeText>
        </Background>
    )
}

export default Login;