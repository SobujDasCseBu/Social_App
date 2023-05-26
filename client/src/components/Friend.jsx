/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography,IconButton, useTheme, Divider } from "@mui/material";
import FlexBetween from "./Flexbetween";
import UserImage from "./UserImage";
import { setFriends } from "../state";
import { useNavigate } from "react-router-dom";

const Friend = ({friendId, name, subTitle, userPicturePath}) =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {_id} = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const friends = useSelector((state ) =>state.user.friends)

    const {palette} = useTheme()
    const primaryLight = palette.primary.light
    const primaryDark = palette.primary.dark
    const main = palette.neutral.main
    
    const isFriend = friends.find((friend) => friend._id === friendId)
   // console.log(" _id and FrienId", _id, friendId)
    const patchFriend = async () =>{
        const response = await fetch(`http://localhost:3001/users/${_id}/${friendId}`,{
            method :'PATCH',
            headers : {Authorization: `Bearer ${token}`,
            "Content-type" : 'application/json'
        
        },
        }
        )
        const data = await response.json()
        dispatch(setFriends({friends: data}))
    }

    return(
        <FlexBetween>
            <FlexBetween gap ='1rem' >
                <UserImage image = {userPicturePath} size="55px" />
                <Box
                    
                    onClick = {() => {
                        navigate(`/profile/${friendId}`)
                        navigate(0)
                    }}
                >
                    <Typography
                        color={main}
                        variant='h5'
                        fontWeight='500'
                        sx = {
                            {
                                '&:hover': {
                                    color: palette.primary.light,
                                    cursor : 'pointer'

                                }
                            }
                        }
                    >
                        {name}
                    </Typography>
                    <Typography color={main} fontSize='0.75rem'>
                        {subTitle}
                    </Typography>

                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx ={{backgroundColor: primaryLight, p: '0.6rem'}}
            >
                {
                    isFriend? <PersonRemoveOutlined sx ={{color: primaryDark}} /> 
                    :<PersonAddOutlined  sx ={{color:primaryDark}} />
                }
            </IconButton>
        </FlexBetween>
    )

}
export default Friend