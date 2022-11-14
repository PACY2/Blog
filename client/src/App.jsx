import Home from "./features/Home/Home";
import { Routes, Route } from "react-router-dom";
import Error_404 from "./components/Error_404";
import Login from "./features/Auth/Login";
import Register from "./features/Auth/Register";
import Auth from "./features/layouts/Auth";
import Main from "./features/layouts/Main";

function App() {
  return (
    <div className="App min-h-screen bg-background text-white flex items-stretch">
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<Auth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/*" element={<Error_404 />} />
      </Routes>
    </div>
  );
}

export default App;
