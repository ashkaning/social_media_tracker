import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Row, Container } from "../components/Grid";
import CheckSecurity from "../components/Security";
import { closeButton } from "../components/Comments/update";
import Moment from 'react-moment';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import StickyBox from "react-sticky-box";
import "./style.css";

class Clients extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allCustomers: [],
            allServicesClientTemp: [],
            allServicesClient: [],
            subSingleMenu: [],
            customerId: null,
            status: [
                { value: "0", label: "Not Activated" },
                { value: "1", label: "Waiting on Client" },
                { value: "2", label: "Completed" },
                { value: "3", label: "Canceled" }
            ],
            updateStatus: '',
            updateEmployee: '',
            getOneEmployee: [],
            getAllEmployees: [],
            resDataCheckSecurity: {},
            roleId: '',
            userId: '',
            singleComment: '',
            lastComment: '',
            Comments: {},
            allCommentsData: {},
        }
    }

    componentDidMount() {
        this.getAllServiceCustomers();
        this.getAllDeparments();
        this.checkSecurity();
    }
    checkSecurity = () => {
        API.checkSecurity()
            .then((res) => {
                this.setState({ resDataCheckSecurity: res.data, userId: res.data.userId, roleId: res.data.roleId })
                this.state.resDataCheckSecurity = Object.assign({}, res.data);
            })
            .catch(err => console.log(err))
    }
    ///////////////GET ALL EMPLOYEES///////////
    getAllDeparments = () => {
        API.getAllDeparments({})
            .then(resGetAllDeparments => {
                this.setState({ getAllEmployees: resGetAllDeparments.data })
            }).catch(err => toast.error("There is an error. Please contact administrator (getting all departments)"))
    }
    //////////////////GET ONE EMPLOYEE//////////
    getEmployee = (selectedId, serviceId) => {
        let selctedEmployee = (this.state.getAllEmployees.filter(obj => obj.id === selectedId))
        return (

            selctedEmployee.map(singleSelctedEmployee => (
                <Form.Control onChange={(evt) => this.updateAsseignedEmoloyee(evt, serviceId)} as="select" name="updateEmployee">
                    <option value={singleSelctedEmployee.id}>{singleSelctedEmployee.fName} {singleSelctedEmployee.lName} - {singleSelctedEmployee.Role.name}</option>
                    {this.getAllEmployeesoptions(selectedId)}
                </Form.Control>
            )
            ))
    }
    getAllEmployeesoptions = (selectedId) => {
        let selctedEmployee = (this.state.getAllEmployees.filter(obj => obj.id !== selectedId))
        return (
            selctedEmployee.map(singleEmployee => (
                <option key={singleEmployee.id} value={singleEmployee.id}>{singleEmployee.fName} {singleEmployee.lName} - {singleEmployee.Role.name}</option>
            ))
        )
    }
    updateAsseignedEmoloyee = (event, serviceId) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => this.updateAsseignedEmoloyeeAPI(serviceId))
    }
    updateAsseignedEmoloyeeAPI = (serviceId) => {
        API.updateEmployee({
            id: serviceId,
            employeeId: this.state.updateEmployee
        })
            .then(updatedResult => {
                toast.success("Assinged Employeed updated successfully!")
            }).catch(err => toast.error("There is an error. Please contact administrator (updating assigned employee)"))
    }
    //////////////Get All Customers////////////////
    getAllServiceCustomers = () => {
        API.getAllServiceCustomers()
            .then(resCustomer => {
                this.setState({ allCustomers: resCustomer.data })
            }).catch(err => {
                toast.error("There is an error. Please contact administrator (Getting All Customers)")
            })
    }
    /////////////Get services for a selected client//////
    serviceClient = () => {
        this.setState({ allServicesClient: [], customerId: '' })
        //AllSerivcesForClient(this.state.customerId,this.state.allServicesClient)
        API.serviceClient({ clientId: this.state.customerId })
            .then(resServiceClient => {
                this.setState({ allServicesClient: resServiceClient.data });
                this.state.allServicesClient.map(singleService => (
                    API.lastComment({
                        serviceId: singleService.id,
                        clientId: singleService.clientId
                    })
                        .then(resLastComment => {

                            if (resLastComment.data !== null) {
                                this.setState({
                                    Comments: {
                                        comment: resLastComment.data.comment,
                                        lastCommentDate: resLastComment.data.updatedAt
                                    }
                                })
                                Object.assign(singleService, this.state.Comments)
                            }
                            else {
                                this.setState({
                                    Comments: {
                                        comment: 'there is no update to show',
                                        lastCommentDate: null
                                    }
                                })
                                Object.assign(singleService, this.state.Comments)
                            }
                            this.setState({}, () => <span></span>)
                        }).catch(err => console.log(err))
                ))
            }
            ).catch(err => toast.error("There is an error. Please contact administrator (Getting Services for the selected service)"));
    }
    ////////////////UPDATE STATUS///////////////
    updateStatus = (event, updateIdStatus) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        }, () => this.updateRealStatus(updateIdStatus));
    }
    updateRealStatus = (evet) => {
        if (this.state.updateStatus === 0 || this.state.updateStatus === null) {
            toast.error("Please select an update")
        }
        else {
            API.updateStatus({
                id: evet,
                content: this.state.updateStatus
            }).then(result => {
                toast.success("The Status updated successfully")
            }).catch(err => toast.error("There is an error. Please contact administrator (Updating status)"));
        }
    }
    //////////////////////////
    selectFunction = (selectedId) => {

        if (selectedId === 0) {
            return (<option className="notActive" value="0">Not Activate</option>)
        }
        else if (selectedId === 1) {
            return (<option className="waiting" value="1">Waiting on Client</option>)

        }
        else if (selectedId === 2) {
            return (<option className="completed" value="2">Completed</option>)

        }
        else if (selectedId === 3) {
            return (<option className="canceled" value="3">Canceled</option>)

        }
        else {
            return (<option>Select...</option>)
        }
    }
    /////////////////CHAT WINDOW/////////////////////
    chatWindow = (serviceId, clientId) => {
        this.setState({ allCommentsData: [] })
        API.showAllComments({
            ClientServiceId: serviceId,
            UserId: clientId
        }).then(resAllComments => {
            document.getElementById("popupUpdate").style.display = 'block';
            if (resAllComments.data == 0) {
                this.setState({
                    allCommentsData: [{
                        ClientServiceId: serviceId,
                        User: { roleId: this.state.roleId }
                    }]
                })
            } else {
                this.setState({ allCommentsData: resAllComments.data })

            }
        }).catch(err => toast.error("There is an error. Please contact administrator (Chat Box)"))

    }
    ///////////SAVE COMMENTS///////////////
    saveComment = (UserId, ClientServiceId) => {
        API.saveComment({
            UserId: UserId,
            ClientServiceId: ClientServiceId,
            comment: this.state.singleComment
        }).then(resultSingleComment => {
            this.chatWindow(resultSingleComment.data.ClientServiceId, this.state.customerId)
        }).catch(err => toast.error("There is an error. Please contact administrator (save single comment)"))
    }
    /////////////MENU SERVICE SIDEBAR//////////
    serviceMenu = () => {
        return (
            <ol>
                {this.state.allServicesClient.map((singleMenu) => {
                    if (singleMenu.Service.subId === 0) {
                        return (
                            <li key={singleMenu.id}>{singleMenu.Service.serviceName}
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="serviceTitle">Status</Form.Label>
                                            <Form.Control onChange={(evt) => this.updateStatus(evt, singleMenu.id)} /* placeholder={this.selectFunction(singleMenu.status)} */ as="select" name="updateStatus">
                                                {this.selectFunction(singleMenu.status)}
                                                <option className="notActive" value="0">Not Activate</option>
                                                <option className="waiting" value="1">Waiting on Client</option>
                                                <option className="completed" value="2">Completed</option>
                                                <option className="canceled" value="3">Canceled</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className="serviceTitle">Assigned Employee</Form.Label>
                                            {this.getEmployee(singleMenu.employeeId, singleMenu.id)}
                                        </Form.Group>
                                        <Form.Group as={Col} className="text-center">
                                            <Form.Label className="serviceTitle">Notes/Updates/Comments</Form.Label>
                                            <div>
                                                <span><b>Last Update: </b>{singleMenu.comment} </span>
                                                <span>

                                                    {(singleMenu.lastCommentDate === null) ? '' : <sup>(<Moment format="MM/DD/YYYY - HH:mm" date={singleMenu.lastCommentDate} />)</sup>}

                                                </span>
                                                <br />
                                                <Button onClick={() => this.chatWindow(singleMenu.id, singleMenu.clientId)} variant="primary">Notes</Button>
                                            </div>

                                        </Form.Group>
                                    </Form.Row>
                                </Form>
                                {this.subMenuMain(singleMenu.ServiceId)}
                            </li>
                        )
                    }
                })}
            </ol>
        )
    }

    subMenuMain = (subIdSearch) => {
        let ParentsubMenu = (this.state.allServicesClient.filter(obj => obj.Service.subId === subIdSearch))

        return (
            ParentsubMenu.map(singleParentsubMenu => (
                <ul>
                    <li key={singleParentsubMenu.id}>{singleParentsubMenu.Service.serviceName}
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label className="serviceTitle">Status</Form.Label>
                                    <Form.Control onChange={(evt) => this.updateStatus(evt, singleParentsubMenu.id)} as="select" name="updateStatus">
                                        {this.selectFunction(singleParentsubMenu.status)}
                                        <option className="notActive" value="0">Not Activate</option>
                                        <option className="waiting" value="1">Waiting on Client</option>
                                        <option className="completed" value="2">Completed</option>
                                        <option className="canceled" value="3">Canceled</option>
                                    </Form.Control>

                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label className="serviceTitle">Assigned Employee</Form.Label>
                                    {this.getEmployee(singleParentsubMenu.employeeId, singleParentsubMenu.id)}
                                </Form.Group>
                                <Form.Group as={Col} className="text-center">
                                    <Form.Label className="serviceTitle">Notes/Updates/Comments</Form.Label>
                                    <div>
                                        <span><b>Last Update: </b>{singleParentsubMenu.comment} </span>
                                        <span>

                                            {(singleParentsubMenu.lastCommentDate === null) ? '' : <sup>(<Moment format="MM/DD/YYYY - HH:mm" date={singleParentsubMenu.lastCommentDate} />)</sup>}

                                        </span>
                                        <br />
                                        <Button onClick={() => this.chatWindow(singleParentsubMenu.id, singleParentsubMenu.clientId)} variant="primary">Notes</Button>
                                    </div>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        {this.subMenuMain(singleParentsubMenu.ServiceId)}
                    </li>
                </ul >
            ))
        )
    }

    ////////////////////////////
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });

    };
    ///////////////////////////
    render() {
        return (
            <div>
                {CheckSecurity(this.state.resDataCheckSecurity)}
                <Container fluid>
                    <StickyBox className="chat" offsetTop={20} offsetBottom={20}>
                        <div>
                            <Modal.Dialog id="popupUpdate">
                                <Modal.Header closeButton onClick={() => closeButton()}>
                                    <Modal.Title>Comments</Modal.Title>
                                </Modal.Header>
                                {this.state.allCommentsData.length ? (
                                    <Modal.Body>
                                        {this.state.allCommentsData.map(singleComment => {
                                            //if (this.state.roleId >= 1 && this.state.roleId <= 6) {
                                            return (
                                                <Row key={singleComment.id}>
                                                    <Col size="md-12">
                                                        {(singleComment.User.RoleId === 13) ?
                                                            <div className="text-left">
                                                                <span>{singleComment.User.fName} {singleComment.User.lName} </span><sup>
                                                                    {(singleComment.createdAt) ? (<Moment format="MM/DD/YYYY - HH:mm" date={singleComment.createdAt} />) : ''}</sup>
                                                                <p>{singleComment.comment}</p>
                                                            </div>
                                                            :
                                                            <div className="text-right">
                                                                <span>{singleComment.User.fName} {singleComment.User.lName} </span><sup>
                                                                    {(singleComment.createdAt) ? (<Moment format="MM/DD/YYYY - HH:mm" date={singleComment.createdAt} />) : ''}</sup>
                                                                <p>{singleComment.comment}</p>
                                                            </div>}
                                                    </Col>
                                                </Row>
                                            )
                                            //}
                                            /*  else if (this.state.roleId === 13) {
                                                 return (
                                                     <Row key={singleComment.id}>
                                                         <Col size="md-12">
                                                             {(singleComment.User.RoleId === 13) ?
                                                                 <div className="text-right">
                                                                     <span>{singleComment.User.fName} {singleComment.User.lName}</span><sup> (<Moment format="MM/DD/YYYY - HH:mm" date={singleComment.createdAt} />)</sup>
                                                                     <p>{singleComment.comment}</p>
                                                                 </div>
                                                                 :
                                                                 <div className="text-left">
                                                                     <span>{singleComment.User.fName} {singleComment.User.lName}</span><sup> (<Moment format="MM/DD/YYYY - HH:mm" date={singleComment.createdAt} />)</sup>
                                                                     <p>{singleComment.comment}</p>
                                                                 </div>}
                                                         </Col>
                                                     </Row>
                                                 )
                                             } */
                                        })}
                                        <Row>
                                            <br />
                                            <hr />
                                            <Col md={12}>
                                                <Form.Control onChange={this.handleInputChange} name="singleComment" as="textarea" rows="3" />
                                            </Col>
                                            <Col md={12}>
                                                <Button onClick={(evt) => this.saveComment(this.state.userId, this.state.allCommentsData[0].ClientServiceId)} variant="primary">send</Button>
                                            </Col>
                                        </Row>
                                    </Modal.Body>
                                ) : ''}
                                <Modal.Footer>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </div>
                    </StickyBox>
                    <Row>
                        <Col size="md-4">
                        </Col>
                        <Col size="md-4">
                            <h2 className="text-center"> Set up services to a client</h2>
                            <Form.Row>
                                <Form.Control onChange={this.handleInputChange} as="select" name="customerId">
                                    <option>Choose...</option>
                                    {this.state.allCustomers.map(singleCustomer => (
                                        <option key={singleCustomer.clientId} value={singleCustomer.clientId}>{singleCustomer.User.fName} - {singleCustomer.User.lName} - {singleCustomer.User.companyName}</option>
                                    ))}
                                </Form.Control>
                                <br /><br />
                                <Button onClick={this.serviceClient} variant="primary" type="submit">
                                    Search
                            </Button>
                            </Form.Row>
                        </Col>
                        <Col size="md-4">
                        </Col>
                    </Row>
                    {/* ///////////////////show services */}
                    <hr />
                    <Row>
                        <Col size="md-12">
                            {this.state.allServicesClient.length > null ? this.serviceMenu() : (<h3 className="text-center">Please choose a client to see the services</h3>)}
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}

export default Clients;