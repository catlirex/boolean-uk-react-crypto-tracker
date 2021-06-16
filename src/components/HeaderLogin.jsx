function HeaderLogin ({loginUser, setLoginUser,setSelectedMainView}){
    const{name, accountBalance}=loginUser
    return(
    <header>
      <h1>{name}</h1>
      <p>Account Balance £{accountBalance}</p>
      <button onClick={()=>setSelectedMainView("myCoins")}>Show my coins</button>
      <button onClick={()=>setSelectedMainView("myTransactions")}>Show past transactions</button>
      <button onClick={()=>setLoginUser(null)}>Log out</button>
    </header>
    )
}

export default HeaderLogin