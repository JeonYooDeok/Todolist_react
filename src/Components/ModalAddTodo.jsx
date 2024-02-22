import React from "react";
import { useInput } from "../Hooks/useInput";

function ModalAddTodo() {
  const { inputs, onChange, onReset } = useInput();
  const { title, description } = inputs;

  return (
    <>
      <p>ModalAddTodo</p>
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
        placeholder="제목"
        onChange={onChange}
      />
      <button onClick={onReset}>등록</button>
    </>
  );
}

export default ModalAddTodo;
