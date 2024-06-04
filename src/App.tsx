import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'

import Block from './pages/Block'
import Blocks from './pages/Blocks'
import Transactions from './pages/Transactions'
import Transaction from './pages/Transaction'
import Home from './pages/Home'

function App() {
  return (
   <div>

    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blocks" element={<Blocks/>}/>
        <Route path="/block/:id" element={<Block/>}/>
        <Route path="/txs" element={<Transactions/>}/>
        <Route path="/tx" element={<Transaction/>}/>
      </Routes>
    </Router>


   </div>
  )
}

export default App
