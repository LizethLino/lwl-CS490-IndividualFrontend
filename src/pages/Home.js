import React, {useState, useEffect} from 'react'
import FilmCard from "./FilmCard"
import ActorCard from './ActorCard'
import TopFilmsPopup from './TopFilmsPopup'
import ActorPopup from './ActorPopup'

export default function Home() {
    const [films, setFilms] = useState([]) //set to film setFilm
    const [selectedfilm, setSelectedfilm] = useState([])
    const [filmpopup, setFilmpopup] = useState(false)

    const [actors, setActors] = useState([])
    const [selectedactor, setSelectedactor] = useState([])
    const [actortopfilms, setActortopfilms] = useState([])
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
        const returned_actor = await fetch(`/actors/${actor_id}`)
        const actor_info = await returned_actor.json()

        const returned_info = await fetch(`/actors/${actor_id}/top5films`)
        const actor_topfilms = await returned_info.json()

        setSelectedactor(actor_info)
        setActortopfilms(actor_topfilms)
        setActorpopup(true)
    }

    return (
        <div className="home">
            <div className='top-films'>
                <h1>Top 5 Films</h1>

                {films.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <div className="film-cards">
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
            </div>
           
            <div className='top-actors'>
                <h1>Top 5 Actors</h1>
                {actors.length === 0 ? (
                    <p>Loading...</p>
                ) : (
                    <div className='actor-cards'>
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
            </div>
            <TopFilmsPopup trigger={filmpopup} setTrigger={setFilmpopup}>
                {selectedfilm.length === 0 ? (
                    <p>No film found for this film ID.</p>
                ) : (
                    <div className='FilmDetails'>
                        <p><strong>Film ID:</strong> {selectedfilm[0].film_id} - {selectedfilm[0].title} ({selectedfilm[0].release_year})</p>
                        <p><strong>Description:</strong> {selectedfilm[0].description}<br /><br />
                        <strong>Rating:</strong> {selectedfilm[0].rating}<br />
                        <strong>Special Features:</strong> {selectedfilm[0].special_features}<br/>
                        <strong>Featured Actors:</strong> {selectedfilm[0].actors.join(', ')}
                        </p>
                    </div>
                )}
            </TopFilmsPopup>

            <ActorPopup trigger={actorpopup} setTrigger={setActorpopup}>
                {selectedactor.length === 0 ? (
                    <p>No actor found for this actor ID.</p>
                ) : (
                    <>
                        <h1>Actor ID: {selectedactor[0].actor_id} - {selectedactor[0].first_name} {selectedactor[0].last_name}</h1>
                        <h2>Top 5 Films:</h2>
                        <div className='ActorDetails'>
                            {actortopfilms.map((actor) => (
                                <p key={actor.film_id}>
                                    <strong>Film ID: {actor.film_id} - {actor.title}</strong> | Category: {actor.category} | Rental Count: {actor.rental_count}
                                </p>
                        ))}
                        </div>
                    </>
                )}
            </ActorPopup>
        </div>

    )
}