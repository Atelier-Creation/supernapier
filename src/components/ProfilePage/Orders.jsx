import React from 'react';

const Orders = () => {
const orders = [
  {
    id: "#SN1254FD",
    total: "₹1,280.00",
    method: "UPI",
    dateLabel: "Estimated Delivery Date",
    dateValue: "18 March 2026",
    status: "Accepted",
    statusText: "Your Super Napier order has been accepted",
    items: [
      {
        name: "Super Napier Grass Cuttings Pack",
        color: "Fresh Green",
        qty: 20,
        img: "https://img.freepik.com/free-photo/green-grass_1417-1672.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80"
      },
      {
        name: "Super Napier Rooted Saplings",
        color: "Natural Green",
        qty: 10,
        img: "https://img.freepik.com/free-photo/flat-lay-salad-s-root_23-2149198283.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80"
      },
      {
        name: "Organic Fodder Booster Fertilizer",
        color: "Organic Mix",
        qty: 2,
        img: "https://img.freepik.com/free-photo/closeup-picture-gardener-s-hands-planting-plant_1150-26607.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80"
      }
    ],
    actions: ["Track Order", "Invoice", "Cancel Order"]
  },
  {
    id: "#SN7412DF",
    total: "₹450.00",
    method: "Cash on Delivery",
    dateLabel: "Delivered Date",
    dateValue: "02 March 2026",
    status: "Delivered",
    statusText: "Your Super Napier order has been delivered",
    items: [
      {
        name: "Super Napier Grass Cuttings",
        color: "Fresh Green",
        qty: 15,
        img: "https://img.freepik.com/free-photo/blades-grass_1259-86.jpg?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_hybrid&w=740&q=80"
      }
    ],
    actions: ["Add Review", "Invoice"]
  }
];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800 w-full">Orders ({orders.length})</h1>
        <div className="flex items-center justify-end gap-2 text-sm text-gray-500 w-full">
          <span className='w-fit whitespace-nowrap'>Sort by :</span>
          <select className="bg-white border rounded-md px-4 py-1 outline-none w-1/2">
            <option>All</option>
          </select>
        </div>
      </div>

      {/* Order Cards */}
      <div className="space-y-8">
        {orders.map((order, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
            
            {/* Order Header Tray */}
            <div className="bg-[#FFC145] p-5 grid grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-orange-800/60 font-medium">Order ID</p>
                <p className="text-sm font-bold text-gray-800">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-orange-800/60 font-medium">Total Payment</p>
                <p className="text-sm font-bold text-gray-800">{order.total}</p>
              </div>
              <div>
                <p className="text-xs text-orange-800/60 font-medium">Payment Method</p>
                <p className="text-sm font-bold text-gray-800">{order.method}</p>
              </div>
              <div>
                <p className="text-xs text-orange-800/60 font-medium">{order.dateLabel}</p>
                <p className="text-sm font-bold text-gray-800">{order.dateValue}</p>
              </div>
            </div>

            {/* Items List */}
            <div className="p-4 space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src={item.img} alt={item.name} className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400">Color : {item.color} | {item.qty} Qty.</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Section */}
            <div className="px-6 py-4 flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                order.status === 'Accepted' 
                ? 'bg-orange-50 text-orange-500 border-orange-200' 
                : 'bg-emerald-50 text-emerald-500 border-emerald-200'
              }`}>
                {order.status}
              </span>
              <p className="text-sm font-semibold text-gray-600">{order.statusText}</p>
            </div>

            {/* Action Buttons */}
            <div className="px-6 pb-6 pt-2 flex items-center justify-between">
              <div className="flex gap-3">
                {order.actions.map((action) => (
                  action !== "Cancel Order" && (
                    <button 
                      key={action}
                      className={`px-6 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        action === "Track Order" || action === "Add Review"
                        ? "bg-[#1B4332] text-white border-[#1B4332] hover:bg-[#2d5a47]"
                        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {action}
                    </button>
                  )
                ))}
              </div>
              {order.actions.includes("Cancel Order") && (
                <button className="text-sm font-bold text-red-500 hover:underline">
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;