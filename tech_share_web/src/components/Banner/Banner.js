import {Box, Typography, styled} from '@mui/material';

const Image = styled(Box)`
    display: flex;
    background: url(https://res.cloudinary.com/dibsjiozz/image/upload/v1682938269/main_s1rzi5.png) center/60% repeat-x #000;
    width: 100%;
    height: 40vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

    const Title = styled(Typography)`
        font-family: "Gotham";
        font-size: 40px;
        background-color: white;
        color: black;
        padding: 8px 20px;
        font-weight: bold;
        border-radius: 10px;
    ` 
    const InfoTitle = styled(Typography)`
        font-size: 14px;
        background-color: rgba(0,0,0);
        color: white;
        padding: 10px 20px;
        font-weight: bold;
        border-radius: 10px;
    `

const Banner = () => {
    return (
        <Image style={{marginRight: 0, marginLeft: 0}}>
            <Title>Welcome to TechShare</Title>
            <InfoTitle>✨ A place to share and grab the knowledge ✨</InfoTitle>
        </Image>
    )
}

export default Banner;