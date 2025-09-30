export default function FilmPopup(props) {
    return (props.trigger) ? (
        <div className="overlay" onClick={() => props.setTrigger(false)}>
            <div className="film-popup" onClick={(event) => event.stopPropagation()}>
                <div className="film-popup-inner">
                    {props.children}
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                </div>
            </div>
        </div>
    ) : "";
}