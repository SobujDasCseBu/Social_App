/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, Typography,useMediaQuery, useTheme } from '@mui/material'
import Login from './form'

const LoginPage = () => {
  const theme = useTheme()
  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)')
  return (
    <Box>
      <Box width='100%' backgroundColor ={theme.palette.background.alt} p ='1rem 6%' textAlign='center' >

        <Typography
        fontWeight='bold'
        fontSize='32px'
        color = 'primary'
        >
          Friend Zoone
        </Typography>
      </Box>

      <Box 
      width={isNonMobileScreen ? '50%': '80%'}
      p = '2rem'
      m = '2rem auto'
      borderRadius='2.5rem'
      backgroundColor = {theme.palette.background.alt}
      
      >
        <Typography
          fontWeight='bold'
          fontSize='16px'
          mb = '1rem'
         >
          Welcom to Friend Zoone, the social media for communication!
        </Typography>
        <Login />
      </Box>
    </Box>
  )
}

export default LoginPage