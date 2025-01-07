import { useEffect, useState } from 'react'


const initialFormData = {
  title: "",
  content: "",
  image: ""
};

function App() {
  // Definisce uno stato chiamato 'title' 
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [availableMessage, setAvailableMessage] = useState("");

useEffect(() => {
  if (formData.available) {
    setAvailableMessage("L'articolo verrà pubblicato")
    
  }else{
    setAvailableMessage("Attenzione, l'articolo non verrà pubblicato")
  }

}, [formData.available])


// Funzione per gestire il cambiamento del valore dell'input
  const handleInputChange = (event) => {
    const keyToChange = event.target.name;


    let newValue;
    // Se l'input è checkbox
    if (event.target.type === "checkbox") {
      //il value da inserire sarà true o false, preso da target.checked
      newValue = event.target.checked;
    } else {
      newValue = event.target.value;
    }

    const newData = {
      ...formData,
      [keyToChange]: newValue,
    };

    setFormData(newData);
  };




  // Funzione per gestire l'invio del form
  const handleSubmit = (event) => {
    event.preventDefault();

    //creo oggetto nuovo articolo
    const newArticle = {
      ...formData,
      id: Date.now()
    }

    //creo copia degli articoli precedenti
    const newArray = [...articles, newArticle];

    //aggiorno stato menu
    setArticles(newArray)

    //ripulisco stati del form
    setFormData(initialFormData);

  };

  const cancella = (idDaCancellare) => {
    const newArray = articles.filter((curArt) => curArt.id !== idDaCancellare);
    setArticles(newArray);
  };

  return (
    <>
      <main className='container mt-5'>

        <section className='my-5'>
          <h2>Articoli</h2>
          {articles.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {articles.map((curItem) => (
                <div className="col" key={curItem.id}>
                  <div className="card">
                    <div className="card-body">
                      <h4>{curItem.title}</h4>
                      <p>{curItem.author}</p>
                      <button
                        onClick={() => cancella(curItem.id)}
                        className="btn btn-warning"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nessun articolo presente</p>
          )}
        </section>


        <section>
          <div className='row w-50'>
            <h3 className='mb-3'>Aggiungi un Articolo</h3>
            <form onSubmit={handleSubmit} >

              {/* //TITOLO*/}
              <div className='mb-3'>
                <label className='form-label' htmlFor="article-title">Titolo</label>
                <input
                  className='form-control w-50'
                  type="text" id='article-title'
                  name='title'
                  // Imposta il valore dell'input
                  value={formData.title || ""}
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
                  name='content'
                  // Imposta il valore dell'input
                  value={formData.content || ""}
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
                  name='image'
                  // Imposta il valore dell'input
                  value={formData.image || ""}
                  // Chiama handleChange quando il valore dell'input cambia
                  onChange={handleInputChange}
                />
              </div>

              <button type="submit" className="btn btn-success">Aggiungi</button>
            </form>

          </div>
        </section>
      </main>
    </>
  )
}

export default App
