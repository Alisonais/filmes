import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiKey } from "../key";
import { Container } from "./styles";
import { Container as Cont } from "../home/styles";
import { Link } from "react-router-dom";
import { Movie, MovieList } from "../home/styles";

export default function DetailsSeries(props) {

  let { state } = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([])
  const wayPath = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR&page=1`)
      .then(response => response.json())
      .then(data => {
        const { name, poster_path, overview, first_air_date, vote_average } = data;
        const movie = {
          id,
          name,
          image: `${wayPath}${poster_path}`,
          sinopse: overview,
          releaseData: first_air_date,
          vote_average,
        }
        setMovie(movie);
      });

    fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}&language=pt-BR&page=1`)
      .then(response => response.json())
      .then(data => setSimilar(data.results))
  }, [id]);

  function toTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }

  return (
   <>
    <Container>
      <div className="movie">
        <img src={movie.image} alt={movie.sinopse} />
        <div className="details">
          <h1>{movie.name}</h1>
          <span> Sinopse: {movie.sinopse} </span>
          <span className="release"> Release Date: {movie.releaseData}<br /> Release Vote: {movie.vote_average}</span>
          <Link to={state.way}> <button>Voltar</button> </Link>
        </div>
      </div>
    </Container>
    <Cont>
      <MovieList>
        {similar.map((rateds) => {
          return (
            <Movie key={rateds.id}>
              <Link
                onClick={toTop}
                to={`/detailsSeries/${rateds.id}`}
                state={{way: '/Series'}}
              >
                  <img src={`${wayPath}${rateds.poster_path}`} alt={rateds.name} />              
              </Link>
              <span> { rateds.name } </span>
            </Movie>
          )
        })}
      </MovieList>
    </Cont>
   </>
  );
};