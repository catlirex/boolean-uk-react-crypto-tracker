import { useEffect, useState } from "react"

import UpdateSection from "./UpdateSection"
import TradingForm from "./TradingForm"

function currentTime() {
    return Math.round(Date.now() / 1000);
  }

function convertToSeconds(dateValue) {
    // This guard is needed due to the API discrepancies in handling dates
    return typeof dateValue === "string"
      ? Math.round(Date.parse(dateValue) / 1000)
      : dateValue;
  }  

function MainSection ({loginUser, selectedCripto, cryptoList, setCryptoList, setSelectedCripto}){
    
    let selectedCriptoDetail = cryptoList.find(coin=> selectedCripto === coin.id)
    const [updateTime, setUpdateTime] = useState(0)

    const up = () => {
        setUpdateTime(timeOnPageFromReact => {
          return timeOnPageFromReact + 1
        })
      }

    useEffect(()=>{
        let current = currentTime()
        let convertedUpdateTime = convertToSeconds(selectedCriptoDetail.lastUpdate)
        let updateSecond = (current-convertedUpdateTime)
        setUpdateTime(updateSecond)
        const intervalId = setInterval(up, 1000)
        return () => clearInterval(intervalId)
    }, [selectedCripto])
        

    return (
        <section className="main-detail__central">
            <div className="main-detail__update">
                <UpdateSection
                selectedCripto={selectedCripto}
                cryptoList={cryptoList}
                setCryptoList={setCryptoList}
                setSelectedCripto={setSelectedCripto}/>
            </div>
            <div className="main-detail__name">
                <h2>{selectedCriptoDetail.name}</h2>
                <p><span className="small">a.k.a </span>{selectedCriptoDetail.symbol.toUpperCase()}</p>
            </div>
            <div className="main-detail__price">
                <p>£{selectedCriptoDetail.currentPrice}</p>
                <p>Updated {updateTime} seconds ago</p>

            <TradingForm
            selectedCripto={selectedCripto}
            loginUser={loginUser}
            currentPrice={selectedCriptoDetail.currentPrice}/>
            </div>
            </section>

    )
}

export default MainSection