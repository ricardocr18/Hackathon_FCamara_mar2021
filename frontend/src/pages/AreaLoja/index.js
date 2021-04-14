import React, { useState, useEffect } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Produto from "../../components/Produto";
import {
  Container,
  Col,
  Row,
  Button,
  Accordion,
  Card,
  Modal,
  FormControl,
} from "react-bootstrap";
import Auth from "../../services/auth";
import { useHistory } from "react-router";
import api from "../../services/api";
import real from "../../helpers/tratamentoDinheiro";
import { toast } from "react-toastify";
import auth from "../../services/auth";
import { Link } from "react-router-dom";

function AreaLoja() {
  const history = useHistory();

  const [produtos, setProdutos] = useState([]);
  const [info, setInfo] = useState();
  const [show, setShow] = useState(false);
  const [valor, setValor] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSair() {
    Auth.destroyToken();
    history.push("/");
  }

  async function getProdutos() {
    try {
      const { data } = await api.get(`/products/paperStore/${auth.getId()}`);

      setProdutos(data);
    } catch (e) {
      setProdutos([]);
    }
  }

  async function handleRetirarSaldo() {
    if (valor > info.balance) {
      toast.error("Valor acima do saldo atual");

      setValor();
      handleClose();
    } else {
      try {
        await api.post("/paperStore/money", {
          value: valor,
        });

        toast.success("Dinheiro retirado com sucesso.");

        setValor();
        handleClose();
      } catch (e) {
        toast.error("Erro ao retirar dinheiro");
      }
    }
  }

  async function getInfo() {
    try {
      const { data } = await api.get("/paperStore/info");
      setInfo(data);
    } catch (e) {
      setInfo([]);
    }
  }

  useEffect(() => {
    getInfo();
    getProdutos();
  }, [show]);

  return (
    <>
      <Header linkLogo="/areaLoja">
        <Button onClick={handleSair}>Sair</Button>
      </Header>

      {info !== undefined ? (
        <>
          <Container>
            <h1 className="titulo">Painel Papelaria: {info.name}</h1>
            <div id="botoes">
              <h2 className="subtitulo1">O que você quer fazer?</h2>
              <Row>
                <Col>
                  <Accordion>
                    <Card id="caixa">
                      <Accordion.Toggle
                        id="caixaSaldo"
                        as={Card.Header}
                        eventKey="0"
                      >
                        Ver meu Saldo
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body id="valorSaldo">
                          {real(info.balance)}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Col>
              </Row>
              {info.balance > 0 && (
                <Row>
                  <Col>
                    <button onClick={handleShow} id="opcaoPapelaria">
                      Receber Saldo
                    </button>
                  </Col>
                </Row>
              )}
              <Row>
                <Col>
                  <Link
                    class="btn"
                    to="/areaLoja/cadastroProduto"
                    id="opcaoPapelaria"
                  >
                    Adicionar Produto
                  </Link>
                </Col>
              </Row>

              {produtos !== [] ? (
                <h2 className="subtitulo1">Meus produtos:</h2>
              ) : (
                <h2 className="subtitulo1">Sem produtos cadastrados na loja</h2>
              )}
            </div>
            <Row className="tresCards">
              {produtos.map((produto) => (
                <Produto
                  key={produto.id}
                  nome={produto.name}
                  img={produto.img_url}
                  valor={real(produto.price)}
                />
              ))}
            </Row>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Retirar dinheiro</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Seu saldo atual é de: {real(info.balance)}</p>
                <label htmlFor="valor">Quanto deseja retirar?</label>
                <FormControl
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  name="valor"
                  type="number"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleRetirarSaldo}>
                  Retirar
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
          <Footer />
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
}

export default AreaLoja;
