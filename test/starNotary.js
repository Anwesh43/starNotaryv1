const StarNotary = artifacts.require("./StarNotary.sol")

var accounts
var owner
var instance

contract("StarNotary", (accs) => {
    accounts = accs
    owner = accs[0]

})

it('StarNotary name must match intial name', async () => {

    instance = await StarNotary.deployed()
    console.log(instance)
    const name = await instance.name.call()
    console.log(name)
    assert.equal(name, "this is my star app")
})

it('claiming star', async () => {
    console.log(owner)
    instance = await StarNotary.deployed()
    instance.claimStar({from : owner})
    const starOwner = await instance.owner.call()
    assert.equal(starOwner, owner)
})

it('can change owners', async () => {
    instance = await StarNotary.deployed()
    if (accounts.length > 1) {
        const newOwner = accounts[1]
        console.log(`new owner is ${newOwner}`)
        instance.claimStar({from : newOwner})
        const starOwner = await instance.owner.call()
        assert.equal(starOwner, newOwner)
    }
})

it('should change name', async () => {
    instance = await StarNotary.deployed()
    const newName = "new name for star app"
    const name = await instance.changeName.call(newName)
    assert.equal(name, newName)
})
