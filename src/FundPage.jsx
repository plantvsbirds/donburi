import React from 'react'
import { useEffect, useRef, useState } from 'react'

import vis from 'vis-network'

const Tx = ({data}) => {
  return (
    <div className="break-all">
      {JSON.stringify(data)}
    </div>
  )
}

const Edges = [
  { from: 'Proposal', to: 'Pre-sale' },
  { from: 'Pre-sale', to: 'Approval' },
  { from: 'Pre-sale', to: 'Closed' },
  { from: 'Approval', to: 'Sale' },
  { from: 'Sale', to: 'Closed' }
]
const States = [ 'Proposal', 'Pre-sale', 'Closed', 'Approval', 'Sale' ]
const nodeMaker = (sName) => {
  return {
    id: sName,
    label: sName,
  }
}
var nodes = new vis.DataSet(States.map(nodeMaker));
// create an array with edges
var edges = new vis.DataSet(Edges);

const stateLookupFromSelectEvt = (x) => x.nodes.length > 0 ? nodes.get(x.nodes[0]) : edges.get(x.edges[0])


export default () => {
    const [selectedElm, selectElm] = useState(null)
    const graphObject = useRef(null)
    const graphElem = useRef(null)
  
    useEffect(() => {
      graphObject.current = new vis.Network(graphElem.current, {
        nodes,
        edges,
      }, {
        layout: {
          hierarchical: {
            enabled: false,
            nodeSpacing: 300,
            treeSpacing: 300,
            levelSeparation: 300,
            edgeMinimization: false,
            blockShifting: false,
            direction: 'LR',
            shakeTowards: 'leaves'
          }
        },
        edges: {
          // selectionWidth: 4,
          arrows: {
            to: {
              enabled: true
            }
          },
  
          color: {
            color:'#D2E5FF',
            highlight:'#f00',
            hover: '#848484',
            inherit: 'from',
            opacity:1.0
          },
        },
        nodes: {
          shape: 'circle',
          size: 50,
          widthConstraint: {
            minimum: 70,
            maximum: 70,
          },
          color: {
            border: '#2B7CE9',
            background: '#D2E5FF',
            highlight: {
              border: '#f00',
              background: '#D2E5FF'
            },
            hover: {
              border: '#2B7CE9',
              background: '#D2E5FF'
            }
          },
        },
        interaction: {
          selectConnectedEdges: false,
          hoverConnectedEdges: false,
          zoomView: false,
          dragView: false,
          dragNodes: false,
          hover: true,
        }
      })
      graphObject.current.on('select', (sth) => {
        selectElm(stateLookupFromSelectEvt(sth))
      })
    }, [])
    return (
        <div className="flex flex-row justify-start container h-screen">
            <div ref={graphElem} className="h-full w-3/5">
            </div>
            <div className="w-2/5">
            <Tx data={selectedElm} />
            </div>
        </div>
    )
}