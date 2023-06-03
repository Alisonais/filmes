import styled from "styled-components";


export const Nav = styled.nav`
        display: flex;
        justify-content: center;
        gap: 20px;

        a{
            text-decoration: none;
            transition: all 0.5s;
        }

        a:hover{
            transform: scale(1.1);
        }

        h1{
            color: white;
        }
`;