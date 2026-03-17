import React, { useState } from "react";
import { CreditCard } from "lucide-react";

const PaymentMethods = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "4716 9627 1635 8047",
    expiryDate: "02/30",
    cvv: "000",
    saveCard: true,
  });

  const paymentOptions = [
    {
      id: "paypal",
      name: "Paypal",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
      action: "Link Account",
      linked: false,
    },
    {
      id: "visa",
      name: "Visa",
      last4: "8047",
      logo: "https://cdn-icons-png.freepik.com/256/5968/5968299.png?uid=R175611833&ga=GA1.1.1276842385.1760516584&semt=ais_white_label",
      action: "Delete",
      linked: true,
    },
    {
      id: "gpay",
      name: "Google Pay",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Pay_Logo_%282020%29.svg",
      action: "Link Account",
      linked: false,
    },
  ];

  return (
    <div>
      {/* Linked Accounts */}
      <div className="space-y-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between p-4 border border-slate-200 rounded-2xl"
          >
            <div className="flex items-center gap-4">
              <img
                src={option.logo}
                alt={option.name}
                className="h-6 w-12 object-contain"
              />

              {option.last4 ? (
                <span className="text-sm font-semibold text-slate-700">
                  **** **** **** {option.last4}
                </span>
              ) : (
                <span className="text-sm font-semibold text-slate-700">
                  {option.name}
                </span>
              )}
            </div>

            <button
              className={`text-sm font-semibold ${
                option.action === "Delete"
                  ? "text-red-500"
                  : "text-emerald-700"
              }`}
            >
              {option.action}
            </button>
          </div>
        ))}
      </div>

      {/* Add Card Section */}
      <div className="border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-emerald-700" />
          <span className="text-lg font-semibold">
            Add New Credit/Debit Card
          </span>
        </div>

        <form className="space-y-6">
          <div>
            <label className="text-sm font-semibold">
              Card Holder Name *
            </label>
            <input
              type="text"
              placeholder="Ex. John Doe"
              className="w-full p-3 border border-slate-200 rounded-2xl"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Card Number *</label>
            <input
              type="text"
              value={formData.cardNumber}
              className="w-full p-3 border border-slate-200 rounded-2xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold">Expiry Date *</label>
              <input
                type="text"
                value={formData.expiryDate}
                className="w-full p-3 border border-slate-200 rounded-2xl"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">CVV *</label>
              <input
                type="text"
                value={formData.cvv}
                className="w-full p-3 border border-slate-200 rounded-2xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={formData.saveCard}
              onChange={() =>
                setFormData({ ...formData, saveCard: !formData.saveCard })
              }
              className="w-5 h-5 accent-emerald-700"
              id="save-card"
            />

            <label
              htmlFor="save-card"
              className="text-sm font-semibold text-slate-700"
            >
              Save card for future payments
            </label>
          </div>

          <button
            type="submit"
            className="bg-emerald-700 text-white px-8 py-3 rounded-full"
          >
            Add Card
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethods;