let userData = {
    gold: 0,
    inv_id: 0,
    inventory: {},
    user_id: 0
}

async function getInventory(){
    let userId = localStorage.getItem("LootR-User")
    await axios.get(`/user/inv?userId=${userId}`).then(
        res =>{
            let {gold, inv_id, inventory, user_id} = res.data[0]
            userData.gold = gold
            userData.inv_id = inv_id
            userData.inventory = inventory
            userData.user_id = user_id
            //--------------dynamically loading the correct values into the UI
            let userInvGTotal = document.getElementById('gold-total')
            let username = localStorage.getItem("LootR-Username")
            let usernameForEquip = document.getElementById('username-for-equip')
            usernameForEquip.innerText = username
            userInvGTotal.innerText = userData.gold
        }
        ).catch(err => console.log(err))
    }

function toggleBreakdown(e){
    if(e.target.innerHTML === `TOGGLE SKILLS`){
        e.target.innerHTML = `TOGGLE ATTR.`
        return
    }else{
        e.target.innerHTML = `TOGGLE SKILLS`
        return
    }
}

function toggleMenu(){
    if(menuModal.classList.contains('hidden')){
        menuModal.classList.remove('hidden')
        menuModal.classList.add('visible')
        userStatBreakdown.classList.add('hidden')
    }else{
        menuModal.classList.remove('visible')
        userStatBreakdown.classList.remove('hidden')
        menuModal.classList.add('hidden')
    }
}

async function getRollPage(){
    await axios.get('/rollpage').then(
        res => {
            console.log(`rollpage get success`)
        }
    ).catch(err => console.log(err))
    window.location.href = '/rollpage'
}

async function getVendorPage(){
    await axios.get('/vendor').then(
        res => {
            console.log(`get vendor success`)
        }
    ).catch()
    window.location.href = '/vendor'
}

function logOut(){
    window.localStorage.removeItem("LootR-User")
    window.localStorage.removeItem("LootR-Username")
    window.location.href = '/'
}

let menuModal = document.getElementById('menu-modal-container')
menuModal.classList.add('hidden')

//We want the inventory on page load to populate, whether the user wants it or not. Although, this lets the AXIOS tag load in for everything else.
setTimeout(getInventory, 500)
    //------------------------------------------------------------------//
let userInvGTotal = document.getElementById('gold-total')
let username = localStorage.getItem("LootR-Username")
let usernameForEquip = document.getElementById('username-for-equip')
let toggleBreakdownBtn = document.getElementById('toggle-breakdown-btn')
let menuBtn = document.getElementById('menu')
let userStatBreakdown = document.getElementById('user-stat-breakdown')
let closeModal = document.getElementById('close-modal-button')
const logOutBtn = document.getElementById('log-out')
const rollpageBtn = document.getElementById('roll-page')
const vendorpageBtn = document.getElementById('vendor-page')



usernameForEquip.innerText = username
userInvGTotal.innerText = userData.gold

toggleBreakdownBtn.addEventListener('click', toggleBreakdown)
menuBtn.addEventListener('click', toggleMenu)
closeModal.addEventListener('click', toggleMenu)
logOutBtn.addEventListener('click', logOut)
rollpageBtn.addEventListener('click', getRollPage)
vendorpageBtn.addEventListener('click', getVendorPage)
