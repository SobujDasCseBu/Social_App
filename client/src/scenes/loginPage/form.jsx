/* eslint-disable no-unused-vars */
import { Box , Typography,Button, TextField, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import { setLogin } from "../../state";
import * as yup from 'yup'
import FlexBetween from "../../components/Flexbetween";
import { EditOffOutlined, EditOutlined, UndoRounded } from "@mui/icons-material";

const registerSchema = yup.object().shape({
    firstName: yup.string().required('required'),
    lastName: yup.string().required('required'),
    email: yup.string().email('Invalid email').required('required'),
    password: yup.string().required('required'),
    location: yup.string().required('required'),
    occupation: yup.string().required('required'),
    picture: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
    email:yup.string().email('Invalid email').required('required'),
    password: yup.string().required('required'),
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin = {
    email: "",
    password: "",
}

const Login = () =>{
    const [pageType, setPageType] = useState('register')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {palette} = useTheme()
    const isNonMobileScreen = useMediaQuery('(min-width: 600px)')
    const isLogin = pageType === 'login'
    const isRegister = pageType === 'register'

    const register = async (values , onSubmitProps) =>{

        const formData = new FormData()
        for( let value in values){
            formData.append(value, values[value])
        }
        formData.append('picturePath', values.picture.name)

        const saveUserDataResponse = await fetch('http://localhost:3001/auth/register',{
            method: 'POST',
            body:formData,
        })
        const savedUser = await saveUserDataResponse.json()
        console.log(" Register response data: ", savedUser)
        onSubmitProps.resetForm()
        if(savedUser){
            setPageType('login')
        }
    }

    const login = async ( values, onSubmitProps) =>{
        const loggedInResponse = await fetch('http://localhost:3001/auth/login',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(values),
        })
        const loggedIn = await loggedInResponse.json()
        console.log('Logged In data: ', loggedIn)
        onSubmitProps.resetForm()

        if(loggedIn){
            dispatch(
                setLogin(
                    {
                        user: loggedIn.user,
                        token: loggedIn.token,
                    }
                )
            )
            navigate("/home")
        }
    }
    
    const handleFormSubmit = async (values, onSubmitProps) =>{
        if(isLogin) await login(values,onSubmitProps)
        if(isRegister) await register(values, onSubmitProps)
    }

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues ={isLogin? initialValuesLogin: initialValuesRegister }
            validationSchema={isLogin? loginSchema: registerSchema}
        >
            {(
                {
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                    resetForm
                }
            ) =>(
                <form onSubmit={handleSubmit} >
                    <Box
                    display='grid'
                    gap = '10px'
                    gridTemplateColumns='repeat(2, minmax(0, 1fr))'
                    sx = {{
                        '& > div': {gridColumn : isNonMobileScreen ? undefined : 'span 2' }
                    }}
                    >

                        {
                            isRegister && (
                                <>
                                <TextField
                                    label = 'First Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="firstName"
                                    value={values.firstName}
                                    error ={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText ={touched.firstName && errors.firstName}
                                    sx = {{gridColumn : ' span 1'}}
                                />

                                 <TextField
                                    label = 'Last Name'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="lastName"
                                    value={values.lastName}
                                    error ={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText ={touched.lastName && errors.lastName}
                                    sx = {{gridColumn : ' span 1'}}
                                />
                                 <TextField
                                    label = 'Location'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="location"
                                    value={values.location}
                                    error ={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText ={touched.location && errors.location}
                                    sx = {{gridColumn : ' span 2'}}
                                />
                                 <TextField
                                    label = 'Occupation'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="occupation"
                                    value={values.occupation}
                                    error ={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                    helperText ={touched.occupation && errors.occupation}
                                    sx = {{gridColumn : ' span 2'}}
                                />

                                <Box
                                    gridColumn=' span 2'
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius='5px'
                                    p ='1rem'
                                >
                                    <Dropzone
                                        acceptedFiles = '.jpg,.png,.jpeg'
                                        multiple ={false}
                                        onDrop={(acceptedFiles) =>{
                                            setFieldValue('picture', acceptedFiles[0])
                                        }}

                                    >
                                        {(
                                           { getRootProps, getInputProps}
                                        ) =>(
                                            <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p = '1rem'
                                            sx ={
                                                {'&:hover' : {cursor : 'pointer'}}
                                            }
                                            >
                                                <input {...getInputProps()} />
                                                {
                                                    !values.picture? (
                                                        <p>Add picture here</p>
                                                    ):(
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlined />
                                                        </FlexBetween>
                                                    )
                                                }

                                            </Box>
                                        )}
                                    </Dropzone>

                                </Box>


                                </>
                            )
                        }

                                <TextField
                                    label = 'Email'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="email"
                                    value={values.email}
                                    error ={Boolean(touched.email) && Boolean(errors.email)}
                                    helperText ={touched.email && errors.email}
                                    sx = {{gridColumn : ' span 2'}}
                                />

                                <TextField
                                    label = 'Password'
                                    type="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    name="password"
                                    value={values.password}
                                    error ={Boolean(touched.password) && Boolean(errors.password)}
                                    helperText ={touched.password && errors.password}
                                    sx = {{gridColumn : ' span 2'}}
                                />

                    </Box>

                    {/* Button */}
                    <Box>
                        <Button 
                        fullWidth
                        type="submit"
                        sx ={
                            {
                                m: '2rem 0',
                                p: '1rem',
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                '&:hover' : {color: palette.primary.main ,
                                     backgroundColor:palette.primary.dark
                                    }
                            }
                        }
                        >
                            {isLogin ? 'Login': 'Register'}
                        </Button>
                        <Typography
                            onClick = {() =>{
                                setPageType(isLogin?'register':'login')
                                resetForm()
                            }}
                            sx ={{
                                textDecoration: 'underline',
                                color: palette.primary.main,
                                '&:hover' : {
                                    cursor: 'pointer',
                                    color: palette.primary.dark
                                }

                            }}
                        >
                            {
                                isLogin? "Don't have an account? Sign Up here":
                                "Already have an account? Login here"
                            }

                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    )

}

export default Login
