import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Row, Container } from "../components/Grid";
import "./style.css";
import { Table, Button, Form, Col, Modal } from 'react-bootstrap';
import CheckSecurity from "../components/Security";
import Moment from 'react-moment';

class Profile extends Component {

    state = {
        fName: '',
        lName: '',
        address: '',
        addressUnit: '',
        addressCity: '',
        addressState: '',
        addressZip: '',
        email: '',
        phone: '',
        companyName: '',
        description: '',
        logo: '',
        password: '',
        role: '',
        userId: '',
        roleId: '',
        resDataCheckSecurity: {}
    }
    componentDidMount() {
        this.checkSecurity();
    }
    checkSecurity = () => {
        API.checkSecurity()
            .then((res) => {
                this.setState({ resDataCheckSecurity: res.data, userId: res.data.userId, roleId: res.data.roleId })
                this.profileInfo(this.state.userId)
                this.state.resDataCheckSecurity = Object.assign({}, res.data);
            })
            .catch(err => console.log(err))
    }
    profileInfo = (userId) => {
        API.profileInfo({ id: userId })
            .then(result => {
                this.setState({
                    fName: result.data.fName,
                    lName: result.data.lName,
                    address: result.data.address,
                    addressUnit: result.data.addressUnit,
                    addressCity: result.data.addressCity,
                    addressState: result.data.addressState,
                    addressZip: result.data.addressZip,
                    email: result.data.email,
                    phone: result.data.phone,
                    companyName: result.data.companyName,
                    description: result.data.description,
                    logo: result.data.logo,
                    role: result.data.Role.name
                })
            })
            .catch(err => toast.error('There is something wrong on getting profile info. Please contact the adminstrator'))
    }


    render() {
        return (
            <div>
                {CheckSecurity(this.state.resDataCheckSecurity)}
                <Container>

                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFname">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="fName" type="text" placeholder={this.state.fName} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridLname">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="lName" type="text" placeholder={this.state.lName} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="email" type="email" placeholder={this.state.email} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPhone">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="phone" type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" placeholder={this.state.phone} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="companyName" type="text" placeholder={this.state.companyName} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="address" placeholder={this.state.address} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridAddress2">
                                <Form.Label>Address 2</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="addressUnit" placeholder={this.state.addressUnit} />
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="addressCity" type="text" placeholder={this.state.addressCity} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="addressState" type="text" placeholder={this.state.addressState} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control onChange={this.handleInputChange} name="addressZip" type="text" placeholder={this.state.addressZip} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Comment or Description</Form.Label>
                            <Form.Control onChange={this.handleInputChange} name="description" as="textarea" rows="3" placeholder={this.state.description} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control onChange={this.handleInputChange} name="role" type="text" placeholder={this.state.role} />
                        </Form.Group>
                        <Button onClick={this.saveNewUser} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        )
    }

}
export default Profile;
