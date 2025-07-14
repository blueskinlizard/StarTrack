import { useRef, useState, useEffect } from "react";

export default function spectrogramDisplay({ spectralInfoID }){
    const [imageURL, setImageURL] = useState(null);
    const canvasRef = useRef();

    useEffect(() =>{
        const fetchSpectrogramInformation = async() =>{
            console.log("Fetching spectral data representation function called");
            try{
                const response = await fetch('http://localhost:8080/api/fetchSpectralInformation', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ displayID: spectralInfoID })
                })
                if(!response.ok) throw new Error("Image fetch failed");

                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setImageURL(url);

            }catch(error){
                console.error("Error fetching image:", error);
            }

            if(radioGraphID) {
                fetchRadioGraph();
            }
        }
    }, [spectralInfoID])

    useEffect(() => {
        if(imageURL && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            const img = new Image();
            img.onload = () => {
                canvasRef.current.width = img.width;
                canvasRef.current.height = img.height;
                ctx.drawImage(img, 0, 0);
            };
            img.src = imageURL;
        }
    }, [imageURL]);

    return(
        <div className="spectrogramDisplay">
            <h3>Spectrogram representation of .fits file</h3>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}