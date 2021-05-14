import React, { Component } from "react";
import { connect } from "react-redux";
import { history } from "../../history";
import { getVideoList, removeVideo, updateName } from "../../redux/actions/index";
import { Root } from "../../redux/constants/config";
import { fake_session } from "../../redux/actions/baseAction";
import swal from 'sweetalert';

class Displaypage extends Component {

  componentDidMount(){
    var url = history.location.search.split("=")[1];
    var sendData = {}
    if(url){
      sendData.url = url;
    }
    this.props.getVideoList(sendData);
  }

  calcTime(date){
    var now = new Date().valueOf() / 1000;
    var last = new Date(date).valueOf() / 1000;
    var diff = now - last;
    if(diff < 3600){
      return Math.ceil(diff / 60) + " minutes ago";
    }else if(diff < 3600 * 24){
      return Math.ceil(diff / (60 * 60)) + " hours ago";
    }else{
      return Math.ceil(diff / (60 * 60 * 24)) + " days ago";
    }
  }

  logout(){
    fake_session();
    window.location.assign("/")
  }

  deleteVideo(item){
    swal("Will you remove this video really?", {
      buttons: {
        success: "Yes",
        catch: "Cancel",
      },
    })
    .then((value) => {
      if(value === "success"){
        var url = history.location.search.split("=")[1];
        var sendData = {}
        if(url){
          sendData.url = url;
        }
        this.props.removeVideo(item, sendData)
      }
    });
  }

  updateName(item){
    swal(item.name, {
      content: "input",
    }).then((value) => {
      var url = history.location.search.split("=")[1];
      var sendData = {}
      if(url){
        sendData.url = url;
      }
      this.props.updateName(item, value, sendData);
    });
  }

  render() {

    var videoData = this.props.data.videoData;
    var firstData = this.props.data.firstData;

    return (
      <div className="bg-primary display-main">
        <nav className="navbar navbar-expand-lg navbar-dark shadow-light fixed-top py-2">
          <a className="navbar-brand py-1 scrollto" href="/" onClick = {() => history.push("/")}>
            <div className="navbar-brand-img navbar-brand-img-light">𝓬𝓵𝓲𝓹𝓼𝓱𝓪𝓻𝓮</div>
          </a>
          <div className="navbar-collapse collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              {
                this.props.isLogin ? 
                  <>
                    <p onClick={() => this.logout()} className = "mb-3 mb-lg-0 ml-lg-3 d-block d-lg-inline-block btn">{"Logout"}</p>
                  </>
                   : 
                   <>
                    <button onClick = {() => history.push("/login")} className="btn btn-white d-block d-lg-inline-block ml-lg-3" href="/register" data-on-navbar-light="btn-primary" data-on-navbar-dark="btn-white">Login</button>
                    <button onClick = {() => history.push("/register")} className="btn btn-white d-block d-lg-inline-block ml-lg-3" href="/register" data-on-navbar-light="btn-primary" data-on-navbar-dark="btn-white">Register</button>
                  </>
              }
            </ul>
          </div>
        </nav>

        <div className="row my-11 text-white">
          <div className="col-md-10 mx-auto mb-9">
            <div className="container-fluid">
              <div className="row">

                <div className="col-sm-7 col-xs-2">
                  <div className="card">
                    <div className="card-body">
                      {
                        firstData && firstData.filename ? 
                          <video width="100%" height="100%" id="player" playsInline controls>
                            <source src={`${Root.BASEURL + firstData.filename}`} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                           :
                          (
                            <>
                              {
                                firstData && firstData.url ? 
                                <h4 className="color-black">Video in processing. We will refresh automatically this page when the upload is done</h4>
                                : 
                                <h4 className="color-black">Please select any video.</h4>
                              }
                            </>
                          )
                      }
                    </div>
                    <div className="card-footer">
                      {
                        firstData && firstData.filename ?
                        <>
                          <p className="col-md-9 col-sm-12 color-black float-left">{firstData.filename}</p>
                          <div className="col-md-3 col-sm-12 right-push">
                            <p className="color-black">
                              <i className="fas fa-eye text-success"></i>&nbsp;{ firstData.viewcount }
                            </p>
                          </div>
                        </> : ""
                      }
                    </div>
                  </div>
                </div>

                <div className="col-sm-5 col-xs-2">
                  <div className="card">
                    <div className="card-header color-1">Related Videos</div>
                    <div className="card-body js-lazyload video-list">
                      {
                        videoData.length ?
                          videoData.map((item, key) => (
                            <div key={key} className="video-card video-card-list">
                              <div className="video-card-image">
                                <a href={Root.frontendLink + item.url} className="play-icon"><i className="fas fa-play-circle"></i></a>
                                <img className="img-fluid" src={Root.BASEURL+item.imgname} alt="" />
                              </div>
                              <div className="video-card-body float-left">
                                <div className="video-title">
                                  <a href={Root.frontendLink + item.url}>{item.name}</a>
                                </div>
                                <div className="video-page text-success">
                                  <i className="fas fa-eye text-success"></i>&nbsp;{item.viewcount} views
                                </div>
                                <div className="video-view">
                                  <i className="fas fa-view-alt"></i>&nbsp;{
                                    this.calcTime(item.lastview) 
                                  }
                                </div>
                              </div>
                              {
                                item.email === this.props.user.email ? 
                                  <div className="video-card-footer right-push">
                                    <i className="fas fa-pencil-alt icon-btn btn" onClick={() => this.updateName(item)}></i>
                                    <i className="fas fa-trash-alt icon-btn btn" onClick={()=>this.deleteVideo(item)}></i>
                                  </div> : ""
                              }
                            </div>
                          ))
                          : 
                        <p className="color-black">no relate video.</p>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>    
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.video,
    isLogin: state.auth.isLogin,
    user: state.auth.userData
  };
}

export default connect(mapStateToProps, {
  getVideoList, removeVideo, updateName
})(Displaypage);
