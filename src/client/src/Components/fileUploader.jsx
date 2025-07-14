import { useState } from "react";
import fileInfo from "./fileInfo";
import spectrogramDisplay from "./spectrogramDisplay";

export default function fileUploader(){
    const [file, setFile] = useState()
    const [data, setData] = useState([]);
    const [error, setError] = useState();
    const [predictedClass, setPredictedClass] = useState();

    const handleUpload = async() =>{
        console.log("Handling .fits file upload");
        if(!file){
            console.log("File state null, returning");
            return;
        }
        if(!file.name.endsWith(".fits")) {
            setError("Only valid .fits files are allowed.");
            setFile(null);
            return;
        }
    }
    return(
        <div className="fileUploader">
            {error && (
                <div className="errorWrapper">
                    <h3>Error!</h3>
                    <p>{error}</p>
                </div>
            )}
            <input type="file" accept=".fits" placeholder="Upload .fits file" onChange={target => {setFile(target.target.files[0]); console.log("Set file state")}}/>
            <button onClick={handleUpload}>Upload</button>
            {data.length > 0 && (
                <>
                    <h1>Spectrogram information:</h1>
                    {//Insert components for both spectrogram display && classification information here
                    }
                </>
            )}
        </div>
    )

}