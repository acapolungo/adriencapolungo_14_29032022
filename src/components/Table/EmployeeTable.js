import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from 'react-table/dist/react-table.development';

import '../Table/table.css';
import { HiChevronDoubleUp } from "react-icons/hi";
import { HiChevronDoubleDown } from "react-icons/hi";

import { COLUMNS } from './Columns';
import GlobalFilter from './GlobalFilter';
// import { Checkbox } from './Checkbox';
import { selectEmployee } from '../../utils/selectors';
import { deleteEmployee, updateEmployee } from '../../reducers/employeeSlice';


export function EmployeeTable() {

    const dispatch = useDispatch();
    const Employees = useSelector(selectEmployee);
    const [data, setData] = useState([]);
    // Local state for editable row index for custom hooks
    const [editableRowIndex, setEditableRowIndex] = useState(null);

    // set the relation between redux Employees and local state for update
    useEffect(() => {
        // dispatch(initData())
        setData(Employees)
    }, [dispatch, Employees]);

    // useMemo Hook the data ins't created on every render,
    // Pass them on argument into the useTabe Hook
    const columns = useMemo(() => COLUMNS, [])

    // Create an editable cell renderer
    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
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
            updateMyData(index, id, value);
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

    // Edit create action function with our global state
    const handleEdit = (value) => {
        // console.log(value)
        dispatch(updateEmployee({ value }))
    }
    const handleDelete = (id) => {
        // console.log(id)
        dispatch(deleteEmployee({ id }))
    }

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }

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
        selectedFlatRows,
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
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
            hooks.visibleColumns.push(columns => [
                // other hooks such as selection hook
                ...columns,
                // edit hook
                {
                    accessor: "edit",
                    id: "edit",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: 'Edit',
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
                        // handleEdit(row)
                        <div>
                            <button
                                className="action-button"
                                onClick={() => {
                                    const currentIndex = row.index;
                                    if (editableRowIndex !== currentIndex) {
                                        // row requested for edit access
                                        setEditableRowIndex(currentIndex);
                                    } else {
                                        // request for saving the updated row
                                        setEditableRowIndex(null); // keep the row closed for edit after we finish updating it
                                        const updatedRow = row.values;
                                        const id = row.original.id;
                                        console.log("updated row values:");
                                        console.log(updatedRow);
                                        console.log(id)
                                        // call your updateRow API
                                        handleEdit({...updatedRow, id})
                                    }
                                }}
                            >
                                {/* single action button supporting 2 modes */}
                                {editableRowIndex !== row.index ? "Edit" : "Save"}
                            </button>
                            <button onClick={() => handleDelete(row.original.id)}>Delete</button>
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
            <div className='table__contentnav'>
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
                    <input type='number' defaultValue={pageIndex + 1} onChange={(e) => {
                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(pageNumber)
                    }}
                        style={{ width: '50px' }}
                    ></input>
                </span>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
            </div>

            <table {...getTableProps()}>
                {/* Header section */}
                <thead>
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
            {/* to verify the row value in the */}
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
        </>
    )
}

// hooks => {
//     hooks.visibleColumns.push(columns => [
//       // Let's make a column for selection
//       {
//         id: '',
//         // The header can use the table's getToggleAllRowsSelectedProps method
//         // to render a checkbox
//         Header: ({ getToggleAllPageRowsSelectedProps }) => (
//           <div>
//             <Checkbox {...getToggleAllPageRowsSelectedProps()} />
//           </div>
//         ),
//         // The cell can use the individual row's getToggleRowSelectedProps method
//         // to the render a checkbox
//         Cell: ({ row }) => (
//           <div>
//             <Checkbox {...row.getToggleRowSelectedProps()} />
//           </div>
//         ),
//       ...columns,
//     ])
//   }
