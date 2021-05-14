import React, { lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { connect } from "react-redux";
import { get_userinfor } from "./redux/actions/index";
import { is_session , fake_session } from "./redux/actions/baseAction";

const FirstPage = lazy(() => import("./views/containers/firstpage"));
const Display = lazy(() => import("./views/containers/displayPage"));
const Login = lazy(() => import("./views/auth/login"));
const Register = lazy(() => import("./views/auth/register"));

class AppRouter extends React.Component {  
  componentDidMount(){
    if(is_session()){
      this.props.get_userinfor();
    }else{
      fake_session();
    }
  }

  render(){
    return (  
      <Router history={history}>
        <Switch>
          <Route path={"/"} exact component={FirstPage} fullLayout />
          <Route path={"/login"} component={Login} fullLayout />
          <Route path={"/register"} component={Register} fullLayout />
          <Route path={"/display"} component={Display} fullLayout />
          <Route component={FirstPage} fullLayout />
        </Switch>
      </Router>
    )
  }
}

const mapstops = (state)=>{
  return {}
}

export default connect(mapstops,{
  get_userinfor
})(AppRouter);