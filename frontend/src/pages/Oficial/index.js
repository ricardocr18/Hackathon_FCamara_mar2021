import React from 'react';
import './style.css';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CadastroResponsavel from "../CadastroResponsavel"
import { Container,  Col, Button,Row,Card,CardGroup} from "react-bootstrap";
import img_nosso from '../../assets/Rectangle2_home1.png' ;
import Ellipse1 from '../../assets/Ellipse1.png';
import Ellipse2 from '../../assets/Ellipse2.png';
import Ellipse3 from '../../assets/Ellipse3.png'
import { Link } from "react-router-dom";
import seta from '../../assets/seta_baixo.png'

function Oficial() {
    return (
        <>
        <Header >
            <Link className="btn btn-primary"  to="/login">Login</Link>
        </Header>
       
        <Container fluid >   
            <Row>    
                <div id='fundo_inicio'>
                
                    <div>
                        <h1 className='h1_titulo'>Olá, somos a<br/> Lapiseira!</h1>
                    </div>

                    <p className='p_home' id='p_home_largura'>Conectamos alunos com<br/> 
                        necessidades de materiais<br/> 
                        escolares a pessoas com<br/>
                        vontade de mudar essa<br/>
                        realidade.</p>
                    
                    
                    <Link className="btn button1" to="/lista">Confira as listas</Link>
                    {/* <Link className="btn button1" id="button_precipal" to="/lista">Confira as listas1</Link> */}
                    {/* <span><img src={seta} id="seta"/></span> */}
                </div>   
             

                <h2 className='h2_home'>Nosso Objetivo</h2>

                <Row xs={2} md={2} id='MedidaPNaoRolarPLado'>
             
                    <Col  >
                    <p  className='p_texto_imagem'>Acreditamos na educação acima de tudo e queremos que crianças não percam oportunidade de aprender mais por falta de material.</p>

                    </Col> 
                    <Col >
                        <img src={img_nosso} id="img_nosso_objetivo"/>
                    </Col>
                </Row>

                <h2 id='espacamento_h2' className='h2_home'>Faça Parte</h2>
                    
           
                <Row xs={1} md={2} className='MedidaPNaoRolar'>
                   
                    <Col>             
                        <p className='p_home p_centralizarTexto '>Se você for o responsável por um aluno da rede pública que precisa de material escolar, cadastre-se abaixo.</p>
                        <Link className="btn button2" id="espacamento_button2" to="/CadastroResponsavel">Cadastrar</Link>
                    </Col>

                    <Col>
                        <p className='p_home p_centralizarTexto '>Se você for uma papelaria e quiser fazer parte desse projeto, cadastre-se aqui. Seus produtos ficarão disponíveis para a compra dos doadores e os responsáveis retiram o material com você.</p>
                        <Link className="btn button2" to="/CadastroLoja">Cadastrar</Link>

                    </Col>
                   
                </Row>
   
                <h2 className='h2_home'>Depoimentos</h2>

                <Row xs={3} md={3}  id="MedidaParaNaoRolarAPagina">
                        
                    <Col>
                        <div className='fundo_card'>
                            <img src={Ellipse1} className='img_card'/>
                            <p className='p_card '>Muito bom, conseguir materia para o meu filho estudar.</p>
                        </div>
                    </Col>
                    <Col>
                        <div className='fundo_card'>
                            <img src={Ellipse2} className='img_card'/>
                            <p className='p_card '>Recomendo a plataforma me ajutou muito</p>
                        </div> 
                    </Col>
                    <Col>
                        <div className='fundo_card'>
                            <img src={Ellipse3} className='img_card'/>
                            <p className='p_card'>#futurodascriança, muito bom</p>
                        </div>
                    </Col> 
           
                </Row>
            </Row>

        </Container>
        <Footer/>
        </>
    );
}
  
export default Oficial;