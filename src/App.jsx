import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import AddProduct from './pages/addProduct/AddProduct'
import UpdateProduct from './pages/updateProduct/UpdateProduct'
import MyState from './context/data/myState'

const App = () => {
  return (
    <>
      <MyState>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home /> } />
            <Route path='/addproduct' element={<AddProduct /> } />
            <Route path='/updateproduct' element={<UpdateProduct /> } />
          </Routes>
        </BrowserRouter>
      </MyState>
    </>
  )
}

export default App
