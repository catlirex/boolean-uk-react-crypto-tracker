import { useEffect, useState } from "react";

function replaceCoin(element, updatedElement) {
  if (element.id === updatedElement.id) return updatedElement;
  return element;
}

function patchUpdateUser(loginUserId, updatedUser) {
  return fetch(`http://localhost:4000/user/${loginUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  }).then((response) => response.json());
}

function TradingForm({
  currentPrice,
  loginUser,
  selectedCripto,
  setLoginUser,
}) {
  const [tradeAction, setTradeAction] = useState(null);
  const [tradeQuantity, setTradeQuantity] = useState(0);

  function trading(e) {
    let userCurrentStock = loginUser.holdingCoins.find(
      (coin) => coin.id === selectedCripto
    );

    if (
      tradeAction === "buy" &&
      loginUser.accountBalance - tradeQuantity * currentPrice < 0
    )
      return alert("Please Topup account before trading.");
    if (
      tradeAction === "sell" &&
      (userCurrentStock === undefined ||
        userCurrentStock.quantity < document.forms["trade"]["quantity"].value)
    )
      return alert("You don't have enough stock to sell.");

    if (tradeAction === "buy" && userCurrentStock === undefined) {
      let newCoinToAC = {
        id: selectedCripto,
        quantity: tradeQuantity,
        avgBuyInPrice: currentPrice,
      };

      let updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance - tradeQuantity * currentPrice,
        holdingCoins: [...loginUser.holdingCoins, newCoinToAC],
      };
      patchUpdateUser(loginUser.id, updatedUser).then((data) => {
        setLoginUser(data);
        e.target.reset();
        setTradeQuantity(0);
        setTradeAction(null);
      });
    }
    if (tradeAction === "buy" && userCurrentStock !== undefined) {
      let updatedCoinToAC = {
        id: selectedCripto,
        quantity: tradeQuantity + userCurrentStock.quantity,
        avgBuyInPrice:
          (currentPrice * tradeQuantity +
            userCurrentStock.quantity * userCurrentStock.avgBuyInPrice) /
          (tradeQuantity + userCurrentStock.quantity),
      };
      let updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance - tradeQuantity * currentPrice,
        holdingCoins: loginUser.holdingCoins.map((coin) =>
          replaceCoin(coin, updatedCoinToAC)
        ),
      };
      patchUpdateUser(loginUser.id, updatedUser).then((data) => {
        setLoginUser(data);
        e.target.reset();
        setTradeQuantity(0);
        setTradeAction(null);
      });
    }

    if (tradeAction === "sell" && userCurrentStock.quantity === tradeQuantity) {
      let updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance + tradeQuantity * currentPrice,
        holdingCoins: loginUser.holdingCoins.filter(
          (coin) => coin.id !== selectedCripto
        ),
      };
      patchUpdateUser(loginUser.id, updatedUser).then((data) => {
        setLoginUser(data);
        e.target.reset();
        setTradeQuantity(0);
        setTradeAction(null);
      });
    }

    if (tradeAction === "sell" && userCurrentStock.quantity > tradeQuantity) {
      let updatedCoinToAC = {
        ...userCurrentStock,
        quantity: userCurrentStock.quantity - tradeQuantity,
      };
      let updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance + tradeQuantity * currentPrice,
        holdingCoins: loginUser.holdingCoins.map((coin) =>
          replaceCoin(coin, updatedCoinToAC)
        ),
      };
      patchUpdateUser(loginUser.id, updatedUser).then((data) => {
        setLoginUser(data);
        e.target.reset();
        setTradeQuantity(0);
        setTradeAction(null);
      });
    }
  }

  return (
    <form
      id="trade"
      onSubmit={(e) => {
        e.preventDefault();
        loginUser ? trading(e) : alert("Please login");
      }}
    >
      <h2>Trade Now</h2>
      <div>
        <input
          type="radio"
          id="buy"
          name="action"
          value="buy"
          required
          onChange={(e) => setTradeAction(e.target.value)}
        />
        <label htmlFor="buy">Buy</label>
        <input
          type="radio"
          id="sell"
          name="action"
          value="sell"
          onChange={(e) => setTradeAction(e.target.value)}
        />
        <label htmlFor="sell">Sell</label>
      </div>
      <div className="quantity-container">
        <label htmlFor="quantity">Quantity</label>
        <input
          name="quantity"
          type="number"
          placeholder="0"
          min="1"
          required
          onChange={(e) => setTradeQuantity(Number(e.target.value))}
        />
      </div>
      <span>Trade Value: £ {tradeQuantity * currentPrice}</span>

      <span>
        A/C Balance: £{" "}
        {loginUser
          ? tradeAction === "buy"
            ? (loginUser.accountBalance - tradeQuantity * currentPrice).toFixed(
                4
              )
            : tradeAction === "sell"
            ? (loginUser.accountBalance + tradeQuantity * currentPrice).toFixed(
                4
              )
            : loginUser.accountBalance.toFixed(4)
          : "Please login"}
      </span>
      <span>
        Stock owned:{" "}
        {loginUser
          ? loginUser.holdingCoins.find(
              (coin) => coin.id === selectedCripto
            ) !== undefined
            ? loginUser.holdingCoins.find((coin) => coin.id === selectedCripto)
                .quantity
            : 0
          : "n/a"}
      </span>
      {loginUser ? (
        loginUser.holdingCoins.find((coin) => coin.id === selectedCripto) !==
        undefined ? (
          <span>
            Average Buy in price:{" "}
            {
              loginUser.holdingCoins.find((coin) => coin.id === selectedCripto)
                .avgBuyInPrice
            }
          </span>
        ) : null
      ) : null}

      <button type="submit">Trade</button>
    </form>
  );
}

export default TradingForm;
