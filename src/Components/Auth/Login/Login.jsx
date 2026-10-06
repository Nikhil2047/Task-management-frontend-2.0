import{ React,useRef} from 'react'
import "../../../Pages/Auth/Auth.css"
import {toast} from "react-toastify"
import {CirclesWithBar} from "react-loader-spinner"
import { useState } from 'react'
import axios from "../../../utils/axios"
import { useDispatch } from 'react-redux'
import { handleLogin } from '../../../slices/user'
import {useNavigate} from "react-router"

const Login = ({toggleNow}) => {
  const emailRef = useRef();
  const pwdRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const login = async(e)=>{
    e.preventDefault();
    const userData = {
      email : emailRef.current.value,
      password:pwdRef.current.value
    };
    try {
      setLoading(true);
      const response = await axios.post("/user/login",userData);
      if(response.data.success){
        toast.success(response.data.msg)
        localStorage.setItem("token",response.data.token)
        dispatch(handleLogin(response.data.token))

        if(response.data.userType === 1 || response.data.userType === 2 ){
          return navigate("/projects")
        }

        if(response.data.userType === 3 ){
          return navigate("/")
        }
      }else{
        toast.error(response.data.msg)
      }

      emailRef.current.value= "";
      pwdRef.current.value = "";
    } catch (error) {
        toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
            <form>
            <h1>LOGIN</h1>
            <input ref={emailRef} type="email" placeholder='Enter your email' />
            <input ref={pwdRef} type="password" placeholder='Enter your password' />
            <button onClick={login}>
              {""}
              {!loading ? (<span>Login</span>):(
                (<CirclesWithBar
                  height="40"
                  width="40"
                  color="#4fa94d"
                  outerCircleColor="#4fa94d"
                  innerCircleColor="#4fa94d"
                  barColor="#4fa94d"
                  ariaLabel="circles-with-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  />)
              )}
            </button>
            <p>Don't have account? <span onClick={toggleNow}>Register</span></p>
        </form>
    </div>
  )
}

export default Login