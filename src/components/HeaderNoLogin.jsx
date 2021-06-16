import HeaderLogin from "./HeaderLogin"

function HeaderNoLogin ({setLoginUser}){
    function logIn(){
        fetch(`http://localhost:4000/user/${document.forms["sign-in"]["username"].value}`)
        .then(response => {
            if (!response.ok) return alert("User not found")
            return response.json()})
        .then(data =>{
            if (data.password === document.forms["sign-in"]["password"].value) setLoginUser(data)
            else alert("Password incorrect")
        })
        
    }

    function displaySignUpForm(){
        document.getElementById("sign-up").style.display === "grid"
        ? document.getElementById("sign-up").style.display = "none"
        : document.getElementById("sign-up").style.display = "grid"
      }

      function signUp(){
          let newUser = {
            id: document.forms["sign-up"]["username"].value,
            name: document.forms["sign-up"]["name"].value,
            password: document.forms["sign-up"]["password"].value,
            accountBalance: Number(document.forms["sign-up"]["balance"].value),
            holdingCoins:[],
            pastTransactions:[]
          }

          fetch(`http://localhost:4000/user/`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),})
              .then(response => {
                if (!response.ok) return alert("Username existed")
                return response.json()})
            .then(data=> setLoginUser(data))

      }

    return(
        <header>
            <form id="sign-in" onSubmit={(e)=>{
                e.preventDefault()
                logIn()
                }}>
            <input id="username" name="username" type="text" placeholder="Username"/>
            <input name="password" type="password" placeholder="Password"/>
            <button type="submit">Sign in</button>
            </form>
            
            <div className="sign-up-container">
            <button className="sign-up-btn" onClick={()=>displaySignUpForm()}>Sign up for free</button>
            <form id="sign-up" className="sign-up-form" onSubmit={(e)=>{
                e.preventDefault()
                signUp()
            }}>
                <h2>Fill in details to start trading now!</h2>
            <input id="username" name="username" type="text" placeholder="Username" required/>
            <input name="password" type="password" placeholder="Password" required/>
            <input id="name" name="name" type="text" placeholder="Name" required/>
            <input name="balance" type="number" placeholder="Initial balance" required/>
            <button>Create Account</button>
            </form>
            </div>
            
        </header>
    )
}

export default HeaderNoLogin