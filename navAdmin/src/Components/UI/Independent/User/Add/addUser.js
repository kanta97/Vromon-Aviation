import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './addUser.css'
import axios from 'axios';

import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';

class addUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            controls:{
                USERNAME: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                DISPLAYNAME: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                MOBILE: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                EMAIL: {
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
                ACTIVE: {
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
                ROLE: {
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
                USERTYPE: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                PASSWORD: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                }
            },
            formIsValid: false,
            modal: false,
            loader: false,
            statusPreviewModal: true,
            statusEditModal: true,
            activePreviewModal: false,
            activeEditModal: false,
            successModalTitle: '',
            infoModalTitle: '',
            dangerModalTitle: '',
            warningModalTitle: '',
            successModalBody: '',
            infoModalBody: '',
            dangerModalBody: '',
            warningModalBody: '',
            success: false,
            info: false,
            danger: false,
            warning: false,
            allrole:[]

        }
        this.toggleSuccess = this.toggleSuccess.bind(this)
        this.toggleDanger = this.toggleDanger.bind(this)
        this.toggleWarning = this.toggleWarning.bind(this)
    }

    toggleSuccess() {
        this.setState({
            success: !this.state.success,
        })
    }

    toggleDanger() {
        this.setState({
            danger: !this.state.danger,
        })
    }

    toggleWarning() {
        this.setState({
            warning: !this.state.warning,
        })
    }
    async componentDidMount(){
        await this.getRoleType()
    }
    async getRoleType(){
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
        };
        axios.get('/auth/role/search',config)
            .then((response) => {
              //  console.log(response.data.data);
                if (response.data.success) {
                    this.setState({
                        allrole: response.data.data
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    addUserHandle = (event) =>{
        event.preventDefault()
        let USERNAME = (this.state.controls['USERNAME'].value !== '' && this.state.controls['USERNAME'].value !== null && this.state.controls['USERNAME'].value !== undefined) ? this.state.controls['USERNAME'].value : ''
        let DISPLAYNAME = (this.state.controls['DISPLAYNAME'].value !== '' && this.state.controls['DISPLAYNAME'].value !== null && this.state.controls['DISPLAYNAME'].value !== undefined) ? this.state.controls['DISPLAYNAME'].value : ''
        let MOBILE = (this.state.controls['MOBILE'].value !== '' && this.state.controls['MOBILE'].value !== null && this.state.controls['MOBILE'].value !== undefined) ? this.state.controls['MOBILE'].value : ''
        let EMAIL = (this.state.controls['EMAIL'].value !== '' && this.state.controls['EMAIL'].value !== null && this.state.controls['EMAIL'].value !== undefined) ? this.state.controls['EMAIL'].value : ''
        let ROLE = (this.state.controls['ROLE'].value !== '' && this.state.controls['ROLE'].value !== null && this.state.controls['ROLE'].value !== undefined) ? this.state.controls['ROLE'].value : ''
        let USERTYPE = (this.state.controls['USERTYPE'].value !== '' && this.state.controls['USERTYPE'].value !== null && this.state.controls['USERTYPE'].value !== undefined) ? this.state.controls['USERTYPE'].value : ''
        let PASSWORD = (this.state.controls['PASSWORD'].value !== '' && this.state.controls['PASSWORD'].value !== null && this.state.controls['PASSWORD'].value !== undefined) ? this.state.controls['PASSWORD'].value : ''
        let ACTIVE = (this.state.controls['ACTIVE'].value !== '' && this.state.controls['ACTIVE'].value !== null && this.state.controls['ACTIVE'].value !== undefined) ? this.state.controls['ACTIVE'].value : ''
        let data = {
            'usernm': USERNAME,
            'displayname': DISPLAYNAME,
            'phone_no': MOBILE,
            'email':  EMAIL,
            'role': ROLE,
            'user_type':USERTYPE,
            'password':PASSWORD,
            'active': ACTIVE

        };
        API.addUser(data).then(response=>{
            if(response.data.success){
                this.props.onAddUserResponse(true, "User add")
            } else {
                this.props.onAddUserResponse(false, 'User not added. Invalid data supplied')
            }
        })


    }

    inputChangeHandler = (event, controlName) =>{
        event.preventDefault()
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation ),
                touched: true
            })
        })

        let formIsValid = true
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid
        }
        this.setState( { controls: updatedControls, formIsValid: formIsValid } )
    }

    render() {
        return (
            <div>
                <Col xs="12">
                    <form>
                        <FormGroup>
                            <Label htmlFor="displayname">Display Name</Label>
                            <Input className='input_resize' col={4} value={this.state.controls.DISPLAYNAME.value} onChange={event => this.inputChangeHandler(event,'DISPLAYNAME')} type="textarea" id="displayname" placeholder="Enter displayname" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input value={this.state.controls.USERNAME.value} type="text" id="username" onChange={event => this.inputChangeHandler(event,'USERNAME')} placeholder="Enter username" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input  value={this.state.controls.EMAIL.value} onChange={event => this.inputChangeHandler(event,'EMAIL')} type="text" id="email" placeholder="Enter Email" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="phone_no">Mobile Number</Label>
                            <Input type="text" value={this.state.controls.MOBILE.value} id="phone_no" onChange={event => this.inputChangeHandler(event,'MOBILE')} placeholder="Enter mobile number" />
                        </FormGroup>


                        <FormGroup>
                            <Label htmlFor="role">Role</Label>
                            <Input  value={this.state.controls.ROLE.value} onChange={event => this.inputChangeHandler(event,'ROLE')} type="select" id="role" placeholder="Select Role Type">

                                {
                                    this.state.allrole.length > 0 ?
                                        this.state.allrole.map(item=>{
                                            return(
                                                <option key={item.role_name} value={item.role_name}>{item.role_name}</option>
                                            )
                                        })
                                        : ''
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="user_type">User type</Label>
                            <Input value={this.state.controls.USERTYPE.value} type="text" id="user_type" onChange={event => this.inputChangeHandler(event,'USERTYPE')} placeholder="User type" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="password">Password</Label>
                            <Input  value={this.state.controls.PASSWORD.value} onChange={event => this.inputChangeHandler(event,'PASSWORD')} type="text" id="password" placeholder="Enter Password for user" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="active">Active Status</Label>
                            <Input id="active" type="select" onChange={event => this.inputChangeHandler(event,'ACTIVE')} >
                                <option value="1234">Select Status</option>
                                <option value="0">Deactive</option>
                                <option value="1">Active</option>

                            </Input>
                        </FormGroup>
                        <div>
                            <div className='text-center'>
                                <Button onClick={this.addUserHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
                            </div>
                        </div>
                    </form>
                </Col>
                <Modal isOpen={this.state.success} toggle={this.toggleSuccess}
                       className={'modal-success ' + this.props.className}>
                    <ModalHeader toggle={this.toggleSuccess}>{this.state.successModalTitle}</ModalHeader>
                    <ModalBody>{this.state.successModalBody}</ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggleSuccess}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                    <ModalHeader toggle={this.toggleDanger}>{this.state.dangerModalTitle}</ModalHeader>
                    <ModalBody>{this.state.dangerModalBody}</ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.toggleDanger}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
                <Modal backdrop='static' size='md' isOpen={this.state.warning} toggle={this.toggleWarning}
                       className={'modal-warning ' + this.props.className}>
                    <ModalHeader toggle={this.toggleWarning}>{this.state.warningModalTitle}</ModalHeader>
                    <ModalBody>{this.state.warningModalBody}</ModalBody>
                    <ModalFooter>
                        <Button color="warning" className='text-white' onClick={this.toggleWarning}>Close</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default addUser;
