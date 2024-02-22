import { createContext, useState } from "react";

//모달상태를 관리할 컨텍스트를 생성
const ModalContext = createContext();

//모달 컨텍스트를 제공하는 컴포넌트
function ModalProvider({ children }) {
  //모달이 열려있는지 여부와 모달의 내용을 상태로 관리
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  //모달을 열기 위한 함수
  const openModal = content => {
    setModalContent(content); //모달 내용을 설정
    setIsOpen(true); //모달을 열기 위해 isOpen을 true로 설정
  };

  //모달을 닫기 위한 함수
  const closeModal = () => {
    setIsOpen(false); //모달을 닫기 위해 isOpen을 false로 설정
    setModalContent(null); //모달 내용을 초기화
  };

  //ModalContext.Provider를 통해 모달 컨텍스트를 하위 컴포넌트에 제공
  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContext, ModalProvider };
