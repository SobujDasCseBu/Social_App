/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";


const PostsWidget = ({userId, isProfile = false}) =>{
    const dispatch = useDispatch()
    const token = useSelector((state) => state.token)
    const posts = useSelector((state) => state.posts)
   // console.log('User Id:', userId)
    const getPost = async () =>{

        const response = await fetch('http://localhost:3001/posts',{
            method : 'GET',
            headers : {Authorization: `Bearer ${token}`}

        })
        const data = await response.json()
        //console.log('Response get user post data :', data)
        dispatch( setPosts({posts:data}))

    }

    const getUserPost = async () =>{

        const response = await fetch(`http://localhost:3001/posts/${userId}/posts`,{
            method : 'GET',
            headers : {Authorization: `Bearer ${token}`}

        })
        const data = await response.json()
        //console.log('Response get user post data 2 :', data)
        dispatch(setPosts({posts:data}))

    }

    useEffect (() =>{
        if(isProfile){
            getUserPost()
        }else{
            getPost()
        }
        
    }, [])
   // console.log('Posts data:', posts)
    return(
        <>
        {posts.map(({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments,

            }) =>(
                <PostWidget 
                    key = {_id}
                    postId = {_id}
                    postUserId = {userId}
                    name = {` ${firstName} ${lastName}`}
                    description = {description}
                    location = {location}
                    picturePath = {picturePath}
                    userPicturePath = {userPicturePath}
                    likes = {likes}
                    comments = {comments}
                />
             )
            )
        }
        </>
    )

}

export default PostsWidget