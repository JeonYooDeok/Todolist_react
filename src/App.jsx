import React, { useEffect } from "react";
import Todolist from "./Components/Todolist";
import Todolist_2 from "./Components/Todolist_2";
import Todolist_3 from "./Components/Todolist_3";
import Modal from "./Components/Modal";
import { ModalProvider } from "./Contexts/ModalContext";

function App() {
  return (
    <ModalProvider>
      <Todolist_3 />
      <Modal />
    </ModalProvider>
  );
}

export default App;
