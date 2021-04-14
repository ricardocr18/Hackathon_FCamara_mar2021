/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./style.css";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import api from "../../services/api";
import idade from "../../helpers/tratamentoIdade";
import real from "../../helpers/tratamentoDinheiro";

import { useParams } from "react-router";


function DetalheLista() {
  const [lista, setLista] = useState();
  const [itens, setItens] = useState([]);
  const [valor, setValor] = useState(0);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { id } = useParams();

  async function buscarListas() {
    const { data } = await api.get(`/list/${id}`);
    setLista(data);
  }

  async function handleDoacao(e) {
    e.preventDefault();
    const novosErros = acharErros();
    if (Object.keys(novosErros).length > 0) {
      setErrors(novosErros);
    } else {
      try {
        await api.post(`/donate`, {
          listId: lista.id,
          productsIds: itens,
        });

        setItens([]);
        setValor(0);
        handleClose();
      } catch (e) {}
    }
  }

  function handleSelct(id, preco) {
    if (itens.includes(id)) {
      const itensFiltrados = itens.filter((i) => i !== id);
      setItens(itensFiltrados);
      const precoAtual = (Number(valor) - Number(preco)).toFixed(2);
      setValor(precoAtual);
    } else {
      const precoAtual = (Number(valor) + Number(preco)).toFixed(2);
      setValor(precoAtual);
      setItens([...itens, id]);
      setValor(precoAtual);
    }
  }

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const acharErros = () => {
    const { nome, cvv, dataVencimento, cpf, numero } = form;
    const novosErros = {};
    // name errors
    if (!nome || nome === "")
      novosErros.nome = "O campo nome não pode ficar vazio";
    else if (nome.length < 3)
      novosErros.nome = "O campo nome deve ter mais de 3 caracteres";
    // food errors
    if (!cpf || cpf === "" || cpf.length !== 11)
      novosErros.cpf = "Digite um cpf válido";
    // rating errors
    if (!numero || numero.length !== 16)
      novosErros.numero = "Escreva um número de cartão valido";
    // comment errors
    if (!cvv || cvv.length !== 3)
      novosErros.cvv = "Escreva um número de CVV válido";

    if (!dataVencimento || dataVencimento === "" || dataVencimento.length !== 6)
      novosErros.dataVencimento = "Escreva uma data válida";

    return novosErros;
  };

  useEffect(() => {
    buscarListas();
  }, [itens]);

  return (
    <div className="main">
      <Header />
      <Container>
        {lista ? (
          <>

            <h2 className="tituloDetLista">Lista de Material</h2>
            <div className="info-lista">
            <Row className="infoDetLista">

              <Col>
                <h3 className="nomeAluno">
                  {lista.student.name}, {idade(lista.student.birthDate)} anos.
                </h3>
                <span>Escola: {lista.student.school.name}</span>
                <p>{lista.description}</p>
              </Col>
              <Col>  
                  <img className="avatarAluno" src={`http://localhost:3000/avatar/avatar${lista.student.img_id}.png`} alt="Foto ilustrativa de perfil" />
              </Col>    
            </Row>    
              
            
                <p className="subDetLista">Selecione os itens que deseja doar: </p>
                {lista.productsList.map((item) =>
                  item.purchased === 0 ? (
                    <div key={item.product.id} className="produtoDet">
                      <input 
                        type="checkbox"
                        onClick={() =>
                          handleSelct(item.product.id, item.product.price)
                        }
                      />
                      <div className="info-produto">
                        <p className="pItemDet">{item.product.name}</p>
                        <p className="pPreco">{real(item.product.price)}</p>
                      </div>
                    </div>
                  ) : (
                    <div key={item.product.id} className="produto comprado">
                      <p >{item.product.name}</p>
                    </div>
                  )
                )}
                <p>Subtotal de sua doação: {real(Number(valor))}</p>

                {valor > 0 && <Button className="btnDoar" onClick={handleShow}>Doar</Button>}
              
          </div>  
          </>
        ) : (
          <>
            <p>Carregando...</p>
          </>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tem certeza que deseja doar?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Seu subtotal está em {real(Number(valor))}
            <Form className="cartao-form">
              <Form.Row>
                <Form.Group as={Col} controlId="nome">
                  <Form.Label>Nome:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Escreva seu nome"
                    onChange={(e) => setField("nome", e.target.value)}
                    isInvalid={!!errors.nome}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nome}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="Cpf">
                  <Form.Label>CPF:</Form.Label>
                  <Form.Control
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 11);
                    }}
                    onChange={(e) => setField("cpf", e.target.value)}
                    isInvalid={!!errors.cpf}
                    placeholder="Digite seu CPF"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="numeroCartao">
                  <Form.Label>Número do cartão:</Form.Label>
                  <Form.Control
                    type="number"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 16);
                    }}
                    placeholder=""
                    onChange={(e) => setField("numero", e.target.value)}
                    isInvalid={!!errors.numero}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.numero}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="Data">
                  <Form.Label>MMAAAA:</Form.Label>
                  <Form.Control
                    type="string"
                    placeholder="Ex: 102025"
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 6);
                    }}
                    onChange={(e) => setField("dataVencimento", e.target.value)}
                    isInvalid={!!errors.dataVencimento}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataVencimento}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="CVV">
                  <Form.Label>CVV:</Form.Label>
                  <Form.Control
                    onInput={(e) => {
                      e.target.value = Math.max(0, parseInt(e.target.value))
                        .toString()
                        .slice(0, 3);
                    }}
                    type="number"
                    placeholder="CVV"
                    onChange={(e) => setField("cvv", e.target.value)}
                    isInvalid={!!errors.cvv}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cvv}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            <Button className="btnDoar" variant="success" onClick={handleDoacao}>
              Doar
            </Button>

            </Form>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
}

export default DetalheLista;
