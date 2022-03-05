function toggleMenu(){
    if(menuModal.classList.contains('hidden')){
        menuModal.classList.remove('hidden')
        menuModal.classList.add('visible')
    }else{
        menuModal.classList.remove('visible')
        menuModal.classList.add('hidden')
    }
}

function getInventoryPage(){
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
let chest1modal = document.getElementById('chestmodal1')
let chest2modal = document.getElementById('chestmodal2')
let chest3modal = document.getElementById('chestmodal3')
menuModal.classList.add('hidden')
chest1modal.classList.add('hidden')
chest2modal.classList.add('hidden')
chest3modal.classList.add('hidden')

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
let takeBtn1 = document.getElementById('take-loot1')
let takeBtn2 = document.getElementById('take-loot2')
let takeBtn3 = document.getElementById('take-loot3')
//-----------------------------------------------------------//
// let chest1modal = document.getElementById('chestmodal1')
// let chest2modal = document.getElementById('chestmodal2')
// let chest3modal = document.getElementById('chestmodal3')
//-----------------------------------------------------------//
// I know this is a duplication from the nav, but my primary 
// goal as of right now, is to deliver the MVP features.

async function roll1(){
    let userLoot

    //toggles the modal
    if(chest1modal.classList.contains('hidden')){
        chest1modal.classList.remove('hidden')
        chest1modal.classList.add('visible')
    }

    // await axios.get(`/sturdychest`).then(
    //     res => {
    //         userLoot = res.data[0]
    //     }
    // ).catch(err => console.log(err))
    

}

async function roll2(){
    let userLoot

    if(chest2modal.classList.contains('hidden')){
        chest2modal.classList.remove('hidden')
        chest2modal.classList.add('visible')
    }

    // await axios.get(`/gleamingchest`).then(
    //     res => {
    //         userLoot = res.data[0]
    //     }
    // ).catch(err => console.log(err))
}

async function roll3(){
    let userLoot

    if(chest3modal.classList.contains('hidden')){
        chest3modal.classList.remove('hidden')
        chest3modal.classList.add('visible')
    }

    // await axios.get(`/radiantchest`).then(
    //     res => {
    //         userLoot = res.data[0]
    //     }
    // ).catch(err => console.log(err))
}
function closeModal1(){
    chest1modal.classList.remove('visible')
    chest1modal.classList.add('hidden')
}

function closeModal2(){
    chest2modal.classList.remove('visible')
    chest2modal.classList.add('hidden')
}

function closeModal3(){
    chest3modal.classList.remove('visible')
    chest3modal.classList.add('hidden')
}


column1Roll.addEventListener('click',roll1)
column2Roll.addEventListener('click',roll2)
column3Roll.addEventListener('click',roll3)
takeBtn1.addEventListener('click', closeModal1)
takeBtn2.addEventListener('click', closeModal2)
takeBtn3.addEventListener('click', closeModal3)
//------------------------------------------------//