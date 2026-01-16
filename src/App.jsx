import './App.css'
import Dashboard from './dashboard'
import Transactions from './transaction'
import { useState } from 'react'

export default function App() {

  const [transHistory, setTransHistory] = useState([])

  return (
    <>
      <Dashboard
        transHistory={transHistory}
        setTransHistory={setTransHistory}
      />
    </>
  )
}


