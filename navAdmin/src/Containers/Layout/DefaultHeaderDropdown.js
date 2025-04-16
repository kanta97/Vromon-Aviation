// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { NavLink,link} from 'react-router-dom';
// import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Progress } from 'reactstrap';

// const propTypes = {
//   notif: PropTypes.bool,
//   accnt: PropTypes.bool,
//   tasks: PropTypes.bool,
//   mssgs: PropTypes.bool,
// };
// const defaultProps = {

//   accnt: false,

// };

// class DefaultHeaderDropdown extends Component {

//   constructor(props) {
//     super(props);
//     this.logout = this.logout.bind(this)
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       dropdownOpen: false,
//     };
//   }

//   toggle() {
//     this.setState({
//       dropdownOpen: !this.state.dropdownOpen,
//     });
//   }

//   logout(){
//     localStorage.clear();
//     this.props.history.replace({
//         pathname: '/dashboard'
//     });

// }

//   dropAccnt() {
//     return (
//       <Dropdown className="custom_dropdown" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
//         <DropdownToggle nav>
//           {/* <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
//           <i style={{fontSize:"32px",}} className="fa fa-user">    </i>
//         </DropdownToggle>
//         <DropdownMenu right style={{ fontFamily: 'Roboto, sans-serif' }}>

//           <DropdownItem><NavLink to="/profile" style={{color:"#333", fontFamily: 'Roboto, sans-serif'}} >Profile</NavLink></DropdownItem>
//           <DropdownItem><NavLink to="/change-password" style={{color:"#333", fontFamily: 'Roboto, sans-serif'}}  >Password Change</NavLink></DropdownItem>

//           <DropdownItem ><NavLink to="/settings" style={{color:"#333", fontFamily: 'Roboto, sans-serif'}} >Settings</NavLink></DropdownItem>
//           <DropdownItem ><NavLink to="javascript:void(0)" className='logout_btn' onClick={this.logout} style={{color:"#333", fontFamily: 'Roboto, sans-serif'}} >Logout</NavLink></DropdownItem>

//           {/*<DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
//           <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
//           <DropdownItem divider />
//           <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
//           {/* <DropdownItem onClick={this.props.onLogout} style={{color:"#333", fontFamily: 'Roboto, sans-serif'}}>Logout</DropdownItem> */}
//           {/*<DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
//         </DropdownMenu>
//       </Dropdown>
//     );
//   }


//   render() {
//     const { accnt } = this.props;
//     return (

//           accnt ? this.dropAccnt() :null
//     );
//   }
// }

// DefaultHeaderDropdown.propTypes = propTypes;
// DefaultHeaderDropdown.defaultProps = defaultProps;

// export default DefaultHeaderDropdown;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

const propTypes = {
  accnt: PropTypes.bool,
};

const defaultProps = {
  accnt: false,
};

class DefaultHeaderDropdown extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  logout() {
    localStorage.clear();
    this.props.history.replace('/dashboard');
  }

  dropAccnt() {
    return (
      <Dropdown className="custom_dropdown" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i style={{ fontSize: '32px' }} className="fa fa-user"></i>
        </DropdownToggle>
        <DropdownMenu right style={{ fontFamily: 'Roboto, sans-serif' }}>
          <DropdownItem>
            <NavLink to="/profile" style={{ color: '#333', fontFamily: 'Roboto, sans-serif' }}>
              Profile
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to="/change-password" style={{ color: '#333', fontFamily: 'Roboto, sans-serif' }}>
              Password Change
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to="/settings" style={{ color: '#333', fontFamily: 'Roboto, sans-serif' }}>
              Settings
            </NavLink>
          </DropdownItem>
          <DropdownItem>
            <NavLink to="#" onClick={this.logout} style={{ color: '#333', fontFamily: 'Roboto, sans-serif' }}>
              Logout
            </NavLink>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { accnt } = this.props;
    return accnt ? this.dropAccnt() : null;
  }
}

DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;

export default withRouter(DefaultHeaderDropdown);

