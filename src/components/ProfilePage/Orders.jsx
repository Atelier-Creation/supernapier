import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { orderApi } from '../../api/orderApi';
import { Loader2, Package, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const getTrackingSteps = (status) => {
  const isCancelled = status?.toLowerCase() === 'cancelled';
  
  if (isCancelled) {
    return [
      { label: 'Order Placed', completed: true },
      { label: 'Cancelled', completed: true, error: true }
    ];
  }

  const s = status?.toLowerCase();
  
  // Placed is always true
  const placed = true;
  
  // Processing is true for Processing, reached_pickup, picked_up, shipped, delivered
  const processing = ['processing', 'reached_pickup', 'picked_up', 'shipped', 'delivered'].includes(s);
  
  // Shipped is true for shipped, delivered
  const shipped = ['shipped', 'delivered'].includes(s);
  
  // Delivered is true for delivered
  const delivered = s === 'delivered';

  return [
    { label: 'Order Placed', completed: placed, active: s === 'pending' || s === 'claimed' },
    { label: 'Processing', completed: processing, active: ['processing', 'reached_pickup', 'picked_up'].includes(s) },
    { label: 'Shipped', completed: shipped, active: s === 'shipped' },
    { label: 'Delivered', completed: delivered, active: s === 'delivered' }
  ];
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?._id) return;
      try {
        const res = await orderApi.getMyOrders(user._id);
        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        toast.error("Could not load your orders");
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-emerald-600" />
        <p className="font-medium">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Orders ({orders.length})
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="whitespace-nowrap">Sort by :</span>
          <select className="bg-white border rounded-md px-4 py-1 outline-none">
            <option>Recent</option>
          </select>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No orders yet</h3>
            <p className="text-gray-500 mb-6">You haven't placed any orders with us yet.</p>
            <button 
                onClick={() => window.location.href = '/'}
                className="bg-emerald-700 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-800 transition-all"
            >
                Start Shopping
            </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
              {/* Order Header */}
              <div className="bg-[#FFC145] p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-orange-800/60 font-medium lowercase">Order ID</p>
                  <p className="text-sm font-bold text-gray-800 uppercase">{order.orderId}</p>
                </div>
                <div>
                  <p className="text-xs text-orange-800/60 font-medium">Total Amount</p>
                  <p className="text-sm font-bold text-gray-800">₹{order.finalAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-orange-800/60 font-medium">Payment Method</p>
                  <p className="text-sm font-bold text-gray-800">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-orange-800/60 font-medium text-right">Placed On</p>
                  <p className="text-sm font-bold text-gray-800 text-right">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 space-y-4">
                {order.products.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={(item.productId?.images && item.productId.images[0]) || '/placeholder.png'}
                        alt={item.productId?.name?.en || item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = '/placeholder.png'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 text-sm truncate uppercase">
                        {item.productId?.name?.en || item.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                         {item.weight}{item.unit} | {item.quantity} Qty. | ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status */}
              <div className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-3 border-t">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border w-fit tracking-wider ${
                    order.status?.toLowerCase() === "pending" || order.status?.toLowerCase() === "claimed"
                      ? "bg-yellow-50 text-yellow-600 border-yellow-100"
                      : order.status?.toLowerCase() === "processing"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : order.status?.toLowerCase() === "delivered"
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : order.status?.toLowerCase() === "shipped"
                      ? "bg-indigo-50 text-indigo-600 border-indigo-100"
                      : "bg-red-50 text-red-600 border-red-100"
                  }`}
                >
                  {order.status?.replace('_', ' ')}
                </span>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                   Payment: 
                   <span className={
                     order.paymentStatus?.toLowerCase() === 'paid' ? 'text-emerald-600' :
                     (order.paymentStatus?.toLowerCase() === 'awaiting_verification' || order.paymentStatus?.toLowerCase() === 'pending') ? 'text-orange-500' :
                     'text-red-500'
                   }>
                     {order.paymentStatus?.replace('_', ' ')}
                   </span>
                </p>
              </div>

              {/* Actions */}
              <div className="px-6 pb-6 pt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActiveTrackingOrderId(activeTrackingOrderId === order._id ? null : order._id)}
                    className="px-5 py-2 rounded-xl text-sm font-bold bg-[#1B4332] text-white hover:bg-[#2d5a47] transition-all"
                  >
                    {activeTrackingOrderId === order._id ? 'Hide Tracking' : 'Track Order'}
                  </button>
                  <button className="px-5 py-2 rounded-xl text-sm font-bold bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all">
                    Invoice
                  </button>
                </div>
                {order.status === 'pending' && (
                  <button className="text-sm font-bold text-red-500 hover:underline">
                    Cancel Order
                  </button>
                )}
              </div>

              {/* Tracking Stepper */}
              {activeTrackingOrderId === order._id && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-6 transition-all duration-300">
                  <h4 className="text-sm font-bold text-gray-800 mb-4">Order Tracking Status</h4>
                  
                  {order.status?.toLowerCase() === 'cancelled' ? (
                    <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                      <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></span>
                      <p className="text-xs font-semibold">This order has been cancelled.</p>
                    </div>
                  ) : (
                    <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mt-4 px-2">
                      {/* Connection lines for desktop view */}
                      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 hidden md:block z-0" />
                      
                      {/* Active tracking highlight line */}
                      <div 
                        className="absolute top-4 left-0 h-1 bg-emerald-600 hidden md:block transition-all duration-500 z-0"
                        style={{ 
                          width: 
                            order.status?.toLowerCase() === 'delivered' ? '100%' :
                            order.status?.toLowerCase() === 'shipped' ? '66%' :
                            ['processing', 'reached_pickup', 'picked_up'].includes(order.status?.toLowerCase()) ? '33%' : '0%'
                        }} 
                      />
                      
                      {getTrackingSteps(order.status).map((step, idx) => (
                        <div key={idx} className="flex md:flex-col items-center gap-3 md:gap-2 z-10 w-full md:w-auto relative">
                          {/* Step Circle */}
                          <div 
                            className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                              step.completed 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'bg-white border-gray-200 text-gray-400'
                            } ${step.active ? 'ring-4 ring-emerald-100' : ''}`}
                          >
                            {step.completed ? (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <span className="text-xs font-bold">{idx + 1}</span>
                            )}
                          </div>
                          
                          {/* Label and description */}
                          <div className="text-left md:text-center">
                            <p className={`text-xs font-bold ${step.completed ? 'text-gray-800' : 'text-gray-400'}`}>
                              {step.label}
                            </p>
                            {step.active && (
                              <p className="text-[10px] text-emerald-600 font-semibold animate-pulse">
                                Current Stage
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

