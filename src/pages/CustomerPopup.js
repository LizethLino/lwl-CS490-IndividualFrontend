export default function CustomerPopup(props) {
    return (props.trigger) ? (
        <div className="overlay" onClick={() => props.setTrigger(false)}>
            <div className="customer-popup" onClick={(event) => event.stopPropagation()}>
                <div className="customer-popup-inner">
                    {props.children}
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>close</button>
                </div>
            </div>
        </div>
    ) : "";
}