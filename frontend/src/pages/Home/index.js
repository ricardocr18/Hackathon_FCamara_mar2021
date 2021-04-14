import React, { useState, useEffect } from "react";
import "./style.css";
import { Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListaAluno from "../../components/ListaAluno";
import idade from "../../helpers/tratamentoIdade";
import api from "../../services/api";

function Home() {
  const [listaAlunos, setListaAlunos] = useState([]);

  async function buscarListas(bairro = "") {
    const { data } = await api.get(`/list?neighborhood=${bairro}`);
    setListaAlunos(data);
  }

  function handleFiltro(event) {
    buscarListas(event.target.value);
  }

  useEffect(() => {
    buscarListas();
  }, []);

  return (
    <div className="main">
      <Header>
        <Link className="btn btn-primary" to="/login">
          Acessar
        </Link>
      </Header>

      <Container>

        <h1 className="tituloHome">
          Aqui você encontra várias crianças e pode escolher uma para ajudar, basta selecionar o bairro.
        </h1>
        <span className="subtituloHome">Bairro:</span>

      <Form className="caixaSelect">
        <Form.Row >
          <Col lg="2">
            <Form.Control id="campoSelect" onChange={handleFiltro} as="select" defaultValue="Selecione...">
              <option value="" selected>Selecione...</option>
              <option value="Vila Carrão">Vila Carrão</option>
              <option value="Vila Matilde">Vila Matilde</option>
              <option value="Vila Nova Manchester">Vila Nova Manchester</option>
              <option value="Chácara Califórnia">Chácara Califórnia</option>

            </Form.Control>
          </Col>
        </Form.Row>
      </Form>


     {
       listaAlunos.length ? (
      <div className="listagem">
          {listaAlunos.map((lista) => {
            return (
              <Link key={lista.id} to={`/lista/${lista.id}`}>
                <ListaAluno
                  nome={lista.student.name}
                  idade={idade(lista.student.birthDate)}
                  descricao={lista.description}
                  imagem={lista.student.img_id}
                />
              </Link>
            );
          })}
        </div>
       ) :
       (
         <>
         <h3 className="subtituloHome2"> Sem listas nesse bairro </h3>
         <h2 className="sad"> :( </h2> 
         </>
       )
      }
      
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
