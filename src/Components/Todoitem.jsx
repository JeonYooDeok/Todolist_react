import React from "react";

function Todoitem(props) {
  const { id, content, description, order, onDelete } = props;

  return (
    <div>
      {content}
      {description}
      <button onClick={onDelete}>삭제</button>
    </div>
  );
}

export default Todoitem;
