//useReducer를 이용한 상태관리
import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";
import { useModal } from "../Hooks/useModal";

const TodoContext = createContext();

//useReducer를 통한 상태 관리(초기값 설정) 시작//
const initialState = {
  todoList: [], //할 일 목록을 빈 배열로 초기화
  inputs: {
    title: "", //제목값 빈문자로 초기화
    description: "" //설명값 빈문자로 초기화
  }
};
//useReducer를 통한 상태 관리(초기값 설정) 시작//

//reducer 함수 정의 시작//
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TODO_LIST": //투두리스트 조회 액션
      return {
        ...state,
        todoList: action.payload.todoList, //서버에서 받아온 모든 할 일을 상태에 업데이트
        nextId: String(action.payload.nextId) //다음 추가될 할 일의 ID설정
      };
    case "ADD_TODO": //할 일 추가 액션
      return {
        ...state,
        todoList: [...state.todoList, action.payload], //새로운 할 일을 추가하고 기존 항목들과 함께 상태를 업데이트
        inputs: initialState.inputs, //인풋 초기화
        nextId: String(Number(state.nextId) + 1) //다음 추가될 할 일의 ID 업데이트
      };

    case "MODIFY_TODO":
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
        inputs: initialState.inputs //인풋 초기화
      };

    case "TOGGLE_DONE": //완료여부 토글 액션
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
        ) //해당 할 일의 완료여부 속성을 토글하여 상태를 업데이트
      };
    case "DELETE_TODO": //할 일 삭제 액션
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload) //해당 ID를 가진 할 일을 제외하고 상태를 업데이트
      };
    case "HANDLE_INPUT_CHANGE": //인풋값 변경 액션
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.name]: action.payload.value
        }
      };
    default:
      return state;
  }
};
//reducer 함수 정의 끝//

function TodoProvider({ children }) {
  const { closeModal } = useModal();
  const [selectedId, setSelectedId] = useState(null);

  const updateSelectedId = useCallback(id => {
    setSelectedId(id);
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  //state안에는 initialState의 todoList와 inputs가 들어있음
  //useReducer 훅을 사용하여 상태를 관리
  //reducer 함수를 사용하여 상태를 업데이트

  const { todoList } = state;
  // state 객체에서 allList와 inputs를 추출하여 변수로 선언

  const { title, description } = state.inputs;
  // inputs 객체에서 title과 description을 추출하여 변수로 선언

  const nextId = useRef(null);
  // useRef 훅을 사용하여 nextId 변수를 초기화
  // nextId.current는 다음에 추가될 할 일 항목의 ID를 추적하는 데 사용

  //인풋값 조회 시작//
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({ type: "HANDLE_INPUT_CHANGE", payload: { name, value } });
  }, []);
  //useCallback을 사용하는 것과 사용하지 않는 것 사이의 주요 차이점은 함수의 재생성 여부
  //useCallback을 사용하는 경우:
  //useCallback을 사용하면 함수가 컴포넌트가 렌더링될 때마다 새로 생성되지 않음
  //이는 함수가 의존성이 변경되지 않는 한 동일한 함수 인스턴스를 반환하므로 불필요한 재랜더링을 방지
  //위의 코드에서는 onChange 함수가 입력 값이 변경될 때마다 동일한 함수 인스턴스를 반환하도록 만듦
  //이는 입력 값이 변경되어도 onChange 함수가 다시 생성되지 않고 동일한 콜백 함수가 유지
  //useCallback을 사용하지 않는 경우:
  //useCallback을 사용하지 않으면 함수가 컴포넌트가 렌더링될 때마다 새로 생성
  //따라서 매 렌더링마다 새로운 함수 인스턴스가 생성
  //즉 자식 컴포넌트가 불필요하게 재랜더링될 수 있음
  //따라서 입력 값이 변경될 때마다 함수가 재생성되지 않도록 하려면 useCallback을 사용하는 것이 좋다
  //인풋값 조회 끝

  //투두리스트 조회 시작//
  const fetchTodoList = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const result = await response.json();
      if (response.ok) {
        const maxId = result.reduce(
          (max, todo) => Math.max(max, Number(todo.id)),
          0
        );
        nextId.current = String(maxId + 1);
        dispatch({
          type: "FETCH_TODO_LIST",
          payload: { todoList: result, nextId: maxId + 1 }
        });
      } else {
        throw new Error("투두리스트 불러오기 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  };
  useEffect(() => {
    fetchTodoList();
  }, []);
  //투두리스트 조회 끝//

  //투두리스트 추가 시작//
  const addTodo = async () => {
    try {
      const addTodoItem = {
        id: nextId.current,
        title,
        description,
        done: false,
        order: todoList.length + 1
      };
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        body: JSON.stringify(addTodoItem)
      });
      const result = await response.json();
      if (response.ok) {
        nextId.current = String(Number(nextId.current) + 1);
        dispatch({ type: "ADD_TODO", payload: result });
      } else {
        throw new Error("투두리스트 추가 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    } finally {
      closeModal();
    }
  };
  //투두리스트 추가 끝

  const modifyTodo = async () => {
    try {
      const modifyTodoItem = {
        title,
        description
      };
      const response = await fetch(
        `http://localhost:3000/todos/${selectedId}`,
        {
          method: "PATCH",
          body: JSON.stringify(modifyTodoItem)
        }
      );
      const result = await response.json();
      if (response.ok) {
        dispatch({ type: "MODIFY_TODO", payload: result });
      } else {
        throw new Error("할 일 수정 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    } finally {
      closeModal();
    }
  };

  //완료 여부 수정 시작//
  const toggleDone = async id => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          done: !todoList.find(todo => todo.id === id).done
        })
      });
      if (response.ok) {
        dispatch({ type: "TOGGLE_DONE", payload: id });
      } else {
        throw new Error("완료 여부 수정 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  };
  //완료 여부 수정 끝//

  //투두리스트 삭제 시작//
  const deleteTodo = async id => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        nextId.current = String(Number(nextId.current) - 1);
        dispatch({ type: "DELETE_TODO", payload: id });
      } else {
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("에러발생", error);
    }
  };
  //투두리스트 삭제 끝//

  return (
    <TodoContext.Provider
      value={{
        initialState,
        selectedId,
        title,
        description,
        todoList,
        onChange,
        fetchTodoList,
        addTodo,
        updateSelectedId,
        modifyTodo,
        toggleDone,
        deleteTodo
      }}>
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

// 가져오기 요청 중 오류: 첫 번째 catch 블록(catch (error))은 네트워크 오류, 서버 오류 또는 HTTP 생성과 관련된 문제 등 가져오기 요청 중에 발생하는 모든 오류를 포착합니다. 요청 자체.
// 응답 구문 분석 오류: 두 번째 catch 블록(catch (error))은 await response.json()을 사용하여 응답 본문을 JSON으로 구문 분석하는 동안 발생하는 오류를 포착합니다. 응답 본문이 유효한 JSON이 아니거나 JSON 데이터 구문 분석에 문제가 있는 경우 이런 일이 발생할 수 있습니다.

// 첫 번째 catch 블록은 네트워크 오류나 서버 오류 등 가져오기 요청 자체와 관련된 오류를 처리합니다.
// 두 번째 catch 블록은 응답 본문을 JSON으로 구문 분석하는 것과 관련된 오류를 처리합니다.
