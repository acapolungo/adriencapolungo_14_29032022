import React, { useState } from 'react'
import { EmployeeTable } from '../../components/Table/EmployeeTable'
import Form from '../../components/Form/Form'
import Modal from '../../components/Modal/Modal';


export default function EmployeeList() {

  const [modal, setModal] = useState(false);

  return (

    <>
      <Form />
      <section className="table">
        <h1 className='table__title'>Current Employees</h1>
        <div className="table__container">
          <EmployeeTable />
        </div>
      </section>

      <button onClick={() => setModal(true)}>Open Modal</button>
      {modal && (
        <Modal
          modal={modal} onClose={() => setModal(false)}
          backdropStyle={{ backgroundColor: 'rgba(21, 23, 43, 0.65)' }}
          modalStyle={{ backgroundColor: '#303245', color: 'white' }}
          header='Gestion des employés'
          text='Vous avez ajouté un employé !'
        />
      )}
    </>
  )
}
