import { useContext } from "react";
import { TodoContext } from "../Contexts/TodoContext";

//useModal 커스텀 훅을 정의
export const useTodo = () => {
  const context = useContext(TodoContext); //투두 컨텍스트를 가져오기
  if (!context) {
    //투두 컨텍스트가 없으면 오류를 발생
    throw new Error("useTodo은 투두 프로바이더 내에서 사용해야 합니다.");
  }
  return context; //투두 컨텍스트를 반환
};
