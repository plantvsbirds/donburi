import React from 'react'
import { useEffect, useRef, useState } from 'react'

import vis from 'vis-network'
import db from './db.js'

const Tx = ({data}) => {
  const Item = ({title, dat}) => {
    return (
      <div>
        <p className="text-m text-left text-gray-600 font-bold uppercase">
            state name
        </p>
        <h1 className="text-xl">
            {dat}
        </h1>
      </div>
    )
  }
  return (
    <div className="break-all bg-gray-100 rounded p-4 m-5">
        <div className="text-xl text-center m-1 text-blue-600">
            Transaction Details
        </div>
        {data && data.name && <Item title="state name" dat={data.name}/>}
      {JSON.stringify(data)}
    </div>
  )
}

const nodeMaker = (sName) => {
  return {
    id: sName,
    label: sName,
  }
}
var nodes = new vis.DataSet(db.States.map(nodeMaker));
// create an array with edges
var edges = new vis.DataSet(db.Edges);

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