import React from "react";

function Todoitem(props) {
  const { id, title, description, done, order, onChangeDone, onDelete } = props;

  return (
    <div>
      <span>{title}</span>
      <span>{description}</span>
      <span onClick={onChangeDone}>{done ? "완료" : "미완료"}</span>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

export default Todoitem;
