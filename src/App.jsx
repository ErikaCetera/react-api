import { useEffect, useState } from 'react'
import axios from 'axios'
import { AppCard } from './components/AppCard';
import { AppForm } from './components/AppForm';


const initialFormData = {
  titolo: "",
  contenuto: "",
  immagine: ""
};

const apiUrl = import.meta.env.VITE_API_URL;

function App() {

  //Variabili di stato 
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

  //Mostra i posts all'avvio della pagina
  useEffect(() => {
    getPosts()
  }, []);

  const getPosts = () => {
    //Preleva lista dei posts dal server
    axios.get(`${apiUrl}/posts`).then((resp) => {
      setArticles(resp.data.postsList)
    });
  };
  console.log(articles);


  // Funzione per gestire l'invio del form
  const handleSubmit = (event) => {
    event.preventDefault();
    //Invia dati del form al server
    axios.post(`${apiUrl}/posts`, formData).then((resp) => {
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

  // Funzione per gestire eliminazione dei posts 
  const handleDelete = (idToDelete) => {
    axios.delete(`${apiUrl}/posts/${idToDelete}`).then((resp) => {
      const newArray = articles.filter((curItem) => curItem.id !== idToDelete);
      setArticles(newArray);
    });
  };

  return (
    <>
      <main className='container mt-5'>

        <section className='my-5'>
          <h2>Articoli</h2>
          {articles.length > 0 ? (
            <div className="row row-cols-2 row-cols-lg-3">
              {articles.map((curItem, index) => (
                <div className="col" key={index}>
                  <AppCard
                    post={curItem}
                    onDelete={() => handleDelete(curItem.id)}
                  />
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
            <AppForm
              form={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
