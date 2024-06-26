import React, { useContext, createContext, useState } from 'react';

// 创建一个新的 Context
const SessionContext = createContext();

// 包装组件来提供值给 Context
const SessionProvider = ({ children }) => {
  // 管理会话数据的状态
const [session, setSession] = useState({
    isAuthenticated: false,
    user: null,
  });

  return (
    <SessionContext.Provider value={[session, setSession]}>
      {children}
    </SessionContext.Provider>
  );
};

// 自定义 Hook 函数用于访问 Context 中的值
const useSession = (
) => {
  const [session, setSession] = useContext(SessionContext);

  return [session, setSession];
};

// 登录组件，可以使用 useSession Hook 来更新会话数据
const Login = (
) => {
  const [session, setSession] = useSession();

  const handleLogin = (
) => {
    // 调用后端 API 进行登录逻辑，并更新会话数据
setSession({
      isAuthenticated: true,
      user: { id: 1, name: 'John Doe' },
    });
  };

  return (
    <div>
      <button onClick={handleLogin}>登录</button>
    </div>
  );
};

// 受保护组件，仅在用户已经登录时才会渲染
const ProtectedComponent = (
) => {
  const [session] = useSession();

  if (!session.isAuthenticated) {
    return <div>请先登录</div>;
  }

  return <div>受保护组件</div>;
};

// App 组件，将 SessionProvider 包裹在整个应用程序中
const App = (
) => {
  return (
    <SessionProvider>
      <Login />
      <ProtectedComponent />
    </SessionProvider>
  );
};

export default App;
