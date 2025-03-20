"use client"
import axios from "axios";
import {Row, Col} from "react-bootstrap";
import { useState, useEffect } from "react";
export default function Picalculator(){
    const [piList, setPiList] = useState([]);
    const [onStart, setOnstart] = useState(true);

    const backend = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        if (!onStart) return;

    const fetcPiData = async () => {
        try {
            const response = await axios.get(backend + "pi");
            if (response.status !== 200) {
              throw new Error(`Server Error: ${response.statusText}`);
            }
            
            setPiList(response.data);
      
          } catch (error) {
            console.error("Error:", error.message);
            
          } 
        }
        fetcPiData();
        setOnstart(false);
       }, [onStart]);
  
  
  return (
    <Row id="pi-diagram">
        <h2 id="diagram-label">PI DIAGRAM</h2>
    {piList && <Col id="raw"> <h3>Raw</h3>
    {piList.filter(pi=> pi.type ===0).map(pi=> <p key={"p_"+pi.id} id={pi.id}><img key={"img_"+pi.id} src={pi.icon} loading="lazy" alt={pi.name}/>{pi.name}</p>)}
    </Col>}    
    {piList && <Col id="basic"> <h3>Basic</h3>
    {piList.filter(pi=> pi.type ===1).map(pi=> <p key={"p_"+pi.id} id={pi.id}><img key={"img_"+pi.id}  src={pi.icon} loading="lazy" alt={pi.name}/>{pi.name}</p>)}
    </Col>} 
    {piList && <Col id="refined"> <h3>Refined</h3>
    {piList.filter(pi=> pi.type ===2).map(pi=> <p key={"p_"+pi.id} id={pi.id}><img key={"img_"+pi.id}  src={pi.icon} loading="lazy" alt={pi.name}/>{pi.name}</p>)}
    </Col>} 
    {piList && <Col id="specialized"> <h3>Specialized</h3>
    {piList.filter(pi=> pi.type ===3).map(pi=> <p key={"p_"+pi.id} id={pi.id}><img key={"img_"+pi.id}  src={pi.icon} loading="lazy" alt={pi.name}/>{pi.name}</p>)}
    </Col>} 
    {piList && <Col id="advanced"> <h3>Advanced</h3>
    {piList.filter(pi=> pi.type ===4).map(pi=> <p key={"p_"+pi.id} id={pi.id}><img key={"img_"+pi.id}  src={pi.icon} loading="lazy" alt={pi.name}/>{pi.name}</p>)}
    </Col>} 
    <div id="planets">
        <h3>Planets:</h3>
    <span id="1"><img src={"/assets/barren.png"} />Barren </span>
    <span id="2"><img src={"/assets/gas.png"} />Gas </span>
    <span id="3"><img src={"/assets/ice.png"} />Ice </span>
    <span id="4"><img src={"/assets/lava.png"} />Lava </span>
    <span id="5"><img src={"/assets/oceanic.png"} />Oceanic </span>
    <span id="6"><img src={"/assets/plasma.png"} />Plasma </span>
    <span id="7"><img src={"/assets/storm.png"} />Storm </span>
    <span id="8"><img src={"/assets/temperate.png"} />Temperate </span>
    </div>
</Row>
);
}
