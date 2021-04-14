/* eslint-disable no-useless-escape */
import React from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import MaskedInput from "react-maskedinput";
import imgResp from "../../assets/responsavel2.png";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function CadastroResponsavel(props) {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("O campo nome é obrigatório")
      .min(2, "O tamanho mínimo do campo é 2 caracteres")
      .max(100),
    email: Yup.string()
      .required("O campo email é obrigatório")
      .email("Preencha o campo email no formato correto"),
    senha: Yup.string()
      .required("O campo senha é obrigatório")
      .min(8, "O campo senha deve ter no mínimo 8 caracteres")
      .max(16, "A senha deve ter menos de 16 caracteres"),
    telefone: Yup.string()
      .required("O campo telefone é obrigatório")
      .min(8)
      .max(16),
    cpf: Yup.string()
      .required("O campo CPF é obrigatório")
      .matches(
        /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
        "Preencha o campo cpf no formato correto"
      ),
  });

  async function handleFormik(values, metodos) {
    metodos.setSubmitting(true);

    try {
      await api.post("/parent", {
        name: values.nome,
        email: values.email,
        cpf: values.cpf,
        phone: values.telefone,
        password: values.senha,
      });

      history.push(`/login`);
    } catch (e) {
      toast.error("Usuário já existente com esse email");
    }

    metodos.resetForm();
    metodos.setSubmitting(false);
  }

  return (
    <div className="mainResponsavel">
      <Header />
      <Container>
        <img id="imgRespon" src={imgResp} alt="Avatar Responsavel" />
        <Formik
          initialValues={{
            nome: "",
            cpf: "",
            telefone: "",
            email: "",
            senha: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) =>
            handleFormik(values, { setSubmitting, resetForm })
          }
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="formulario" onSubmit={handleSubmit}>
              <div className="formMenor">
                <h1 className="tituloResponsavel">Cadastro do Responsável</h1>
               
                  <Col >
                    <h2 className="sub1">
                      Insira os seus dados:{" "}
                    </h2>
                  </Col>
                
                <Form.Row className="linhaForm1">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campoNome"
                      name="nome"
                      required
                      type="text"
                      placeholder="Nome Completo"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.nome}
                      className={
                        touched.nome && errors.nome ? "erro-campo" : null
                      }
                    />
                    {touched.nome && errors.nome ? (
                      <div className="erro">{errors.nome}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <MaskedInput
                      required
                      type="text"
                      name="cpf"
                      mask="111.111.111-11"
                      placeholder="  CPF"
                      id="campoCPF"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.cpf}
                      className={
                        touched.cpf && errors.cpf ? "erro-campo" : null
                      }
                      {...props}
                      formatCharacters={{
                        W: {
                          validate(char) {
                            return /\w/.test(char);
                          },
                          transform(char) {
                            return char.toUpperCase();
                          },
                        },
                      }}
                    />

                    {touched.cpf && errors.cpf ? (
                      <div className="erro">{errors.cpf}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="6">
                    <MaskedInput
                      type="text"
                      mask="(11) 11111-1111"
                      placeholder="  Telefone"
                      name="telefone"
                      id="campoTel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.telefone}
                      className={
                        touched.telefone && errors.telefone
                          ? "erro-campo"
                          : null
                      }
                      {...props}
                      formatCharacters={{
                        W: {
                          validate(char) {
                            return /\w/.test(char);
                          },
                          transform(char) {
                            return char.toUpperCase();
                          },
                        },
                      }}
                    />

                    {touched.telefone && errors.telefone ? (
                      <div className="erro">{errors.telefone}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                
                  <Col >
                    <h2 className="sub2">
                      Informações para login:
                    </h2>
                  </Col>
              
                <Form.Row className="linhaForm1">
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      id="campoMail"
                      required
                      name="email"
                      type="mail"
                      placeholder="E-mail"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={
                        touched.email && errors.email ? "erro-campo" : null
                      }
                    />

                    {touched.email && errors.email ? (
                      <div className="erro">{errors.email}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      id="campoSenha"
                      required
                      name="senha"
                      type="password"
                      placeholder="Senha"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.senha}
                      className={
                        touched.senha && errors.senha ? "erro-campo" : null
                      }
                    />
                    {touched.senha && errors.senha ? (
                      <div className="erro">{errors.senha}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>

                <Button id="btnEnviar" type="submit">
                  Cadastrar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
      <Footer />
    </div>
  );
}

export default CadastroResponsavel;
