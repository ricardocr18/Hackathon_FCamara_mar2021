import React from "react";
import { Link } from "react-router-dom";

function Filho({ nome, idade, descricao, lista, imagem }) {
  return (
    <>
      <div className="listaAluno">
        <img
          src={`http://localhost:3000/avatar/avatar${imagem}.png`}
          alt="Foto ilustrativa da criança"
        />

        <div style={{width: "100%"}}>
          <h2 >{nome}, {idade} anos</h2>
          
          {
            lista ? (
              <Link className="btn btn-primary btnVerLista" variant="" style={{width: '100%'}} to={`/areaResponsavel/lista/${lista.id}`}>Ver Lista</Link>
            ):
            null
          }
        </div>
      </div>
    </>
  );
}

export default Filho;
