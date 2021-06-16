function HeaderLogin ({loginUser, setLoginUser}){
    const{name, accountBalance}=loginUser
    return(
    <header>
      <h1>{name}</h1>
      <p>Account Balance £{accountBalance}</p>
      <button>Show my coins</button>
      <button onClick={()=>setLoginUser(null)}>Log out</button>
    </header>
    )
}

export default HeaderLogin