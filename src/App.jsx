import React from 'react';
import { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'

const App = () => {
  const [selectedElm, selectElm] = useState(null)
  const Graph = useRef(null)
  useEffect(() => {
    var toJson = function(res){ return res.json(); };
    Graph.current = cytoscape({
      container: document.getElementById('cy'),
      style: [{
        "selector": "node",
        "style": {
          "text-valign": "center",
          "text-halign": "bottom",
          "background-color": "#4299e1",
          "width": 64,
          "height": 64
        }
      }, {
        "selector": "node[label]",
        "style": {
          "color": "#fff",
          "label": "data(label)"
        }
      }, {
        "selector": "edge",
        "style": {
          "width": 3,
          "curve-style": "straight"
        }
      }, {
        "selector": "edge[arrow]",
        "style": {
          "target-arrow-shape": "data(arrow)"
        }
      }, {
        "selector": "edge.hollow",
        "style": {
          "target-arrow-fill": "hollow"
        }
      }],
      elements: [
        { "data": { "id": "n0", "label": "triangle" } },
        { "data": { "id": "n1" } },
        { "data": { "id": "e0", "source": "n0", "target": "n1", "arrow": "triangle" } }
      ],
      minZoom: 1,
      maxZoom: 1.2
    });
    Graph.current.elements("node, edge").on('select', ({target}) => {
      selectElm(target.data())
    })
  })
  useEffect(() => {
    
  })
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
      <div  className="mx-auto h-screen flex flex-row">
        <div id="cy" className="h-full flex-1"></div>
        <div className="flex-1">
          {JSON.stringify(selectedElm)}
        </div>
      </div>
    </div>
  );
}

export default App;
