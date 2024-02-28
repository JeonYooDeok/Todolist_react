import React from "react";
import { useModal } from "../Hooks/useModal";
import { useTodo } from "../Hooks/useTodo";

function Todoitem(props) {
  const { openModal } = useModal();
  const { updateSelectedId, initialState } = useTodo();
  const { id, title, description, done, order, onChangeDone, onDelete } = props;

  const handleItemClick = () => {
    updateSelectedId(id);
    openModal("ModalModify");
    initialState.inputs.title = title;
    initialState.inputs.description = description;
    //아이템이 선택되면 초기값을 해당아이템의 제목과 설명으로 변경
  };

  return (
    <div>
      <span onClick={handleItemClick}>{title}</span>
      <span>{description}</span>
      <span onClick={onChangeDone}>{done ? "완료" : "미완료"}</span>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

export default Todoitem;
