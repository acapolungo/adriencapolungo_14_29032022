import React from 'react'
import BasicTable from '../../components/Table/BasicTable'

export default function EmployeeList() {
  return (
    <section className="table">
      <h1 className='table__title'>Current Employees</h1>
      <div className="table__container">
        <BasicTable />
      </div>
    </section>
  )
}
