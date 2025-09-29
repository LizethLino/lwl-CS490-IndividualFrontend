import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'

const FilmTable = ({data, onViewDetails}) => {
    
    const columns = [
        {
            accessorKey: 'film_id',
            header: "Film ID",
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'title',
            header: "Title",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'description',
            header: "Description",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'release_year',
            header: "Release Year",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: 'category',
            header: "Genre",
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            id: 'detail',
            header: "Detail",
            cell: ({row}) => (
                <button onClick={() => onViewDetails(row.original.film_id)}>
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
            <div className='table' w={table.getTotalSize()}>
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

export default FilmTable