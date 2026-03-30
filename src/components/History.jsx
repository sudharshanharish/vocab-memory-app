export default function History(props){
    const { history, favorites = [] } = props;
    const historyKeys = Object.keys(history)

    return (
        <div className="card history-card">
            <h4>History</h4>

            {/* ⭐ FAVORITES SECTION */}
            <div style={{ marginBottom: "1rem" }}>
                <h5>⭐ Favorites</h5>

                {favorites.length === 0 && (
                    <p>No favorites yet ⭐</p>
                )}

                {favorites.length > 0 && (
                    <div className="history-list">
                        {favorites.map((word, idx) => (
                            <div 
                            key={idx} 
                            className="card-button-secondary"
                            onClick={() => {
                             props.setSelectedWord(word);
                             props.handleChangePage(2); // go to Challenge
                             }}
>
  <h6>{word}</h6>
</div>
                        ))}
                    </div>
                )}
            </div>

            {/* EXISTING HISTORY */}
            {historyKeys.length === 0 && (
                <p>You have no attempt! Press <b>Start</b> to begin ⭐</p>
            )}

            {historyKeys.length > 0 && (
                <div className="history-list">
                    {historyKeys.map((item, itemIdx)=>{
                        const dateKey = (new Date(item)).toString().split(' ')
                        .slice(1, 4).join(' ')
                        return (
                            <div key={itemIdx} className="card-button-secondary">
                                <div>
                                    <p>Started</p>
                                    <h6>{dateKey}</h6>
                                </div>
                                <div>
                                    <p>Streak</p>
                                    <h6>{history[item]}</h6>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}