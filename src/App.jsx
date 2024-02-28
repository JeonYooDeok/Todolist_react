import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter
} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Modal from "./Components/Modal";
import { ModalProvider } from "./Contexts/ModalContext";
import { TodoProvider } from "./Contexts/TodoContext";
import Todolist_3 from "./Components/Todolist_3";

function App() {
  return (
    <ModalProvider>
      <TodoProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              path="/Todolist_3"
              element={<Todolist_3 />}
            />
          </Routes>
          <Modal />
        </BrowserRouter>
      </TodoProvider>
    </ModalProvider>
  );
}

export default App;
