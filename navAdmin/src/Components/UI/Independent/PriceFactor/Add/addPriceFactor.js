import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API/priceFactor'
// import './addCurrency.css'
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

class addPriceFactor extends Component {
    constructor(props){
        super(props)
        this.state = {
            controls:{
                priceFactor: {
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: false
                }
                
              
            },
            formIsValid: true,
            modal: false,
            loader: false,

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


    addPriceFactorHandle = (event) =>{
        event.preventDefault()

        if(this.state.controls['priceFactor'].value === '' || this.state.controls['priceFactor'].value === undefined || this.state.controls['priceFactor'].value === null){
            this.setState({
                dangerModalBody: "PriceFactor can not be empty",
                dangerModalTitle: "Validation error",
                danger:true
            })
        } else {
            let data = {

                'priceChargeFactor': this.state.controls['priceFactor'].value




            };
            API.addPriceFactor(data).then(response=>{

                if(response.data){
                    this.props.onAddPriceFactorResponse(true, "Price Factor has been  added successfully")

                } else {
                    this.props.onAddPriceFactorResponse(false, 'Price Factor not added. Something went wrong')
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
                            <Label htmlFor="priceFactor">Price Factor</Label>
                            <Input value={this.state.controls.priceFactor.value} type="text" id="pricefector" onChange={event => this.inputChangeHandler(event,'priceFactor')} placeholder="Enter Price-factor" />
                        </FormGroup>
                        <div>
                            <div className='text-center'>
                                <Button onClick={this.addPriceFactorHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default addPriceFactor;
