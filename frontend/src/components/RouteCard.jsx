export default function RouteCard({ route, active, onClick }) {
    return (
        <div className={`route-card ${active ? "selected" : ""}`} onClick={onClick}>
            <span className={`dot ${route.color}`} />
            <div>
                <b>{route.color.toUpperCase()}</b>
                <small>{(route.risk * 100).toFixed(0)}% risk</small>
            </div>
        </div>
    );
}
