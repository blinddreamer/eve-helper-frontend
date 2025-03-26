"use client"
import { useState, useEffect } from "react";
import {api} from "../../utils/axios"
export default function DashboardHome() {
 const [wallet, setWallet] = useState(0); 
     
    useEffect(() => {
       
    
        const fetchWallet = async () => {
          try {
            const response = await api.get("auth/wallet");
            if (response.status === 200) {
                setWallet(response.data);
            }
          } catch (error) {
            console.error("Error fetching wallet data:", error);
          }
        };
        fetchWallet()
      }, [wallet]);
    return (

        <>
        <h1>Your Balance {wallet} ISK</h1>
        </>
    )
}