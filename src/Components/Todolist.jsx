import React, { useEffect, useState } from "react";
import Todoitem from "./Todoitem";

function Todolist() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const result = await response.json();
        if (response.ok) {
          setTodoList(result);
        } else {
          throw new Error("투두리스트 불러오기 실패");
        }
      } catch (error) {
        console.error("에러발생", error);
      }
    };
    fetchTodoList();
  }, []);

  const deleteTodo = async id => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setTodoList(prevTodoList =>
          prevTodoList.filter(todo => todo.id !== id)
        );
      } else {
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  };

  return (
    <div>
      {todoList.map(item => (
        <Todoitem
          key={item.id}
          id={item.id}
          content={item.content}
          description={item.description}
          order={item.order}
          onDelete={() => deleteTodo(item.id)}
        />
      ))}
    </div>
  );
}

export default Todolist;
