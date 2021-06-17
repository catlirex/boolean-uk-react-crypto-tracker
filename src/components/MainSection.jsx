import { useEffect, useState } from "react";

import UpdateSection from "./UpdateSection";
import TradingForm from "./TradingForm";

function getCurrentTime() {
  return Math.round(Date.now() / 1000);
}

function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

function MainSection({
  loginUser,
  selectedCripto,
  cryptoList,
  setCryptoList,
  setSelectedCripto,
  setLoginUser,
}) {
  let selectedCriptoDetail = cryptoList.find(
    (coin) => selectedCripto === coin.id
  );
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  const updatedTimeAgo =
    currentTime - convertToSeconds(selectedCriptoDetail.lastUpdate);

  useEffect(() => {
    const intervalId = setInterval(
      () => setCurrentTime(getCurrentTime()),
      1000
    );
    return () => {
      console.log("MainDetail is unmounting!");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="main-detail__central">
      <div className="main-detail__update">
        <UpdateSection
          selectedCripto={selectedCripto}
          cryptoList={cryptoList}
          setCryptoList={setCryptoList}
          setSelectedCripto={setSelectedCripto}
        />
      </div>
      <div className="main-detail__name">
        <h2>{selectedCriptoDetail.name}</h2>
        <p>
          <span className="small">a.k.a </span>
          {selectedCriptoDetail.symbol.toUpperCase()}
        </p>
      </div>
      <div className="main-detail__price">
        <p>£{selectedCriptoDetail.currentPrice}</p>
        <p>Updated {updatedTimeAgo} seconds ago</p>

        <TradingForm
          setLoginUser={setLoginUser}
          selectedCripto={selectedCripto}
          loginUser={loginUser}
          currentPrice={selectedCriptoDetail.currentPrice}
        />
      </div>
    </section>
  );
}

export default MainSection;
