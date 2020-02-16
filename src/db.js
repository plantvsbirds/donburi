let dat = {
    txs: [],
    States: [{
        "id":"Proposal",
        'State Description': 'Proposal submitted, pending pre-sale setup'
    }, {
        "id":"Pre-sale",
        'State Description': 'Pre-sale going on, pending regulatory approval'
    }, {
        "id":"Closed",
        'State Description': 'Fund closed'
    }, {
        "id":"Approval",
        'State Description': 'Fund approved, pending sale setup'
    }, {
        "id":"Sale"
    }],
    Edges : [
        { from: 'Proposal', to: 'Pre-sale', 'transaction type': 'Proposal and initial fund initialized and verified, ready for Pre-sale'},
        { from: 'Pre-sale', to: 'Approval', 'transaction type': 'Pre-sale reached goal and submitted for approval'},
        { from: 'Pre-sale', to: 'Closed', 'transaction type': 'Closure due to lack of interest or regulatory disapproval'},
        { from: 'Approval', to: 'Sale', 'transaction type': 'Start of Sale due to Regulatory Approval' },
        { from: 'Sale', to: 'Closed', 'transaction type': 'Closure'}
    ],
    TxTypes: [
        // current, tx type name, next
        [null, 'Proposal submission', 'Proposal'],
        ['Sale', 'Add Property', 'Sale'],
    ]
}

dat.TxTypes = [...dat.TxTypes, ...dat.Edges.map(({from, to, name}) => [from, name, to])]

dat.txs = [
    // type: [from, name, to]
    // body: 
]

const genTxs = () => {
    const txs = []

    let currentState = null
    let currentTime = Date.now()
    
    const consume = (ops, init) => ops.reduce((prev, op) => op(prev), init)
    const randPick = (arr) =>
        consume([
            (l) => l * Math.random(),
            Math.floor,
            (idx) => arr[idx]
        ], arr.length)
    const randLapse = (time, intv) =>
        Math.round(time + Math.random() * (intv || 1000 * 60 * 60 * 24 * 5))

    while (txs.length < 4) {
        randLapse(currentTime)
        const validTypes = dat.TxTypes.filter((type) => {
            let [current, name, next] = type
            return current === currentState
        })
        if (validTypes.length === 0)
            break
        const newTx = {
            type: randPick(validTypes),
            time: randLapse(currentTime),
        }
        currentState = newTx.type[2]
        txs.push(newTx)
    }
    return txs
}

dat.txs = genTxs()

dat.nativeFields = ['from', 'to', 'label', 'id', 'type']

const nodeMaker = (s) => {
    return {
      label: s.id,
      ...s
    }
  }

dat.Nodes = dat.States.map(nodeMaker)

export default dat