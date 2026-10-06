import React from 'react'
import {Navigate} from "react-router"
import { useSelector } from 'react-redux';

const RoleGuard = ({ userType, children }) => {
  const user = useSelector((state)=>state.userInfo.user);
  if (!user) return <Navigate to="/"/>;
  if (!userType.includes(user.userType)) return <Navigate to="/auth"/>;
  return children;
};

export default RoleGuard