import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
    background: black;
    color: white;
`

const Container = styled(Toolbar)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    & > a{
        text-decoration: none;
        color: inherit;
        padding: 2px 20px;
        flex-basis: auto;
        flex-grow: 1;
        flex-shrink: 1;
    }
`

const Header = () => {
    return(
        <Component>
            <Container>
                <Link to="/">HOME</Link>
                <Link to="/about">ABOUT</Link>
                <Link to="/contact">CONTACT</Link>
                <Link to="/login">LOGOUT</Link>
            </Container>
        </Component>
    )
}

export default Header;