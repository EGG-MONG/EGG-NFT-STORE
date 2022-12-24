import NavBar from "./components/NavBar";
import useWeb3 from "../src/hooks/useWeb3";
import { Routes, Route } from "react-router-dom";
import { Minting, MyPage, Shop, Detail } from "./pages";

function App() {
  // const [web3, account] = useWeb3();
  useWeb3();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Minting /*web3={web3} account={account}*/ />} />
        <Route
          path="/mypage"
          element={<MyPage /*web3={web3} account={account}*/ />}
        />
        <Route path="/shop" element={<Shop />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
