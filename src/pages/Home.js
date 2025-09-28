import React, {useState, useEffect} from 'react'
import FilmCard from "./FilmCard"
import ActorCard from './ActorCard'
import Popup from "./Popup"

export default function Home() {
    const [films, setFilms] = useState([]) //set to film setFilm
    const [selectedfilm, setSelectedfilm] = useState([])
    const [filmpopup, setFilmpopup] = useState(false)

    const [actors, setActors] = useState([])
    const [selectedactor, setSelectedactor] = useState([])
    const [actorpopup, setActorpopup] = useState(false)

    useEffect(() => {
        fetch("/films/top5").then(
            res => res.json()
        ).then(
            films => {
                setFilms(films)
            }
        )
    },[])

    useEffect(() => {
        fetch("/actors/top5").then(
            res => res.json()
        ).then(
            actors => {
                setActors(actors)
            }
        )
    },[])

    const handleFilmClick =  async (film_id) => {
        const returned = await fetch(`/films/${film_id}`)
        const film_info = await returned.json()
        setSelectedfilm(film_info)
        setFilmpopup(true)
    }

    const handleActorClick = async (actor_id) => {
        const returned = await fetch(`/actors/${actor_id}/top5films`)
        const actor_info = await returned.json()
        setSelectedactor(actor_info)
        setActorpopup(true)
    }

    return (
        <div className="home">
            <h1>Top 5 Films</h1>

            {films.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div className="topfilms">
                    {films.map((film) => (
                            <FilmCard 
                                key={film.film_id} 
                                Title={film.title}
                                Category={film.category}
                                RentalCount={film.rental_count}
                                onFilmClick={() => handleFilmClick(film.film_id)}
                            />
                    ))}
                </div>
            )}

            <div className='divider'></div>

            {actors.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <div className='topactors'>
                    {actors.map((actor) => (
                        <ActorCard
                            key={actor.actor_id}
                            First={actor.first_name}
                            Last={actor.last_name}
                            MovieCount={actor.movie_count}
                            onActorClick={() => handleActorClick(actor.actor_id)}
                        />
                    ))}
                </div>
            )}

            <Popup trigger={filmpopup} setTrigger={setFilmpopup}>
                {selectedfilm.length === 0 ? (
                    <p>No film found for this film ID.</p>
                ) : (
                    <div className='FilmDetails'>
                        <h2>Film ID: {selectedfilm[0].film_id} - {selectedfilm[0].title} ({selectedfilm[0].release_year})</h2>
                        <h1>Description: <span>{selectedfilm[0].description}</span><br /><br />
                        Rating: <span>{selectedfilm[0].rating}</span><br />
                        Special Features: <span>{selectedfilm[0].special_features}</span></h1>
                    </div>
                )}
            </Popup>

            <Popup trigger={actorpopup} setTrigger={setActorpopup}>
                {selectedactor.length === 0 ? (
                    <p>No actor found for this actor ID.</p>
                ) : (
                    <>
                        <h1>Top 5 Films For this actor</h1>
                        <div className='ActorDetails'>
                            {selectedactor.map((actor) => (
                                <div key={actor.film_id}>
                                    <p><strong>Film ID: {actor.film_id} - {actor.title}</strong><br /><br />
                                    Category: <span>{actor.category}</span><br />
                                    Rental Count: <span>{actor.rental_count}</span>
                                    </p>
                                </div>
                        ))}
                        </div>
                    </>
                )}
            </Popup>
        </div>

    )
}