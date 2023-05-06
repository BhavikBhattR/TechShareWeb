import Banner from "../Banner/Banner";
import Categories from "./Categories";
import { Grid } from "@mui/material";
import Posts from "./post/Posts";

const Home = () => {
    return(
        <div style={{marginLeft: -8, marginRight: -8}}>
            <Banner/>
            <Grid container>
                <Grid item lg={2} sm={2} xs= {12}>
                     <Categories/> 
                </Grid>
                <Grid item lg={10} sm={10} xs={12}>
                    <Posts/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;