import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API/currency'
import './addCurrency.css'
import axios from 'axios';
import {toastr} from 'react-redux-toastr';

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

class addCurrency extends Component {
    constructor(props){
        super(props)
        this.state = {
            controls:{
                No: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                FromCurrency: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                ToCurrency: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                CurrencyRate: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                },
                UpdatedAt: {
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
                UpdatedBy: {
                    value: '',
                    validation: {
                        required: false
                    },
                    valid: true,
                    touched: false
                },
              
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

    addCurrencyHandle = (event) =>{
        event.preventDefault()
        

        // let No = (this.state.controls['No'].value !== '' && this.state.controls['No'].value !== null && this.state.controls['No'].value !== undefined) ? this.state.controls['No'].value : ''
       if(this.state.controls['FromCurrency'].value === '' || this.state.controls['FromCurrency'].value === undefined || this.state.controls['FromCurrency'].value === null) {
            this.setState({
                dangerModalBody: " From Currency can not be empty",
                dangerModalTitle: "Validation error",
                danger:true
            })
        }else if(this.state.controls['ToCurrency'].value === '' || this.state.controls['ToCurrency'].value === undefined || this.state.controls['ToCurrency'].value === null){
            this.setState({
                dangerModalBody: " To Currency can not be empty",
                dangerModalTitle: "Validation error",
                danger:true
            })
        }else if(this.state.controls['CurrencyRate'].value === '' || this.state.controls['CurrencyRate'].value === undefined || this.state.controls['CurrencyRate'].value === null){
            this.setState({
                dangerModalBody: "Currency Rate can not be empty",
                dangerModalTitle: "Validation error",
                danger:true
            })
        }else{
        let FromCurrency = (this.state.controls['FromCurrency'].value !== '' && this.state.controls['FromCurrency'].value !== null && this.state.controls['FromCurrency'].value !== undefined) ? this.state.controls['FromCurrency'].value : ''
        let ToCurrency = (this.state.controls['ToCurrency'].value !== '' && this.state.controls['ToCurrency'].value !== null && this.state.controls['ToCurrency'].value !== undefined) ? this.state.controls['ToCurrency'].value : ''
        let CurrencyRate = (this.state.controls['CurrencyRate'].value !== '' && this.state.controls['CurrencyRate'].value !== null && this.state.controls['CurrencyRate'].value !== undefined) ? this.state.controls['CurrencyRate'].value : ''

        let data = {
            // 'id': No,
            'toCurrency': ToCurrency,
            'fromCurrency': FromCurrency,
           
            'conversionRate': CurrencyRate
            
            

        };
        API.addCurrency(data).then(response=>{

            if(response.data){
                this.props.onAddCurrencyResponse(true, "Currency add")
                
            } else {
                this.props.onAddCurrencyResponse(false, 'Currency not added. Invalid data supplied')
            }
        })
        }
        
       
     
        

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
        console.log(this.state);
        return (
            <div>
                <Col xs="12">
                    <form>
                       
                        <FormGroup>
                            <Label htmlFor="fromurrency">From Currency</Label>
                            <Input value={this.state.controls.FromCurrency.value} type="text" id="CurrencyName" onChange={event => this.inputChangeHandler(event,'FromCurrency')} placeholder="Enter Currency name" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="toCurrency">To Currency</Label>
                            <Input value={this.state.controls.ToCurrency.value} type="text" id="CurrencyName" onChange={event => this.inputChangeHandler(event,'ToCurrency')} placeholder="Enter Currency name" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="currencyrate">Currency Rate</Label>
                            <Input  value={this.state.controls.CurrencyRate.value} onChange={event => this.inputChangeHandler(event,'CurrencyRate')} type="number" id="CUrrencyRate" placeholder="Enter Currency Rate" />
                        </FormGroup>
                     

                       
                        <div>
                            <div className='text-center'>
                                <Button onClick={this.addCurrencyHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default addCurrency;
