let submit = document.getElementById('signup-form')

async function signThemUp(e){
    e.preventDefault()
    let username = e.target.username.value
    let password = e.target.password.value

    if(username === '' || password === ''){
        alert(`Username and Password cannot be left blank!`)
    }
    else{

        try{
            await axios.post(`/register`, {username: `${username}`, password: `${password}`}).then(
                res => {
                    console.log(res.data)
                }
            )
        }catch(err){
            console.log(err)
        }

    }



    e.target.reset()
    window.location.href = '/'
}


submit.addEventListener('submit', signThemUp)