import React, {useState, useEffect} from 'react'
import FilmTable from "./FilmTable"
import FilmPopup from './FilmPopup'

export default function Films() {
    
    const [filmslist, setFilmslist] = useState([])

    const [title, setTitle] = useState("")
    const [actorfirst, setActorfirst] = useState("")
    const [actorlast, setActorlast] = useState("")
    const [category, setCategory] = useState("")

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10

    })
    const [totalpages, setTotalpages] = useState(1)
    const [totalrecords, setTotalrecords] = useState(1)

    const [selectedfilm, setSelectedfilm] = useState([])
    const [filmpopup, setFilmpopup] = useState(false)

    const [submittedfilter, setSubmittedfilter] = useState({
        title: "",
        actorfirst: "",
        actorlast: "",
        category: ""
    })

    const retrieveFilms = (page = 1, filters = submittedfilter) => {
        const { title, actorfirst, actorlast, category } = filters

        fetch(`/films/all?film_title=${title.trim()}&actor_first=${actorfirst.trim()}&actor_last=${actorlast.trim()}&category_name=${category.trim()}&page=${page}`)
        .then(res => res.json())
        .then(filmslist => {
            setFilmslist(filmslist.films)
            setTotalpages(filmslist.total_pages)
            setPagination(prev => {
                const newPageIndex = filmslist.page_num - 1
                if (prev.pageIndex !== newPageIndex) {
                    return { ...prev, pageIndex: newPageIndex }
                }
                return prev
            })
            setTotalrecords(filmslist.total_retrieved)
        })
    }

    useEffect(() => {
            retrieveFilms(pagination.pageIndex+1)
    },[pagination])
    
    const handleFilterClick = (event) => {
        event.preventDefault()

        const newFilters = {
            title, 
            actorfirst, 
            actorlast, 
            category
        }

        setPagination(prev => ({...prev, pageIndex:0}))
        setSubmittedfilter(newFilters)
        retrieveFilms(1, newFilters)
    }

    const handleFilmClick =  async (film_id) => {
        const returned = await fetch(`/films/${film_id}`)
        const film_info = await returned.json()
        setSelectedfilm(film_info)
        setFilmpopup(true)
    }

    return (
     <div className="filmsPage">
        <div className="filter">
            <div>
                <h2>Filter Options</h2>
            </div>
            <div className='filter-input'>
                <form onSubmit={handleFilterClick}>
                    <label>Film Title:{""}</label>
                    <input
                        type='text'
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <label htmlFor='firstname'>Actor First Name:{""}</label>
                    <input 
                        value={actorfirst}
                        onChange={event => setActorfirst(event.target.value)}
                    />
                    <label htmlFor='lastname'>Actor Last Name:{""}</label>
                    <input 
                        value={actorlast}
                        onChange={event => setActorlast(event.target.value)}
                    />
                    <label>Film Genre:{""}</label>
                    <input 
                        value={category}
                        onChange={event => setCategory(event.target.value)}
                    />
                    <button className='filter-btn'>Submit</button>
                    <p><strong>Note:</strong> Submitting on blank fields will reset the film list</p>
                </form> 
            </div>
        </div>
        <div className='divider'></div>
        <div className="table-section">
            <div>
                <FilmTable 
                    data={filmslist}
                    onViewDetails={handleFilmClick}
                    totalrows={totalrecords}
                    totalpagenums={totalpages}
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </div>
            <br/>
            <div className='pagination'>
                <p>Page {totalpages === 0 ? 0 : pagination.pageIndex+1} of {totalpages}</p>
            </div>
        </div>
        <FilmPopup trigger={filmpopup} setTrigger={setFilmpopup}>
            {selectedfilm.length === 0 ? (
                <p>No film found for this film ID.</p>
            ) : (
                <div className='film-rent'>
                    <p><strong>Film ID:</strong> {selectedfilm[0].film_id} - {selectedfilm[0].title} ({selectedfilm[0].release_year})</p>
                    <p><strong>Description:</strong> {selectedfilm[0].description}</p>
                    <p><strong>Rating:</strong> {selectedfilm[0].rating}</p>
                    <p><strong>Special Features:</strong> {selectedfilm[0].special_features}</p>
                    <p><strong>Featured Actors:</strong> {selectedfilm[0].actors.join(', ')}</p>
                    <p><strong>Movie Length:</strong> {selectedfilm[0].length} min</p>
                    <p><strong>Rental Duration:</strong> {selectedfilm[0].rental_duration} days </p>
                    <p><strong>Rental Rate</strong> ${selectedfilm[0].rental_rate}</p>
                    <p><strong>Replacement Cost:</strong> ${selectedfilm[0].replacement_cost} </p>
                </div>
            )}
        </FilmPopup>
     </div>
    )
}