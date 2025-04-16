/**
 * Created by Shohanur on 3/22/2019.
 */
/**
 * Created by Shohanur on 3/19/2019.
 */


import Loadable from "react-loadable";
import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter,Redirect} from "react-router-dom";
import Spinner from '../../Components/UI/Spinner/Spinner';
import {ChangepasswordActionCreator } from '../../store/actions/user';

const loading = () => <Spinner/>;


const Layout = Loadable({
    loader: () => import('../../Containers/Layout/'),
    loading
});

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            old_password: "",
            new_password: "",
            confirm_new_password:"",
            errors: {}

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    routeChange = () => {
        let path = '/login';
        this.props.history.push(path);
    }
    handleSubmit = (event) => {

        event.preventDefault();

        if(this.state.new_password === this.state.confirm_new_password){
           // console.log(this.state);
            const {old_password,new_password} = this.state;
            this.props.changePassword(old_password,new_password);

        }
        else{
            const  errors={};
            errors.password_missmatch = "Passwords don't match";
            this.setState({
                ...this.state,errors
            })

        }





    };


    handleChange = (event) => {



        const name = event.target.name;
        const value = event.target.value;
        this.setState({[event.target.name]: event.target.value}, () => {

            this.setState({
                ...this.state,

            })
        });
    };


    render() {
        let to_render = null;


        to_render =
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <form onSubmit={this.handleSubmit}>

                                        <h1>Password Change</h1>
                                        <p className="text-muted">Enter your old Password</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Old password"
                                                   name="old_password"
                                                   id="old_password" onChange={this.handleChange}
                                                   value={this.state.old_password}/>


                                            <br/>
                                        </InputGroup>
                                        <p className="text-muted">Enter your New Password</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="New password"
                                                   name="new_password"
                                                   id="new_password" onChange={this.handleChange}
                                                   value={this.state.new_password}/>

                                            <br/>


                                        </InputGroup>
                                        <div>
                                            {this.state.errors.password_missmatch?<span style={{color:'red',fontWeight:'bold'}}>{this.state.errors.password_missmatch}</span>:null}

                                        </div>
                                        <p className="text-muted">Confirm New Password</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder=" Confirm New password"
                                                   name="confirm_new_password"
                                                   id="confirm_new_password" onChange={this.handleChange}
                                                   value={this.state.confirm_new_password}/>

                                            <br/>
                                        </InputGroup>

                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4" type="submit"
                                                        name="button">Change password</Button>
                                            </Col>
                                            {/*<Col xs="6" className="text-right">
                                             <Button color="link" className="px-0"
                                             onClick={this.routeChange}>Login</Button>
                                             </Col>*/}
                                        </Row>
                                    </form>
                                </CardBody>
                            </Card>

                        </CardGroup>
                    </Col>
                </Row>
            </Container>


        return (
            <Fragment>
                <Layout>
                    <div className="app flex-row align-items-center">

                        {to_render}

                    </div>
                </Layout>
            </Fragment>
        );


    }
}

ChangePassword.propTypes = {
    changePassword: PropTypes.func.isRequired,
    ChangePasswordSuccess: PropTypes.bool.isRequired

};

const mapStateToProps = (state) => {
    return {
        ChangePasswordSuccess: state.userReducer.ChangePasswordSuccess,


    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (old_password,new_password) => dispatch(ChangepasswordActionCreator(old_password,new_password)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
