import React from 'react'
import { useEffect, useRef, useState } from 'react'

import vis from 'vis-network'
import db from './db.js'

const ElementDetail = ({data}) => {
  const Item = ({title, dat}) => {
    return (
      <div className="my-4">
        <p className="text-s text-left text-gray-600 font-bold uppercase">
            {title}
        </p>
        <h1 className="text-xl">
            {JSON.stringify(dat)}
        </h1>
      </div>
    )
  }

  const displayAsItems = (data) =>
      data && Object.keys(data)
      .filter((k) => !(new Set(db.nativeFields).has(k)))
      .map(dk => <Item key={dk} title={dk} dat={data[dk]}/>)
  
  const allTransactions = () =>
    data && data.id && (db.txs.filter(({type}) => type[2] === data.id))

  if (data === null) {
    return (
      <div className="break-all bg-gray-100 rounded p-4 m-5">
          <div className="text-l text-left m-1 text-gray-800">
              Tap on any state or transition to view detail
          </div>
      </div>
    )
  }
  return (
    <div className="break-all bg-gray-100 rounded p-4 m-5">
        <div className="text-xl text-center m-1 text-blue-600">
            Transaction Details
        </div>
        {displayAsItems(data)}
        {allTransactions() && allTransactions().map(displayAsItems)}
      {JSON.stringify(data)}
      {JSON.stringify(db.txs)}
    </div>
  )
}

var nodes = new vis.DataSet(db.Nodes);
// create an array with edges
var edges = new vis.DataSet(db.Edges);

const stateLookupFromSelectEvt = (x) => {
  if (x.nodes.length > 0)
    return nodes.get(x.nodes[0])
  if (x.edges.length > 0)
    return edges.get(x.edges[0])
  return null
}

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
          width: 3,
          arrows: {
            to: {
              enabled: true
            }
          },
          color: {
            color:'#2B7CE9',
            opacity:1.0
          },
          chosen: {
            edge: (e, id, selected, hovering) => {
              if (hovering) {
                e.color = '#2b7ce9'
                e.width = 5
              }
              if (selected) {
                e.dashes = true
                e.color = '#f00'
              }
            }
          }
        },
        nodes: {
          shape: 'circle',
          size: 50,
          widthConstraint: {
            minimum: 70,
            maximum: 70,
          },
          borderWidth: 2,
          color: {
            border: '#2B7CE9',
            background: '#D2E5FF',
          },
          chosen: {
            node: (n, id, selected, hovering) => {
              if (hovering) {
                n.background = '#D2E5FF'
                n.border = '#2B7CE9'
                n.borderWidth = 6
              }
              if (selected) {
                n.dashes = true
                n.background = '#D2E5FF'
                n.borderColor = '#f00'
                // n.borderDashes = true
              }
            }
          }
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
            <ElementDetail data={selectedElm} />
            </div>
        </div>
    )
}