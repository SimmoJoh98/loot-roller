let userId = window.localStorage.getItem("LootR-User")
let generatedLoot 
//----------------------------------------------//
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
    let chestId = 1
 
    //SELECTS ALL THE ELEMENTS TO BE UPDATED WITH ITEM DATA FROM SERVER
    // let hp = document.getElementById('stat-hp')
    // let PATK = document.getElementById('stat-patk')
    // let PDEF = document.getElementById('stat-pdef')
    // let MATK = document.getElementById('stat-matk')
    // let MDEF = document.getElementById('stat-mdef')
    // let speed = document.getElementById('stat-speed')
    // let dodge = document.getElementById('stat-dodge')
    // let crit = document.getElementById('stat-crit')
    // let amount = document.getElementById('stat-amount')
    // let itemName = document.getElementById('stat-itemName')
    // let itemRarity = document.getElementById('stat-itemRarity')
    let chestList = document.getElementById('chest1-stats')
    //---------------------------------------------------------------//
    //toggles the modal
    if(chest1modal.classList.contains('hidden')){
        chest1modal.classList.remove('hidden')
        chest1modal.classList.add('visible')
    }
    
    await axios.get(`/genloot?userId=${userId}&chestId=${chestId}`).then(
        res => {
            let result = res.data
            generatedLoot = {...result}
            console.log(result)
            let statlist = document.getElementById('chest1-stats')
            let itemPropsList = document.getElementById('item-props-list')
            if(generatedLoot.type === `gear`){
                //I tried just setting the inner text of my pre inserted LI's but, for some reason it kept saing generateLoot.stats.{stat} was undefined????
                let HP = document.createElement('li')
                HP.innerText = `HP: ${generatedLoot.stats.HP}`
                let PATK = document.createElement('li')
                PATK.innerText = `PATK:   ${generatedLoot.stats.PATK}`
                let MATK = document.createElement('li')
                MATK.innerText = `MATK:   ${generatedLoot.stats.MATK}`
                let PDEF = document.createElement('li')
                PDEF.innerText = `PDEF:   ${generatedLoot.stats.PDEF}`
                let MDEF = document.createElement('li')
                MDEF.innerText = `MDEF:   ${generatedLoot.stats.MDEF}`
                let SPEED = document.createElement('li')
                SPEED.innerText = `SPEED:   ${generatedLoot.stats.SPEED}`
                let DODGE = document.createElement('li')
                DODGE.innerText = `DODGE:   ${generatedLoot.stats.DODGE}`
                let CRIT = document.createElement('li')
                CRIT.innerText = `CRIT:   ${generatedLoot.stats.CRIT}`

                HP.classList.add('stat-item1')
                PATK.classList.add('stat-item1')
                MATK.classList.add('stat-item1')
                PDEF.classList.add('stat-item1')
                MDEF.classList.add('stat-item1')
                SPEED.classList.add('stat-item1')
                DODGE.classList.add('stat-item1')
                CRIT.classList.add('stat-item1')

                statlist.appendChild(HP)
                statlist.appendChild(PATK)
                statlist.appendChild(MATK)
                statlist.appendChild(PDEF)
                statlist.appendChild(MDEF)
                statlist.appendChild(CRIT)
                statlist.appendChild(SPEED)
                statlist.appendChild(DODGE)
                
            }
            let itemName = document.createElement('li')
            itemName.innerText = `${generatedLoot.itemName}`
            let itemRarity = document.createElement('li')
            itemRarity.innerText = `${generatedLoot.itemQuality}`
            let amount = document.createElement('li')
            amount.innerText = `Amount:   ${generatedLoot.amount}`
            itemPropsList.appendChild(itemName)
            itemPropsList.appendChild(itemRarity)
            amount.classList.add(`stat-item1`)
            statlist.appendChild(amount)
        }
    ).catch(err => console.log(err))
}

function closeModal1(){
    chest1modal.classList.remove('visible')
    chest1modal.classList.add('hidden')
    location.reload()
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
// column2Roll.addEventListener('click',roll2)
// column3Roll.addEventListener('click',roll3)
takeBtn1.addEventListener('click', closeModal1)
takeBtn2.addEventListener('click', closeModal2)
takeBtn3.addEventListener('click', closeModal3)
//------------------------------------------------//