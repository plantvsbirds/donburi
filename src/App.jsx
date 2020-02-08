import React from 'react';
import { useEffect, useRef, useState } from 'react'

import vis from 'vis-network'

const Tx = ({data}) => {
  return (
    <p>
      {JSON.stringify(data)}
    </p>
  )
}
const App = () => {
  const [selectedElm, selectElm] = useState(null)
  const graphObject = useRef(null)
  const graphElem = useRef(null)

  useEffect(() => {
    var nodes = new vis.DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" }
    ]);
    
    // create an array with edges
    var edges = new vis.DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 }
    ]);

    graphObject.current = new vis.Network(graphElem.current, {
      nodes: nodes,
      edges: edges
    }, {
      layout: {
        hierarchical: {
          enabled: true
        }
      }
    })
    graphObject.current.on('select', (sth) => {
      selectElm(sth)
    })
  }, [])
  return (
    <div>
      <ul className="bg-gray-200 flex main-nav border-b user-nav">
        <li className="-mb-px mr-1">
          <a className="inline-block py-2 px-4 text-black-700 font-light" href="#">
            
          Logged in as
          
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">
            
          Fund manager
          
          </a>
        </li>
        <li className="mr-1">
          <a className="inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
            
          Property owner
          
          </a>
        </li>
        <li className="mr-1">
          <a className="inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
            
          Shareholder
          
          </a>
        </li>
      </ul>
      <ul className="flex main-nav border-b">
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-purple-700 font-semibold" href="">
            Donburi | A Posei demo
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">
            
          Fund status
          
          </a>
        </li>
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
            
          Properties
          
          </a>
        </li>
        <li className="mr-1">
          <a className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
            
          Transactions
          
          </a>
        </li>
      </ul>
      <div  className="mx-auto h-screen flex flex-row justify-start container">
        <div ref={graphElem} className="h-full w-3/5"></div>
        <div className="w-2/5">
          <Tx data={selectedElm} />
        </div>
      </div>
    </div>
  );
}

export default App;
