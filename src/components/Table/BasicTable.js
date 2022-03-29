import React, { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table/dist/react-table.development';
import MOCK_Data from '../../assets/MOCK_DATA.json';
import { COLUMNS } from './Columns';
import '../Table/table.css';
import { HiChevronDoubleUp } from "react-icons/hi";
import { HiChevronDoubleDown } from "react-icons/hi";

export default function BasicTable() {

    // useMemo Hook the data ins't created on every render,
    // Pass them on argument into the useTabe Hook
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_Data, [])

    // function to react table
    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance
    // creating a table instance stored in a const
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data
    },
        useSortBy)


    return (
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
                                            {column.isSorted ? (column.isSortedDesc ? <HiChevronDoubleDown /> : <HiChevronDoubleUp/>) : ''}
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
                    rows.map(row => {
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
    )
}
