import React from "react";
import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  //로그아웃
  const logout = () => {
    authService.signOut();
    navigate("/");
  };
  //로그아웃
  return <button onClick={logout}>로그아웃</button>;
}

export default SignOut;
