import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase";

function ModalSignIn() {
  const formAction = async e => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await createUserWithEmailAndPassword(authService, email, password);
  };

  return (
    <>
      <h1>회원가입</h1>
      <form onSubmit={formAction}>
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
    </>
  );
}

export default ModalSignIn;
