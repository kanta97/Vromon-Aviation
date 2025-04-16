import React, { Component } from 'react';
import Loadable from "react-loadable";
import { updateObject,checkValidity } from '../../../../../shared/utility'
import * as API from '../../../../../API'
import '../ExcelUploadWindow/addCoupon.css'
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
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

class ExcelUploadWindow extends Component {
    constructor(props){
        super(props);
        this.state = {
            promo_id:'',
            channel:'',
            user_id:'',

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

    submitExcelFile = (event) =>{
        event.preventDefault();
        //  console.log(this.state)

        let channel = this.state.channel;
        let user_id = this.state.user_id;
        let promo_id = this.state.promo_id;
        if(channel!=='' && user_id !== '' && promo_id !== ''){
            let userArray = this.state.user_id;

            let data = {
                'channel': channel,
                'user_id': userArray,
                'promo_id': promo_id
            }
            //console.log(data)
            API.statusCoupon(data).then(response=>{
                if(response.status === 200){
                    if(response.data.status === '200 OK'){
                        this.props.onUploadCouponToUser(true, response.data.body.msg)
                    } else {
                        this.props.onUploadCouponToUser(false, 'Coupon not assigned.')
                    }
                } else {
                    this.props.onUploadCouponToUser(false, 'Bad request')
                }

            })
        } else {
            this.props.onUploadCouponToUser(false, 'Network error')
        }
    }

    inputChangeHandler = (event, controlName) =>{
        let data = {
            "home": [{
                "title": "Home",
                "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "image": "https://via.placeholder.com/1280x600.jpg"
            }
            ],
            "about": [{
                "title": "About",
                "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "image": "https://via.placeholder.com/1280x600.jpg"
            }
            ],
            "work": [{
                "title": "Work",
                "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "image": "https://via.placeholder.com/1280x600.jpg"
            }
            ],
            "work_one": [{
                "title": "Work nested",
                "body": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                "image": "https://via.placeholder.com/1280x600.jpg"
            }
            ]
        };
        console.log( data.home);
        data.home.map((item, index) => {
            console.log(item.title);
        })
        event.preventDefault();
        let fileObj = event.target.files[0];

        //just pass the fileObj as parameter
        ExcelRenderer(fileObj, (err, resp) => {
            if(err){
                console.log(err);
            }
            else{
                let promo_id=resp.rows[1][0];
                let channel=resp.rows[1][2];
                var user_ids=[];
                for(let i=1;i<resp.rows.length;i++){
                    user_ids.push(resp.rows[i][1]);
                }
                console.log(promo_id,channel,user_ids);

                this.setState({
                    promo_id: promo_id,
                    channel: channel,
                    user_id:user_ids
                });
            }
        });


    };

    render() {
        return (
            <div>
                <Col xs="12">
                    <form>
                        <FormGroup row className="my-0">
                            <Col xs="6">
                                <FormGroup>
                                    <Label htmlFor="hour">Upload your excel</Label>
                                    <Input type="file" id={'promoExcel'} onChange={event => this.inputChangeHandler(event,'promoExcel')} placeholder="Upload formated excel" />
                                </FormGroup>
                            </Col>
                            <Col xs="6">
                                <FormGroup>
                                    <div className='text-center'>
                                        <Button  onClick={this.submitExcelFile} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>Upload and assign promo</b></Button>
                                    </div>  </FormGroup>
                            </Col>
                        </FormGroup>

                        {/*<div>
                            <div className='text-center'>
                                <Button disabled={!this.state.formIsValid} onClick={this.addCouponHandle} color="primary"><span className='margin-right10'> <i className="fa fa-plus" aria-hidden="true"></i></span><b>SUBMIT</b></Button>
                            </div>
                        </div>*/}
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

export default ExcelUploadWindow;

