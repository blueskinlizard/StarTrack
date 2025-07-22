import websiteDescriptions from "../assets/websiteDescriptions";
export default function StarInformationCard(props){
    return(
       <div>
            <h2>This is a(n) {props.starType} star</h2>
            <h3>And our {props.modelType} model predicted it to be {props.modelPrediction} with {Number(props.modelConfidence).toFixed(2)}% confidence!</h3>
            <p>{websiteDescriptions.star_descriptions[`${props.starType}_Star_Description`].Base_Description}</p>
       </div>
    )
}