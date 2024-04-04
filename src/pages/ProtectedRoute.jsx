import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAutnContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthneticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthneticated) navigate("/");
    },
    [isAuthneticated, navigate]
  );

  return isAuthneticated ? children : null;
}
