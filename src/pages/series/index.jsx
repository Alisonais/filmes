import { useEffect, useState } from "react";
import { Container, Movie, MovieList } from "../home/styles";
import { apiKey } from "../key";
import { Link } from "react-router-dom";
import List from "../../list/List";

export default function Series() {

  const [series, setSeries] = useState([]);
  const [cont, setCont] = useState(1);
  const wayPath = 'https://image.tmdb.org/t/p/w500'

  useEffect(()=>{    
      fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}&language=pt-BR&page=${cont}`)
        .then(response => response.json())
        .then(data => {
            setSeries(data.results);
        })
        .catch(err => console.error(err));
  }, [cont]);

  function MorePages(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    setCont((prevState)=> prevState +1)
  };

  return (
    <Container>
      <List />
      <MovieList>
        {series.map((rateds) => {
          return (
            <Movie key={rateds.id}>
              <Link 
              to= {`/detailsSeries/${rateds.id}`}
              state= {{way: '/Series'}}
              >
                <img src={`${wayPath}${rateds.poster_path}`} alt={rateds.title} />
              </Link>
              <span> {rateds.name} </span>
            </Movie>
          )
        })}
      </MovieList>
      <button onClick={MorePages} >Mais Series</button>
    </Container>
  );
};