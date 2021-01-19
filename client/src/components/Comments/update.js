import { toast } from "react-toastify";
import API from "../../utils/API";
import 'react-toastify/dist/ReactToastify.css';
import chatWindow from "../../pages/Clients";

export function updateComment(serviceId, clientId) {
    //document.getElementById("popupUpdate").style.display = 'block';
    let allComments = {}
    API.showAllComments({
        ClientServiceId: serviceId,
        UserId: clientId
    }).then(resAllComments => {
        allComments = {}
        allComments = resAllComments.data
        /*return (
             <Container>
                 <p>sssssssssssss</p>
                 <StickyBox className="chat" offsetTop={20} offsetBottom={20}>
                     <div>
                         <Modal.Dialog>
                             <Modal.Header closeButton onClick={() => closeButton()}>
                                 <Modal.Title>Comments</Modal.Title>
                             </Modal.Header>
 
                             <Modal.Body>
                                 <Row>
                                     {console.log(allComments)}
                                 </Row>
                                 <br />
                                 <Row>
                                     <Col size="md-12">
                                         <Button variant="primary">send</Button>
                                     </Col>
                                 </Row>
                             </Modal.Body>
 
                             <Modal.Footer>
                             </Modal.Footer>
                         </Modal.Dialog>
                     </div>
                 </StickyBox>
             </Container>
         ) */
    }).catch(error => console.log(error))
}
function showAllComments(serviceId, clientId) {

}
export function closeButton() {
    document.getElementById("popupUpdate").style.display = 'none';
    toast.error("Comment box closed")
}
export default updateComment
