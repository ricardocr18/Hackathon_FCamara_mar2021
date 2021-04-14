import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function CadastroProduto(props) {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Nome do produto é obrigatório")
      .min(2, "O campo nome deve ter pelo menos 2 caracteres")
      .max(100, "O campo nome deve ter no máximo 100 caracteres"),
    descricao: Yup.string().required("Descrição do produto é obrigatória"),
    link: Yup.string()
      .required("Link da imagem é obrigatório")
      .min(5, "O link deve ter pelo menos 5 caracteres")
      .max(300, "O link deve ter menos de 300 caracteres"),
    valor: Yup.number().required("O campo preço é obrigatório"),
  });

  async function handleFormik(values, metodos) {
    metodos.setSubmitting(true);

    try {
      await api.post("/products", {
        name: values.nome,
        description: values.descricao,
        email: values.email,
        img_url: values.link,
        price: values.valor,
      });
      history.push("/areaLoja");
    } catch (e) {
      toast.error("Erro ao criar produto");
    }

    metodos.resetForm();
    metodos.setSubmitting(false);
  }

  return (
    <div className="main">
      <Header linkLogo="/areaLoja" />

      <Container>
        <Formik
          initialValues={{
            nome: "",
            descricao: "",
            valor: "",
            link: "",
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
                <h1 className="titulo">Cadastro de produto</h1>
                <Row>
                  <Col xs={9}>
                    <h2 className="subtitulo1">Insira os dados do produto:</h2>
                  </Col>
                </Row>
                <Form.Row className="linhaForm1">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campoNome"
                      name="nome"
                      required
                      type="text"
                      placeholder="Nome do produto"
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
                  <Form.Group className="caixaTexto" as={Col} md="12">
                    <Form.Control
                      id="campodescricao"
                      name="descricao"
                      as="textarea"
                      rows={6}
                      required
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="descricao do produto"
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
                </Form.Row>
                <Form.Row className="linhaForm3">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campovalor"
                      name="valor"
                      required
                      type="number"
                      placeholder="Valor do produto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.valor}
                      className={
                        touched.valor && errors.valor ? "erro-campo" : null
                      }
                    />
                    {touched.valor && errors.valor ? (
                      <div className="erro">{errors.valor}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                {values.link && (
                  <img
                    style={{ height: "180px", width: "180px" }}
                    src={values.link}
                    alt="Imagem do produto"
                  />
                )}
                <Form.Row className="linhaForm4">
                  <Form.Group className="campo" as={Col} md="4">
                    <Form.Control
                      id="campoemail"
                      name="link"
                      required
                      type="text"
                      placeholder="Link da imagem do produto"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.link}
                      className={
                        touched.link && errors.link ? "erro-campo" : null
                      }
                    />
                    {touched.link && errors.link ? (
                      <div className="erro">{errors.link}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>

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

export default CadastroProduto;
