"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // To get query params
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { verifyPayment } from "@/services/Request";

interface OrderData {
  order_id: string;
  currency: string;
  amount: number;
  bank_status: string;
  method: string;
  bank_trx_id: string;
  invoice_no: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  phone_no: string;
  address: string;
  city: string;
  date_time: string;
  is_verify: number;
}

export default function Verify() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id"); // Get order_id from URL

  const [orderData, setOrderData] = useState<OrderData | null>({
    order_id: "",
    currency: "",
    amount: 0, // Set default value
    bank_status: "",
    method: "",
    bank_trx_id: "",
    invoice_no: "",
    sp_code: "",
    sp_message: "",
    name: "",
    email: "",
    phone_no: "",
    address: "",
    city: "",
    date_time: "",
    is_verify: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchData = async () => {
      const response = await verifyPayment(orderId);
      if (response.success) {
        const data = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        setOrderData(data);
      } else {
        console.error("❌ Failed to verify order:", response.message);
      }
      setLoading(false);
    };

    fetchData();
  }, [orderId]);
  console.log("verify", orderData);
  return loading ? (
    <Skeleton />
  ) : orderData ? (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Verification</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details */}
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Order ID:</dt>
              <dd>{orderData?.invoice_no}</dd>
              <dt className="font-semibold">Amount:</dt>
              <dd>
                {orderData?.currency}{" "}
                {orderData?.amount ? orderData.amount.toFixed(2) : "0.00"}
              </dd>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <Badge
                  variant={
                    orderData?.bank_status === "Success"
                      ? "default"
                      : "destructive"
                  }
                >
                  {orderData?.bank_status}
                </Badge>
              </dd>
              <dt className="font-semibold">Date:</dt>
              <dd>{new Date(orderData?.date_time)?.toLocaleString()}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Method:</dt>
              <dd>{orderData?.method}</dd>
              <dt className="font-semibold">Transaction ID:</dt>
              <dd>{orderData?.bank_trx_id}</dd>
              <dt className="font-semibold">Invoice No:</dt>
              <dd>{orderData?.invoice_no}</dd>
              <dt className="font-semibold">SP Code:</dt>
              <dd>{orderData?.sp_code}</dd>
              <dt className="font-semibold">SP Message:</dt>
              <dd>{orderData?.sp_message}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-2">
              <dt className="font-semibold">Name:</dt>
              <dd>{orderData?.name}</dd>
              <dt className="font-semibold">Email:</dt>
              <dd>{orderData?.email}</dd>
              <dt className="font-semibold">Phone:</dt>
              <dd>{orderData?.phone_no}</dd>
              <dt className="font-semibold">Address:</dt>
              <dd>{orderData?.address}</dd>
              <dt className="font-semibold">City:</dt>
              <dd>{orderData?.city}</dd>
            </dl>
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card>
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {orderData?.is_verify === 1 ? (
                <>
                  <CheckCircle className="text-green-500" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-yellow-500" />
                  <span>Not Verified</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/tenant/request/request-status">
              <Button className="w-full">View Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  ) : (
    <div className="text-center text-red-500">❌ Order not found.</div>
  );
}
