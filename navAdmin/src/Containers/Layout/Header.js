import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link,withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import './Layout.css'
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import HeaderDropdown  from './HeaderDropdown'
import logo from '../../assets/img/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'

const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class Header extends Component {
    constructor(props){
        super(props);

        this.logout = this.logout.bind(this)

        //this.toggleRow = this.toggleRow.bind(this);
        //this.toggleSelectAll = this.toggleSelectAll.bind(this);
    }
    logout(){
        localStorage.clear();
        this.props.history.replace({
            pathname: '/dashboard'
        });

    }
    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;

        return (
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
                <AppNavbarBrand
                className="p-2"
                    full={{ src: logo, width: "100%", height: "auto", alt: 'Navigator' }}
                    minimized={{ src: logo, width: 25, height: 25, alt: 'Navigator' }}
                />
                <AppSidebarToggler className="d-md-down-none"  display="lg" />
                <Nav className="ml-auto right_nav_btn" navbar >
                    <NavItem 
                    
                    >





                        {localStorage.getItem('usnm')?localStorage.getItem('usnm'):"Username"}



                    </NavItem><Nav className="ml-auto" navbar>


                    <DefaultHeaderDropdown onLogout={this.props.onLogout} accnt/>
                </Nav>
                    {/* <NavItem>
                        <NavLink href="javascript:void(0)" className='logout_btn' onClick={this.logout}>Logout</NavLink>
                    </NavItem> */}
                </Nav>
            </React.Fragment>
            /*<React.Fragment>
             <AppSidebarToggler className="d-lg-none" display="md" mobile />
             <AppNavbarBrand
             full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
             minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
             />
             <AppSidebarToggler className="d-md-down-none" display="lg" />
             {/!*<Nav className="d-md-down-none" navbar>
             <NavItem className="px-3">
             <NavLink href="/">BookingHistory</NavLink>
             </NavItem>
             <NavItem className="px-3">
             <Link to="/users">Users</Link>
             </NavItem>
             <NavItem className="px-3">
             <NavLink href="#">Settings</NavLink>
             </NavItem>
             </Nav>*!/}
             <Nav className="ml-auto" navbar>
             <HeaderDropdown onLogout={this.props.onLogout} accnt/>
             </Nav>
             </React.Fragment>*/
        );
    }
}

Header.propTypes = {

    isAuthenticated: PropTypes.bool.isRequired,
    userInfo: PropTypes.object,

};

const mapStateToProps = (state) => {
    return {
        userLogout: PropTypes.func.isRequired,
        isAuthenticated: !!localStorage.getItem('_token'),

        userInfo: state.userReducer.userInfo,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        /* userLogout: () => dispatch(logOut()),*/

    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

