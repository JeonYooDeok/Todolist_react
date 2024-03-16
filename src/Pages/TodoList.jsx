import React, { useEffect, useState } from "react";
import Item from "../Components/Item";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { firestoreService } from "../firebase";
import { useCurrentUser } from "../Hooks/useCurrentUser";
import SignOut from "../Components/SignOut";

function TodoList() {
  const { currentUser } = useCurrentUser();
  const [todoItemList, setTodoItemList] = useState([]);

  //투두 조회
  const syncTodoItemListStateWithFirestore = () => {
    const q = query(
      collection(firestoreService, "todo"),
      where("userID", "==", currentUser),
      orderBy("createdTime")
    );

    getDocs(q).then(querySnapshot => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach(doc => {
        firestoreTodoItemList.push({
          id: doc.id,
          description: doc.data().description,
          done: doc.data().done,
          title: doc.data().title,
          userID: doc.data().userID
        });
      });
      setTodoItemList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    if (currentUser !== null) {
      syncTodoItemListStateWithFirestore();
    } else {
      setTodoItemList([]); // 로그아웃 시 todoItemList 초기화
    }
  }, [currentUser]);
  //투두 조회

  //투두 생성
  const createTodo = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const description = formData.get("description");

    await addDoc(collection(firestoreService, "todo"), {
      description: description,
      done: false,
      title: title,
      userID: currentUser,
      createdTime: Math.floor(Date.now() / 1000)
    });
    syncTodoItemListStateWithFirestore();
  };
  //투두 생성

  //투두 수정
  const onTodoItemClick = async clickedTodoItemId => {
    const clickedTodoItem = todoItemList.find(
      item => item.id === clickedTodoItemId
    );
    if (clickedTodoItem) {
      const todoItemRef = doc(firestoreService, "todo", clickedTodoItemId);
      await setDoc(
        todoItemRef,
        { done: !clickedTodoItem.done },
        { merge: true }
      );
      syncTodoItemListStateWithFirestore();
    }
  };
  //투두 수정

  //투두 삭제
  const onRemoveClick = async removedTodoItemId => {
    const removedTodoItem = todoItemList.find(
      item => item.id === removedTodoItemId
    );
    if (removedTodoItem) {
      const todoItemRef = doc(firestoreService, "todo", removedTodoItemId);
      await deleteDoc(todoItemRef);
      syncTodoItemListStateWithFirestore();
    }
  };
  //투두 삭제

  return (
    <div>
      <div>
        <h1>투두리스트</h1>
        <form onSubmit={createTodo}>
          <input
            type="text"
            placeholder="제목"
            name="title"
          />
          <input
            type="text"
            placeholder="내용"
            name="description"
          />
          <button>생성</button>
        </form>
      </div>
      {todoItemList.map(todoItem => (
        <Item
          key={todoItem.id}
          id={todoItem.id}
          title={todoItem.title}
          done={todoItem.done}
          description={todoItem.description}
          onTodoItemClick={onTodoItemClick}
          onRemoveClick={onRemoveClick}
        />
      ))}
      <SignOut />
    </div>
  );
}

export default TodoList;
