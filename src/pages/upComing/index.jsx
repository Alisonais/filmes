import { Container, Movie, MovieList } from '../home/styles';
import List from '../../list/List';
import { useEffect, useState } from 'react';
import { apiKey } from '../key';
import { Link } from 'react-router-dom';


export default function UpComing() {

  const [movies, setMovies] = useState([]);
  const [cont, setCont] = useState(1)
const wayPath = 'https://image.tmdb.org/t/p/w500';

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${cont}`)
    .then(response => response.json())
    .then(data => {
      setMovies(data.results);
    })
}, [cont]);

function MorePages(){
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  setCont((prevState) => prevState +1);
};

  return (
    <Container>
      <List />
      <MovieList>
        {movies.map((movie) => {
            return(
            <Movie key={movie.id}>
              <Link to={`/details/${movie.id}`} state={{way: '/Upcoming'}} >
                <img src={`${wayPath}${movie.poster_path}`} alt={movie.title} />
              </Link>
              <span> {movie.title} </span>
            </Movie>
          )
        })}
      </MovieList>
      <button onClick={MorePages} > Mais Filmes </button>
    </Container>
  );
};