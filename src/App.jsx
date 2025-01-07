import { useEffect, useState } from 'react'
import axios from 'axios'


const initialFormData = {
  titolo: "",
  contenuto: "",
  immagine: ""
};

function App() {
  // Definisce uno stato chiamato 'title' 
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState(initialFormData);



// Funzione per gestire il cambiamento del valore dell'input
  const handleInputChange = (event) => {
    const keyToChange = event.target.name;

    const newData = {
      ...formData,
      [keyToChange]: event.target.value,
    };

    setFormData(newData);
  };
   const url = "http://localhost:3003"

 useEffect(() => {
  getPosts()
 }, []);

 const getPosts = () => {
  axios.get(`${url}/posts`).then((resp) =>{
    
    // console.log(resp.data.postsList);
    
    setArticles(resp.data.postsList)
  });
 };
 console.log(articles);
 

  // Funzione per gestire l'invio del form
  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${url}/posts`, formData).then((resp) => {
      
    

    //creo oggetto nuovo articolo
    const newArticle = {
      ...formData,
    }

    //creo copia degli articoli precedenti
    const newArray = [...articles, newArticle];

    //aggiorno stato menu
    setArticles(newArray)

    //ripulisco stati del form
    setFormData(initialFormData);
  })

  };

  const cancella = (idDaCancellare) => {
    const newArray = articles.filter((curArt) => curArt.id !== idDaCancellare);
    setArticles(newArray);
    axios.delete(`${url}/posts/${idDaCancellare}`).then((resp) => {
    });
  console.log(articles);
  
    
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
                      <h4>{curItem.titolo}</h4>
                      <p>{curItem.contenuto}</p>
                      <img src= {`${url} ${curItem.immagine}`}/>
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
                  name='titolo'
                  // Imposta il valore dell'input
                  value={formData.titolo || ""}
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
                  value={formData.contenuto || ""}
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
                  value={formData.immagine || ""}
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
