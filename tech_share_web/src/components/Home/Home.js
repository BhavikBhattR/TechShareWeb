import Banner from "../Banner/Banner";
import Categories from "./Categories";
import { Grid } from "@mui/material";
import Posts from "./post/Posts";
import { useEffect, useState } from "react";


const Home = () => {

    const [selectedCategoriesToDisplay, setSelectedCategoriesToDisplay] = useState([])

    const updateCategories = (categories) => {
        setSelectedCategoriesToDisplay(categories)
    }

    return(
        <div style={{marginLeft: -8, marginRight: -8}}>
            <Banner/>
            <Grid container>
                <Grid item lg={2} sm={2} xs= {12}>
                     <Categories selectedCategoriesToDisplay = {selectedCategoriesToDisplay} updateCategories ={updateCategories}/> 
                </Grid>
                <Grid item lg={10} sm={10} xs={12}>
                    <Posts selectedCategoriesToDisplay={selectedCategoriesToDisplay}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;