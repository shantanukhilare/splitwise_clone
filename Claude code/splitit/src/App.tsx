import './App.css'
import { Route, Routes } from 'react-router'
import SplitwiseClone from './SplitwiseClone'

function App() {

  return (
    <Routes>
      <Route path='/home' element={<SplitwiseClone/>}/>
      <Route path='/' element={<SplitwiseClone/>}/>
    </Routes>
    
    
  )
}

export default App
