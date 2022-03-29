import React from 'react'
import { Routes, Route } from 'react-router-dom';

// système de rooting de base
// import Home from '../pages/Home/Home';
import EmployeeList from '../pages/EmployeeList/EmployeeList';

export default function RoutesPath() {

  return (
    <Routes>
      {/* <Route path="/" element={<Home/>} /> */}
      {/* /employeelist */}
      <Route path="/" element={<EmployeeList />} />
      {/* <Route path="/*" element={<Error />} /> */}
    </Routes>
  )
}