import { NextResponse } from "next/server";
export async function POST(request){
 try{
  const {orderId,amount,customerName,customerEmail,customerPhone}=await request.json();
  if(!orderId||!amount||!customerName||!customerEmail||!customerPhone)return NextResponse.json({error:"Missing checkout details."},{status:400});
  if(!process.env.CASHFREE_APP_ID||!process.env.CASHFREE_SECRET_KEY)return NextResponse.json({error:"Cashfree sandbox credentials are not configured on the hosting project."},{status:503});
  const response=await fetch("https://sandbox.cashfree.com/pg/orders",{method:"POST",headers:{"Content-Type":"application/json","x-client-id":process.env.CASHFREE_APP_ID,"x-client-secret":process.env.CASHFREE_SECRET_KEY,"x-api-version":"2022-09-01"},body:JSON.stringify({order_id:orderId,order_amount:Number(amount),order_currency:"INR",customer_details:{customer_id:"cust_"+String(customerPhone).replace(/\D/g,""),customer_name:customerName,customer_email:customerEmail,customer_phone:String(customerPhone).replace(/\D/g,"").slice(-10)}})});
  const data=await response.json();
  if(!response.ok)return NextResponse.json({error:data.message||"Cashfree could not create the order.",details:data},{status:response.status});
  return NextResponse.json(data);
 }catch(error){return NextResponse.json({error:error.message||"Unable to create order."},{status:500});}
}
