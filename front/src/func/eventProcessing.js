
const nftEvent = async (web3, event) => {
    console.log({event});
    const transaction = await web3.eth.getTransaction(event.transactionHash);
    console.log({transaction});
  
    const { tokenId, state, price, from, to } = event.returnValues;
  
    const transfer = { id : event.id, tokenId, state, price, from, to };
    console.log({transfer});
    return {tokenId, transaction, transfer};
}


export {nftEvent} 