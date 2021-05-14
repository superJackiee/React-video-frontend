import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../history"
import { Root } from "../../redux/constants/config";
import { getSession } from "../../redux/actions/baseAction";
import axios from "axios";
import copy from 'copy-to-clipboard';
import { fake_session } from "../../redux/actions/baseAction";
import { FileDrop } from 'react-file-drop';
import classnames from "classnames"

class Firstpage extends Component {

  state = {
    fileName: "",

    mainKey: false,
    alert: "",

    uploading: false,
    uploadCompleted: false,
    processFinished:true,
    isOpen:false,

    percent: "0%",
    count: 1,
    fakeArray: [],

    copyUrl: "",
    copy : "",
    uploadMessage: "Uploading Video",
  }

  async ChooseVideo(file){
    this.setState({uploading: false, uploadCompleted: false})
    if(file){
      if(file.type === "video/avi" || file.type === "video/mp4"){
        if(file.size > 52000000){
          this.setState({ mainKey: true, alert: "Please select only smally than 50 M." })
        }else{
          if(this.state.processFinished){
            this.urlPush(file);
          }
        }
      }else{
        this.setState({ mainKey: true, alert: "Please select only mp4 or avi file." })
      }
    }
  }

  async urlPush(file){
    var rdata = await axios.post(`${Root.HOST}video/urlpush`,{username:this.props.user.email});
    if(rdata.status === 200){
      if(rdata.data.status){
        await this.setState({ mainKey: false, uploadCompleted: false, uploading: true, copyUrl: Root.frontendLink + rdata.data.data.url, copy: rdata.data.data.url });
        this.upload(file, rdata.data.data);
        const animation = async (para) => {
          let fakeArray = [];
          for(let i = 0; i < para; i ++){
            fakeArray.push(i);
          }
          await this.setState({ fakeArray, count : para ++});
          if(para >= 5)
            para = 1;
          setTimeout(() => {
            animation(para);
          }, 500)
        }
        animation(this.state.count);
      }else{
        this.setState({ mainKey: true, alert: "Server error." })
      }
    }else{
      this.setState({ mainKey: true, alert: "Network error." })
    }
  }

  upload(file, data){
    var xhr = new XMLHttpRequest();
    var fpdata = new FormData();
    var me = this;
    fpdata.append('video' , file);
    fpdata.append('data' , this.state.fileName && this.state.fileName);
    fpdata.append('id' , data._id);
    xhr.open("POST", `${Root.HOST}video/upload`);
    xhr.setRequestHeader("session", getSession())
    me.setState({ uploadMessage: "Uploading Video",processFinished:false});
    xhr.onload = () => {
      if(xhr.status === 200){
        me.setState({ uploadCompleted: true,processFinished:true,fileName: ""});
      } else {
        me.setState({ mainKey: true, alert: "Video upload error", uploading: false, uploadCompleted: false });
      }
    }
    xhr.upload.onprogress = function(evt) {
      if (evt.lengthComputable) {  
        var percentage = Math.round(evt.loaded / evt.total * 100) + '%';
        me.setState({ percent: percentage });
        console.log(percentage, percentage === "100%")
        if(percentage === "100%"){
          me.setState({ uploadMessage: "Video Processing"});
        }
      } 
    }
    xhr.send(fpdata);
  }

  logout(){
    fake_session();
    window.location.assign("/")
  }

  render() {
    return (
      <div className="bg-primary clip-main">
        <div>
          <FileDrop
            onDrop={(files) => this.ChooseVideo(files[0])}
          />
        </div>
        <nav id="siteNavbar" className="site-navbar site-navbar-transparent navbar navbar-expand-lg navbar-dark shadow-light fixed-top py-2">
          <a className="navbar-brand py-1 scrollto" href="/" onClick = {() => history.push("/")}>
            <div className="navbar-brand-img navbar-brand-img-light">𝓬𝓵𝓲𝓹𝓼𝓱𝓪𝓻𝓮</div>
          </a>
          <button className="navbar-toggler-alternative" aria-expanded={this.state.isOpen} type="button" onClick={()=>this.setState({isOpen: !this.state.isOpen})}>
            <span className="navbar-toggler-alternative-icon">
              <span></span>
            </span>
          </button>
          <div className="navbar-collapse collapse">
            <ul className="navbar-nav ml-auto">
              {
                this.props.isLogin ? 
                <>
                  <p onClick={() => history.push("display")} className = "mb-3 mb-lg-0 ml-lg-3 d-block d-lg-inline-block btn" style = {{color: "white"}}>{"Video List"}</p>
                  <p onClick={() => this.logout()} className = "mb-3 mb-lg-0 ml-lg-3 d-block d-lg-inline-block btn" style = {{color: "white"}}>{"Logout"}</p>
                </>
                : 
                <>
                  <button onClick = {() => history.push("/login")} className="btn btn-soft-white d-block d-lg-inline-block w-100 w-lg-auto mb-3 mb-lg-0 ml-lg-3" data-on-navbar-light="btn-soft-secondary" data-on-navbar-dark="btn-soft-white">Login</button>
                  <button onClick = {() => history.push("/register")} className="btn btn-white d-block d-lg-inline-block ml-lg-3" href="/register" data-on-navbar-light="btn-primary" data-on-navbar-dark="btn-white">Register</button>
                </>
              }
            </ul>
          </div>
          <div className = {this.state.isOpen ? "navbar-collapse":"header-hide"}>
            <div className="navbar-collapse pt-5">
              <ul className="navbar-nav ml-auto">
                {
                  this.props.isLogin ? 
                  <>
                    <p onClick={() => history.push("display")} className = "mb-3 mb-lg-0 ml-lg-3 d-block d-lg-inline-block btn" style = {{color: "white"}}>{"Video List"}</p>
                    <p onClick={() => this.logout()} className = "mb-3 mb-lg-0 ml-lg-3 d-block d-lg-inline-block btn" style = {{color: "white"}}>{"Logout"}</p>
                  </>
                  : 
                  <>
                    <button onClick = {() => history.push("/login")} className="btn btn-soft-white d-block d-lg-inline-block w-100 w-lg-auto mb-3 mb-lg-0 ml-lg-3" data-on-navbar-light="btn-soft-secondary" data-on-navbar-dark="btn-soft-white">Login</button>
                    <button onClick = {() => history.push("/register")} className="btn btn-white d-block d-lg-inline-block ml-lg-3" href="/register" data-on-navbar-light="btn-primary" data-on-navbar-dark="btn-white">Register</button>
                  </>
                }
              </ul>
            </div>
          </div>
        </nav>

        <a href="/" className="btn-back-to-top scrollto btn btn-icon btn-primary shadow-light mb-4 mr-4" tabIndex="-1"> 
          <i className="fas fa-chevron-up btn-icon-inner"></i>
        </a>
        <div className="row my-18 text-white text-center">
          <div className="col-md-10 mx-auto mb-9">
            {
              this.state.uploading ? 
              <>
              <h3>
                {this.state.uploadCompleted ? "Completed" : 
                <>{this.state.uploadMessage}
                  {this.state.fakeArray.map((item, idx) => (
                    <span key={idx}>.</span>
                  ))}
                </>
                }
              </h3>
              <div className="my-5">
                <div className="container mt-4 mb-5 responsive" id="sharing-box">
                  <div className="card w-75 ml-auto mr-auto">
                    <div className="card-header">
                      <div className="progress"  style={{height: "40px"}}>
                        <div className="progress-bar bg-success" role="progressbar" style={{width: `${this.state.percent}`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.percent}</div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div id="sharing-actions" className="d-flex justify-content-center">
                        <button className="btn btn-primary" id="share_link" onClick={() => copy(this.state.copyUrl)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy mr-1">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>Copy link
                        </button>
                        <button className="btn ml-2" id="watch" onClick={() => history.push( "display?id=" + this.state.copy)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye mr-1">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>Watch
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
              :
              <>
                <h3>Share your videos files!</h3>
                <p className="text-gray-700 mb-4">
                  <span className="text-white typing-cripshare">
                    Upload your videos and share it to whomever you want.
                  </span>
                </p>
                {this.state.mainKey && <small className="form-text text-muted">{this.state.alert}</small>}
                <div className="my-8"> </div>
                <form className="form start-form">
                  <div className="upload start-form-pane">
                    <button type="button" className="btn btn-white btn-lg" onClick = {() => document.getElementById("file").click()}>
                    <i className="fas fa-cloud-upload-alt" aria-hidden="true"></i> Upload a video file
                    </button>
                    <div className="description">
                        <div className="restrictions">2 min / 50 MB max</div>
                    </div>
                  </div>
                  <div className="ml-5">
                    <div className="url-picker">
                        <input 
                          type="text" 
                          className="form-control text-white" 
                          placeholder="Input File Name" 
                          onChange={(e) => this.setState({ fileName: e.target.value })}
                        />
                    </div>
                  </div>
                </form>
              </>
            }
          </div>
        </div>
        <p className="text-white-50 text-center">
            <a href="#!" className="text-white">About Us</a> |&nbsp;
            <a href="#!" className="text-white">Privacy & Terms</a> | &nbsp;
            <a href="#!" className="text-white">Contact</a> 
        </p>
        <input 
          id="file" 
          type="file" 
          accept=".mp4,.avi" 
          style = {{display : "none"}} 
          onChange = {e => this.ChooseVideo(e.target.files[0])}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin,
    user: state.auth.userData
  };
}

export default connect(mapStateToProps, {})(Firstpage);
