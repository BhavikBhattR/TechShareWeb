import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'

import { categories } from '../../constants/data';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {Box} from '@mui/material';
import { useEffect } from 'react';


const Container = styled(Box)`
    position: "sticky";
    top: 100px;
`

const StyledTable = styled(Table)`
    border: 4px solid rgba(224,224,224,1);
`

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: white;
    color: black;
    border: 1px solid black;
`

const Categories = ({selectedCategoriesToDisplay, updateCategories}) => {

    const filterChanged = (type) => {
        console.log('helo')
            if(selectedCategoriesToDisplay.includes(type)){
               let categories = selectedCategoriesToDisplay.filter(ele => ele != type );
               updateCategories(categories)
            }else{
                const newArray = [...selectedCategoriesToDisplay, type];
                updateCategories(newArray);
            }
    }

    // function select(type){
    //     if(selectedFields.includes(type)){
    //         let selected = selectedFields.filter((field)=> field !== type)
    //          selectField(selected)
    //     }else{
    //          const newArray = [...selectedFields, type];
    //          selectField(newArray)
    //     }
    // }



    return (
        <Container >  
            <Link to={'/createPost'}>
            <StyledButton>Create Blog</StyledButton>
            </Link>
            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            All Categories
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => {
                        return <TableRow key={category.id} style={selectedCategoriesToDisplay.includes(category.type) ? {background: "green"} : {}} onClick={() =>{ filterChanged(category.type)}}> 
                            <TableCell>
                                {category.type}
                            </TableCell>
                    </TableRow>
                        })
                    }
                </TableBody>
            </StyledTable>
        </Container>
    )
}

export default Categories;