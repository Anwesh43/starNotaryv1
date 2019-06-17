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
