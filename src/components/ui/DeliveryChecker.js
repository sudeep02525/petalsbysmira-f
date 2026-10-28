"use client";

import { useState, useEffect } from "react";
import { MapPin, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import axiosInstance from "../../services/axiosInstance";
import { useAuthStore } from "../../store/authStore";
import { Button } from "./Button";
import { Input } from "./Input";

export default function DeliveryChecker({ 
  onStatusChange,
  showCodStatus = true,
  className = "" 
}) {
  const { isAuthenticated, user } = useAuthStore();
  
  const [pincode, setPincode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null); // { deliverable, prepaidAvailable, codAvailable, message }
  const [hasInitialized, setHasInitialized] = useState(false);

  const checkServiceability = async (codeToCheck = pincode) => {
    if (!codeToCheck || codeToCheck.length !== 6 || !/^\d+$/.test(codeToCheck)) {
      const res = { success: false, message: "Please enter a valid 6-digit pincode." };
      setResult(res);
      if (onStatusChange) onStatusChange(res);
      return;
    }

    setIsLoading(true);
    setResult(null);
    try {
      // By default we check COD, which gives us both prepaid and cod status from our backend logic
      const { data } = await axiosInstance.post("/orders/check-pincode", {
        pincode: codeToCheck,
        paymentMethod: "cod"
      });
      
      setResult(data);
      if (onStatusChange) onStatusChange(data);
    } catch (error) {
      const fallback = { 
        success: false, 
        message: "We couldn't check delivery availability right now. Please try again." 
      };
      setResult(fallback);
      if (onStatusChange) onStatusChange(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize with default address if available
  useEffect(() => {
    if (!isAuthenticated || hasInitialized) return;

    let isMounted = true;
    const fetchDefaultAddress = async () => {
      try {
        const { data } = await axiosInstance.get("/users/addresses");
        const defaultAddr = data.addresses?.find((a) => a.isDefault);
        if (defaultAddr && defaultAddr.pincode && isMounted) {
          setPincode(defaultAddr.pincode);
          checkServiceability(defaultAddr.pincode);
        }
      } catch (error) {
        console.error("Failed to fetch default address for delivery check");
      } finally {
        if (isMounted) setHasInitialized(true);
      }
    };
    fetchDefaultAddress();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, hasInitialized]);

  const handleCheck = (e) => {
    e.preventDefault();
    checkServiceability(pincode);
  };

  return (
    <div className={`border border-gray-200 rounded-lg p-4 bg-gray-50 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-gray-500" />
        <h3 className="font-medium text-gray-900">Check delivery availability</h3>
      </div>
      
      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="flex-1">
          <Input 
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit pincode"
            maxLength={6}
            disabled={isLoading}
            className="bg-white"
          />
        </div>
        <Button 
          type="submit" 
          variant="outline" 
          disabled={isLoading || pincode.length !== 6}
          className="bg-white hover:bg-gray-50 min-w-[80px]"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Check"}
        </Button>
      </form>

      {result && (
        <div className="mt-4 pt-3 border-t border-gray-200 space-y-2 text-sm">
          {result.deliverable ? (
            <div className="flex items-start gap-2 text-green-700">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Delivery available to {result.pincode || pincode}</p>
                {showCodStatus && (
                  <p className={`text-xs mt-1 ${result.codAvailable ? "text-green-600" : "text-red-600"}`}>
                    {result.codAvailable ? "✓ Cash on Delivery is available" : "✕ Cash on Delivery is not available"}
                  </p>
                )}
              </div>
            </div>
          ) : result.success === false ? (
            <div className="flex items-start gap-2 text-red-600">
              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{result.message}</p>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-red-600">
              <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>Delivery is currently unavailable for this location.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
