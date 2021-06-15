import { useState } from "react";

import MainSection from "./components/MainSection";
import NewsFeedList from "./components/NewsFeedList";
import SideList from "./components/SideList";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [cryptoList, setCryptoList] = useState([])
  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
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
