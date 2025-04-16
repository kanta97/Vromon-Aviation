import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultAside = React.lazy(() => import('./Aside'));
const DefaultFooter = React.lazy(() => import('./Footer'));
const DefaultHeader = React.lazy(() => import('./Header'));

class Layout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

  signOut(e) {
    e.preventDefault()
    this.props.history.push('/login')
  }

  sidebarMenus=()=>{
    console.log(navigation)
    let userRole = localStorage.getItem('userRole')
    if(userRole==4){
      let menus=navigation
      return menus
    }
    else if(userRole==6){
      let menus={
        items: [
          {
            name: "Dashboard",
            url: "/dashboard",
            icon: "icon-speedometer",
          },
          {
            name: "Hotel",
            url: "/custom-hotel",
            icon: "icon-speedometer",
          },
          {
            name: "Hotel Booking History",
            url: "/booking-history",
            icon: "icon-speedometer",
          }
        ]
      };
      return menus
    }
    else{
      let menus={
        items: [
          {
            name: "Dashboard",
            url: "/dashboard",
            icon: "icon-speedometer",
          }
        ]
      };
      return menus
    }
  }
  
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
            <AppSidebarNav navConfig={this.sidebarMenus()}/>
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
              {this.props.children}
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
      </div>
    );
  }
}

export default Layout;
