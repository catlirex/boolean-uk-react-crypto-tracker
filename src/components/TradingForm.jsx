import { useEffect, useState } from "react"

function TradingForm({currentPrice, loginUser, selectedCripto}){

    const [tradingValue, setTradingValue] = useState(0)
    const [tradeAction, setTradeAction] = useState(null)
  
    
    return(
        <form id="trade" onSubmit={(e)=> e.preventDefault()}>
                  <h2>Trade Now</h2>
                  <div>
                    <input type="radio" id="buy" name="action" value="buy" required onChange={(e)=>setTradeAction(e.target.value)}/>
                    <label for="buy">Buy</label>
                    <input type="radio" id="sell" name="action" value="sell" onChange={(e)=>setTradeAction(e.target.value)}/>
                    <label for="sell">Sell</label>
                  </div>
                  <div className="quantity-container">
                  <label htmlFor="quantity">Quantity</label>
                  <input name="quantity" type="number" placeholder="0" required onChange={(e)=>setTradingValue(currentPrice * e.target.value)}/>
                  </div>
                  <span>Stock owned: {loginUser? loginUser.holdingCoins.find(coin=> coin.id===selectedCripto).quantity: "n/a"}</span>
                  <span>Value: £ {tradingValue}</span>
                  <span>A/C Balance: £ {loginUser? tradeAction==="buy"? loginUser.accountBalance-tradingValue: tradeAction==="sell"?loginUser.accountBalance+tradingValue:loginUser.accountBalance : "Please sign in"}</span>
                  <button type="submit">Trade</button>

                </form>
    )
}

export default TradingForm 