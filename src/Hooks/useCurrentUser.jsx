import { useContext } from "react";
import { CurrentUserContext } from "../Contexts/CurrentUserContext";

//useModal 커스텀 훅을 정의
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext); //모달 컨텍스트를 가져오기
  if (!context) {
    //모달 컨텍스트가 없으면 오류를 발생
    throw new Error("useModal은 모달 프로바이더 내에서 사용해야 합니다.");
  }
  return context; //모달 컨텍스트를 반환
};
