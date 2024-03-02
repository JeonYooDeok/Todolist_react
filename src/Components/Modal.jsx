import React from "react";
import { useModal } from "../Hooks/useModal";
import ModalAddTodo from "./ModalAddTodo";
import ModalModify from "./ModalModify";
import ModalLogin from "./ModalLogin";
import ModalSignIn from "./ModalSignIn";

function Modal() {
  const { isOpen, closeModal, modalContent } = useModal(); // 모달 관련 상태 및 함수 가져오기

  return (
    <>
      {isOpen && ( // isOpen 상태가 true일 때만 모달 렌더링
        <div>
          {modalContent === "ModalAddTodo" && <ModalAddTodo />}
          {modalContent === "ModalModify" && <ModalModify />}
          {modalContent === "ModalLogin" && <ModalLogin />}
          {modalContent === "ModalSignIn" && <ModalSignIn />}
          <button onClick={closeModal}>취소</button>
        </div>
      )}
    </>
  );
}

export default Modal;
