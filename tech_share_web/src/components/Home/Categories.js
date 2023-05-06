import {Button, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material'

import { categories } from '../../constants/data';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';



const StyledTable = styled(Table)`
    border: 1px solid rgba(224,224,224,1);
`

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: white;
    color: black;
    border: 1px solid black;
`

const Categories = () => {
    return (
        <>  
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
                        return <TableRow key={category.id}> 
                            <TableCell>
                                {category.type}
                            </TableCell>
                    </TableRow>
                        })
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;