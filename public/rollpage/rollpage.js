function toggleMenu(){
    if(menuModal.classList.contains('hidden')){
        menuModal.classList.remove('hidden')
        menuModal.classList.add('visible')
    }else{
        menuModal.classList.remove('visible')
        menuModal.classList.add('hidden')
    }
}

async function getInventoryPage(){
    window.location.href = '/home'
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

let menuBtn = document.getElementById('menu') 
let closeModal = document.getElementById('close-modal-button')
const logOutBtn = document.getElementById('log-out')
const inventoryBtn = document.getElementById('inventory')
const vendorpageBtn = document.getElementById('vendor-page')
menuBtn.addEventListener('click', toggleMenu)
closeModal.addEventListener('click', toggleMenu)
logOutBtn.addEventListener('click', logOut)
inventoryBtn.addEventListener('click', getInventoryPage)
vendorpageBtn.addEventListener('click', getVendorPage)
//END OF NAV MENU JS AND LISTENERS//

//ROLL BTN FUNCTIONALITY//
let column1Roll = document.getElementById('column1-roll-btn')
let column2Roll = document.getElementById('column2-roll-btn')
let column3Roll = document.getElementById('column3-roll-btn')
let userLoot

async function roll1(e){
    await axios.get(`/sturdychest`).then(
        res => {
            userLoot = res.data[0]
        }
    ).catch(err => console.log(err))
}

async function roll2(e){
    await axios.get(`/gleamingchest`).then(
        res => {
            userLoot = res.data[0]
        }
    ).catch(err => console.log(err))
}

async function roll3(e){
    await axios.get(`/radiantchest`).then(
        res => {
            userLoot = res.data[0]
        }
    ).catch(err => console.log(err))
}

column1Roll.addEventListener('click',roll1)
column2Roll.addEventListener('click',roll2)
column3Roll.addEventListener('click',roll3)
//------------------------------------------------//