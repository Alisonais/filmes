import { Link } from "react-router-dom";
import { Nav } from "./styles";


export default function List(pros) {
    return (
        <Nav>
            <Link to={'/'} ><h1> Filmes </h1></Link>
            <Link to={'/Upcoming'} ><h1> Em Breve </h1></Link>
            <Link to={'/TopRated'} ><h1> Mais Votados </h1></Link>
            <Link to={'/Series'} ><h1> Series </h1></Link>
        </Nav>
    );
};