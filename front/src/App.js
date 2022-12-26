import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { Minting, MyPage, Shop, Detail } from "./pages";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Minting /*web3={web3} account={account}*/ />}
        />
        <Route
          path="/mypage"
          element={<MyPage /*web3={web3} account={account}*/ />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail/*" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
