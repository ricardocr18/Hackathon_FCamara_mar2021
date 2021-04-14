import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CadastroResponsavel from "./pages/CadastroResponsavel";
import DetalheLista from "./pages/DetalheLista";
import AreaResponsavel from "./pages/AreaResponsavel";
import DetalheListaResponsavel from "./pages/DetalheListaResponsavel";
import AreaLoja from "./pages/AreaLoja";
import CriacaoLista from "./pages/CriacaoLista";
import Auth from "./services/auth";
import CadastroAluno from "./pages/CadastroAluno";
import CadastroLoja from "./pages/CadastroLoja";
import CadastroProduto from "./pages/CadastroProduto";
import Oficial from "./pages/Oficial"


const RotaResponsavel = (props) => {
  if (!Auth.hasToken() || !Auth.isParent()) {
    const component = () => (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
    return <Route {...props} component={component} />;
  }

  return <Route {...props} />;
};

const RotaLoja = (props) => {
  if (!Auth.hasToken() || Auth.isParent()) {
    const component = () => (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
    return <Route {...props} component={component} />;
  }

  return <Route {...props} />;
};

function Routes() {
  useEffect(() => {
    Auth.destroyToken();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/cadastroResponsavel" component={CadastroResponsavel} />
        <RotaResponsavel path="/cadastroAluno" component={CadastroAluno} />
        <Route path="/" exact component={Oficial} />
        <Route path="/lista" exact component={Home} />
        <Route path="/lista/:id" component={DetalheLista} />
        <RotaLoja path="/areaLoja" exact component={AreaLoja} />
        <RotaLoja path="/areaLoja/cadastroProduto" component={CadastroProduto} />
        <Route path="/cadastroLoja" component={CadastroLoja} />
        <RotaResponsavel
          path="/areaResponsavel"
          exact
          component={AreaResponsavel}
        />
        <RotaResponsavel
          path="/areaResponsavel/criarLista"
          exact
          component={CriacaoLista}
        />
        <RotaResponsavel
          path="/areaResponsavel/lista/:id"
          component={DetalheListaResponsavel}
        />
        <Route path="/login" component={Login} />
        <Route path="" component={Oficial} />
      </Switch>
    </Router>
  );
}

export default Routes;
