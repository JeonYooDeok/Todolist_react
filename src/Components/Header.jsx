import React from "react";
import { useModal } from "../Hooks/useModal";
import { Link } from "react-router-dom";
import { authService } from "../firebase";

function Header() {
  const { openModal } = useModal();
  const logout = () => {
    authService.signOut();
  };
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Todolist_3">To do list</Link>
        </li>
        <button onClick={() => openModal("ModalLogin")}>로그인</button>
        <button onClick={() => openModal("ModalSignIn")}>회원가입</button>
        <button onClick={logout}>로그아웃</button>
      </ul>
    </nav>
  );
}

export default Header;
