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
        { from: 'Proposal', to: 'Pre-sale', 'Tx Type': 'Proposal and initial fund initialized and verified, ready for Pre-sale'},
        { from: 'Pre-sale', to: 'Approval', 'Tx Type': 'Pre-sale reached goal and submitted for approval'},
        { from: 'Pre-sale', to: 'Closed', 'Tx Type': 'Closure due to lack of interest or regulatory disapproval'},
        { from: 'Approval', to: 'Sale', 'Tx Type': 'Start of Sale due to Regulatory Approval' },
        { from: 'Sale', to: 'Closed', 'Tx Type': 'Closure'}
    ],
    TxTypes: [
        // current, tx type name, next
        [null, 'Proposal', 'Pre-sale'],
        ['Sale', 'Add Property', 'Sale'],
    ]
}

dat.TxTypes = [...dat.TxTypes, ...dat.Edges.map(({from, to, name}) => [from, name, to])]

dat.txs = [
    // type: [from, name, to]
    // body: 
]

dat.nativeFields = ['from', 'to', 'label']

const nodeMaker = ({id}) => {
    return {
      id: id,
      label: id,
    }
  }

dat.Nodes = dat.States.map(nodeMaker)

export default dat