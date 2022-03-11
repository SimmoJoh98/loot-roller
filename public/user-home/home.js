let userData = {
    gold: 0,
    inv_id: 0,
    inventory: {},
    user_id: 0
}
let invItems = null
let charVend = 'char'

async function getInventory(){
    let userId = localStorage.getItem("LootR-User")
    await axios.get(`/user/inv?userId=${userId}`).then(
        res =>{
            let {gold, inv_id, inventory, user_id, items} = res.data[0]
            userData.gold = gold
            userData.inv_id = inv_id
            userData.inventory = inventory
            userData.user_id = user_id
            userData.items = items
            //--------------dynamically loading the correct values into the UI
            let userInvGTotal = document.getElementById('gold-total')
            let username = localStorage.getItem("LootR-Username")
            let usernameForEquip = document.getElementById('username-for-equip')
            usernameForEquip.innerText = username
            userInvGTotal.innerText = userData.gold
        }
        ).catch(err => console.log(err))

    await axios.get(`/user/items?userId=${userId}`).then(
        res => {
            invItems = res.data
            for(let i = 0; i < invItems.length; i++){
                let tmpPropObj = JSON.parse(invItems[i].item_props)
                invItems[i].item_props = {...tmpPropObj}
            }
        }
    ).catch(err=> console.log(err))

    let innerInv = document.getElementById('second-inv-container')
    let row1 = document.getElementById('inv-row1')
    let row2 = document.getElementById('inv-row2')
    let row3 = document.getElementById('inv-row3')
    let row4 = document.getElementById('inv-row4')
    let row5 = document.getElementById('inv-row5')
    let row6 = document.getElementById('inv-row6')
    let row7 = document.getElementById('inv-row7')
    let row8 = document.getElementById('inv-row8')
    let row9 = document.getElementById('inv-row9')
    let row10 = document.getElementById('inv-row10')
    
    for(let i = 0; i < invItems.length; i++){
        let itmDv = document.createElement('div')
        let itemType = invItems[i].item_props.type
        let rarity = invItems[i].item_props.itemQuality
        
        itmDv.addEventListener('mouseenter', toggleItemHover)
        itmDv.addEventListener('mouseleave', toggleItemHoverOff)
        // itmDv.addEventListener('dragstart', toggleDragChildren)
        itmDv.setAttribute('id', `${i}`)

        itmDv.style.height = '7.1vh'
        itmDv.style.width = '7.1vh'
        itmDv.style.border = 'solid 2px black'
        itmDv.draggable = 'true'
        itmDv.style.backgroundColor = 'grey'



        // // Item qualities are as follows:
        // // fair: green
        // // magical: blue
        // // mystic: purple
        // // godsent: teal / super light blue
        // // cosmic: shiny orange border
        // // demonic: shiny red border
        switch(itemType !== null){
            case rarity == `fair`:
                itmDv.style.border = 'solid 2px #00cc30'
                break;
            case rarity == `magical`:
                itmDv.style.border = 'solid 2px blue'
                break;
            case rarity == `mystic`:
                itmDv.style.border = 'solid 2px #d934c0'
                break;
            case rarity == `godsent`:
                itmDv.style.border = 'solid 2px #00ffee'
                break;
            case rarity == `cosmic`:
                itmDv.style.border = 'solid 2px #ff7017'
                break;
            case rarity == `demonic`:
                itmDv.style.border = 'solid 2px #cc0000'
                break;
        }


        switch(i !== null){
            case row1.childElementCount <= 6:
                row1.appendChild(itmDv)
                break;
            case row2.childElementCount <= 6:
                row2.appendChild(itmDv)
                break;
            case row3.childElementCount <= 6:
                row3.appendChild(itmDv)
                break;
            case row4.childElementCount <= 6:
                 row4.appendChild(itmDv)
                break;
            case row5.childElementCount <= 6:
                row5.appendChild(itmDv)
                break;
            case row6.childElementCount <= 6:
                row6.appendChild(itmDv)
                break;
            case row7.childElementCount <= 6:
                row7.appendChild(itmDv)
                break;
            case row8.childElementCount <= 6:
                row8.appendChild(itmDv)
                break;
            case row9.childElementCount <= 6:
                row9.appendChild(itmDv)
                break;
            case row10.childElementCount <= 6:
                row10.appendChild(itmDv)
                break;
        }
    }
    window.localStorage.setItem("gold-balance", userData.gold)
}//END OF GET INVENTORY FUNCTION////////////////////////////////

function toggleItemHover(e){
    let itm = invItems[e.target.id]
    let itemInfo = document.createElement('div')
    let stats = null
    try {
        stats = {...itm.item_props.stats}
    } catch (error) {
        
    }
    e.target.style.cursor = 'pointer'
    itemInfo.classList.add('item-info')
    
    itemInfo.innerHTML = `<div class="item-info-wrapper" >
        <h2 class="${itm.item_props.itemQuality}">${itm.item_props.itemName}</h2>
        <h3>${itm.item_props.type}</h3>
        <p>
        HP:....${stats.HP}<br/>
        PATK:....${stats.PATK}<br/>
        MATK:....${stats.MATK}<br/>
        PDEF:....${stats.PDEF}<br/>
        MDEF:....${stats.MDEF}<br/>
        CRIT:....${stats.CRIT}<br/>
        DODGE:....${stats.DODGE}<br/>
        SPEED:....${stats.SPEED}<br/>
        </p>
    </div>`;


    
    e.target.appendChild(itemInfo)
}
function toggleItemHoverOff(e){
    let itemInfo = document.querySelector('.item-info')
    e.target.removeChild(itemInfo)
}

// function toggleDragChildren(e){
//     let itemInfo = document.querySelector('item-info')
//     e.dataTransfer.setData("text/plain", itemInfo)


// }

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
//VENDOR FUNCTIONALITY/////////////////////////////////////////////////////////
async function getVendor(){
    toggleMenu();
    toggleVendor();
}

function toggleVendor(){
    if(vendorModal.classList.contains('hidden')){
        vendorModal.classList.remove('hidden')
        vendorModal.classList.add('visible')
        userStatBreakdown.classList.add('hidden')
    }else{
        vendorModal.classList.remove('visible')
        vendorModal.classList.add('hidden')
        userStatBreakdown.classList.remove('hidden')
    }
}

function logOut(){
    window.localStorage.removeItem("LootR-User")
    window.localStorage.removeItem("LootR-Username")
    window.location.href = '/'
}

const vendorModal = document.getElementById('vendor-modal')
let menuModal = document.getElementById('menu-modal-container')
menuModal.classList.add('hidden')
vendorModal.classList.add('hidden')
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
let logOutBtn = document.getElementById('log-out')
let rollpageBtn = document.getElementById('roll-page')
let vendorpageBtn = document.getElementById('vendor-page')
let charContainer = document.getElementById('char-container')
let overallContainer = document.getElementById('overall-container')
let vendorCloseBtn = document.getElementById('close-vendor-btn')


usernameForEquip.innerText = username
userInvGTotal.innerText = userData.let
toggleBreakdownBtn.addEventListener('click', toggleBreakdown)
menuBtn.addEventListener('click', toggleMenu)
closeModal.addEventListener('click', toggleMenu)
logOutBtn.addEventListener('click', logOut)
rollpageBtn.addEventListener('click', getRollPage)
vendorpageBtn.addEventListener('click', getVendor)
vendorCloseBtn.addEventListener('click', toggleVendor)
