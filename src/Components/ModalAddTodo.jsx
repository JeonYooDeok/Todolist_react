import React from "react";

function ModalAddTodo() {
  return (
    <>
      <p>ModalAddTodo</p>
      <input
        type="text"
        placeholder="제목"
      />
      <textarea
        type="text"
        placeholder="설명"
      />
      <button>등록</button>
    </>
  );
}

export default ModalAddTodo;
