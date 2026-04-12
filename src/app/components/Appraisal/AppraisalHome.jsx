"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import AppraisalForm from "./AppraisalForm";
import AppraisalResult from "./AppraisalResult";
import AppraisalText from "./AppraisalText";
import Animated from "../Animated";

function AppraisalHome() {
  const [onStart, setOnStart] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [system, setSystem] = useState("");
  const [optionsSys, setOptionsSys] = useState([]);
  const [loadedApp, setLoadedApp] = useState(false);
  const [stations, setStations] = useState([]);
  const [appraisal, setAppraisal] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [pricePercentage, setPricePercentage] = useState(100);
  const [transactionType, setTransactionType] = useState("BUY");
  const [market, setMarket] = useState("10000002_60003760");
  const [appraisalData, setAppraisalData]= useState("");
  const [editMode, setEditMode] = useState(true);
  const [comment, setComment] = useState("");
  const [reprocessData, setReprocessData] = useState(null);
  const [compressData, setCompressData] = useState(null);
  const [reprocessLoading, setReprocessLoading] = useState(false);
  const [compressLoading, setCompressLoading] = useState(false);
  const backend = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { uuid } = useParams();

  // Load stored values when the component mounts
  useEffect(() => {
    if (typeof window === "undefined") return;
    if(!editMode) return;
    setMarket(localStorage.getItem("marketRegion") || market);
    setPricePercentage(parseFloat(localStorage.getItem("pricePercentage")) || pricePercentage);
    setTransactionType(localStorage.getItem("transactionType") || transactionType);
    setComment(localStorage.getItem("appraisalComment") || comment);
    setSystem(localStorage.getItem("system") || system);
    
  }, []);

  // Fetch appraisal data if uuid exists
  useEffect(() => {
    if (!uuid || loadedApp){ 
      setEditMode(true);
      return;
    }
    const fetchAppraisal = async () => {
      try {
        const response = await axios.get(`${backend}appraisal/${uuid}`);
        if (response.status === 200) {
          setEditMode(false);
          setAppraisal(response.data);
          setMarket(response.data.market);
          setPricePercentage(response.data.pricePercentage);
          setComment(response.data.comment);
          setTransactionType(response.data.transactionType);
          setAppraisalData(response.data.appraisalResult.appraisals.filter(app => app != null).map(app=> app.item + "  " + app.quantity).join("\n"));
          setEditMode(false);
          setLoadedApp(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching appraisal:", error);
        setErrorMessage("Could not load appraisal — it may have expired or the server is unavailable.");
        setIsLoading(false);
      }
    };

    fetchAppraisal();
  }, [uuid, loadedApp]);

  // Fetch stations & systems on first load
  useEffect(() => {
    if (!onStart) return;

    const fetchStations = async () => {
      try {
        const response = await axios.get(`${backend}stations`);
        if (response.status === 200) {
          setStations(response.data);
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    const fetchSystems = async () => {
      try {
        const response = await axios.get(`${backend}systems`);
        if (response.status === 200) {
          setOptionsSys(response.data.map((sys) => sys.systemName));
        }
      } catch (error) {
        console.error("Error fetching systems:", error);
      }
    };

    fetchStations();
    fetchSystems();
    setOnStart(false);
  }, [onStart]);


  // Function to update local storage
  const updateStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  function updateStorageOnSubmit() {
    updateStorage("marketRegion", market);
    updateStorage("pricePercentage", pricePercentage);
    updateStorage("transactionType", transactionType);
    updateStorage("appraisalComment", comment);
    updateStorage("system", system);
  }

  function getMarketName(marketId) {
    const marketMap = {
        "10000002_60003760": "Jita",
        "10000043_60008494": "Amarr", // Fixed spelling
        "10000030_60004588": "Rens",
        "10000032_60011866": "Dodixie",
        "10000042_60005686": "Hek"
    };
    return marketMap[marketId] || "Unknown Market";
  }

  async function loadReprocess(efficiency = 0.875) {
    if (!uuid) return;
    setReprocessLoading(true);
    try {
      const { data } = await axios.get(`${backend}appraisal/${uuid}/reprocess?efficiency=${efficiency}`);
      setReprocessData(data);
    } catch (e) {
      console.error("Reprocess fetch failed", e);
    } finally {
      setReprocessLoading(false);
    }
  }

  async function loadCompress() {
    if (!uuid) return;
    setCompressLoading(true);
    try {
      const { data } = await axios.get(`${backend}appraisal/${uuid}/compress`);
      setCompressData(data);
    } catch (e) {
      console.error("Compress fetch failed", e);
    } finally {
      setCompressLoading(false);
    }
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
    try {
      setIsLoading(true);
      const lines = appraisalData
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");
      const items = [];

      lines.forEach((line) => {
        // Match "Item Name <whitespace> Quantity [optional extra columns]"
        // \s+ allows any number of spaces/tabs (EVE client uses tabs)
        // [\d,]+ handles comma-formatted numbers like 1,000,000
        const match = line.match(/^(.+?)\s+([\d,]+)(?:\s.*)?$/);
        if (match) {
          items.push({
            name: match[1].trim(),
            quantity: parseInt(match[2].replace(/,/g, ""), 10),
          });
        } else {
          // No quantity found — treat whole line as item name, default qty to 1 (like Janice)
          items.push({ name: line.trim(), quantity: 1 });
        }
      });

      if (items.length === 0) throw new Error("No valid items found.");
      if (!market) throw new Error("Market region is required.");

      const { data, status } = await axios.post(`${backend}appraisal`, {
        appraisalRequestEntityList: items,
        regionId: market,
        pricePercentage,
        comment,
        transactionType,
        system,
      });

      if (status !== 200) throw new Error(`Server Error: ${status}`);
      router.push(`/appraisal/${data}`);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    } 
  }

  return (
    <>
  
      <div id="animateddiv">
        <Animated>
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

          {appraisal.appraisalResult && (
            <AppraisalResult
              appraisal={appraisal}
              uuid={uuid}
              handleCopy={handleCopy}
              pricePercentage={pricePercentage}
              getMarketName={getMarketName}
              reprocessData={reprocessData}
              reprocessLoading={reprocessLoading}
              loadReprocess={loadReprocess}
              compressData={compressData}
              compressLoading={compressLoading}
              loadCompress={loadCompress}
            />
          )}

          <AppraisalText calculateAppraisal={calculateAppraisal} isLoading={isLoading} comment={comment} appraisalData={appraisalData} setAppraisalData={setAppraisalData} setComment={setComment} />
        </Animated>
      </div>
    </>
  );
}

export default AppraisalHome;
