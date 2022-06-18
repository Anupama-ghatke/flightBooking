import { TextField  , Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState,useEffect } from "react";
import { firebaseAuth } from "../../backend/firebaseHandler";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const Login =() => {
    const nav = useNavigate();
    const [load, setLoad] = useState(false)

    const [userData , setuserData] = useState({
        email:'',
        password:''
     })
    
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setuserData({ ...userData,
            [name]:value
        })
    }

    const HandleClick = async() => {
        setLoad(true)
        if(userData.email == '') {
            setLoad(false)
            alert('Enter Email')
        }
        else if(userData.password == ''){
            setLoad(false)
            alert('Enter Password')
        }
        else{
        try {
            await signInWithEmailAndPassword( firebaseAuth, userData.email, userData.password)
            nav('/')
        }
        catch (err) {
            setLoad(false)
            alert(err)
        }
    }
    }

    useEffect( ()=> {
        onAuthStateChanged(firebaseAuth, (user) => {
            if(user) {
                nav('/')
            }
        });
    },[])

    
    
    return(
        <div style={{backgroundColor:"lavender" ,height:"100vh"}}>
        <div style={{textAlign: "center"}}>
        <br/>
            <h1>Welcome Back!</h1>
            <br/><br/>
        </div>
        <div style={{position:"absolute" , left:"50%", right:"50%", transform:"translate(-50%)", width:"400px"}}>
            <p>Enter your Log in credentials to access your account</p>
            <TextField name="email" value={userData.email} onChange={HandleChange} variant="outlined" id="outlined-basic" type={"email"} label="Email"  sx={{height:"40px", width:"400px", marginTop:"20px",marginBottom:"20px"}}/>
            <TextField name="password" value={userData.password} onChange={HandleChange} variant="outlined" id="outlined-basic" type={"password"} label="Password"  sx={{height:"40px", width:"400px", marginTop:"30px",marginBottom:"20px"}}/>
            <Button disabled={load} onClick={HandleClick} variant="contained" sx={{height:"50px", width:"230px", marginLeft:"85px", marginTop:"30px"}}>Login</Button>
            <p style={{textAlign: "center"}}>Dont have an Account? <a href={"/signIn"}> SignIn</a></p>
        </div>
        
    </div>
    )
}

export default Login;
