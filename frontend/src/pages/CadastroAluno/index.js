import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Form, Col, Container, Row, Button } from "react-bootstrap";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
import alunos from "../../assets/alunos.png";
import { Formik } from "formik";
import * as Yup from "yup";
function CadastroAluno(props) {
  const history = useHistory();
  const [escolas, setEscolas] = useState([]);
  const [escola, setEscola] = useState();
  const [foto, setFoto] = useState(1);

  const validationSchema = Yup.object().shape({
    nome: Yup.string()
      .required("Preencha o campo nome")
      .min(2, "O campo nome deve ter mais de 2 caracteres")
      .max(100),
    data: Yup.date().required("Selecione a data de nascimento"),
    matricula: Yup.string()
      .required("Preencha o campo matrícula")
      .min(5, "O campo matrícula deve ter no mínimo 5 caracteres")
      .max(150),
    descricao: Yup.string()
      .required("Preencha o campo descrição")
      .min(2, "O campo descrição deve ter no mínimo 2 caracteres")
      .max(300),
  });

  async function handleBairro(event) {
    const { data } = await api.get(
      `/school?neighborhood=${event.target.value}`
    );

    setEscolas(data);
    setEscola();
  }

  async function handleFormik(values, metodos) {
    metodos.setSubmitting(true);

    if (escola) {
      const response = await api.post("/student", {
        name: values.nome,
        studentRA: values.matricula,
        birthDate: values.data,
        schoolId: escola,
        img_id: foto,
      });

      const studentId = response.data.id;

      if (studentId) {
        try {
          const response = await api.post("/list", {
            description: values.descricao,
            studentId,
          });

          const listId = response.data.id;

          history.push(`/areaResponsavel/lista/${listId}`);
        } catch (e) {}
      }
    }

    metodos.resetForm();
    metodos.setSubmitting(false);
  }

  return (
    <div className="mainCadAluno">
      <Header linkLogo="/areaResponsavel" />
      <img id="imgAlunos" src={alunos} alt="Avatar Alunos" />

      <Container>
        <Formik
          initialValues={{
            nome: "",
            data: "",
            matricula: "",
            escola: "",
            descricao: "",
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
                <h1 className="titulo">Quem vai se beneficiar?</h1>
                <Row>
                  <Col xs={9}>
                    <h2 className="subtitulo1">
                      Agora nos diga as informações do aluno:{" "}
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
                      placeholder="Digite o nome do Aluno"
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
                    <Form.Control
                      id="campoNascimento"
                      name="data"
                      type="date"
                      required
                      placeholder="data"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.data}
                      className={
                        touched.data && errors.data ? "erro-campo" : null
                      }
                    />
                    {touched.data && errors.data ? (
                      <div className="erro">{errors.data}</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      id="campoMatricula"
                      name="matricula"
                      required
                      type="text"
                      placeholder="Matrícula"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.matricula}
                      className={
                        touched.data && errors.data ? "erro-campo" : null
                      }
                    />
                    {touched.matricula && errors.matricula ? (
                      <div className="erro">{errors.matricula}</div>
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
                      <option>Bairro da Escola</option>
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

                <Form.Row>
                  <Form.Group as={Col} md="4">
                    <Form.Control
                      required
                      id="campoEscola"
                      name="escola"
                      placeholder="Escola"
                      as="select"
                      onChange={(e) =>
                        e.target.value !== "Selecione uma escola"
                          ? setEscola(e.target.value)
                          : setEscola()
                      }
                      disabled={escolas.length === 0}
                      custom
                    >
                      <option value="Selecione uma escola">
                        Selecione uma escola
                      </option>
                      {escolas.map((escola) => (
                        <option value={escola.id}>{escola.name}</option>
                      ))}
                    </Form.Control>
                    {!escola && escolas.length !== 0 ? (
                      <div className="erro">Selecione uma escola</div>
                    ) : null}
                  </Form.Group>
                </Form.Row>

                <Row>
                  <Col xs={10}>
                    <h2 className="subtitulo2">Selecione um avatar:</h2>
                  </Col>
                </Row>

                <button
                  type="button"
                  className={
                    foto === 1 ? "btnAvatar btnAvatarSelecionado" : "btnAvatar"
                  }
                  onClick={() => setFoto(1)}
                >
                  <img
                    src="http://localhost:3000/avatar/avatar1.png"
                    id="avatarUm"
                    alt="Avatar"
                  ></img>
                </button>
                <button
                  type="button"
                  className={
                    foto === 2 ? "btnAvatar btnAvatarSelecionado" : "btnAvatar"
                  }
                  onClick={() => setFoto(2)}
                >
                  <img
                    src="http://localhost:3000/avatar/avatar2.png"
                    alt="Avatar"
                  ></img>
                </button>
                <button
                  type="button"
                  className={
                    foto === 3 ? "btnAvatar btnAvatarSelecionado" : "btnAvatar"
                  }
                  onClick={() => setFoto(3)}
                >
                  <img
                    src="http://localhost:3000/avatar/avatar3.png"
                    alt="Avatar"
                  ></img>
                </button>

                <Row>
                  <Col xs={10}>
                    <h2 className="subtitulo3">
                      Sinta-se à vontade para deixar um recado a quem visualizar
                      sua lista!
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

export default CadastroAluno;
