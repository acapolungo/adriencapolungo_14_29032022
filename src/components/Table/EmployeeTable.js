import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table/dist/react-table.development';

import '../Table/table.css';
import { HiChevronDoubleUp } from "react-icons/hi";
import { HiChevronDoubleDown } from "react-icons/hi";
import { FiEdit } from 'react-icons/fi';
import { RiSaveFill } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';

import { COLUMNS } from './Columns';
import GlobalFilter from './GlobalFilter';
import { selectEmployee } from '../../utils/selectors';
import { deleteEmployee, updateEmployee } from '../../reducers/employeeSlice';

// Create an editable cell renderer
const EditableCell = ({
    value: initialValue,
    // row: { index, id },
    row: { index, original },
    column: { id: property },
    updateMyData, // This is a custom function that we supplied to our table instance
    editableRowIndex // index of the row we requested for editing
}) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(original, property, value);
    };

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return index === editableRowIndex ? (
        <input value={value} onChange={onChange} onBlur={onBlur} />
    ) : (
        <p>{value}</p>
    );
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell
};

export function Table({ columns, data, updateMyData, handleDeleteEmployee }) {

    // Local state for editable row index for custom hooks
    const [editableRowIndex, setEditableRowIndex] = useState(null);
    const initialState = { hiddenColumns: ['id'] };

    // function to react table
    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance
    // creating a table instance stored in a const, row for single page, pages for multiple page with rows
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        initialState,
        defaultColumn,
        // updateMyData isn't part of the API, but anything we put into these options will
        // automatically be available on the instance.
        // That way we can call this function from our cell renderer!
        updateMyData,
        // pass state variables so that we can access them in edit hook later
        // setState hook for toggling edit on/off switch
        editableRowIndex,
        setEditableRowIndex
    },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.allColumns.push(columns => [
                // other hooks such as selection hook
                ...columns,
                // edit hook
                {
                    accessor: "Action",
                    id: "action",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: 'Action',
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
                        // handleEdit(row)
                        <div>
                            <button
                                className="action__btn"
                                onClick={() => {
                                    const currentIndex = row.index;
                                    if (editableRowIndex !== currentIndex) {
                                        // row requested for edit access
                                        setEditableRowIndex(currentIndex);
                                    } else {
                                        // request for saving the updated row
                                        setEditableRowIndex(null); // keep the row closed for edit after we finish updating it
                                    }
                                }}
                            >
                                {/* single action button supporting 2 modes */}
                                {editableRowIndex !== row.index ? <FiEdit /> : <RiSaveFill />}
                            </button>
                            <MdDeleteForever className='table__delbtn' onClick={() => handleDeleteEmployee(row.original.id) } />
                        </div>),
                }
            ])
        }
    );

    // state local destructuré
    const { globalFilter } = state;
    const { pageIndex, pageSize } = state;

    //console.log(data)

    return (
        <>
            <section className='table__contentnav'>
                <div className="table__navcontainer">
                    {/* Select dropdown for Page size */}
                    <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                        {
                            [10, 25, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize} >
                                    Show {pageSize}
                                </option>
                            ))
                        }
                    </select>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    <span className='table__pagination'>
                        Page{''} <strong>{pageIndex + 1} of {pageOptions.length}</strong>{''}
                    </span>
                    <span>
                        | Go to page: {' '}
                        <input className='table__number' type='number' defaultValue={pageIndex + 1} onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }}
                            style={{ width: '50px' }}
                        ></input>
                    </span>
                </div>
                <div className="table__navcontainer">
                    <button className='table__btn--goback' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                    <button className='table__btn--previous' onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button className='table__btn--next' onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <button className='table__btn--gonext' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
                </div>
            </section>

            <table {...getTableProps()}>
                {/* Header section */}
                <thead >
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? <HiChevronDoubleDown /> : <HiChevronDoubleUp />) : ''}
                                            </span>
                                        </th>

                                    ))
                                }
                            </tr>
                        ))}
                </thead>
                {/* Rows */}
                <tbody {...getTableBodyProps()}>
                    {
                        // on remplace row par Page pour plusieur pages
                        page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        // return all individual td cell
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

// instance of Table
export function EmployeeTable({ openModal }) {

    // useMemo Hook the data ins't created on every render,
    // Pass them on argument into the useTabe Hook
    const dispatch = useDispatch();
    const columns = useMemo(() => COLUMNS, [])

    const updateMyData = (employee, property, value) => {
        const employeeCopy = { ...employee };
        employeeCopy[property] = value;
        dispatch(updateEmployee({ employeeCopy }))
        openModal('Vous avez mis à jour un employé')
    }

    const handleDeleteEmployee = (id) => {
        dispatch(deleteEmployee({ id }))
        openModal('Vous avez supprimé un employé')
    }

    return <Table
        columns={columns}
        data={useSelector(selectEmployee)}
        updateMyData={updateMyData}
        handleDeleteEmployee={handleDeleteEmployee}
    />
}
