import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { authService } from "../firebase";
import { useCurrentUser } from "../Hooks/useCurrentUser";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { onAuthStateChanged } = useCurrentUser();
  const navigate = useNavigate();

  const logIn = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await signInWithEmailAndPassword(authService, email, password);
    onAuthStateChanged;
    navigate("/TodoList");
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={logIn}>
        <input
          type="text"
          name="email"
          placeholder="이메일 입력"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호 입력"
        />
        <button>로그인</button>
      </form>
      <Link to="/SignUp">회원가입</Link>
    </div>
  );
}

export default Login;
