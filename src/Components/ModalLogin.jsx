import React from "react";

function ModalLogin() {
  return (
    <>
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디 입력"
      />
      <textarea
        type="text"
        placeholder="비밀번호 입력"
      />
      <button>로그인</button>
    </>
  );
}

export default ModalLogin;
