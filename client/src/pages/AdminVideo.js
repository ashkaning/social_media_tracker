import React, { Component } from "react";
import API from "../utils/API";
import { toast } from "react-toastify"
import { Input, FormBtn } from "../components/Form";
import 'react-toastify/dist/ReactToastify.css'
import { Col, Row, Container, ColDark } from "../components/Grid";
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
               <p>hi</p>
            </Container>
        );
    }
}
export default AdminVideo;