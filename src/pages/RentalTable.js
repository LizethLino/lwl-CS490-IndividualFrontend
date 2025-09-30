import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

const RentalTable = ({data}) => {

    const columns = [
        {
            accessorKey: 'rental_id',
            header: "Rental ID",
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'rental_date',
            header: "Rental Date",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'return_date',
            header: "Return Date",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'film_id',
            header: "Film ID",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'film_title',
            header: "Film Title",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'rental_duration',
            header: "Rental Duration",
            cell: (props) => <p>{props.getValue()} Days</p>
        },
        {
            accessorKey: 'rental_rate',
            header: "Rental Rate",
            cell: (props) => <p>${props.getValue()}</p>
        },
        {
            accessorKey: 'replacement_cost',
            header: "Replacement Cost",
            cell: (props) => <p>${props.getValue()}</p>
        },
        {
            accessorKey: 'staff_id',
            header: "Staff ID",
            cell: (props) => <p>{props.getValue()}</p>
        }

    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
    })

    return (
        <div className='rental-table-wrapper'>
            <div className='rental-table' w={table.getTotalSize()}>
                {table.getHeaderGroups().map(headerGroup => (
                    <div className='rental-tr' key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <div className='rental-th' key={header.id} style={{width: header.getSize(), position: 'relative'}}>
                                {header.column.columnDef.header}
                            </div>
                        ))}
                    </div>
                ))}
                {table.getRowModel().rows.map(row => (
                    <div className='rental-tr' key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <div className='rental-td' key={cell.id} style={{width: cell.column.getSize(), position: 'relative'}}>
                                {flexRender(cell.column.columnDef.cell,cell.getContext())}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RentalTable