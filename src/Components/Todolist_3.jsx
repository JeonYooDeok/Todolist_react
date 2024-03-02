//useReducer를 이용한 상태관리
import Todoitem from "./Todoitem";
import { useModal } from "../Hooks/useModal";
import { useTodo } from "../Hooks/useTodo";
import { useEffect } from "react";

function Todolist_3() {
  const { openModal } = useModal();
  const { fetchTodoList, todoList, toggleDone, deleteTodo } = useTodo();
  useEffect(() => {
    fetchTodoList;
  }, []);

  return (
    <div>
      <button onClick={() => openModal("ModalAddTodo")}>할 일 등록</button>

      {todoList.map(item => (
        <Todoitem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          done={item.done}
          order={item.order}
          onChangeDone={() => toggleDone(item.id)}
          onDelete={() => deleteTodo(item.id)}
        />
      ))}
    </div>
  );
}

export default Todolist_3;
