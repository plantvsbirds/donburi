import React from 'react';
import { useEffect, useRef, useState } from 'react'


import FundPage from './FundPage'
import PropertiesPage from './Properties'
import Transactions from './Transactions'


const App = () => {
  const NavRole = ({txt, selected}) => {
    return (
        selected ? (
          <li className="-mb-px mr-1">
          <div className="capitalize bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">
            {txt}
          </div>
          </li>
        ) : (
          <li className="mr-1">
            <div className="inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
              {txt}
            </div>
          </li>
        )
    )
  }
  const NavPage = ({txt, selected}) => {
    return (
        selected ? (
          <li className="-mb-px mr-1">
            <div className="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">
              
            {txt}
            
            </div>
          </li>
        ) : (
          <li className="mr-1">
            <div className="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">
              
            {txt}
            
            </div>
          </li>
        )
    )
  }
  return (
    <div>
      <ul className="bg-gray-200 flex main-nav border-b user-nav">
        <li className="-mb-px mr-1">
          <p className="inline-block py-2 px-4 text-black-700 font-light" href="#">
          Logged in as
          </p>
        </li>
        <NavRole txt="fund manager" selected />
        <NavRole txt="Property owner" />
        <NavRole txt="Shareholder" />
        
      </ul>
      <ul className="flex main-nav border-b">
        <li className="mr-1">
          <div className="bg-white inline-block py-2 px-4 text-purple-700 font-semibold" href="">
            Donburi | A Posei demo
          </div>
        </li>
        <NavPage txt="fund status" selected />
        <NavPage txt="Properties" />
        <NavPage txt="Transactions" />
      </ul>
      <div className="mx-auto h-screen">
        <FundPage />
      </div>
    </div>
  );
}

export default App;
