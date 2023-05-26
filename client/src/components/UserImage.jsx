/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";

const UserImage = ({image, size = '60px'}) =>{
    return(
        <Box width={size} height={size} >
            <img
             style={{objectFit: 'cover', borderRadius: '50%'}}
             width={size}
             height={size}
             alt = 'user'
             src = {`http://localhost:3001/assets/${image}`}
            
            />
        </Box>
    )

}

export default UserImage