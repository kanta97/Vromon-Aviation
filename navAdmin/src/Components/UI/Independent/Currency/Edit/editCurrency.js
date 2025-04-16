import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API/currency'
import './editCurrency.css'
import axios from 'axios';

import {
    Badge,
    Button,
    ButtonDropdown,
    Card,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    CardBody,
    CardFooter,
    CardHeader,
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

class editCurrency extends Component {
    constructor(props){
        super(props)
        this.state = {
            db_id: this.props.modal_data.id,
            controls:{
                No: {
                    value: this.props.modal_data.usernm,
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                CurrencyName: {
                    value: this.props.modal_data.display_name,
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                CurrencyRate: {
                    value: this.props.modal_data.phone_no,
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
                UpdatedAt: {
                    value: this.props.modal_data.email,
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
                UpdatedBy: {
                    value: this.props.modal_data.is_active,
                    validation: {
                        required: false
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
    async componentDidMount(){
        await this.getRoleType()
    }
    async getRoleType(){
        var config = {
            headers: {'app_key':  '123456','Content-Type':'application/json','auth_token':localStorage.getItem('_token')}
        };
        axios.get('/currency',config)
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



    editCurrencyHandle = (event) =>{
        event.preventDefault()
        console.log(this.state)
        let No = (this.state.controls['No'].value !== '' && this.state.controls['No'].value !== null && this.state.controls['No'].value !== undefined) ? this.state.controls['No'].value : ''
        let CurrencyName = (this.state.controls['CurrencyName'].value !== '' && this.state.controls['CurrencyName'].value !== null && this.state.controls['CurrencyName'].value !== undefined) ? this.state.controls['CurrencyName'].value : ''
        let CurrencyRate = (this.state.controls['CurrencyRate'].value !== '' && this.state.controls['CurrencyRate'].value !== null && this.state.controls['CurrencyRate'].value !== undefined) ? this.state.controls['CurrencyRate'].value : ''
        let UpdatedAt = (this.state.controls['UpdatedAt'].value !== '' && this.state.controls['UpdatedAt'].value !== null && this.state.controls['UpdatedAt'].value !== undefined) ? this.state.controls['UpdatedAt'].value : ''
        let UpdatedBy = (this.state.controls['UpdatedBy'].value !== '' && this.state.controls['UpdatedBy'].value !== null && this.state.controls['UpdatedBy'].value !== undefined) ? this.state.controls['UpdatedBy'].value : ''
        
        let data = {
            'no': No,
            'currencyName': CurrencyName,
            'currencyRate': CurrencyRate,
            'updatedBy':  UpdatedAt,
            'updatedAt': UpdatedBy,
            


        };
        console.log(this.state.db_id);
        API.editCurrency(data, this.state.db_id).then(response=>{

            if(response.data.success){
                this.props.onEditCurrencyResponse(true, response.data.message)
            } else {
                this.props.onEditCurrencyResponse(false, 'Currency not updated. Invalid data supplied')
            }
        })

    };

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
                            <Label htmlFor="displayname">No</Label>
                            <Input className='input_resize' col={4} value={this.state.controls.No.value} onChange={event => this.inputChangeHandler(event,'No')} type="textarea" id="no" placeholder="Enter No" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="currencyname">Currency Name</Label>
                            <Input value={this.state.controls.CurrencyName.value} type="text" id="CurrencyName" onChange={event => this.inputChangeHandler(event,'CurrencyName')} placeholder="Enter Currency name" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="currencyrate">Currency Rate</Label>
                            <Input  value={this.state.controls.CurrencyRate.value} onChange={event => this.inputChangeHandler(event,'CurrencyRate')} type="text" id="CUrrencyRate" placeholder="Enter Currency Rate" />
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="updatedat">Updated At</Label>
                            <Input type="text" value={this.state.controls.UpdatedAt.value} id="updatedAt" onChange={event => this.inputChangeHandler(event,'UpdatedAt')} placeholder="Enter Name" />
                        </FormGroup>


                        <FormGroup>
                            <Label htmlFor="updatedby">Updated By</Label>
                            <Input  value={this.state.controls.UpdatedBy.value} onChange={event => this.inputChangeHandler(event,'UpdatedBy')} type="text" id="updatedBy" placeholder="Enter Time"/>
                        </FormGroup>


                       
                        <div>
                            <div className='text-center'>
                                <Button onClick={this.editCurrencyHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default editCurrency;
