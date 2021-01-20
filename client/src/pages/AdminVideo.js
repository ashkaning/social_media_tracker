import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import { Input, FormBtn } from "../components/Form";
import 'react-toastify/dist/ReactToastify.css'
import { ColRow, Row, Container, ColDark } from "../components/Grid";
import { Modal, Button, Form, Col } from 'react-bootstrap';

import "./style.css"

class AdminVideo extends Component {
    state = {

    };
    componentDidMount() {

    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <Container fluid>
                <ColRow size="12">
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label>Video Name</Form.Label>
                                <Form.Control onChange={this.handleInputChange} type="text" name="videoName" />
                            </Col>
                            <Col>
                                <Form.Label>Video Description</Form.Label>
                                <Form.Control onChange={this.handleInputChange} as="textarea" name="videoDescription" />
                            </Col>
                            <Col xs={2}>
                                <Button onClick={this.saveNewService} variant="primary" type="submit">
                                    Save
                                        </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </ColRow>
            </Container>
        );
    }
}
export default AdminVideo;