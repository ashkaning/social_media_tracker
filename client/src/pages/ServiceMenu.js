import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Row, Container } from "../components/Grid";
import CheckSecurity from "../components/Security";
import "./style.css";
import { Modal, Button, Form, Col } from 'react-bootstrap';

class ServicesMenu extends Component {

    state = {
        userId: null,
        serviceName: '',
        serviceDescription: '',
        subId: '',
        updateServiceName: '',
        UpdateSubId: '',
        updateserviceDescription: '',
        customerId: '',
        DeparmentId: '',
        allServices: [],
        oneService: [],
        resOneServ: [],
        resParent: [],
        allCustomers: [],
        allDeparments: [],
        servicesToCustomer: [],
        resDataCheckSecurity: {},
        roleId: ''
    }
    componentDidMount() {
        this.getAllServices();
        this.getAllCustomers();
        this.getAllDeparments();
        this.checkSecurity();
    }
    checkSecurity = () => {
        API.checkSecurity()
            .then((res) => {
                this.setState({ resDataCheckSecurity: res.data, userId: res.data.userId, roleId: res.data.roleId })
                this.state.resDataCheckSecurity = Object.assign({}, res.data);
                if (this.state.roleId > 6) {
                    toast.info("You don't have permission to see the page... !");
                    this.props.history.push('/profile', { some: 'state' })
                }
            })
            .catch(err => console.log(err))
    }
    //////////////////////////
    getAllServices = () => {
        API.getAllServices()
            .then(resAllServices => {
                this.setState({ allServices: resAllServices.data })
            }).catch(err => toast.error("There is an error. Please contact administrator. (Get ALL Service)"))
    }
    /////////SAVE NNEW SERVICE API FUNCTION////////////////////
    saveNewService = (event) => {
        event.preventDefault()
        API.saveNewService({
            serviceName: this.state.serviceName,
            serviceDescription: this.state.serviceDescription,
            subId: this.state.subId
        }).then(resAllServoces => {
            this.serviceMenu();
            toast.success("Menu added!");
            window.location.reload(false);

        }).catch(err => toast.error("There is an error. Please contact administrator (on Saving)"))
    }
    //////////////////DELETE Menu////////
    deleteService = (evt) => {
        API.deleteService({ data: { deleleServiceId: evt } })
            .then(resDel => {
                toast.success("The Item deleted successfully!")
            }).catch(err => toast.error("There is an error. Please contact administrator (on Deleteing)"))
    }
    ///////////////EDIT SERVICE///////////////////
    getOneServiceInfo = (serviceId) => {
        this.closeButton();
        API.getOneServiceInfo({ id: serviceId })
            .then(resGetOne => {
                this.setState({
                    resOneServ: resGetOne.data.resOneServ
                })
                if (!resGetOne.data.resParent) {

                    this.setState({ resParent: { serviceName: 'Parent', id: '0' } });
                }
                else {
                    this.setState({ resParent: resGetOne.data.resParent });
                }
            }).catch(err => toast.error("There is an error. Please contact administrator (on Get One Info for Editing)"))
    }
    ////////////////Get all client lists////////////
    getAllCustomers = () => {
        API.getAllCustomers()
            .then(resCustomer => {
                this.setState({ allCustomers: resCustomer.data })
            }).catch(err => toast.error("There is an error. Please contact administrator (Getting All Customers)"))
    }
    getAllDeparments = () => {
        API.getAllDeparments()
            .then(resDeparments => {
                this.setState({ allDeparments: resDeparments.data })
            }).catch(err => toast.error("There is an error. Please contact administrator (Getting All Departmnets)"))
    }
    ////////////GETTING INPUT VALUE/////////////////////
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    /////////////MENU SERVICE SIDEBAR//////////
    serviceMenu = () => {
        return (
            <ol>
                {this.state.allServices.map((singleMenu) => {
                    if (singleMenu.subId === 0) {
                        return (<li key={singleMenu.id}>{singleMenu.serviceName}
                            {(this.state.roleId <= 6) ?
                                <a className="customEditButton" href="#" onClick={() => this.getOneServiceInfo(singleMenu.id)} >Edit</a>
                                : <span></span>
                            }

                            {(this.state.roleId === 6) ?
                                <a className="customDeleteButton" href="#" onClick={() => this.deleteService(singleMenu.id)} >Delete</a>
                                : <span></span>
                            }
                            {this.subMenuMain(singleMenu.id)}</li>)
                    }

                })}
            </ol>
        )
    }

    subMenuMain = (subIdSearch) => {
        let ParentsubMenu = (this.state.allServices.filter(obj => obj.subId === subIdSearch))

        return (
            ParentsubMenu.map(singleParentsubMenu => (
                <ul> <li key={singleParentsubMenu.id}>{singleParentsubMenu.serviceName}
                    {(this.state.roleId <= 6) ?
                        <a className="customEditButton" href="#" onClick={() => this.getOneServiceInfo(singleParentsubMenu.id)} >Edit</a>
                        : <span></span>
                    }
                    {(this.state.roleId === 6) ?
                        <a className="customDeleteButton" href="#" onClick={() => this.deleteService(singleParentsubMenu.id)}>Delete</a>
                        : <span></span>
                    }
                    {this.subMenuMain(singleParentsubMenu.id)}</li></ul>
            ))

        )
    }
    /*  childSubMenu = (subIdSearch) => {
         let childSubMenuArray = (this.state.allServices.filter(obj => obj.subId === subIdSearch))
         return (
             childSubMenuArray.map(singlechildSubMenuArray => (
                 <ul>
                     <li>{singlechildSubMenuArray.serviceName}<a className="customDeleteButton" href="#" onClick={() => this.deleteService(singlechildSubMenuArray.id)} variant="danger">Delete</a>
                         {this.childSubMenu(singlechildSubMenuArray.id)} </li>
                 </ul>
             ))
         )
     } */
    //////////////////////Update selected service information
    updateOneService = (serviceId) => {
        API.updateOneService({
            id: serviceId,
            serviceName: this.state.updateServiceName,
            subId: this.state.UpdateSubId,
            serviceDescription: this.state.updateserviceDescription
        })
            .then(result => {
                toast.success("service updated");
                this.closeButton();
            }).catch(err => toast.error("There is an error. Please contact administrator (update service)"))
    }
    ////////////////Create all services assign to a customer
    assignAllServiceToClient = () => {
        /*  let data = {
             customerId: this.state.customerId,
             allServices: this.state.allServices
         } */
        API.assignAllServiceToClient({
            customerId: this.state.customerId,
            allServices: this.state.allServices,
            DeparmentId: this.state.DeparmentId
        })
            .then(savedResult => {
                toast.success("All services assing to the client successfully")
            }).catch(err => toast.error("There is an error. Please contact administrator (Assign services to the customer)"))
    }
    /////////////////////CLOSE EDIT FORM BOX
    closeButton = () => {
        var x = document.getElementById("popupUpdate");
        if (x.style.display === "none") {
            x.style.display = "block";

        } else {
            x.style.display = "none";
        }

    }
    //////////////////////////////////////
    render() {
        return (
            <div className="topSpacing">
                {CheckSecurity(this.state.resDataCheckSecurity)}
                <Container>
                    {/* ///////////update selected service //////////////*/}
                    <Row>
                        <Modal.Dialog className="editFormCustomClass" id="popupUpdate">
                            <Modal.Header closeButton onClick={() => this.closeButton()}>
                                <Modal.Title>Update selected service</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>Please update the information below and save.</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Row>
                                    <Col size="md-6">
                                        <Form.Label>Service Name</Form.Label>
                                        <input onChange={this.handleInputChange} name="updateServiceName" placeholder={this.state.resOneServ.serviceName} />
                                    </Col>
                                    <Col size="md-6">
                                        <Form.Label>Sub Service of</Form.Label>

                                        {this.state.allServices.length ? (
                                            <Form.Control onChange={this.handleInputChange} as="select" name="UpdateSubId">
                                                <option value={this.state.resParent.id}>{this.state.resParent.serviceName}</option>
                                                <option>Choose...</option>
                                                {this.state.allServices.map(singleService => (
                                                    <option key={singleService.id} value={singleService.id}>{singleService.id} - {singleService.serviceName} - {singleService.subId}</option>
                                                ))}
                                            </Form.Control>

                                        ) : (<h3>Loading Services...</h3>)}
                                        <Form.Label>Service Description</Form.Label>
                                        <Form.Control onChange={this.handleInputChange} name="updateserviceDescription" placeholder={this.state.resOneServ.serviceDescription} as="textarea" rows="1" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col size="md-12">
                                        <Button onClick={() => this.updateOneService(this.state.resOneServ.id)} variant="primary">Save changes</Button>
                                    </Col>
                                </Row>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Row>
                    {/* ////////////////////////ADD SERVICE/////////// */}
                    <Row>
                        <Col siz="md-12">
                            <h2 className="text-center">Add Services</h2>
                        </Col>
                    </Row>

                    {/* /////////////////add new service form */}
                    <Row>
                        <Col size="md-12">
                            <Form>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Service Name</Form.Label>
                                        <Form.Control onChange={this.handleInputChange} type="text" name="serviceName" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Sub Service of</Form.Label>

                                        {this.state.allServices.length ? (
                                            <Form.Control onChange={this.handleInputChange} as="select" name="subId">
                                                <option>Choose...</option>
                                                {this.state.allServices.map(singleService => (
                                                    <option key={singleService.id} value={singleService.id}>{singleService.id} - {singleService.serviceName} - {singleService.subId}</option>
                                                ))}
                                            </Form.Control>

                                        ) : (<h3>Loading Services...</h3>)}
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Service Description</Form.Label>
                                        <Form.Control onChange={this.handleInputChange} name="serviceDescription" as="textarea" rows="1" />
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Button onClick={this.saveNewService} variant="primary" type="submit">
                                            Save
                                        </Button>
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                    {/* ///////////////////show services */}
                    <hr />
                    <Row>
                        <Col size="md-12">
                            <h2 className="text-center">Here are the services</h2>
                            {this.serviceMenu()}

                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col size="md-12">
                            <h2 className="text-center"> Set up services to a client</h2>
                            <Form.Row>
                                {this.state.allCustomers.length ? (
                                    <Form.Control onChange={this.handleInputChange} as="select" name="customerId">
                                        <option>Choose the customer...</option>
                                        {this.state.allCustomers.map(singleCustomer => (
                                            <option key={singleCustomer.id} value={singleCustomer.id}>{singleCustomer.fName} - {singleCustomer.lName}</option>
                                        ))}

                                    </Form.Control>
                                ) : (<h3>Loading</h3>)}
                                <br /><br />
                                {this.state.allDeparments.length ? (
                                    <Form.Control onChange={this.handleInputChange} as="select" name="DeparmentId">
                                        <option>Choose the deparment...</option>
                                        {this.state.allDeparments.map(singleDeparment => (
                                            <option key={singleDeparment.id} value={singleDeparment.id}>{singleDeparment.fName} - {singleDeparment.lName}</option>
                                        ))}

                                    </Form.Control>
                                ) : (<h3>Loading</h3>)}
                                <br /><br />
                                <Button onClick={this.assignAllServiceToClient} variant="primary" type="submit">
                                    Assign All the services to the selected client
                            </Button>
                            </Form.Row>

                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}
export default ServicesMenu;