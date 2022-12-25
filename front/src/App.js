import NavBar from "./components/NavBar";
import useContractEvent from "./hooks/useContractEvent";
import { Routes, Route } from "react-router-dom";
import { Minting, MyPage, Shop, Detail } from "./pages";
import useWeb3 from "./hooks/useWeb3";

function App() {
  // account 변경, 솔리디티 log 이벤트 구독 등 
  // useContractEvent();
  // const [web3, account] = useWeb3();

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
