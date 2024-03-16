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
        />
        <input
          type="password"
          name="password"
        />
        <button>로그인</button>
      </form>
      <Link to="/SignUp">회원가입</Link>
    </div>
  );
}

export default Login;
