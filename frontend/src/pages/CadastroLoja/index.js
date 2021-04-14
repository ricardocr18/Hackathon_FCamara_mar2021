import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import papelaria from "../../assets/papelaria.png";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
function CadastroLoja(props) {
  const history = useHistory();

  const [bairro, setBairro] = useState("");

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("O campo nome é obrigatório")
      .min(2, "O campo deve ter no mínimo 2 caracteres")
      .max(120, "O campo deve ter menos de 120 caracteres"),
    descricao: Yup.string()
      .required("O campo descrição é obrigatório")
      .min(2, "O campo de descrição deve ter pelo menos 2 caracteres")
      .max(280, "O campo de descrição deve ter menos de 280 caracteres"),
    email: Yup.string().required("O campo email é obrigatório").email(),
    senha: Yup.string()
      .required("O campo senha é obrigatório")
      .min(8, "O campo senha deve ter pelo menos 8 caracteres")
      .max(16, "O campo senha deve ter pelo menos 16 caracteres"),
    rua: Yup.string()
      .required("O campo rua é obrigatório")
      .min(2, "O campo rua deve ter mais de 2 caracteres")
      .max(140, "O campo rua deve ter menos de 140 caracteres"),
  });

  async function handleBairro(event) {
    setBairro(event.target.value);
  }

  async function handleFormik(values, metodos) {
    metodos.setSubmitting(true);
    try {
      if (bairro !== "") {
        await api.post("/paperStore", {
          name: values.nome,
          description: values.descricao,
          email: values.email,
          password: values.senha,
          street: values.rua,
          neighborhood: bairro,
          city: "São Paulo",
          state: "SP",
        });
        history.push("/");
      }
    } catch (e) {
      toast.error("Erro ao criar papelaria");
    }

    metodos.resetForm();
    metodos.setSubmitting(false);
  }

  return (
    <div className="main">
      <Header linkLogo="/" />
      <img id="imgPapelaria" src={papelaria} alt="Imagem de materiais" />


      <Container>
        <Formik
          initialValues={{
            nome: "",
            descricao: "",
            email: "",
            senha: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
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
              {console.log(values)}

              <div className="formMenor">
                <h1 className="tituloLoja">Cadastro de papelaria parceira</h1>
                <Row>
                  <Col xs={9}>
                    <h2 className="subtitulo1">
                      Insira os dados da papelaria:
                    </h2>
                  </Col>
                </Row>
                <Form.Row className="linhaForm1">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campoNome"
                      name="nome"
                      required
                      type="text"
                      placeholder="Nome do estabelecimento"
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

                <Form.Row className="linhaForm2">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campoemail"
                      name="email"
                      required
                      type="text"
                      placeholder="Email"
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

                <Form.Row className="linhaForm2">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campoemail"
                      name="senha"
                      required
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

                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      required
                      id="campoUf"
                      name="uf"
                      placeholder="UF"
                      as="select"
                      custom
                      disabled
                    >
                      <option value="SP">SP</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      Informe seu Estado!
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      required
                      id="campoCidade"
                      name="cidade"
                      placeholder="Cidade"
                      as="select"
                      custom
                      disabled
                    >
                      <option value="São Paulo">São Paulo</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      required
                      id="campoBairro"
                      name="bairro"
                      placeholder="Bairro"
                      as="select"
                      onChange={handleBairro}
                      custom
                    >
                      <option value="">Bairro da Papelaria</option>
                      <option value="Vila Carrão">Vila Carrão</option>
                      <option value="Vila Matilde">Vila Matilde</option>
                      <option value="Vila Nova Manchester">
                        Vila Nova Manchester
                      </option>
                      <option value="Chácara Califórnia">
                        Chácara Califórnia
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Form.Row className="linhaForm2">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="camporua"
                      name="rua"
                      required
                      type="text"
                      placeholder="Rua do estabelecimento"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.rua}
                      className={
                        touched.rua && errors.rua ? "erro-campo" : null
                      }
                    />
                    {touched.rua && errors.rua ? (
                      <div className="erro">{errors.rua}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>

                <Row>
                  <Col xs={10}>
                    <h2 className="subtitulo3">
                      Sinta-se à vontade para deixar um recado a quem visualizar
                      sua papelaria
                    </h2>
                  </Col>
                </Row>

                <Form.Group id="caixaTexto">
                  <Form.Control
                    placeholder="Digite seu texto"
                    as="textarea"
                    rows={6}
                    name="descricao"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.descricao}
                    className={
                      touched.descricao && errors.descricao
                        ? "erro-campo"
                        : null
                    }
                  />
                  {touched.descricao && errors.descricao ? (
                    <div className="erro">{errors.descricao}</div>
                  ) : null}
                </Form.Group>

                <Button id="btnEnviar" disabled={isSubmitting} type="submit">
                  Enviar
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

export default CadastroLoja;
