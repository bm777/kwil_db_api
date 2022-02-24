const { initContract, isValidAddress, getGasPrice } = require('./utils')

const createFundingPool = async (_name, _validator, _chain, _token, _moat, _privateKey = null) => {
    try {
        if (!isValidAddress(_validator)) {
            throw new Error(`${_validator} is not a valid address`)
        }
        const contract = await initContract(_chain, _token, _privateKey)
        const gasPrice = await getGasPrice()
        const gasEstimate = await contract.methods.createPool(_name, _validator, _moat).estimateGas({gasPrice: gasPrice})
        const response = await contract.methods.createPool(_name, _validator, _moat).send({
            gasPrice: gasPrice,
            //gas: Math.ceil(gasEstimate * 1.2),
            from: _validator
        })

        return response

    } catch(e) {
        console.log(e)
        return e.toString();
    }
}

module.exports = {createFundingPool}