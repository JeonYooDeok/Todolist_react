import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { authService } from "../firebase";
import { Link } from "react-router-dom";

function SignUp() {
  const signUp = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await createUserWithEmailAndPassword(authService, email, password);
  };
  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={signUp}>
        <input
          type="text"
          name="email"
        />
        <input
          type="password"
          name="password"
        />
        <button>회원가입</button>
      </form>
      <Link to="/">로그인</Link>
    </div>
  );
}

export default SignUp;
