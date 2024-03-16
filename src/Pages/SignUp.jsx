import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { authService } from "../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const signUp = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await createUserWithEmailAndPassword(authService, email, password);
    alert("회원가입 완료");
    navigate("/TodoList");
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={signUp}>
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
        <button>회원가입</button>
      </form>
      <Link to="/">로그인</Link>
    </div>
  );
}

export default SignUp;
