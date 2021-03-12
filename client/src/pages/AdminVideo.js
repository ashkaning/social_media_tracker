import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ColRow, Row, Container, ColDark } from "../components/Grid";
import { Image, Table, Modal, Button, Form, Col } from 'react-bootstrap';
import Moment from 'react-moment';

import "./style.css"

class AdminVideo extends Component {
    state = {
        allCategoryNames: [],
        videoDescription: '',
        videoName: '',
        videoCategoryId: 0,
        allVideoNames: [],
        url: '',
        imgURL: ''
    }
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
            }).catch(err => toast.error("There is an error while getting categories. Please contact administrator (2225)"))
    }
    loadVideos = () => {
        API.gettAllVideos()
            .then(gettAllVideosResult => {
                this.setState({
                    allVideoNames: gettAllVideosResult.data
                })
            }).catch(err => toast.error("There is an error while getting video names. Please contact administrator (2223)"))
    }
    saveVideo = (evt) => {
        evt.preventDefault()
        console.log(this.state.pictures)
        API.saveVideo({
            videoName: this.state.videoName,
            url: this.state.url,
            imgURL: this.state.imgURL,
            videoDescription: this.state.videoDescription,
            VideoCategoryId: this.state.videoCategoryId
        }).then(saveVideoResult => {
            if (saveVideoResult.data.resultWarning) {
                toast.warning(saveVideoResult.data.resultWarning)
            }
            if (saveVideoResult.data.resultSuccess) {
                toast.success(saveVideoResult.data.resultSuccess)
            }
            this.loadVideos();
        }).catch(err => toast.error("There is an error while saving video. Please contact administrator (2222)"))
    }
    deleteVideo = (videoId) => {
        API.deleteVideo(videoId)
            .then(deleteVideoRes => {
                toast.success("Video deleted")
                this.loadVideos();
            }).catch(err => toast.error("There is an error while deleting the video. Please contact administrator (2224)"))
    }
    render() {
        return (
            <div className="topSpacing">
                <Container fluid>
                    <h2 className="text-center">Add Video</h2>
                    <ColRow size="12">
                        <Form className="text-center">
                            <Form.Row>
                                <Col md={2}>
                                    <Form.Control onChange={this.handleInputChange} type="text" placeholder="Video Name" name="videoName" />
                                </Col>
                                <Col md={2}>
                                    <Form.Control onChange={this.handleInputChange} type="url" pattern="https://.*" placeholder="Video URL: https://" name="url" />
                                </Col>
                                <Col md={2}>
                                    <Form.Control onChange={this.handleInputChange} type="url" pattern="https://.*" placeholder="Image URL: https://" name="imgURL" />
                                </Col>
                                <Col md={3}>
                                    <Form.Control onChange={this.handleInputChange} as="textarea" placeholder="Video Description" name="videoDescription" />
                                </Col>
                                <Col md={2}>
                                    <Form.Control onChange={this.handleInputChange} as="select" name="videoCategoryId">
                                        {this.state.allCategoryNames.map(singleVideoName => (
                                            <option key={singleVideoName.id} value={singleVideoName.id}>{singleVideoName.videoCategoriesName}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={1}>
                                    <Button onClick={this.saveVideo} variant="primary" type="submit">
                                        Save
                                </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </ColRow>
                    <hr />
                    <h2 className="text-center">All Videos</h2>
                    {this.state.allCategoryNames.length ? (
                        <div>
                            {
                                this.state.allVideoNames.map(singleVideoName => (
                                    <div className="bottomBorder">
                                        <Row key={singleVideoName.id}>
                                            <ColRow size="6">
                                                <strong>Video Name: </strong><span>{singleVideoName.videoName} - </span><strong>Video Category: </strong><span>{singleVideoName.VideoCategory.videoCategoriesName}</span>
                                            </ColRow>
                                            <ColRow size="5">
                                                <div className="text-right">
                                                    <small>Created Date: <Moment format="MM/DD/YYYY - HH:mm" date={singleVideoName.createdAt} /></small>
                                                    <small> - Updated Date: <Moment format="MM/DD/YYYY - HH:mm" date={singleVideoName.updatedAt} /></small>
                                                </div>
                                            </ColRow>
                                            <ColRow size="2">
                                                <Image src={singleVideoName.imgURL} thumbnail />
                                            </ColRow>
                                            <ColRow size="3">
                                                <iframe width="100%" height="auto"
                                                    src={`${singleVideoName.url}`}>
                                                </iframe>
                                            </ColRow>
                                            <ColRow size="6">
                                                <h5><strong>Video Description:</strong></h5>
                                                <p>{singleVideoName.videoDescription}</p>
                                                <div className="text-right">
                                                    <Button variant="primary" onClick={() => this.editVideo(singleVideoName.id)}>Edit</Button>
                                                    <Button variant="danger" onClick={() => this.deleteVideo(singleVideoName.id)}>Delete</Button>
                                                </div>
                                            </ColRow>
                                        </Row>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (<h3>Loading...</h3>)}

                </Container>
            </div>
        );
    }
}
export default AdminVideo;