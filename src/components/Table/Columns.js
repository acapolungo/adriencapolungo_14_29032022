// import {format} from 'date-fns'

export const COLUMNS = [
    {
        Header : 'First Name',
        accessor: 'firstName'
    },
    {
        Header : 'Last Name',
        accessor: 'lastName'
    },
    {
        Header : 'Start Date',
        accessor: 'startDate'
    },
    {
        Header : 'Department',
        accessor: 'department'
    },
    {
        Header : 'Date of Birth',
        accessor: 'birthdate',
        // Cell: ({value}) => { return format(new Date(value, 'dd/MM/yyyy'))}
    },
    {
        Header : 'Street',
        accessor: 'street'
    },
    {
        Header : 'City',
        accessor: 'city'
    },
    {
        Header : 'State',
        accessor: 'stateName'
    },
    {
        Header : 'Zipcode',
        accessor: 'zipcode'
    },
    // {
    //     Header : 'Edit',
    //     Cell: row => (
    //         <div>
    //             <button onClick={() => handleEdit(row)}>Edit</button>
    //             <button onClick={() => handleDelete(row.id)}>Delete</button>
    //         </div>)
    // },
]