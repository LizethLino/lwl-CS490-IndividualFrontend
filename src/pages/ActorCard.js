const ActorCard = (props) => {
    return (
        <div className='actorbox'>
            <div className='description'>
                <h2>{props.First} {props.Last}</h2>
                <p className='moviecount'>Featured in {props.MovieCount} movies!</p>
                <button className='landingActorButton' onClick={props.onActorClick}>Detail</button>
            </div>
        </div>
    )
}

export default ActorCard