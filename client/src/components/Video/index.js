import React, { Children } from "react";
import API from "../../utils/API";
import { toast } from "react-toastify";

let getALlVideoCategoryResult = [];
function GettingAllCategoryNames() {
    API.getALlVideoCategory()
        .then(getALlVideoCategoryResult => {
            getALlVideoCategoryResult = getALlVideoCategoryResult.data.allCategoryNames
            console.log(this.state.allCategoryNames)
            toast.success(getALlVideoCategoryResult.data.result)
        }).catch(toast.error("There is an error while getting categories. Please contact administrator (2221)"))
}
export default GettingAllCategoryNames;