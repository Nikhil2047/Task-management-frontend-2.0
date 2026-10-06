import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import { handleLogin } from "../../slices/user";
import {CirclesWithBar} from "react-loader-spinner"
import { Navigate, Outlet } from "react-router";


const MemberRoute = () =>{
    const user = useSelector((state)=>state.userInfo.user);

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(()=>{
        let token = localStorage.getItem("token");
        if(!user && token){
            dispatch(handleLogin(token))
        }

        setTimeout(()=>{
            setLoading(false)
        },1200)
    },[]);

    if(loading){
        return(
            <CirclesWithBar
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
                  />
        )
    }

    if(!user || user.userType !== 3){
        return <Navigate to="/"/>
    }
    return <Outlet/>
}


export default MemberRoute