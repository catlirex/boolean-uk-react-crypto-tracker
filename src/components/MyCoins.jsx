function MyCoins({
  loginUser,
  cryptoList,
  setSelectedMainView,
  setSelectedCripto,
}) {
  return (
    <main className="my-coin">
      <h1>My Coins</h1>
      <ul>
        <li>
          <span>
            <b>Symbol</b>
          </span>
          <span>
            <b>Quantity</b>
          </span>
          <span>
            <b>Avg. buy price</b>
          </span>
          <span>
            <b>Current Price</b>
          </span>
        </li>
        {loginUser.holdingCoins.length === 0 ? (
          <h2>You have no stock, start trading today!</h2>
        ) : (
          loginUser.holdingCoins.map((coin) => {
            let coinCurrentPrice = cryptoList.find(
              (target) => target.id === coin.id
            ).currentPrice;
            return (
              <li>
                <span>{coin.id}</span>
                <span>{coin.quantity}</span>
                <span>{coin.avgBuyInPrice}</span>
                <span>{coinCurrentPrice}</span>
                <button
                  onClick={() => {
                    setSelectedMainView("coinDetail");
                    setSelectedCripto(coin.id);
                  }}
                >
                  Trade Now
                </button>
              </li>
            );
          })
        )}
      </ul>
    </main>
  );
}

export default MyCoins;
