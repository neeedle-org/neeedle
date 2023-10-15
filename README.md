# The easiest debugger tool for Smart Contracts

Neeedle allows you to visualize and interact with the smart contract interface.

All you have to do is to read the ABI from a file or url and connect your wallet such as MetaMask.

No user registration. No data sending to other servers.

[Try Neeedle](https://neeedle.org/?abiUrl=https%3A%2F%2Fgithub.com%2Fneeedle-org%2Fneeedle%2Fblob%2Fmain%2Fpublic%2Fabi%2FERC20.json&chainId=1&contractAddress=0x6b175474e89094c44da98b954eedeac495271d0f)

And also, you can share your smart contract client with URL.
When you set up smart contract information in Neeedle, the URL will automatically change to a shareable one.

| Parameter       | Type   | Definition                                                                                                                                                                                      |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| abiUrl          | string | URL of your abi(json) .<br>You can also set the URL of the Github view page(you will want to set this the most). <br>ex: https://github.com/neeedle-org/neeedle/blob/main/public/abi/ERC20.json |
| contractAddress | string | Ethererum Address of your smart contract implements the abi.                                                                                                                                    |
| chainId         | number | ID of the chain your smart contract deployed.                                                                                                                                                   |
| payables        | string | Show only payable functions whose name includes this value.                                                                                                                                     |
| nonpayables     | string | Show only non-payable functions whose name includes this value.                                                                                                                                 |
| views           | string | Show only view functions whose name includes this value.                                                                                                                                        |
| purefunctions   | string | Show only pure functions whose name includes this value.                                                                                                                                        |
