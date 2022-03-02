let btn = document.getElementById('btn')
let userData = {}


async function getInventory(){
    let userId = localStorage.getItem("LootR-User")
    console.log(userId)
    await axios.get(`/user/inv?userId=${userId}`).then(
        res =>{
            let {gold, inv_id, inventory, user_id} = res.data[0]
            userData.gold = gold
            userData.inv_id = inv_id
            userData.inventory = inventory
            userData.user_id = user_id
        }
    ).catch(err => console.log(err))
    let gld = document.createElement('h2')
    gld.innerHTML = userData.gold
    document.body.appendChild(gld)
}

btn.addEventListener('click', getInventory)