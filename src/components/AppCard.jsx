const apiUrl = import.meta.env.VITE_API_URL;

export const AppCard = ({ post, onDelete }) => {

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4>{post.titolo}</h4>
                    <p>{post.contenuto}</p>
                    <img src={`${apiUrl}/${post.immagine}`} />
                    <span>{post.tags.join('-')}</span>
                </div>
            </div>
            <div>
                <button
                    onClick={onDelete}
                    className="btn btn-warning"
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </>
    )
}