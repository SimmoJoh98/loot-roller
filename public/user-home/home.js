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

            let userInvGTotal = document.getElementById('gold-total')
            let username = localStorage.getItem("LootR-Username")
            let usernameForEquip = document.getElementById('username-for-equip')
            usernameForEquip.innerText = username
            userInvGTotal.innerText = userData.gold
        }
        ).catch(err => console.log(err))
    }
//We want the inventory on page load to populate, whether the user wants it or not. Although, this lets the AXIOS tag load in for everything else.
setTimeout(getInventory, 500)
    //------------------------------------------------------------------//
let userInvGTotal = document.getElementById('gold-total')
let username = localStorage.getItem("LootR-Username")
let usernameForEquip = document.getElementById('username-for-equip')
usernameForEquip.innerText = username
userInvGTotal.innerText = userData.gold