/**
 * Created by Shohanur on 3/19/2019.
 */


import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter,Redirect} from "react-router-dom";
import Spinner from '../../Components/UI/Spinner/Spinner';
import {forgotPasswordActionCreator,otp_matchActionCreator,NewPasswordActionCreator } from '../../store/actions/user';





class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            mobileNoOrUsername: "",
            otp: "",
            new_password:"",

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitOtp = this.handleSubmitOtp.bind(this);
       this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this);

    }

    routeChange=()=> {
        let path = '/login';
        this.props.history.push(path);
    }
    handleSubmit = (event) => {

        event.preventDefault();


        const {mobileNoOrUsername} = this.state;
         this.props.forgotPassword(mobileNoOrUsername);


    };
    handleSubmitOtp = (event)=>{
        event.preventDefault();
        const {otp} = this.state;
       // console.log(otp);
        this.props.optMatch(otp);
};

    handleSubmitNewPassword = (event)=>{
        event.preventDefault();
        const {new_password} = this.state;
      //  console.log(new_password);
        this.props.newPassword(new_password);
    };
    handleChange = (event) => {

        if (event.target.name ==='mobileNoOrUsername'){

            var inputUsername = event.target.value;

            if (inputUsername.match(/^(?:\+?88)?01[13-9]\d{8}$/) && inputUsername.length > 0) {
                var username = "+880" + inputUsername.substr(inputUsername.length - 10);
                event.target.value=username;

            }

//console.log(event.target.value);
        }

        const name =  event.target.name;
        const value =  event.target.value;
        this.setState({ [event.target.name]: event.target.value}, () => {

            this.setState({
                ...this.state,

            })
        });
    };




    render()
    {
        let to_render = null;

            if(!this.props.otp_sent && !this.props.otp_sent_error){

                        to_render =
                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="8">
                                        <CardGroup>
                                            <Card className="p-4">
                                                <CardBody>
                                                    <form onSubmit={this.handleSubmit}>

                                                        <h1>Password Reset</h1>
                                                        <p className="text-muted">Enter your username or Mobile number</p>
                                                        <InputGroup className="mb-3">
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="icon-user"></i>
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input type="text" placeholder="Username or Mobile Number" name="mobileNoOrUsername"
                                                                   id="mobileNoOrUsername" onChange={this.handleChange} value={this.state.mobileNoOrUsername}/>

                                                            <br/>
                                                        </InputGroup>
                                                        <Row>
                                                            <Col xs="6">
                                                                <Button color="primary" className="px-4" type="submit"
                                                                        name="button"   >Send Otp</Button>
                                                            </Col>
                                                            <Col xs="6" className="text-right">
                                                                <Button color="link" className="px-0" onClick={this.routeChange}>Login</Button>
                                                            </Col>
                                                        </Row>
                                                    </form>
                                                </CardBody>
                                            </Card>

                                        </CardGroup>
                                    </Col>
                                </Row>
                            </Container>

            }
            if(this.props.otp_sent){
                to_render=
                    <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                    <CardBody>
                                        <form onSubmit={this.handleSubmitOtp}>

                                            <h1>Password Reset</h1>
                                            <p className="text-muted">Enter your Otp</p>
                                            <InputGroup className="mb-3">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="icon-user"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input type="text" placeholder="Enter Otp" name="otp"
                                                       id="otp" onChange={this.handleChange} value={this.state.otp}/>

                                                <br/>
                                            </InputGroup>
                                            <Row>
                                                <Col xs="6">
                                                    <Button color="primary" className="px-4" type="submit"
                                                            name="button"   >Submit Otp</Button>
                                                </Col>
                                                <Col xs="6" className="text-right">
                                                    <Button color="link" className="px-0" onClick={this.routeChange}>Login</Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                                </Card>

                            </CardGroup>
                        </Col>
                    </Row>
                </Container>;

            }
             if(this.props.opt_match_sent){
                to_render=  to_render=
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="8">
                                <CardGroup>
                                    <Card className="p-4">
                                        <CardBody>
                                            <form onSubmit={this.handleSubmitNewPassword}>

                                                <h1>New Password </h1>
                                                <p className="text-muted">Enter new Password</p>
                                                <InputGroup className="mb-3">
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="icon-user"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input type="text" placeholder="Enter New Password" name="new_password"
                                                           id="new_password" onChange={this.handleChange} value={this.state.new_password}/>

                                                    <br/>
                                                </InputGroup>
                                                <Row>
                                                    <Col xs="6">
                                                        <Button color="primary" className="px-4" type="submit"
                                                                name="button"   >Change Password</Button>
                                                    </Col>
                                                    <Col xs="6" className="text-right">
                                                        <Button color="link" className="px-0" onClick={this.routeChange}>Login</Button>
                                                    </Col>
                                                </Row>
                                            </form>
                                        </CardBody>
                                    </Card>

                                </CardGroup>
                            </Col>
                        </Row>
                    </Container>;

                    }
            if(this.props.password_reset_req_sent){

                    return (<Redirect
                            to='/login'
                        />);
                }
        if(this.props.password_reset_req_fail){
            localStorage.clear();

                return (<Redirect
                    to='/login'
                />);


        }
        return (
            <div className="app flex-row align-items-center">
                {to_render}
            </div>
        );
    }

}

ForgotPassword.propTypes = {
    optMatch: PropTypes.func.isRequired,
    newPassword:PropTypes.func.isRequired,
    forgotPassword: PropTypes.func.isRequired,
    otp_sent : PropTypes.bool.isRequired,
    otp_sent_error:PropTypes.bool.isRequired,
    opt_match_sent:PropTypes.bool.isRequired,
    password_reset_req_sent:PropTypes.bool.isRequired,
    password_reset_req_fail:PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        opt_match_sent:state.userReducer.opt_match_sent,
        otp_sent_error:state.userReducer.otp_sent_error,
        otp_sent:state.userReducer.otp_sent,
        password_reset_req_sent:state.userReducer.password_reset_req_sent,
        password_reset_req_fail:state.userReducer.password_reset_req_fail
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (mobileNoOrUsername) => dispatch(forgotPasswordActionCreator(mobileNoOrUsername)),
        optMatch:(otp) => dispatch(otp_matchActionCreator(otp)),
        newPassword:(new_password) =>dispatch(NewPasswordActionCreator(new_password))
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ForgotPassword));
