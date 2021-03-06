import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import Link from "../../components/links/Link";
import logoUrl from "../../static/images/logo.png";

const origin = {
  showDropdownItem: false
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { ...origin };

    this.goToProfile = this.goToProfile.bind(this);
    this.goToHomePage = this.goToHomePage.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleOnToggle = this.handleOnToggle.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({ type: "saga_verify_auth" });
  }

  goToHomePage() {
    this.props.history.push("/");
  }

  goToProfile() {
    this.props.history.push("/profile");
  }

  handleLogout() {
    localStorage.removeItem("access_token");

    this.props.dispatch({
      namespace: "header",
      desc: "log out",
      type: "SET_ORIGIN"
    });
  }

  handleOnToggle() {
    const { showDropdownItem } = this.state;
    this.setState({ showDropdownItem: !showDropdownItem });
  }

  render() {
    const { authenticated, username } = this.props.authentication;

    return (
      <div id="app-header">
        <Row className="align-items-center">
          <Col xs={{ size: 3, offset: 1 }}>
            <Row className="align-items-center">
              <img
                id="app-logo"
                src={logoUrl}
                alt="logo"
                onClick={this.goToHomePage}
              />
              <span id="app-name">Daily Record</span>
            </Row>
          </Col>

          {authenticated ? (
            <Col xs={{ size: 3, offset: 5 }}>
              <Button
                outline
                color="info"
                className="half-margin-right"
                onClick={this.goToProfile}
              >
                Hi, {username}
              </Button>
              <Button color="info" onClick={this.handleLogout}>
                Log out
              </Button>
            </Col>
          ) : (
            <Col xs={{ size: 3, offset: 5 }}>
              <Link name="login" color="info" />
              <Link name="register" color="warning" />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => state.header;

const mapDispatchToProps = dispatch => ({
  dispatch: action => dispatch(action)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
