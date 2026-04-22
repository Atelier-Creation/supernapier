import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { orderApi } from '../../api/orderApi';
import { Loader2, Package, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
                  <button className="px-5 py-2 rounded-xl text-sm font-bold bg-[#1B4332] text-white hover:bg-[#2d5a47] transition-all">
                    Track Order
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

