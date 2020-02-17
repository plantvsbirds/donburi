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
    TxTypes: [
        // current, tx type name, next
        [null, 'Proposal submission', 'Proposal'],
        ['Sale', 'Add Property', 'Sale'],
        ...([
            { from: 'Proposal', to: 'Pre-sale', txtype: 'Proposal and initial fund initialized and verified, ready for Pre-sale'},
            { from: 'Pre-sale', to: 'Approval', txtype: 'Pre-sale reached goal and submitted for approval'},
            { from: 'Pre-sale', to: 'Closed', txtype: 'Closure due to lack of interest or regulatory disapproval'},
            { from: 'Approval', to: 'Sale', txtype: 'Start of Sale due to Regulatory Approval' },
            { from: 'Sale', to: 'Closed', txtype: 'Closure'}
        ].map(({from, txtype, to}) => [from, txtype, to]))
    ]
}



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

dat.nativeFields = ['from', 'to', 'label', 'id', 'type', 'opacity', 'color']

export const hasStateBeenReached = (s) => {
    return dat.txs.findIndex(tx => tx.type[2] === s.id) > -1
}

export const hasTxBeenReached = (_txtype) => {
    return dat.txs.findIndex(tx => tx.type == _txtype) > -1
}

const nodeUnreachedStyle = {
    color: {
        border: '#ddd',
        background: '#ddd'
    }
}

const edgeUnreachedStyle = {
    color: {
        opacity: .1
    }
}

const nodeMaker = (s) => {
    let ans = {
      label: s.id,
      ...s
    }
    if (hasStateBeenReached(s)) {
        return ans
    } else {
        return {
            ...nodeUnreachedStyle,
            ...ans
        }
    }
}

const edgeMaker = (tx) => {
    const [from, txtype, to] = tx
    let ans = {
        from,
        to,
        'transaction type': txtype
    }
    if (hasTxBeenReached(tx)) {
        return ans
    } else {
        return {
            ...edgeUnreachedStyle,
            ...ans
        }
    }
}

  
dat.Nodes = dat.States.map(nodeMaker)
dat.Edges = dat.TxTypes.map(edgeMaker)

export default dat