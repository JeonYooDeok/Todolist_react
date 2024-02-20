import React, { createContext, useContext, useState } from "react";

const MyContext = createContext(
  "컨텍스트 기본값(프로바이더의 밸류 확인하세요)"
);

function Child() {
  const text = useContext(MyContext);
  return <div>안녕하세요 {text}</div>;
}

function Parent() {
  return <Child />;
}

function GrandParent() {
  return <Parent />;
}

function ContextSample() {
  const [value, setValue] = useState(true);
  return (
    <MyContext.Provider value={value ? "GOOD" : "BAD"}>
      <GrandParent />
      <button onClick={() => setValue(!value)}>토글</button>
    </MyContext.Provider>
  );
}

export default ContextSample;
