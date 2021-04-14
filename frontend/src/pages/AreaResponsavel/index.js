
import React, { useEffect, useState } from 'react';
import "./style.css";
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Filho from '../../components/Filho';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import idade from '../../helpers/tratamentoIdade'
import api from '../../services/api';
import Auth from '../../services/auth'

// import { Container } from './styles';

function AreaResponsavel() {
  const history = useHistory();

  const [listaFilhos, setListaFilhos] = useState([]);

  async function buscarFilhos() {
    const { data } = await api.get(`/student/parent`);
    setListaFilhos(data.students);
  }

  useEffect(() => {
    buscarFilhos();
  }, []);

  function handleSair() {
    Auth.destroyToken();
    history.push("/");
  }

  return (

    <div className="mainAreaResp">
      <Header linkLogo="/areaResponsavel">
        <Button className="btnSair" onClick={handleSair}>Sair</Button>
      </Header>
      <Container>
        <h1 className="tituloAreaResp">Adicione as informações do(s) estudante(s).</h1>
        <Link className="btn btn-primary btnAdicionaAluno" to="/cadastroAluno" style={{marginBottom: "20px"}}>Adicionar Estudante</Link>

        
        <div className="listagem">
          {listaFilhos ? (
            <>
              {listaFilhos.map((filho) => (
                <Filho
                  key={filho.id}
                  nome={filho.name}
                  lista={filho.list}
                  idade={idade(filho.birthDate)}
                  imagem={filho.img_id}
                />
              ))}
            </>
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </Container>
    <Footer/>
    </div>

  );
}

export default AreaResponsavel;
