import React, { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase";

function ModalLogin() {
  const [currentUser, setCurrentUser] = useState(null);
  const formAction = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await signInWithEmailAndPassword(authService, email, password);
  };

  onAuthStateChanged(authService, setCurrentUser);
  console.log(currentUser);
  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={formAction}>
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
    </>
  );
}

export default ModalLogin;
