import React from "react";
import { useModal } from "../Hooks/useModal";

function Todoitem(props) {
  const { openModal } = useModal();
  const { title, description, done, order, onChangeDone, onDelete } = props;

  return (
    <div>
      <span onClick={() => openModal("ModalModify")}>{title}</span>
      <span>{description}</span>
      <span onClick={onChangeDone}>{done ? "완료" : "미완료"}</span>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

export default Todoitem;
