import React from "react";

function ModalSignIn() {
  return (
    <>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="아이디 입력"
      />
      <textarea
        type="text"
        placeholder="비밀번호 입력"
      />
      <textarea
        type="text"
        placeholder="비밀번호 확인"
      />
      <button>회원가입</button>
    </>
  );
}

export default ModalSignIn;
