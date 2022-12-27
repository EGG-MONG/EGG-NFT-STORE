import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { Minting, MyPage, Shop, Detail } from "./pages";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Transaction from "./pages/Transaction";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Minting />}
        />
        <Route
          path="/mypage"
          element={<MyPage />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/*" element={<Detail />} />
        <Route path="/transaction/*" element={<Transaction />} />
      </Routes>
    </div>
  );
}

export default App;
