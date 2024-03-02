import React from "react";
import { useTodo } from "../Hooks/useTodo";

function ModalAddTodo() {
  const { title, description, onChange, addTodo } = useTodo();
  return (
    <>
      <h1>할 일 등록</h1>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="제목"
        onChange={onChange}
      />
      <textarea
        type="text"
        name="description"
        value={description}
        placeholder="설명"
        onChange={onChange}
      />
      <button onClick={addTodo}>등록</button>
    </>
  );
}

export default ModalAddTodo;
