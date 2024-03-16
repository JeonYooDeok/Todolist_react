import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import TodoList from "./Pages/TodoList";
import { CurrentUserProvider } from "./Contexts/CurrentUserContext";

function App() {
  return (
    <CurrentUserProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login />}
          />
          <Route
            path="/SignUp"
            element={<SignUp />}
          />
          <Route
            path="/TodoList"
            element={<TodoList />}
          />
        </Routes>
      </BrowserRouter>
    </CurrentUserProvider>
  );
}

export default App;
