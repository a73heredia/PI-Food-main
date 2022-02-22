import React from "react";
import './Paginated.css'

export default function Paginado({recipesPerPage, allRecipes, paged}){
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i);
    }

    const listStyle = {
        listStyle: 'none',
        display: 'inline'
    }

    return(
        <nav>
            <ul className="paged">
                {pageNumbers &&
                pageNumbers.map((number) => {
                    return <li style={listStyle} className="number" key={number}> 
                        <button className="btnPg" onClick={() => paged(number)}>{number}</button>
                        </li>
                }
            )}
            </ul>
        </nav>
    )
}