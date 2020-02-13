import React from 'react';
import { useEffect, useRef, useState } from 'react'


import FundPage from './FundPage'

const App = () => {
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
      <div className="mx-auto h-screen">
        <FundPage />
      </div>
    </div>
  );
}

export default App;
