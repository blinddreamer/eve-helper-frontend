import { useState, useEffect } from "react";
import axios from "axios";
import AppraisalForm from "./AppraisalForm";
import AppraisalResult from "./AppraisalResult";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Animated from "../Animated";

function Appraisal() {
  const [onStart, setOnstart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [regions, setRegions] = useState([{}]);
  const [appraisal, setAppraisal] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const backend = "https://api.eve-helper.com/api/v1/";
  //  const backend = "http://thunder:8080/api/v1/";
  //const backend = "http://localhost:8080/api/v1/";
  useEffect(() => {
    onStart && getRegions();
    setOnstart(false);
  });

  useEffect(() => {
    document.title = "EVE Helper - Appraisal";
  });

  async function getRegions() {
    const response = await axios.get(backend + "regions");
    if (response.status === 200) {
      setRegions(response.data);
    }
  }

  async function calculateAppraisal() {
    setErrorMessage();
    try {
      setIsLoading(true);
      const text = document.getElementById("appraisalText").value;
      const lines = text.split(`\n`);
      const items = [];
      lines.forEach((line) => {
        if (line.trim() !== "") {
          const [itemName, quantity] = line.split(/\s+(.+)/);
          const item = { quantity: quantity.trim(), name: itemName.trim() };
          items.push(item);
        }
      });
      const region = document.getElementById("marketRegion").value;
      const data = await axios.post(backend + "appraisal", {
        appraisalRequestEntityList: items,
        regionId: region,
      });
      if (data.status != 200) {
        throw new Error(`Server Error: ${response.statusText}`);
      }
      setAppraisal(data.data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Animated>
      <div id="animateddiv">
        <Container>
          <Row>
            <Col>
              <div id="menuleft">
                <AppraisalForm
                  isLoading={isLoading}
                  regions={regions}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  calculateAppraisal={calculateAppraisal}
                />
              </div>
            </Col>
            <Col xs={7}>
              {appraisal.appraisals ? (
                <AppraisalResult appraisal={appraisal} />
              ) : (
                <div id="start-message">
                  <Alert variant="success">
                    Paste a list from in-game items.
                  </Alert>
                </div>
              )}
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    </Animated>
  );
}

export default Appraisal;
