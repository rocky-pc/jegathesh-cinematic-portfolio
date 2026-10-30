import { NextResponse } from "next/server";
export async function POST(request){
 try{
  const {orderId}=await request.json();
  if(!orderId)return NextResponse.json({success:false,error:"Missing order ID."},{status:400});
  if(!process.env.CASHFREE_APP_ID||!process.env.CASHFREE_SECRET_KEY)return NextResponse.json({success:false,error:"Cashfree credentials are not configured."},{status:503});
  const response=await fetch("https://sandbox.cashfree.com/pg/orders/"+encodeURIComponent(orderId),{headers:{"x-client-id":process.env.CASHFREE_APP_ID,"x-client-secret":process.env.CASHFREE_SECRET_KEY,"x-api-version":"2022-09-01"},cache:"no-store"});
  const data=await response.json();
  if(!response.ok)return NextResponse.json({success:false,error:"Could not verify payment.",details:data},{status:response.status});
  return NextResponse.json({success:data.order_status==="PAID",message:data.order_status==="PAID"?"Paid":"Pending",data});
 }catch(error){return NextResponse.json({success:false,error:error.message||"Payment verification failed."},{status:500});}
}
