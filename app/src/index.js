import Web3 from "web3";
import starNotaryArtifact from "../../build/contracts/StarNotary.json";

const App = {
  web3: null,
  account: null,
  instance: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = starNotaryArtifact.networks[networkId];
      this.instance = new web3.eth.Contract(
        starNotaryArtifact.abi,
        deployedNetwork.address,
      );

      console.log(this.instance)
      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.getInitialDetails();
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  getInitialDetails: async function() {
      if (this.instance && this.instance.methods) {
          console.log("coming here")
          const name = await this.instance.methods.name().call()
          const address = await this.instance.methods.owner().call()
          console.log(name)
          console.log(address)
          document.getElementById('name').innerHTML = name
          document.getElementById('address').innerHTML = address
      }
  },
  claimStar: async function() {
      await this.instance.methods.claimStar().send({from : this.account})
      const owner = await this.instance.methods.owner().call()
      console.log(owner)
      document.getElementById('address').innerHTML = owner
  }
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:8545/"),
    );
  }

  App.start();
});
