import React from "react";

function ListaAluno({ nome, idade, descricao, imagem }) {
  return (
    <>
      <div className="listaAluno">
        <img
          src={`http://localhost:3000/avatar/avatar${imagem}.png`}
          alt="Foto ilustrativa da criança"
        />
        <div>
          <h2>
            {nome}, {idade} anos
          </h2>
          <p>{descricao.substring(0, 80)}...</p>
        </div>
      </div>
    </>
  );
}

export default ListaAluno;
