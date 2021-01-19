import React from "react";
import { toast } from "react-toastify";
import API from "../../utils/API";
import 'react-toastify/dist/ReactToastify.css';

/* function AllSerivcesForClient(customerId) {
    let allServicesClient
        API.serviceClient({ clientId: customerId })
            .then(resServiceClient => {
               allServicesClient=resServiceClient.data 
               return  Comments(allServicesClient)
            }).catch(err => toast.error("There is an error. Please contact administrator (Getting Services for the selected client)"));

}
function Comments(allServicesClientTemp,allServicesClient) {
  
        allServicesClientTemp.map(singleService => (
            API.lastComment({
                serviceId: singleService.id,
                clientId: singleService.clientId
            })
                .then(resLastComment => {
                    console.log("0000000000000000000000000000000000000")
                    if (resLastComment.data !== null) {
                        Object.assign(singleService, { comments: resLastComment.data.comment })
                    }
                    else {
                        Object.assign(singleService, { comments: 'there is no update to show' })
                    }
                    console.log(allServicesClientTemp)
                }).catch(err => console.log(err))
        ))
} */
function AllSerivcesForClient(customerId,allServicesClient) {
    API.serviceClient({ clientId: customerId })
        .then(resServiceClient => {
            allServicesClient = resServiceClient.data
            allServicesClient.map(singleService => (
                API.lastComment({
                    serviceId: singleService.id,
                    clientId: singleService.clientId
                })
                    .then(resLastComment => {
                        if (resLastComment.data !== null) {
                            Object.assign(singleService, { comments: resLastComment.data.comment })
                        }
                        else {
                            Object.assign(singleService, { comments: 'there is no update to show' })
                        }
                      
                    }).catch(err => console.log(err))
            ))
        }
        ).catch(err => toast.error("There is an error. Please contact administrator (Getting Services for the selected service)")); 
}
export default AllSerivcesForClient
