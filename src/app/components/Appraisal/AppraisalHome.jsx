"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head"; // For setting OG metadata
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
  const [transactionType, setTransactionType] = useState("buy");
  const [market, setMarket] = useState("10000002_60003760");
  const [editMode, setEditMode] = useState(true);
  const [comment, setComment] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const backend = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { uuid } = useParams();

  // Load stored values when the component mounts
  useEffect(() => {
    if (typeof window === "undefined") return;

    setMarket(localStorage.getItem("marketRegion") || market);
    setPricePercentage(parseFloat(localStorage.getItem("pricePercentage")) || pricePercentage);
    setTransactionType(localStorage.getItem("transactionType") || transactionType);
    setComment(localStorage.getItem("appraisalComment") || comment);
    setSystem(localStorage.getItem("system") || system);
    
    setHydrated(true);
  }, []);

  // Fetch appraisal data if uuid exists
  useEffect(() => {
    if (!uuid || loadedApp) return;

    const fetchAppraisal = async () => {
      try {
        const response = await axios.get(`${backend}appraisal/${uuid}`);
        if (response.status === 200) {
          setAppraisal(response.data);
          setMarket(response.data.market);
          setPricePercentage(response.data.pricePercentage);
          setComment(response.data.comment);
          setTransactionType(response.data.transactionType);
          setEditMode(false);
          setLoadedApp(true);
        }
      } catch (error) {
        console.error("Error fetching appraisal:", error);
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
      const text = document.getElementById("appraisalText").value || "";
      const lines = text.split("\n").map((line) => line.trim()).filter((line) => line !== "");
      const items = [];

      lines.forEach((line, index) => {
        const match = line.match(/^(.+?)\s{1,3}(\d+)(?:\s.*)?$/);
        if (match) {
          items.push({ name: match[1].trim(), quantity: parseInt(match[2], 10) });
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
    } finally {
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
            <AppraisalResult appraisal={appraisal} uuid={uuid} handleCopy={handleCopy} pricePercentage={pricePercentage} />
          )}

          <AppraisalText calculateAppraisal={calculateAppraisal} comment={comment} setComment={setComment} />
        </Animated>
      </div>
    </>
  );
}

export default AppraisalHome;
