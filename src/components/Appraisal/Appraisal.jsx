import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const [loadedApp, setLoadedApp] = useState(false);
  const [stations, setStations] = useState([{}]);
  const [appraisal, setAppraisal] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [pricePercentage, setPricePercentage] = useState(100);
  const [transactionType, setTransactionType] = useState("buy");
  const [market, setMarket] = useState("10000002_60003760");
  const [comment, setComment] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { uuid } = useParams(); 


    // Load stored values when the component mounts
    useEffect(() => {
      const storedRegion = localStorage.getItem("marketRegion");
      const storedPrice = localStorage.getItem("pricePercentage");
      const storedTransaction = localStorage.getItem("transactionType");
      const storedComment = localStorage.getItem("appraisalComment");
  
      if (storedRegion) setMarket(storedRegion);
      if (storedPrice) setPricePercentage(parseFloat(storedPrice));
      if (storedTransaction) setTransactionType(storedTransaction);
      if (storedComment) setComment(storedComment);
    }, []);

  useEffect(() => {
    if (!uuid || loadedApp) return; // Ensure UUID is available before fetching

    const fetchAppraisal = async () => {
      try {
        const response = await axios.get(`${backend}appraisal/${uuid}`);
        if (response.status === 200) {
          const appraisal = response.data;
          setAppraisal(appraisal.appraisalResult);
          setMarket(appraisal.market);
          setPricePercentage(appraisal.pricePercentage);
          setComment(appraisal.comment);
          setTransactionType(appraisal.transactionType);
          setLoadedApp(true);
        }
      } catch (error) {
        console.error("Error fetching appraisal:", error);
      }
    };

    fetchAppraisal();
  }, [uuid]); // Runs only when `uuid` changes

// Function to update local storage
const updateStorage = (key, value) => {
  localStorage.setItem(key, value);
};

  useEffect(() => {
    if(!appraisal) return;
    const price = transactionType === "split" ? appraisal.estimateTotalSplit : transactionType=== "sell" ? appraisal.estimateTotalSell : appraisal.estimateTotalBuy;
    document.title = `Appraisal @ ${pricePercentage}% - ${market}`;

    const metaTitle = document.querySelector('meta[property="og:title"]');
    const metaDescription = document.querySelector('meta[property="og:description"]');

    if (metaTitle) {
        metaTitle.setAttribute("content", `Appraisal @ ${pricePercentage}% - ${market}`);
    }

    if (metaDescription) {
        metaDescription.setAttribute("content", `Order Type: ${transactionType} | Price Based on: ${price}`);
    }
  }, [appraisal,pricePercentage, market, transactionType]);
  

  useEffect(() => {
    onStart && getStations();
    setOnstart(false);
  });

  useEffect(() => {
    document.title = "EVE Helper - Appraisal";
  });

  async function getStations() {
    const response = await axios.get(backend + "stations");
    if (response.status === 200) {
      setStations(response.data);
    }
  }
 
  function updateStorageOnSubmit(){
    updateStorage("marketRegion",market);
    updateStorage("pricePercentage", pricePercentage);
    updateStorage("transactionType", transactionType);
    updateStorage("appraisalComment", comment);
 }

 const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Copied to clipboard!");
  } catch (error) {
    console.error("Copy failed", error);
  }
};

  async function calculateAppraisal() {
    setErrorMessage(null);
    updateStorageOnSubmit();
   // setAppraisal();
    try {
      setIsLoading(true);
      const percent = pricePercentage;  
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
      const station = market;
      if (!station) throw new Error("Market region is required.");
      const { data, status } = await axios.post(backend + "appraisal", {
        appraisalRequestEntityList: items,
        regionId: station,
        pricePercentage: percent,
        comment: comment,
        transactionType: transactionType

      });

      if (status !== 200) throw new Error(`Server Error: ${status}`);
  
      navigate(`/appraisal/${data}`);
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
                  stations={stations}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                  calculateAppraisal={calculateAppraisal}
                  pricePercentage={pricePercentage}
                  setPricePercentage={setPricePercentage}
                  transactionType={transactionType}
                  setTransactionType={setTransactionType}
                  comment={comment}
                  setComment={setComment}
                  market={market}
                  setMarket={setMarket}
                  updateStorage={updateStorage}
                  handleCopy={handleCopy}
                  uuid={uuid}

                />
              </div>
            </Col>
            <Col xs={7}>
              {appraisal.appraisals ? (
                <AppraisalResult appraisal={appraisal} 
                pricePercentage={pricePercentage}
                />
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
