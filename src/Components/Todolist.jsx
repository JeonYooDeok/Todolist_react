import React, { useEffect, useRef, useState } from "react";
import Todoitem from "./Todoitem";

function Todolist() {
  //투두리스트 상태관리 시작//
  const [todoList, setTodoList] = useState([]);
  //투두리스트 상태관리 끝//

  //투두 제목과 상세설명 인풋값 상태관리 시작//
  const [inputs, setInputs] = useState({
    // useState를 한 번만 사용하기 위해 두 개의 인풋값을 객체형태로 관리
    title: "",
    description: ""
  });
  const { title, description } = inputs;
  //투두 제목과 상세설명 인풋값 상태관리 끝//

  //아이디 값 관리 시작//
  const nextId = useRef("1");
  //아이디 값 관리 끝

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

  //투두리스트 조회 시작//
  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const result = await response.json();
        if (response.ok) {
          setTodoList(result);
        } else {
          throw new Error("투두리스트 불러오기 실패");
        }
      } catch (error) {
        console.error("에러발생", error);
      }
    };
    fetchTodoList();
  }, []);
  //투두리스트 조회 끝//

  //투두리스트 추가 시작//
  const addTodo = async () => {
    try {
      const addTodoItem = {
        id: nextId.current,
        title: inputs.title,
        description: inputs.description,
        done: false,
        order: todoList.length + 1
      };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(addTodoItem)
      });
      const result = await response.json();
      if (response.ok) {
        // setTodoList(prevTodoList => prevTodoList.concat(result));
        (nextId.current += 1).toString;
        setTodoList(todoList.concat(result));
        onReset();
      } else {
        throw new Error("투두리스트 추가 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  };
  //투두리스트 추가 끝//

  //투두리스트 삭제 시작//
  const deleteTodo = async id => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        // setTodoList(prevTodoList =>
        //   prevTodoList.filter(todo => todo.id !== id)
        // );
        setTodoList(todoList.filter(todo => todo.id !== id));
      } else {
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  };
  //투두리스트 삭제 끝//

  return (
    <div>
      <input
        type="text"
        name="title"
        value={title}
        placeholder="제목"
        onChange={onChange}
      />
      <textarea
        type="text"
        name="description"
        value={description}
        placeholder="설명"
        onChange={onChange}
      />
      <button onClick={addTodo}>등록</button>
      {todoList.map(item => (
        <Todoitem
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          done={item.done}
          order={item.order}
          onDelete={() => deleteTodo(item.id)}
        />
      ))}
    </div>
  );
}

export default Todolist;

// 가져오기 요청 중 오류: 첫 번째 catch 블록(catch (error))은 네트워크 오류, 서버 오류 또는 HTTP 생성과 관련된 문제 등 가져오기 요청 중에 발생하는 모든 오류를 포착합니다. 요청 자체.
// 응답 구문 분석 오류: 두 번째 catch 블록(catch (error))은 await response.json()을 사용하여 응답 본문을 JSON으로 구문 분석하는 동안 발생하는 오류를 포착합니다. 응답 본문이 유효한 JSON이 아니거나 JSON 데이터 구문 분석에 문제가 있는 경우 이런 일이 발생할 수 있습니다.

// 첫 번째 catch 블록은 네트워크 오류나 서버 오류 등 가져오기 요청 자체와 관련된 오류를 처리합니다.
// 두 번째 catch 블록은 응답 본문을 JSON으로 구문 분석하는 것과 관련된 오류를 처리합니다.
