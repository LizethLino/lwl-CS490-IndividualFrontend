import film_image from "./film_png.png"

const FilmCard = (props) => {
    return (
        <div className='filmbox'>
            <img src={film_image} alt="Film Image"/>
            <div className='description'>
                <h2>{props.Title}</h2>
                <p className='category'>{props.Category}</p>
                <p className='rentcount'>Rented {props.RentalCount} times!</p>
                <button className='landingFilmButton' onClick={props.onFilmClick}>Detail</button>
            </div>
        </div>
    )
}

export default FilmCard