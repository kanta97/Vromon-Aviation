import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import md5 from "md5";
import { signInActionCreator } from "../../store/actions/user";
import { withRouter } from "react-router-dom";
import Spinner from "../../Components/UI/Spinner/Spinner";
import "./Login.css";
import logo from '../../assets/img/logo.png'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNoOrUsername: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  routeChange = () => {
    let path = "/forgotpassword";
    this.props.history.push(path);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { mobileNoOrUsername, password } = this.state;
    this.props.userLogin(mobileNoOrUsername, md5(password));
  };

  handleChange = (event) => {
    if (event.target.name === "mobileNoOrUsername") {
      var inputUsername = event.target.value;

      if (
        inputUsername.match(/^(?:\+?88)?01[13-9]\d{8}$/) &&
        inputUsername.length > 0
      ) {
        var username = "+880" + inputUsername.substr(inputUsername.length - 10);
        event.target.value = username;
      }
    }

    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.setState({
        ...this.state,
      });
    });
  };

  render() {
    if (!!localStorage.getItem("_token")) {
      this.props.history.replace({
        pathname: "/dashboard",
      });
    }
    let to_render = null;
    if (this.props.isLoading) {
      to_render = (
        <div className="form-area">
          <Spinner />
        </div>
      );
    } else {
      to_render = (
        <Container className="container1">
          <Row className="justify-content-center">
            <Col md="12">
          
                <Card className="p-5 pt-3 border-0  card_cus">
                  <CardBody className="p-0">
                    <form onSubmit={this.handleSubmit}>
                      <div className="m-auto mb-4">
                    <img  src={logo}  className="img-fluid mb-4" width={160} height={80}/>
                    </div>
                      {/* <p className="text-muted text-center">Sign In to your account</p> */}
                      <InputGroup className="mb-3">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          type="text"
                          placeholder="Username"
                          name="mobileNoOrUsername"
                          id="mobileNoOrUsername"
                          onChange={this.handleChange}
                          value={this.state.mobileNoOrUsername}
                        />

                        <br />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        {/* <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          id="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="12">
                          <Button
                            color="primary"
                            className="px-4 w-100 button1"
                            type="submit"
                            name="button"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="12" className="text-left">
                          <Button
                          color='muted'
                            style={{color:"#10b7b1"}}
                            className="px-0 pt-2"
                            onClick={this.routeChange}
                          >
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </form>
                  </CardBody>
                </Card>
                {/* <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
             
            </Col>
          </Row>
        </Container>
        
      );
    }

    return <div className="app flex-row align-items-center body1">
      
      {to_render}
    
    
    
    </div>;
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  token: PropTypes.string,
  isAuthenticated: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.userReducer.token,
    isAuthenticated: !!localStorage.getItem("_token"),
    hasErrored: state.userReducer.hasErrored,
    isLoading: state.userReducer.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (mobileNoOrUsername, password) =>
      dispatch(signInActionCreator(mobileNoOrUsername, password)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
