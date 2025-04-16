/**
 * Created by Shohanur on 3/19/2019.
 */
import React, {Component,Fragment} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from '../../API'

import Loadable from "react-loadable";
import Spinner from './../../Components/UI/Spinner/Spinner';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, CardHeader, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button

} from 'reactstrap';


const loading = () => <Spinner/>;

const Layout = Loadable({
    loader: () => import('../../Containers/Layout'),
    loading
});
const EditProfile = Loadable({
    loader: () => import('../../Components/UI/Independent/Profile/Edit/editProfile'),
    loading
});
class Profile extends Component {
    constructor(props) {
        super(props)


        this.state = {
            editData:[],
            info:false,
            editModalUser: false,
            password: "",
            new_password: "",
            confirm_new_password: "",
            display_name: "",
            username: "",
            email: "",
            user_id:"",
            phone_no: "",
            avatar: "",
            image_file: null,
            errors: {},
            isReadOnly: true,
            showSuccessToast: false,
            showFailedToast: false,
            image_preview_url: null,
            danger: false,
            warning: true,
            dangerModalTitle: "",
            dangerModalBody: ""
        };
        this.toggleInfo = this.toggleInfo.bind(this)
        this.toggleSuccess = this.toggleSuccess.bind(this)
        this.toggleDanger = this.toggleDanger.bind(this)
        this.toggleWarning = this.toggleWarning.bind(this)
    }

    toggleInfo() {
        this.setState({
            info: !this.state.info,
        })
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
    componentDidMount() {


        let userData = this.getUserInfo();


    };
    editProfile = (event) =>{
        if(this.state.editData){
            this.setState({
                info: true,

                editModalHotel: true,
                infoModalTitle: 'Edit view of User ID '+this.state.editData.id,
            })
        } else {
            this.setState({

                danger: true,
                warning: false,
                dangerModalTitle: 'Failure',
                dangerModalBody: 'User not exits'
            })
        }

    };
    handleEditProfileResponse = (status, message) =>{
        if(status){
            this.setState({
                modal: true,
                editModalUser: false,

                info: false,
                infoModalTitle: '',
                success: true,
                successModalTitle: 'Success',
                successModalBody: message,
            })
        } else {
            this.setState({
                modal: true,
                editModalUser: false,

                info: false,
                infoModalTitle: '',
                danger: true,
                dangerModalTitle: 'Failure',
                dangerModalBody: message,
            })
        }
    };

    getUserInfo = () => {


        const id =localStorage.getItem('number');
        const local_token = localStorage.getItem('_token');


        let url = '/auth/user/'+id;
        //let url = 'http://localhost:8091/customer/get_info_by_token';

        axios.get(url, {headers: {'app_key': '123456','Content-Type':'application/json','auth_token':local_token}})
            .then(response => {
             //   console.log(response.status);

                if (response.data.success) {

                        this.setState({
                            ...this.state, editData: response.data.message
                        });

                    if (response.data.message.id) {
                        this.setState({
                            ...this.state, user_id: response.data.message.id
                        });
                    }

                    if (response.data.message.display_name) {
                        this.setState({
                            ...this.state, display_name: response.data.message.display_name
                        });
                    }
                    if (response.data.message.usernm) {
                        this.setState({
                            ...this.state, username: response.data.message.usernm
                        });
                    }
                    if (response.data.message.email) {
                        this.setState({
                            ...this.state, email: response.data.message.email
                        });
                    }

                    if (response.data.message.phone_no) {
                        this.setState({
                            ...this.state, phone_no: response.data.message.phone_no
                        });
                    }


                }

            })
            .catch(error => {


            });


    };

    renderModal = () =>{
        return (
       <Modal backdrop='static' size='lg' isOpen={this.state.info} toggle={this.toggleInfo}
                          className={'modal-info ' + this.props.className}>
            <ModalHeader className='text-center' toggle={this.toggleInfo}>{this.state.infoModalTitle}</ModalHeader>
            <ModalBody>



                    <EditProfile modal_data ={this.state.editData} onEditProfileResponse={this.handleEditProfileResponse} />

            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.toggleInfo}>Close</Button>{' '}
            </ModalFooter>
        </Modal>

        );
    }

    renderContent = () => {

        if (this.props.isLoading || this.props.accountIsLoading) {
           return(
               <div className="form-area">
                <Spinner/>
            </div>
           );
        }
        else {
            const cardStyle = {
                display: 'display'

            };
            let  to_render =

                <div >
                    <Row >
                        <Col xs="12" md="8" style={cardStyle}>
                            <Card >
                                <CardHeader>
                                    <strong>Profile Informations</strong>
                                </CardHeader>
                                <CardBody>
                                    <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Username</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="text" id="username" name="usernamet" disabled placeholder="Username" value={this.state.username} />

                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Display Name</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="text" id="display_name" disabled name="display_name" placeholder="Display Name" value={this.state.display_name}/>

                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="text-input">Mobile Number</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="number" disabled  id="mobile_number" name="mobile_number" placeholder="Display Name" value={this.state.mobile} />

                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="email-input">Email </Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="email" id="email" disabled name="email" placeholder="Enter Email" autoComplete="email" value={this.state.email}/>

                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Col md="3">
                                                <Label htmlFor="file-input">Profile Picture</Label>
                                            </Col>
                                            <Col xs="12" md="9">
                                                <Input type="file" id="file-input" name="file-input" />
                                            </Col>
                                        </FormGroup>


                                    </Form>
                                </CardBody>
                                <CardFooter>
                                    <Button type="submit" onClick={(event) => this.editProfile(event)}  size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Edit Profile</Button>

                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>






                </div>;
return (
    to_render
);
        }
    };


    render(){

        return (
            <Fragment>

                    <Layout>
                        (this.state.editModalUser) ? {this.renderContent()}: {this.renderModal()}

                    </Layout>
                }
            </Fragment>
        )
    }


}

Profile.propTypes = {
   /* changePassword: PropTypes.func.isRequired,
    toggleChangePasswordSuccess: PropTypes.func.isRequired,
    toggleChangePasswordHasErrored: PropTypes.func.isRequired,
    accountEdit: PropTypes.func.isRequired,
    isChangePasswordSuccess: PropTypes.bool.isRequired,
    changePasswordhasErrored: PropTypes.bool.isRequired,
    changePasswordErrors: PropTypes.string,
    accountIsLoading: PropTypes.bool,
    isLoading: PropTypes.bool,
    accountEditErrors: PropTypes.string,
    accountEditIsSuccess: PropTypes.bool*/
};

const mapStateToProps = (state) => {
    return {
       /* isChangePasswordSuccess: state.authReducer.isChangePasswordSuccess,
        changePasswordhasErrored: state.authReducer.changePasswordhasErrored,
        changePasswordErrors: state.authReducer.changePasswordErrors,
        accountIsLoading: state.user.accountIsLoading,
        isLoading: state.authReducer.isLoading,
        accountEditErrors: state.user.accountEditErrors,
        accountEditIsSuccess: state.user.accountEditIsSuccess,*/
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
