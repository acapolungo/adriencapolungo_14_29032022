import React, { useState } from 'react'
import { EmployeeTable } from '../../components/Table/EmployeeTable'
import Form from '../../components/Form/Form'
import { Modal } from 'adrienc_custom_modal_popup';


export default function EmployeeList() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <section className="employee">
        <Form />
        <section className="table">
          <h1 className='table__title'>Current Employees</h1>
          <div className="table__container">
            <EmployeeTable />
          </div>
        </section>

        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            backdropStyle={{ backgroundColor: 'rgba(21, 23, 43, 0.65)' }}
            modalStyle={{ backgroundColor: '#303245', color: 'white' }}
            header='Gestion des employés'
            text='Vous avez ajouté un employé !'
          />
        )}
      </section>
    </>
  )
}
