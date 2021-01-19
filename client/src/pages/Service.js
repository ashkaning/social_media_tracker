import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Row, Container } from "../components/Grid";
import CheckSecurity from "../components/Security";
import { closeButton } from "../components/Comments/update";
import StickyBox from "react-sticky-box";
import Moment from 'react-moment';
import "./style.css";
import { Modal, Button, Form, Col } from 'react-bootstrap';

class Service extends Component {
    state = {
        allCustomers: [],
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
    componentDidMount() {
        this.checkSecurity();
    }
    checkSecurity = () => {
        API.checkSecurity()
            .then((res) => {
                this.setState({ resDataCheckSecurity: res.data, userId: res.data.userId, roleId: res.data.roleId })
                this.state.resDataCheckSecurity = Object.assign({}, res.data);
                this.serviceClient();
                this.getAllDeparments();

            })
            .catch(err => console.log(err))
    }
    /////////////Get services for a selected client//////
    serviceClient = () => {
        this.setState({ allServicesClient: '' })
        API.serviceClient({ clientId: this.state.userId })
            .then(resServiceClient => {
                console.log(resServiceClient.data)
                this.setState({ allServicesClient: resServiceClient.data });
            }).catch(err => toast.error("There is an error. Please contact administrator (Getting Services for the selected service)"));
    }
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
                /*  <Form.Control onChange={(evt) => this.updateAsseignedEmoloyee(evt, serviceId)} as="select" name="updateEmployee">
                     <option value={singleSelctedEmployee.id}>{singleSelctedEmployee.fName} {singleSelctedEmployee.lName} - {singleSelctedEmployee.Role.name}</option>
                     {this.getAllEmployeesoptions(selectedId)}
                 </Form.Control> */
                <p>{singleSelctedEmployee.Role.name}</p>
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
    /* updateAsseignedEmoloyee = (event, serviceId) => {
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
    } */
    //////////////Get All Customers////////////////
    /*  getAllServiceCustomers = () => {
         API.getAllServiceCustomers()
             .then(resCustomer => {
                 this.setState({ allCustomers: resCustomer.data })
             }).catch(err => {
                 toast.error("There is an error. Please contact administrator (Getting All Customers)")
             })
     } */

    ////////////////UPDATE STATUS///////////////
    /*  updateStatus = (event, updateIdStatus) => {
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
     } */
    //////////////////////////
    selectFunction = (selectedId) => {

        if (selectedId === 0) {
            return (<span className="notActive" value="0">Not Activate</span>)
        }
        else if (selectedId === 1) {
            return (<span className="waiting" value="1">Waiting on Client</span>)

        }
        else if (selectedId === 2) {
            return (<span className="completed" value="2">Completed</span>)

        }
        else if (selectedId === 3) {
            return (<span className="canceled" value="3">Canceled</span>)

        }
    }
    /////////////MENU SERVICE SIDEBAR//////////
    serviceMenu = () => {
        return (
            <ol>
                {this.state.allServicesClient.map((singleMenu) => {
                    if (singleMenu.Service.subId === 0) {
                        return (
                            <li key={singleMenu.id}><h4>{singleMenu.Service.serviceName}</h4>
                                <Form>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Label className="serviceTitle">Status</Form.Label>
                                            <Form.Control onChange={(evt) => this.updateStatus(evt, singleMenu.id)} as="text" name="updateStatus">
                                                {this.selectFunction(singleMenu.status)}
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} className="text-center">
                                            <Form.Label className="serviceTitle">Department of</Form.Label>

                                            {this.getEmployee(singleMenu.employeeId, singleMenu.id)}
                                            <Button onClick={() => this.chatWindow(singleMenu.id, singleMenu.clientId)} variant="primary">Notes</Button>

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
                    <li key={singleParentsubMenu.id}><h5>{singleParentsubMenu.Service.serviceName}</h5>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control onChange={(evt) => this.updateStatus(evt, singleParentsubMenu.id)} as="text" name="updateStatus">
                                        {this.selectFunction(singleParentsubMenu.status)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} className="text-center">
                                    <Form.Label className="serviceTitle">Department of</Form.Label>
                                    {this.getEmployee(singleParentsubMenu.employeeId, singleParentsubMenu.id)}
                                    <Button onClick={() => this.chatWindow(singleParentsubMenu.id, singleParentsubMenu.clientId)} variant="primary">Notes</Button>

                                </Form.Group>
                            </Form.Row>
                        </Form>
                        {this.subMenuMain(singleParentsubMenu.ServiceId)}
                    </li>
                </ul >
            ))
        )
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
            this.chatWindow(resultSingleComment.data.ClientServiceId, this.state.userId)
        }).catch(err => toast.error("There is an error. Please contact administrator (save single comment)"))
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
                <Container>
                    <StickyBox className="chat" offsetTop={20} offsetBottom={20}>
                        <div>
                            <Modal.Dialog id="popupUpdate">
                                <Modal.Header closeButton onClick={() => closeButton()}>
                                    <Modal.Title>Comments</Modal.Title>
                                </Modal.Header>
                                {this.state.allCommentsData.length ? (
                                    <Modal.Body>
                                        {this.state.allCommentsData.map(singleComment => {
                                            return (
                                                <Row key={singleComment.id}>
                                                    <Col size="md-12">
                                                        {(singleComment.User.RoleId === 13) ?
                                                            <div className="text-right">
                                                                <span>{singleComment.User.fName} {singleComment.User.lName} </span><sup>
                                                                    {(singleComment.createdAt) ? (<Moment format="MM/DD/YYYY - HH:mm" date={singleComment.createdAt} />) : ''}</sup>
                                                                <p>{singleComment.comment}</p>
                                                            </div>
                                                            :
                                                            <div className="text-left">
                                                                <span>{singleComment.User.fName} {singleComment.User.lName} </span><sup>
                                                                    {(singleComment.createdAt) ? (<Moment format="MM/DD/YYYY - HH:mm" date={singleComment.createdAt} />) : ''}</sup>
                                                                <p>{singleComment.comment}</p>
                                                            </div>}
                                                    </Col>
                                                </Row>
                                            )
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
                    {/* ///////////////////show services */}
                    <Row>
                        <Col size="md-12">
                            <h2 className="text-center">Here are the services</h2>
                            {this.state.allServicesClient.length > null ? this.serviceMenu() : (<p></p>)}


                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Service;