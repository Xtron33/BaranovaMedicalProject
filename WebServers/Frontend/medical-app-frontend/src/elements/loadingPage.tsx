import {HashLoader} from "react-spinners";


function loadingPage(){

    return(
        <div className="loader">
            <HashLoader
                color="#FFBE5C"
                loading
                size={100}
            />
        </div>
    )
}

export default loadingPage()