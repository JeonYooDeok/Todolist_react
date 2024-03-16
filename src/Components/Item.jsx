import React from "react";

function Item(props) {
  const { id, title, description, done, onTodoItemClick, onRemoveClick } =
    props;
  const handleRemoveClick = () => {
    onRemoveClick(id);
  };
  const handleChangeClick = () => {
    onTodoItemClick(id);
  };
  return (
    <div>
      <span>{title}</span>
      <span>{description}</span>
      <span onClick={handleChangeClick}>{done ? "완료" : "미완료"}</span>
      <span onClick={handleRemoveClick}>삭제</span>
    </div>
  );
}

export default Item;
