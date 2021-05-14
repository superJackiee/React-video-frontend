import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../history"
import axios from "axios"
import { Root } from "../../redux/constants/config";
import { setSession } from "../../redux/actions/baseAction";

class Register extends Component {
  state = {
    userData : {
      email : "",
      password : "",
      repassword : ""
    },
    emailKey : false,
    passwordKey : false,
    repasswordKey : false,

    mainKey : false,
    alert : ""
  }

  gotoPage(page){
    history.push(page)
  }

  updateUserInfo(key , value){
    var userData = this.state.userData;
    userData[key] = value;
    this.setState({ userData });
  }
  
  register(){
    var userData = this.state.userData;
    if(userData.email === "" || userData.password === "" || userData.repassword === "" ){
      this.setState({ 
        emailKey : userData.email === "" ? true : false, 
        passwordKey : userData.password === "" ? true : false, 
        repasswordKey : userData.repassword === "" ? true : false
      })
    }else if(userData.password !== userData.repassword){
      this.setState({ repasswordKey : true })
    }else{
      this.setState({ emailKey: false, passwordKey: false, repasswordKey: false });
      axios.post(`${Root.HOST}auth/register` , this.state.userData).then(rdata => {
        if(rdata.data.status){
          this.setState({ mainKey : false , alert : "" });
          setSession(rdata.data.data._id);
        }else{
          this.setState({ mainKey : true , alert : rdata.data.data })
        }
      }).catch(e => {
        this.setState({ mainKey : true , alert : "This is connection error." })
      })
    }
  }

  render() {
    return (
      <div className="bg-primary clip-main">
        {this.state.alertKey && <div className="alert alert-danger" role="alert"> {this.state.alert} </div>}
        <nav id="siteNavbar" className="site-navbar site-navbar-transparent navbar navbar-expand-lg navbar-dark shadow-light fixed-top py-2">
          <a className="navbar-brand py-1 scrollto" href="/">
            <div className="navbar-brand-img navbar-brand-img-light">𝓬𝓵𝓲𝓹𝓼𝓱𝓪𝓻𝓮</div>
          </a>
          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto"> 
              <button onClick = {() => this.gotoPage("/login")} className="btn btn-soft-white d-block d-lg-inline-block w-100 w-lg-auto mb-3 mb-lg-0 ml-lg-3" data-on-navbar-light="btn-soft-secondary" data-on-navbar-dark="btn-soft-white">Login</button>
              <button onClick = {() => this.gotoPage("/register")} className="btn btn-white d-block d-lg-inline-block ml-lg-3" data-on-navbar-light="btn-primary" data-on-navbar-dark="btn-white">Register</button>
            </ul>
          </div>
        </nav>
        <div className="row my-18 text-white">
            <div className="col-md-12 mx-auto mb-9">
              <h3 className = "text-center">Register</h3>
              <div className="my-8"></div>
              <div className="form start-form">
                <div className="upload start-form-pane" style = {{width : "20%"}}>
                  <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" onChange ={(e) => this.updateUserInfo("email" , e.target.value)} />
                    {this.state.emailKey && <small className="form-text text-muted">Please input correct email address. </small>}
                  </div>
                  <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" onChange ={(e) => this.updateUserInfo("password" , e.target.value)} />
                    {this.state.passwordKey && <small className="form-text text-muted">Please input correct password. </small>}
                  </div>
                  <div className="form-group">
                    <label >Confirm Password</label>
                    <input type="password" className="form-control" onChange ={(e) => this.updateUserInfo("repassword" , e.target.value)} />
                    {this.state.repasswordKey && <small className="form-text text-muted">Please input correct confirm password. </small>}
                  </div>
                  {this.state.mainKey && <small className="form-text text-muted">{this.state.alert}</small>}
                  <button onClick = {() => this.register()} className="btn btn-white">Submit</button>
                </div>
              </div>
            </div>
        </div>
        <p className="text-white-50 text-center">© 2021 Clipshare.tv - All Rights Reserved - 
          <a href="#!" className="text-white">Privacy Policy</a> / 
          <a href="#!" className="text-white">Contact</a> 
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {

})(Register);