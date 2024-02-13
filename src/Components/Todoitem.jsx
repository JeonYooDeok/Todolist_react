import React from "react";

function Todoitem(props) {
  const { id, title, description, order, onDelete } = props;

  return (
    <div>
      <span>{title}</span>
      <span>{description}</span>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

export default Todoitem;
