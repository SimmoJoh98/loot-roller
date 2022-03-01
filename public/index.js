let submit = document.getElementById('login-info')

async function loginHandler(e){
    e.preventDefault()
    const username = e.target.username.value
    let password = e.target.password.value
    let userId = 0
    let loggedIn = false

    if(username === '' || password === ''){
        alert(`username and password cannot be left blank!`)
    }else{

        try{
            await axios.get(`/login?username=${username}&password=${password}`).then(
                res => {
                    let userTmp = res.data[0]
                    userId = userTmp.user_id
                    loggedIn = true
                }
            )
        }catch(err){
            console.log(err)
        }

    }
    console.log(userId)
    e.target.reset()
}


submit.addEventListener('submit', loginHandler)