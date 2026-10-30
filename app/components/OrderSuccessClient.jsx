"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { CheckCircle2, XCircle, LoaderCircle, ArrowLeft } from "lucide-react";
export default function OrderSuccessClient(){
 const [status,setStatus]=useState("verifying"),[message,setMessage]=useState("Confirming your payment with the payment provider…");
 useEffect(()=>{
  let cancelled=false;
  async function verify(){
   const params=new URLSearchParams(location.search),orderId=params.get("order_id");
   if(!orderId||params.get("verify")!=="true"){setStatus("failed");setMessage("We could not find a valid order reference.");return;}
   const raw=localStorage.getItem("orderData");
   if(!raw){setStatus("failed");setMessage("Your order details are not available in this browser. Please contact support before retrying.");return;}
   let order;try{order=JSON.parse(raw);}catch{setStatus("failed");setMessage("The saved order details could not be read.");return;}
   if(order.orderId!==orderId){setStatus("failed");setMessage("The order reference does not match the saved checkout.");return;}
   try{
    const res=await fetch("/api/verify-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderId}),cache:"no-store"});
    const data=await res.json();if(!res.ok||!data.success)throw new Error(data.error||"Payment is not marked as paid.");
    if(cancelled)return;
    setStatus("success");setMessage("Your payment has been verified. Thank you for your order.");
    let unsubscribe=()=>{};
    unsubscribe=onAuthStateChanged(auth,async user=>{
     unsubscribe();
     if(user&&!localStorage.getItem("savedOrder:"+orderId)){
      try{await addDoc(collection(db,"orders"),{userId:user.uid,orderId,cart:order.cart,address:order.address,total:order.total,timestamp:new Date(),status:"confirmed"});localStorage.setItem("savedOrder:"+orderId,"true");}
      catch(e){console.error("Order history save failed",e);}
     }
     localStorage.removeItem("orderData");
    });
   }catch(e){if(!cancelled){setStatus("failed");setMessage(e.message||"Payment verification failed.");}}
  }
  verify();return()=>{cancelled=true;};
 },[]);
 return <main className="commerce-page success-page"><a className="back-link" href="/"><ArrowLeft size={16}/> Back to portfolio</a><section className="success-card">{status==="verifying"?<LoaderCircle className="status-icon spinning"/>:status==="success"?<CheckCircle2 className="status-icon success-icon"/>:<XCircle className="status-icon failed-icon"/>}<span className="kicker">ORDER STATUS</span><h1>{status==="verifying"?"Just a moment…":status==="success"?"Order confirmed.":"Could not confirm."}</h1><p>{message}</p>{status==="success"?<><p className="success-detail">Your order reference: <b>{typeof window!=="undefined"?new URLSearchParams(window.location.search).get("order_id"):""}</b></p><a className="commerce-button" href="/shop">Continue shopping</a><a className="text-link" href="/orders">View my orders ↗</a></>:status==="failed"?<><a className="commerce-button" href="/shop">Return to shop</a><a className="text-link" href="mailto:sjega82@gmail.com">Contact support</a></>:null}</section></main>;
}
