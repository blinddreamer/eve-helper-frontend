import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AppraisalForm from "./AppraisalForm";
import AppraisalResult from "./AppraisalResult";
import Animated from "../Animated";
import AppraisalText from "./AppraisalText";

function Appraisal() {
  const [onStart, setOnstart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [system, setSystem] = useState("");
  const [optionsSys, setOptionsSys] = useState([]);
  const [loadedApp, setLoadedApp] = useState(false);
  const [stations, setStations] = useState([{}]);
  const [appraisal, setAppraisal] = useState({});
  const [errorMessage, setErrorMessage] = useState();
  const [pricePercentage, setPricePercentage] = useState(100);
  const [transactionType, setTransactionType] = useState("buy");
  const [market, setMarket] = useState("10000002_60003760");
  const [editMode, setEditMode] = useState(true);
  const [comment, setComment] = useState("");

  const backend = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { uuid } = useParams();

  // Load stored values when the component mounts
  useEffect(() => {
    if (!editMode) return;
    const storedRegion = localStorage.getItem("marketRegion");
    const storedPrice = localStorage.getItem("pricePercentage");
    const storedTransaction = localStorage.getItem("transactionType");
    const storedComment = localStorage.getItem("appraisalComment");
    const storedSystem = localStorage.getItem("system");

    if (storedRegion) setMarket(storedRegion);
    if (storedPrice) setPricePercentage(parseFloat(storedPrice));
    if (storedTransaction) setTransactionType(storedTransaction);
    if (storedComment) setComment(storedComment);
    if (storedSystem) setSystem(storedSystem);
  }, []);

  useEffect(() => {
    if (!uuid || loadedApp) {
      setEditMode(true);
      return; // Ensure UUID is available before fetching
    }
    const fetchAppraisal = async () => {
      try {
        const response = await axios.get(`${backend}appraisal/${uuid}`);
        if (response.status === 200) {
          const appraisal = response.data;
          setEditMode(false);
          setAppraisal(appraisal);
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
    if (!appraisal.appraisals) {
      return;
    }
    const price =
      transactionType === "split"
        ? appraisal.estimateTotalSplit
        : transactionType === "sell"
        ? appraisal.estimateTotalSell
        : appraisal.estimateTotalBuy;
    document.title = `Appraisal @ ${pricePercentage}% - ${market}`;

    const metaTitle = document.querySelector('meta[property="og:title"]');
    const metaDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    if (metaTitle) {
      metaTitle.setAttribute(
        "content",
        `Appraisal @ ${pricePercentage}% - ${market}`
      );
    }

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Order Type: ${transactionType} | Price Based on: ${price}`
      );
    }
  }, [appraisal, pricePercentage, market, transactionType]);

  useEffect(() => {
    onStart && getStations() && getSystems();
    setOnstart(false);
  });
  async function getSystems() {
    const response = await axios.get(backend + "systems");
    if (response.status === 200) {
      setOptionsSys(response.data.map((sys) => sys.systemName));
    }
  }
  useEffect(() => {
    document.title = "EVE Helper - Appraisal";
  });

  async function getStations() {
    const response = await axios.get(backend + "stations");
    if (response.status === 200) {
      setStations(response.data);
    }
  }

  function updateStorageOnSubmit() {
    updateStorage("marketRegion", market);
    updateStorage("pricePercentage", pricePercentage);
    updateStorage("transactionType", transactionType);
    updateStorage("appraisalComment", comment);
    updateStorage("system", system);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
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

        const match = line.match(/^(.+?)\s{1,3}(\d+)(?:\s.*)?$/);

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
        transactionType: transactionType,
        system: system,
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
          market={market}
          setMarket={setMarket}
          updateStorage={updateStorage}
          handleCopy={handleCopy}
          uuid={uuid}
          setSystem={setSystem}
          system={system}
          optionsSys={optionsSys}
          setOptionsSys={setOptionsSys}
        />

        {appraisal.appraisalResult &&
          <AppraisalResult
            appraisal={appraisal}
            uuid={uuid}
            handleCopy={handleCopy}
            pricePercentage={pricePercentage}
          />}
          <AppraisalText
          calculateAppraisal={calculateAppraisal}
          comment={comment}
          setComment={setComment}
          />
      </div>
    </Animated>
  );
}
export default Appraisal;
