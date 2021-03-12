import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import { Input, FormBtn } from "../components/Form";
import 'react-toastify/dist/ReactToastify.css'
import { ColRow, Row, Container, ColDark } from "../components/Grid";
import { Table, Modal, Button, Form, Col } from 'react-bootstrap';
import Moment from 'react-moment';

import "./style.css"
import { result } from "lodash";

class AdminVideoCategory extends Component {
    state = {
        videoCategoriesName: '',
        allCategoryNames: []
    };
    componentDidMount() {
        this.loadVideoCategory()
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    saveVideo = (event) => {
        event.preventDefault()
        this.setState({
            videoCategoriesName: this.state.videoCategoriesName
        })
        API.saveVideoCategory({
            videoCategoriesName: this.state.videoCategoriesName
        }).then(resultVideoCat => {
            toast.success(resultVideoCat.data.result)
            this.loadVideoCategory()
        }).catch(err => toast.error("There is an error while saving category. Please contact administrator (2220)"))
    }
    loadVideoCategory = () => {
        API.getALlVideoCategory()
            .then(getALlVideoCategoryResult => {
                this.setState({
                    allCategoryNames: getALlVideoCategoryResult.data.allCategoryNames
                })
                console.log(this.state.allCategoryNames)
                toast.success(getALlVideoCategoryResult.data.result)
            }).catch(err => toast.error("There is an error while getting categories. Please contact administrator (2221)"))
    }

    render() {
        return (
            <div className="topSpacing">
                <Container fluid>
                    <ColRow size="12">
                        <Form >
                            <Form.Row>
                                <Col md={4}>
                                    <Form.Control onChange={this.handleInputChange} type="text" placeholder="Video Category Name" name="videoCategoriesName" />
                                </Col>
                                <Col md={4}>
                                    <Button onClick={this.saveVideo} variant="primary" type="submit">
                                        Save
                                </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </ColRow>
                    <ColRow size="12">
                        <Table striped bordered hover className="topSpacing">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Video Name</td>
                                    <td>Edit</td>
                                    <td>Delele</td>
                                    <td>Created Date</td>
                                    <td>Updated Date</td>
                                </tr>
                            </thead>
                            {this.state.allCategoryNames.length ? (
                                <tbody>
                                    {this.state.allCategoryNames.map(singleVideoName => (
                                        <tr key={singleVideoName.id}>
                                            <td name="categoryName">{singleVideoName.id}</td>
                                            <td>{singleVideoName.videoCategoriesName}</td>
                                            <td className="text-center"><Button variant="primary">Edit</Button></td>
                                            <td className="text-center"><Button variant="danger">Delete</Button></td>
                                            <td name="categoryCreatedDate"><Moment format="MM/DD/YYYY - HH:mm" date={singleVideoName.createdAt} /></td>
                                            <td name="categoryCreatedDate"><Moment format="MM/DD/YYYY - HH:mm" date={singleVideoName.updatedAt} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (<h3>Loading...</h3>)}
                        </Table>
                    </ColRow>
                </Container>
            </div>
        );
    }
}
export default AdminVideoCategory;