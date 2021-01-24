import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import { Input, FormBtn } from "../components/Form";
import 'react-toastify/dist/ReactToastify.css'
import { ColRow, Row, Container, ColDark } from "../components/Grid";
import { Table,Modal, Button, Form, Col } from 'react-bootstrap';
import Moment from 'react-moment';

import "./style.css"

class AdminVideo extends Component {
    state = {
        allCategoryNames: [],
        videoDescription: '',
        videoName: '',
        videoCategoryId: 0,
        allVideoNames: []
    };
    componentDidMount() {
        this.loadVideoCategory();
        this.loadVideos();
    }
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    loadVideoCategory = () => {
        API.getALlVideoCategory()
            .then(getALlVideoCategoryResult => {
                this.setState({
                    allCategoryNames: getALlVideoCategoryResult.data.allCategoryNames
                })
                toast.success(getALlVideoCategoryResult.data.result)
            }).catch(toast.error("There is an error while getting categories. Please contact administrator (2221)"))
    }
    loadVideos = () =>{
        API.gettAllVideos()
        .then(gettAllVideosResult=>{
            console.log(gettAllVideosResult.data)
            this.setState({
                allVideoNames: gettAllVideosResult.data
            })
        }).catch(toast.error("There is an error while getting video names. Please contact administrator (2223)"))
    }
    saveVideo = (evt) => {
        evt.preventDefault()
        API.saveVideo({
            videoName: this.state.videoName,
            videoDescription: this.state.videoDescription,
            VideoCategoryId: this.state.videoCategoryId
        }).then(saveVideoResult => {
            if (saveVideoResult.data.resultWarning) {
                toast.warning(saveVideoResult.data.resultWarning)
            }
            if (saveVideoResult.data.resultSuccess) {
                toast.success(saveVideoResult.data.resultSuccess)
            }

        }).catch(toast.error("There is an error while saving video. Please contact administrator (2222)"))
    }
    render() {
        return (
            <div className="topSpacing">
                <Container fluid>
                    <ColRow size="12">
                        <Form className="text-center">
                            <Form.Row>
                                <Col md={3}>
                                    <Form.Control onChange={this.handleInputChange} type="text" placeholder="Video Name" name="videoName" />
                                </Col>
                                <Col md={3}>
                                    <Form.Control onChange={this.handleInputChange} as="textarea" placeholder="Video Description" name="videoDescription" />
                                </Col>
                                <Col md={3}>
                                    <Form.Control onChange={this.handleInputChange} as="select" name="videoCategoryId">
                                        {this.state.allCategoryNames.map(singleVideoName => (
                                            <option key={singleVideoName.id} value={singleVideoName.id}>{singleVideoName.videoCategoriesName}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={3}>
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
                                    <td>Video Description</td>
                                    <td>Video Category Name</td>
                                    <td>Edit</td>
                                    <td>Delele</td>
                                    <td>Created Date</td>
                                    <td>Updated Date</td>
                                </tr>
                            </thead>
                            {this.state.allCategoryNames.length ? (
                                <tbody>
                                    {this.state.allVideoNames.map(singleVideoName => (
                                        <tr key={singleVideoName.id}>
                                            <td name="videoId">{singleVideoName.id}</td>
                                            <td name="videoName">{singleVideoName.videoName}</td>
                                            <td>{singleVideoName.videoDescription}</td>
                                            <td>{singleVideoName.VideoCategory.videoCategoriesName}</td>
                                            <td className="text-center"><Button variant="primary">Edit</Button></td>
                                            <td className="text-center"><Button variant="danger">Delete</Button></td>
                                            <td name="videoCreatedDate"><Moment format="MM/DD/YYYY - HH:mm" date={singleVideoName.createdAt} /></td>
                                            <td name="videoCreatedDate"><Moment format="MM/DD/YYYY - HH:mm" date={singleVideoName.updatedAt} /></td>
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
export default AdminVideo;