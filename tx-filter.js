const flatMap = require('lodash.flatmap')
const BaseFilter = require('./base-filter')
const getBlocksForRange = require('./getBlocksForRange')
const { incrementHexInt } = require('./hexUtils')

class TxFilter extends BaseFilter {

  constructor ({ provider, params }) {
    super()
    this.type = 'tx'
    this.provider = provider
  }

  async update ({ oldBlock, newBlock }) {
    const toBlock = oldBlock
    const fromBlock = incrementHexInt(oldBlock)
    const blocks = await getBlocksForRange({ provider: this.provider, fromBlock, toBlock })
    const blockTxHashes = flatMap(blocks, (block) => block.transactions)
    // add to results
    this.addResults(blockTxHashes)
  }

}

module.exports = TxFilter
