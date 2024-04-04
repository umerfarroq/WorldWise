import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthneticated: false,
  message: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthneticated: true };

    case "logout":
      return { ...state, user: null, isAuthneticated: false };

    case "error":
      return { ...state, message: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthneticated, message }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
    if (email !== FAKE_USER.email || password !== FAKE_USER.password)
      alert("login credentials does not match");

    dispatch({ type: "error", payload: "login credentials does not match" });
    console.log("login function called");
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthneticated, login, logout, message }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("context was used outside of AuthProvider  ");

  return context;
}

export { AuthProvider, useAuth };
