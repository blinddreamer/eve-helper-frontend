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
  const backend = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    onStart && getRegions();
    setOnstart(false);
  });

  async function getRegions() {
    const response = await axios.get(backend + "regions");
    if (response.status === 200) {
      setRegions(response.data);
    }
  }

  async function calculateAppraisal() {
    setErrorMessage(null);
    try {
      setIsLoading(true);

      const text = document.getElementById("appraisalText").value || "";
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
      const items = [];
      lines.forEach((line, index) => {
        if (typeof line !== "string") {
          console.error(`Line ${index + 1} is not a string:`, line);
          return;
        }

        const match = line.match(/^(.+?)\s+(\d+)$/);

        if (match) {
          const itemName = match[1].trim();
          const quantity = parseInt(match[2], 10);
          items.push({ name: itemName, quantity });
        }
      });

      if (items.length === 0) throw new Error("No valid items found.");
      const region = document.getElementById("marketRegion").value;
      if (!region) throw new Error("Market region is required.");
      const { data, status } = await axios.post(backend + "appraisal", {
        appraisalRequestEntityList: items,
        regionId: region,
      });

      if (status !== 200) throw new Error(`Server Error: ${status}`);

      setAppraisal(data);
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
