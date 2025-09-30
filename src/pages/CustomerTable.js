import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

const CustomerTable = ({data, onViewDetails}) => {
    
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
    })

    return (
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
    )
}

export default CustomerTable