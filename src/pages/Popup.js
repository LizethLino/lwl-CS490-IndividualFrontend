export default function Popup(props) {
    return (props.trigger) ? (
        <div className="overlay" onClick={() => props.setTrigger(false)}>
            <div className="popup" onClick={(event) => event.stopPropagation()}>
                <div className="popup-inner">
                    {props.children}
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                </div>
            </div>
        </div>
    ) : "";
}