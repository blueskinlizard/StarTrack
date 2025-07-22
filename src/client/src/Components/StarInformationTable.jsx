import '../App.css'
import { useState } from 'react';
import FeatureCard from './FeatureCard';
export default function StarInformationTable(props) {
    const [featureClicked, setFeatureClicked] = useState();
    const tableData = props.tableInformation;

    if (!tableData) {
        return <p>No data to display.</p>;
    }

    return (
        <div className="starInformationTable">
        <h2>Star Information</h2>
        <div
            style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            }}
        >
            {Object.entries(tableData).map(([key, value], index) => (
            <div
            key={index}
            onClick={() => setFeatureClicked(key)}
            className="hover-card"
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                minWidth: "140px",
                maxWidth: "200px",
                wordBreak: "break-word",
                cursor: "pointer",
                flex: "1 1 140px",
            }}
            >
                <strong style={{ fontSize: "14px", color: "#333" }}>{key}</strong>
                <div style={{ marginTop: "4px", fontSize: "13px", color: "#555" }}>{value}</div>
                </div>
            ))}
            </div>
            {featureClicked && (
                <FeatureCard featureClicked={featureClicked}></FeatureCard>
            )}
        </div>
    );
}
