/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { ChatBubbleOutlineOutlined, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from '@mui/icons-material'
import { Box, Typography, Divider, useTheme, IconButton } from '@mui/material'
import FlexBetween from '../../components/Flexbetween'
import Friend from '../../components/Friend'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setPost } from '../../state'

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes, 
  comments,

}) => {
  const [isComments, setIscomments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUser = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUser])
  const likeCount = Object.keys(likes).length

 // console.log("From Post Widget : >>>")

  const {palette} = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  const patchLike = async () =>{
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`,{
      method :'PATCH',
      headers : {Authorization: `Bearer ${token}`,
    
         "Content-type" : 'application/json'
    },
       body: JSON.stringify({userId: loggedInUser})
    })
    const updatedPost = await response.json()
    dispatch(setPost({post: updatedPost}))
  }
  
  return (
    <WidgetWrapper sx = {{mt: '1rem'}}>
      <Friend 
        friendId ={postUserId}
        name={name}
        subTitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx ={{mt: '1rem'}} >
        {description}
      </Typography>
      {
        picturePath && (
          <img

          width='100%'
          height='auto'
          alt = 'post'
          style={ {borderRight: '0.75rem' , marginTop: '0.75rem'}}
          src ={`http://localhost:3001/assets/${picturePath}`}
          
          />
        )
      }
      <FlexBetween gap='0.25rem'>
        <FlexBetween gap ='1rem'>

          <FlexBetween gap =' 0.3rem'>
              <IconButton onClick={patchLike} >
                {
                  isLiked ? (
                    <FavoriteBorderOutlined sx ={{color: primary}} />
                  ):(
                    <FavoriteBorderOutlined />
                  )
                }
              </IconButton>
              <Typography >{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap =' 0.3rem'>
              <IconButton onClick={() => setIscomments(!isComments)} >
               <ChatBubbleOutlineOutlined />
              </IconButton>
              <Typography >{comments.length}</Typography>
          </FlexBetween>

        </FlexBetween>
        <IconButton> <ShareOutlined /> </IconButton>
      </FlexBetween>
      {
        isComments && (
          <Box gap ='0.5rem' >
            {
              comments.map((comment, i) =>(
                <Box key = {`${name} - ${i}`} >
                  <Divider />
                  <Typography sx = {{color: {main}, m: '0.5re', pl: '1rem'}} >
                      {comment}
                  </Typography>
                </Box>
              ))}
            <Divider />
          </Box>
        )
      }
    </WidgetWrapper>
  )
}

export default PostWidget