import { useContext } from "react";
import { InputContext } from "../Contexts/InputContext";

//useModal 커스텀 훅을 정의
export const useInput = () => {
  const context = useContext(InputContext); //인풋 컨텍스트를 가져오기
  if (!context) {
    //인풋 컨텍스트가 없으면 오류를 발생
    throw new Error("useInput은 인풋 프로바이더 내에서 사용해야 합니다.");
  }
  return context; //인풋 컨텍스트를 반환
};
