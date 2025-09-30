export default function ActorPopup(props) {
    return (props.trigger) ? (
        <div className="overlay" onClick={() => props.setTrigger(false)}>
            <div className="actor-popup" onClick={(event) => event.stopPropagation()}>
                <div className="actor-popup-inner">
                    {props.children}
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                </div>
            </div>
        </div>
    ) : "";
}