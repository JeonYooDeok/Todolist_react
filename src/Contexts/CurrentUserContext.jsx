import { onAuthStateChanged } from "firebase/auth";
import { createContext, useState } from "react";
import { authService } from "../firebase";

//모달상태를 관리할 컨텍스트를 생성
const CurrentUserContext = createContext();

//모달 컨텍스트를 제공하는 컴포넌트
function CurrentUserProvider({ children }) {
  //모달이 열려있는지 여부와 모달의 내용을 상태로 관리
  const [currentUser, setCurrentUser] = useState(null);

  //유저아이디 조회
  onAuthStateChanged(authService, user => {
    if (user) {
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
    console.log(currentUser);
  });
  //유저아이디 조회

  //ModalContext.Provider를 통해 모달 컨텍스트를 하위 컴포넌트에 제공
  return (
    <CurrentUserContext.Provider value={{ currentUser, onAuthStateChanged }}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export { CurrentUserContext, CurrentUserProvider };
