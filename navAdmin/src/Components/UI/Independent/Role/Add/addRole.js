import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import './addRole.css'
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

class addRole extends Component {
  constructor(props){
    super(props)
    this.state = {
      controls:{
          ROLENAME: {
              validation: {
                  required: true
              },
              valid: true,
              touched: false
          },
          DISPLAYROLENAME: {

              validation: {
                  required: true
              },
              valid: true,
              touched: false
          },
          ACTIVE: {

              validation: {
                  required:true,
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
      warning: false
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

  addRoleHandle = (event) =>{
    event.preventDefault()
    //console.log(this.state)
      let ROLENAME = (this.state.controls['ROLENAME'].value !== '' && this.state.controls['ROLENAME'].value !== null && this.state.controls['ROLENAME'].value !== undefined) ? this.state.controls['ROLENAME'].value : ''
      let DISPLAYROLENAME = (this.state.controls['DISPLAYROLENAME'].value !== '' && this.state.controls['DISPLAYROLENAME'].value !== null && this.state.controls['DISPLAYROLENAME'].value !== undefined) ? this.state.controls['DISPLAYROLENAME'].value : ''
      let ACTIVE = (this.state.controls['ACTIVE'].value !== '' && this.state.controls['ACTIVE'].value !== null && this.state.controls['ACTIVE'].value !== undefined) ? this.state.controls['ACTIVE'].value : ''
      let data = {
          'role_name': ROLENAME,
          'display_role_name': DISPLAYROLENAME,

          'active': ACTIVE,
          'created_by':localStorage.getItem('number')

      };

    API.addRole(data).then(response=>{
      //console.log(response.data.msg);
      //  console.log(response.data.success);
      //  console.log(data);
        let toastrOptions = {
            timeOut: 0,
            closeOnToastrClick: true,
        };

        if(response.data.success){
            toastr.success("Role succeddfully added",toastrOptions);

        this.props.onAddRoleResponse(true, response.data.message)
      } else {
            toastr.error("Role not added. Invalid data supplied",toastrOptions);

/*
            this.props.onAddRoleResponse(false, 'Role not added. Invalid data supplied')
*/
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
              <Label htmlFor="displayrolename">Display Role Name</Label>
              <Input className='input_resize' col={4} value={this.state.controls.DISPLAYROLENAME.value} onChange={event => this.inputChangeHandler(event,'DISPLAYROLENAME')} type="textarea" id="displayrolename" placeholder="Enter display role name" />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="rolename">Role Name</Label>
              <Input value={this.state.controls.ROLENAME.value} type="textarea" id="rolename" onChange={event => this.inputChangeHandler(event,'ROLENAME')} placeholder="Enter Role Name" />
            </FormGroup>


            <FormGroup>
              <Label htmlFor="active">Active Status</Label>
{/*
              <Input type="textarea" value={this.state.controls.ACTIVE.value} id="active" onChange={event => this.inputChangeHandler(event,'ACTIVE')} placeholder="Enter Status" />
*/}
              <Input id="active" type="select" onChange={event => this.inputChangeHandler(event,'ACTIVE')} >
                <option key={'123'} value="">Select Status</option>
                <option value="0">Deactive</option>
                <option value="1">Active</option>

              </Input>
            </FormGroup>
            <div>
              <div className='text-center'>
                <Button onClick={this.addRoleHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
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

export default addRole;
