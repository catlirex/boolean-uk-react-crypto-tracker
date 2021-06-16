import { useState } from "react";
import HeaderLogin from "./components/HeaderLogin";
import HeaderNoLogin from "./components/HeaderNoLogin";

import MainSection from "./components/MainSection";
import NewsFeedList from "./components/NewsFeedList";
import SideList from "./components/SideList";

function App() {

  const [selectedCripto, setSelectedCripto] = useState(null);
  const [cryptoList, setCryptoList] = useState([])
  const [loginUser, setLoginUser] = useState(null)
 
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
    {(loginUser)
    ?<HeaderLogin
    loginUser={loginUser}
    setLoginUser={setLoginUser}/> 
    : <HeaderNoLogin
    setLoginUser={setLoginUser}/>}
    
      <aside className="side-list">
        <SideList 
        cryptoList={cryptoList}
        setCryptoList={setCryptoList}
        isSelectedCripto={isSelectedCripto}
        setSelectedCripto={setSelectedCripto}/>
      </aside>
      <main className="main-detail">
        {selectedCripto
          ? <MainSection
          selectedCripto={selectedCripto}
          cryptoList={cryptoList}
          setCryptoList={setCryptoList}
          setSelectedCripto={setSelectedCripto}
          />
          : "Select a coin bro!"}

         <NewsFeedList/>
      </main>
    </>
  );
}

export default App;
