export default function TopFilmsPopup(props) {
    return (props.trigger) ? (
        <div className="overlay" onClick={() => props.setTrigger(false)}>
            <div className="topfilms-popup" onClick={(event) => event.stopPropagation()}>
                <div className="topfilms-popup-inner">
                    {props.children}
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                </div>
            </div>
        </div>
    ) : "";
}