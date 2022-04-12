import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Form from '../../components/Form/Form'
import Logout from '../../components/Logout/Logout';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../../utils/selectors';
import { EmployeeTable } from '../../components/Table/EmployeeTable'
import { Modal } from 'adrienc_custom_modal_popup';
// import Modal from '../../components/Modal/Modal';

export default function EmployeeList() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const closeModal = () => setIsModalOpen(false);
  const user = useSelector(selectUser);

  const openModal = (text) => {
    setModalText(text);
    setIsModalOpen(true)
  }

  return (
    <>
      {user ?
        <>
          <section className="employee">
          <Logout />
            <Form openModal={openModal} />
            <section className="table">
              <h1 className='table__title'>HRNet Current Employees</h1>
              <div className="table__container">
                <EmployeeTable openModal={openModal} />
              </div>
            </section>

            {isModalOpen && (
              <Modal
                closeModal={closeModal}
                backdropStyle={{ backgroundColor: 'rgba(21, 23, 43, 0.65)' }}
                modalStyle={{ backgroundColor: '#303245', color: 'white' }}
                headerStyle={{ color: 'white', backgroundColor: '#15172b', padding: '10px', borderBottom:'2px solid #08d', background: 'linear-gradient(to right, #08d 10%, #303245 90%)' }}
                header='Gestion des employés'
                text={modalText}
              />
            )}
          </section>
        </>
        : <Navigate to='/' />
      }
    </>
  )
}
