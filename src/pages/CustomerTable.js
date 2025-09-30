import {flexRender, getCoreRowModel, useReactTable, getPaginationRowModel} from '@tanstack/react-table'

const CustomerTable = ({data, onViewDetails, totalrows, totalpagenums, pagination, setPagination}) => {
    
    const columns = [
        {
            accessorKey: 'customer_id',
            header: "Customer ID",
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'first_name',
            header: "First Name",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'last_name',
            header: "Last Name",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'email',
            size: 350,
            header: "Email",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            id: 'detail',
            header: "Detail",
            cell: ({row}) => (
                <button onClick={() => onViewDetails(row.original.customer_id)}>
                    Detail
                </button>
            )
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination
        },
        manualPagination: true,
        rowCount: totalrows,
        pageCount: totalpagenums
    })

    return (<div className='page-buttons'>
        <div className='full-table-wrapper'>
            <div className='table' style={{width: table.getTotalSize()}}>
                {table.getHeaderGroups().map(headerGroup => (
                    <div className='tr' key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <div className='th' key={header.id} style={{width: header.getSize(), position: 'relative'}}>
                                {header.column.columnDef.header}
                            </div>
                        ))}
                    </div>
                ))}
                {table.getRowModel().rows.map(row => (
                    <div className='tr' key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <div className='td' key={cell.id} style={{width: cell.column.getSize(), position: 'relative'}}>
                                {flexRender(cell.column.columnDef.cell,cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
                <button
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                >{'<<'}</button>

                <button className='prev-button' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</button>
                <button className='next-button' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Next</button>
                <button
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                >{'>>'}</button>
        </div>
    )
}

export default CustomerTable