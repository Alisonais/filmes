import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiKey } from "../key";
import { Container } from "./styles";
import { Container as Cont, Movie, MovieList } from "../home/styles";
import { Link } from "react-router-dom";


export default function Details(props) {

  let { state } = useLocation();
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const wayPath = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetch(`
            https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR&page=1`)
      .then(response => response.json())
      .then(data => {
        const { title, poster_path, overview, release_date } = data;
        const movie = {
          id,
          title,
          image: `${wayPath}${poster_path}`,
          sinopse: overview,
          releaseData: release_date,
        }
        setMovie(movie);
      });

    fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=pt-BR&page=1`)
      .then(response => response.json())
      .then(data => setSimilar(data.results))

  }, [id]);

  function toTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Container>
        <div className="movie">
          <img src={movie.image} alt={movie.sinopse} />
          <div className="details">
            <h1>{movie.title}</h1>
            <span> Sinopse: {movie.sinopse} </span>
            <span className="release"> Release Date: {movie.releaseData} </span>
            <Link to={state.way}> <button> Voltar </button> </Link>
          </div>
        </div>
      </Container>
      <Cont>
        <MovieList>
          {similar.map((rateds) => {
            return (
              <Movie key={rateds.id} >
                <Link
                  onClick={toTop}
                  to={`/details/${rateds.id}`}
                  state={{ way: '/' }}
                >
                  <img src={`${wayPath}${rateds.poster_path}`} alt={rateds.title} />
                </Link>
                <span> {rateds.title} </span>
              </Movie>
            );
          })};
        </MovieList>
      </Cont>
    </>
  );
};