import React, { Component } from "react";
import { connect } from "react-redux";

class Firstpage extends Component {
  render() {
    return (
      <section className="py-0">
        <div className="container min-vh-100 d-flex flex-column justify-content-between text-center py-7 py-md-8">
          <a href="/">
            <img src="assets/images/logo-dark.png" alt="" />
          </a>
          <div className="my-5">
            <h1 className="display-2 font-weight-bold">404</h1>
            <h3 className="mb-7">Sorry, but this page doesn't exist.</h3>
            <a href="/" className="btn btn-primary mr-2">Take Me Home</a>
            <a href="/" className="btn btn-soft-secondary">Report This</a>
          </div>
          <div>
            <p className="text-gray-700">© 2020 Profilekit - All Rights Reserved - <a href="#!" className="text-gray-500">Privacy Policy</a></p>
          </div>
        </div>
      </section> 
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Firstpage);
