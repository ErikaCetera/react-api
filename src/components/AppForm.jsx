export const AppForm = ({form, handleInputChange, handleSubmit}) => {

    return (
        <>
            <form onSubmit={handleSubmit} >

                {/* //TITOLO*/}
                <div className='mb-3'>
                    <label className='form-label' htmlFor="article-title">Titolo</label>
                    <input
                        className='form-control w-50'
                        type="text" id='article-title'
                        name='titolo'
                        // Imposta il valore dell'input
                        value={form.titolo || ""}
                        // Chiama handleChange quando il valore dell'input cambia
                        onChange={handleInputChange}
                    />
                </div>

                {/* //CONTENUTO*/}
                <div className='mb-3'>
                    <label className='form-label' htmlFor="article-content">Contenuto</label>
                    <textarea
                        className='form-control '
                        type="text" id='article-content'
                        name='contenuto'
                        // Imposta il valore dell'input
                        value={form.contenuto || ""}
                        // Chiama handleChange quando il valore dell'input cambia
                        onChange={handleInputChange}
                    />
                </div>

                {/* //IMMAGINE*/}
                <div className='mb-3'>
                    <label className='form-label' htmlFor="article-image">Immagine</label>
                    <input
                        className='form-control w-50'
                        type="text" id='article-image'
                        name='immagine'
                        // Imposta il valore dell'input
                        value={form.immagine || ""}
                        // Chiama handleChange quando il valore dell'input cambia
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="btn btn-success">Aggiungi</button>
            </form>
        </>
    )
}