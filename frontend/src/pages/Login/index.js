import React, { useState } from "react";
import "./login.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import imagemlogin from "./fotologin.png";
import api from "../../services/api";
import { useHistory } from "react-router";
import Auth from "../../services/auth";
import { Link } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [dados, setDados] = useState({
    email: "",
    password: "",
  });

  const [erro, setErro] = useState(false);

  const handleInputChange = (event) => {
    setDados({
      ...dados,
      [event.target.name]: event.target.value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try{
      const response = await api.post("/auth/parent", {
        ...dados,
      });

      if (response.status === 200) {
        Auth.setToken({
          id: response.data.id,
          token: response.data.token,
          type: "Parent",
        });
        history.push("/areaResponsavel");
      }
    }
    catch(e){
      try{

        const responseStore = await api.post("/auth/store", {
          ...dados,
        });
  
        if (responseStore.status === 200) {
          Auth.setToken({
            id: responseStore.data.id,
            token: responseStore.data.token,
            type: "Store",
          });
        history.push("/areaLoja");
        } 
      }catch(e){
        setErro(true)
      }
    }
        

  
  }

  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col sm={6}>

            <div className="div_texto">
              <h1 id="h1_login">

                Olá, somos a<br /> Lapiseira
              </h1>

              <p id='p_login'>
                Conectamos alunos com necessidades de materiais escolares com
                pessoas com vontade de mudar essa realidade.
              </p>
            </div>
          </Col>

          <Col sm={6}>
            <div className="grid">
              <Row>
                <Col xs={6} sm={6}>
                  <div id='espacamento_texto_img'>
                    <h2 className="h2_titulo_login">
                      Faça o login <br />e vamos <br />
                      mudar o<br /> mundo!
                    </h2>
                  </div>
                </Col>
                <Col xs={6} sm={6}>
                  <div>
                    <img
                      className="img_login"
                      alt="imagem ilustrativa login"
                      src={imagemlogin}
                    />
                  </div>
                </Col>
              
                <Col xs={12} sm={12}>
                  <Form id="form" onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Control
                      
                        id="input_login"
                        type="email"
                        placeholder="Email"
                        onChange={handleInputChange}
                        name="email"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Control
                        id="input_login"
                        onChange={handleInputChange}
                        name="password"
                        type="password"
                        placeholder="Senha"
                      />
                    </Form.Group>
                    {erro && <span className="erro">Email e/ou senha inválidos.</span>}

                      <div id="buttom_div">
                        <Button id="buttonEntar" type="submit">
                          Login
                        </Button>
                      </div>
                                    {/* <Link to="/cadastroResponsavel">Cadastro responsável</Link>
                    <Link to="/cadastroLoja">Cadastro Loja</Link> */}
                  </Form>
                </Col> 
              </Row>
            </div>

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
