# The easiest debugger tool for Smart Contracts

Neeedle allows you to visualize and interact with the smart contract interface.

All you have to do is to read the ABI from a file or url and connect your wallet such as MetaMask.

No user registration. No data sending to other servers.

[Try Neeedle](https://neeedle.org/?abiUrl=https%3A%2F%2Fgithub.com%2Fbridges-inc%2Faurora-core%2Fblob%2Fdevelop%2Fdeployments%2Frinkeby%2FAurora.json&chainId=4)

And also, you can share your smart contract client with URL.
When you set up smart contract information in Neeedle, the URL will automatically change to a shareable one.

| Parameter       | Type   | Definition                                                                                                                                                                                                       |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| abiUrl          | string | URL of your abi(json) .<br>You can also set the URL of the Github view page(you will want to set this the most). <br>ex: https://github.com/bridges-inc/aurora-core/blob/develop/deployments/rinkeby/Aurora.json |
| contractAddress | string | Ethererum Address of your smart contract implements the abi.                                                                                                                                                     |
| chainId         | number | ID of the chain your smart contract deployed.                                                                                                                                                                    |
