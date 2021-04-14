/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import api from "../../services/api";
import "./style.css";
function CriacaoLista({ bairro, listId }) {
  const history = useHistory();
  const [papelarias, setPapelarias] = useState([]);
  const [papelariaSelecionada, setpapelariaSelecionada] = useState();
  const [produtos, setProdutos] = useState([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  async function buscarPapelarias() {
    const { data } = await api.get(`/paperStore?neighborhood=${bairro}`);

    setPapelarias(data);
  }

  useEffect(() => {
    buscarPapelarias();
  }, []);

  async function buscarProdutos() {
    setProdutosSelecionados([]);
    if (papelariaSelecionada) {
      const { data } = await api.get(
        `/products/paperStore/${papelariaSelecionada}`
      );

      setProdutos(data);
    } else {
      setProdutos([]);
    }
  }

  async function handleConfirmacao() {
    try {
      await api.post("productsList", {
        listId,
        productsIds: produtosSelecionados,
      });

      history.push(`/areaResponsavel`);
    } catch (e) {
      console.log(e);
    }
  }

  function selecionarProduto(id) {
    if (!produtosSelecionados.includes(id)) {
      setProdutosSelecionados([...produtosSelecionados, id]);
    } else {
      const removerItem = produtosSelecionados.filter((item) => item !== id);

      setProdutosSelecionados(removerItem);
    }
  }

  useEffect(() => {
    buscarProdutos();
  }, [papelariaSelecionada]);

  return (
    <>
      <h1 id="tituloCriacaoLista">Momento de montar sua lista</h1>
      <h2 id="subCriacaoLista">Selecione uma papelaria da sua região</h2>
      <Form.Control
        
        required
        id="papelaria"
        name="papelaria"
        as="select"
        custom
        onChange={(e) => setpapelariaSelecionada(e.target.value)}
      >
        <option value="">Selecione a papelaria</option>
        {papelarias.map((papelaria) => (
          <option value={papelaria.id}>{papelaria.name}</option>
        ))}
      </Form.Control>
      {papelariaSelecionada && (
        <>
          <h3 id="tituloCriacaoLista">Selecione os produtos:</h3>
          <div className="lista">
            {produtos.map((produto) => (
              <div class="produtoLista">
                <img
                  src={produto.img_url}
                  onClick={() => selecionarProduto(produto.id)}
                  class={
                    produtosSelecionados.includes(produto.id) &&
                    "produtoSelecionado"
                  }
                  alt="Imagem produto"
                />
                <p>{produto.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {produtosSelecionados.length !== 0 ? (
        <>
          <Button className="btnItemProduto" onClick={handleConfirmacao}>Adicionar produtos</Button>
        </>
      ) : null}
    </>
  );
}

export default CriacaoLista;
