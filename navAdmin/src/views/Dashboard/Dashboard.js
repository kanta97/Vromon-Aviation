import React, { Component, lazy, Suspense, Fragment } from 'react';
import Loadable from "react-loadable";
import Spinner from './../../Components/UI/Spinner/Spinner'

import { Bar, Line } from 'react-chartjs-2';
import {
    Badge,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,

    Progress,
    Row,
    Table,
} from 'reactstrap';
import './Dashboard.css'


const loading = () => <Spinner/>
const Layout = Loadable({
    loader: () => import('../../Containers/Layout'),
    loading
});
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    }
  }
  render() {

    return (
      <Layout>
        <div>
          <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col sm="5">

                      </Col>
                      <Col sm="7" className="d-none d-sm-inline-block">
                        <CardTitle className="mb-0">Welcome to Navigator Tourism</CardTitle>

                      </Col>
                    </Row>
                    <div className="chart-wrapper page-height">
                    </div>
                  </CardBody>

                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Dashboard;
