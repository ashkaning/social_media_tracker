import React from "react";
import ReactDOM from "react-dom"
import API from "../utils/API";

class Subscription extends React.Component {

    handleFormSubmit = (id) => {
        API.createSession({
            priceId: id
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Video Plan (Basic)</h3>
                        <p>This subscription has 7 days trial</p>
                        <input onClick={() => this.handleFormSubmit("price_1IUJYsL6edbYhNjRtcVLs1AP")} type="button" className="btn btn-primary" value="$10 per month" />
                    </div>
                    <div className="col-md-4">
                        <h3>Video Plan (Premium)</h3>
                        <p>This subscription has 5 days trial</p>
                        <input onClick={() => this.handleFormSubmit("price_1IUJZyL6edbYhNjR2sxYNMaL")} type="button" className="btn btn-primary" value="$20 per month" />
                    </div>
                    <div className="col-md-4">
                        <h3>Video Plan Gold</h3>
                        <p>This subscription has 1 days trial</p>
                        <input onClick={() => this.handleFormSubmit("price_1IY0loL6edbYhNjRDtkw9PNe")} type="button" className="btn btn-primary" value="$30 per month" />
                    </div>
                </div>
            </div>
        );
    }
}
export default Subscription;