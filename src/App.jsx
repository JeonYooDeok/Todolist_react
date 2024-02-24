import React, { useEffect } from "react";
import Todolist from "./Components/Todolist";
import Todolist_2 from "./Components/Todolist_2";
import Todolist_3 from "./Components/Todolist_3";
import Modal from "./Components/Modal";
import { ModalProvider } from "./Contexts/ModalContext";
import { TodoProvider } from "./Contexts/TodoContext";

function App() {
  return (
    <ModalProvider>
      <TodoProvider>
        <Todolist_3 />
        <Modal />
      </TodoProvider>
    </ModalProvider>
  );
}

export default App;
