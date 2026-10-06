import axios from "../../utils/axios"
import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router"
import {CirclesWithBar} from "react-loader-spinner"
import "./Verify.css"

const Verify = () => {

    const {token} = useParams()

    const [loading, setLoading] = useState(true);

    const [responseStatus, setResponseStatus] = useState("");

    const verifyUser = async()=>{
        try {
            const response = await axios.get(`/user/verify/${token}`);
            setLoading(false);
            
            setResponseStatus(response.data)
        } catch (error) {      
        }
    }

    useEffect(()=>{
        if(token){
            verifyUser();
        }
    },[token]);

    if(loading){
        return(
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
        )
    }

  return (
    <div className='verify'>
        <h1>{responseStatus.msg}</h1>
        <img
            src={
                responseStatus.success ? "https://media.tenor.com/Hw7f-4l0zgEAAAAM/check-green.gif" : "https://cliply.co/wp-content/uploads/2021/07/372107370_CROSS_MARK_400px.gif"
            }

            alt=''
            className='verified'
        />

        {responseStatus.success && (
            <Link to="/auth">
                <button>Login Now</button>
            </Link>
        )}
    </div>
  )
}

export default Verify