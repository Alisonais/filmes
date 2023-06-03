import { useEffect, useState } from "react";
import { Container, Movie, MovieList } from "../home/styles";
import { apiKey } from "../key";
import { Link } from "react-router-dom";
import List from "../../list/List";

export default function TopRated() {

  const [topRateds, settopRateds] = useState([]);
  const [cont, setCont] = useState(1);
  const wayPath = 'https://image.tmdb.org/t/p/w500'

  useEffect(()=>{    
    fetch(`
    https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${cont}`)
    .then(response => response.json())
      .then(data=> {
        settopRateds(data.results)
      })
  }, [cont]);

  function MorePages(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  setCont((prevState)=> prevState +1);
  };

  return (
    <Container>
      <List />
      <MovieList>
        {topRateds.map((rateds) => {
          return (
            <Movie key={rateds.id}>
              <Link 
              to= {`/details/${rateds.id}`}
              state= {{way: '/TopRated'}}
              >
                <img src={`${wayPath}${rateds.poster_path}`} alt={rateds.title} />
              </Link>
              <span> {rateds.title} </span>
            </Movie>
          )
        })}
      </MovieList>
      <button onClick={MorePages} > Mais Filmes </button>
    </Container>
  );
};