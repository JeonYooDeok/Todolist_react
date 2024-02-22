import { createContext, useState } from "react";

//모달상태를 관리할 컨텍스트를 생성
const InputContext = createContext();

//모달 컨텍스트를 제공하는 컴포넌트
function InputProvider({ children }) {
  //모달이 열려있는지 여부와 모달의 내용을 상태로 관리
  const [inputs, setInputs] = useState({
    // useState를 한 번만 사용하기 위해 두 개의 인풋값을 객체형태로 관리
    title: "",
    description: ""
  });

  //인풋값 조회 시작//
  const onChange = e => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };
  // 이 함수는 input 요소의 변경 이벤트가 발생할 때 호출
  // 변경 이벤트가 발생하면 e라는 이벤트 객체가 생성
  // 해당 객체에서 target 속성을 통해 이벤트가 발생한 input 요소에 접근
  // e.target을 통해 얻은 input 요소의 name 속성과 value 속성을 추출
  // 여기서 name은 input 요소의 이름, value는 해당 input 요소의 현재 값
  // 다음으로, setInputs 함수를 호출하여 inputs 상태를 업데이트
  // 기존의 inputs 객체를 spread 문법을 사용하여 전개
  // 변경된 input 요소의 이름과 값을 갖는 새로운 프로퍼티를 추가
  // 이를 통해 기존 상태를 변경하지 않으면서 새로운 상태를 생성하고 업데이트
  // 이렇게 함으로써, input 요소의 값이 변경될 때마다 inputs 상태가 업데이트
  // 입력된 값들이 실시간으로 반영, 상태를 업데이트할 때마다 UI가 자동으로 다시 렌더링

  //인풋값 조회 끝//

  //인풋에 작성되어 있는 값 초기화 시작//
  const onReset = () => {
    setInputs({
      title: "",
      description: ""
    });
  };
  //인풋에 작성되어 있는 값 초기화 끝//

  //ModalContext.Provider를 통해 모달 컨텍스트를 하위 컴포넌트에 제공
  return (
    <InputContext.Provider value={{ inputs, onChange, onReset }}>
      {children}
    </InputContext.Provider>
  );
}

export { InputContext, InputProvider };
