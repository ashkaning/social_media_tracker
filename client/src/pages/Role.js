import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { FormBtn } from "../components/Form";
import { Col, Row, Container } from "../components/Grid";
import CheckSecurity from "../components/Security";
import "./style.css";
import { Table, Button, Modal } from 'react-bootstrap';

class Role extends Component {
    state = {
        userId: null,
        roleName: "",
        updateRoleName: "",
        updateRoleDesc: "",
        roleId: '',
    };
    constructor(props) {
        super(props);
        this.state = {
            roleDesc: "",
            allRoles: [],
            getOneRole: [],
            resDataCheckSecurity: {}

        };
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    componentDidMount() {
        this.checkSecurity();
        this.getAllRoles();
    }
    checkSecurity = () => {
        API.checkSecurity()
            .then((res) => {
                this.setState({ resDataCheckSecurity: res.data, userId: res.data.userId, roleId: res.data.roleId });
                this.state.resDataCheckSecurity = Object.assign({}, res.data);
                if (this.state.roleId !== 6) {
                    toast.info("You don't have permission to see the page... !");
                    this.props.history.push('/profile', { some: 'state' })
                }
            })
            .catch(err => console.log(err))
    }
    /////////////////////Get all info from Roles db////////////////////
    getAllRoles = () => {
        API.getAllRoles()
            .then(resAllRoles => {
                this.setState({ allRoles: resAllRoles.data })
            }).catch(err => toast.error("There is an error. Please contact administrator"))
    }
    ////////////////////Insert Function for Making Roles//////////////////
    handleFormSubmit = event => {
        event.preventDefault()
        API.NewRol({
            name: this.state.roleName,
            description: this.state.roleDesc
        })
            .then((result) => {
                toast.success("New role added!")
                this.getAllRoles();
                this.resetFeilds();
            })
            .catch(err => toast.error("There is an error. Please contact adminstrator"))
    }
    ////////////////////DELETE FUNCTION///////////////////////
    deleteRole = (id) => {
        var data = { id: id }
        API.deleteRole({ data })
            .then(resDelete => {
                toast.success("Role Deleted!")
                this.getAllRoles();
            })
            .catch(err => toast.error("There is an error. Please contact adminstrator"))
    }
    ///////////////////GET INFORAMTION ON UPDATE CLICK AND UPDATE FUNCTION////////////
    getOneRole = (id) => {
        API.getOneRole({ id: id })
            .then(resGetOneRole => {
                toast.success("Please updae the information below")
                this.setState({
                    getOneRole: resGetOneRole.data
                })
                document.getElementById("popupUpdate").style.display = 'block';
            }).catch(err => toast.error("There is an error. Please contact adminstrator"))
    }
    updateOneRole = (id) => {
        API.updateOneRole({
            id: id,
            name: this.state.updateRoleName,
            description: this.state.updateRoleDesc
        })
            .then(resOneUpdate => {
                toast.success("The role updated")
                this.getAllRoles();
                this.resetFeilds();
            }).catch(err => toast.error("There is an error. Please contact adminstrator"))
    }
    /////////////////GET INFORMATION FROM INPUTS//////////////////////////
    handleTextChange = event => {
        this.setState({
            roleDesc: event.target.value
        });
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    resetFeilds = () => {
        this.setState({
            roleDesc: '',
            roleName: '',
            updateRoleName: '',
            updateRoleDesc: ''
        })
    }
    closeButton = () => {
        document.getElementById("popupUpdate").style.display = 'none';
        toast.error("Update box closed")
    }
    //////////////////////////////////////////
    render() {
        return (
            <div>

                {CheckSecurity(this.state.resDataCheckSecurity)}
                <Container>
                    <Row>
                        <Col size="md-12">
                            <h2 className="text-center">
                                Department List
                        </h2>
                        </Col>
                        <Col size="md-12">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>Role Name</td>
                                        <td>Role Description</td>
                                        <td>Edit</td>
                                        <td>Delele</td>
                                    </tr>
                                </thead>
                                {this.state.allRoles.length ? (
                                    <tbody>
                                        {this.state.allRoles.map(singleRole => (

                                            <tr key={singleRole.id}>

                                                <td name="roleId">{singleRole.id}</td>
                                                <td>{singleRole.name}</td>
                                                <td>{singleRole.description}</td>
                                                <td className="text-center"><Button onClick={() => this.getOneRole(singleRole.id)} variant="primary">Edit</Button></td>
                                                <td className="text-center"><Button onClick={() => this.deleteRole(singleRole.id)} variant="danger">Delete</Button>
                                                </td>

                                            </tr>

                                        ))}
                                    </tbody>
                                ) : (<h3>Loading...</h3>)}

                            </Table>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col size="md-6">
                            <Modal.Dialog id="popupUpdate">
                                <Modal.Header closeButton onClick={() => this.closeButton()}>
                                    <Modal.Title>Update Role</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <p>Please update the information below and save.</p>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Row>
                                        <Col size="md-6">

                                            <input onChange={this.handleInputChange} name="updateRoleName" placeholder={this.state.getOneRole.name} />
                                        </Col>
                                        <Col size="md-6">
                                            <input onChange={this.handleInputChange} name="updateRoleDesc" placeholder={this.state.getOneRole.description} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col size="md-12">
                                            <Button onClick={() => this.updateOneRole(this.state.getOneRole.id)} variant="primary">Save changes</Button>
                                        </Col>
                                    </Row>
                                </Modal.Footer>
                            </Modal.Dialog>
                        </Col>
                        <Col size="md-6">
                            <form>
                                <div className="form-group">
                                    <input className="form-control" name="roleName" onChange={this.handleInputChange} value={this.state.roleName} placeholder="Marketing or Development (required)" />
                                    <textarea name="roleDesc" className="form-control" onChange={this.handleTextChange} ></textarea>
                                </div>
                                <FormBtn
                                    onClick={this.handleFormSubmit}
                                >
                                    Post
                        </FormBtn>
                            </form>
                        </Col>

                    </Row>

                </Container>
            </div>
        );
    }
}
export default Role;