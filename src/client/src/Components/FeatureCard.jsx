import websiteDescriptions from "../assets/websiteDescriptions"
export default function FeatureCard(props){
    return(
        <div className="featureDescription">
            <h3>What is {props.featureClicked}?</h3>
            <p>{websiteDescriptions.stellar_properties_dictionary[props.featureClicked]}</p>
        </div>
    )
}