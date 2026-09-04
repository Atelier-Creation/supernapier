import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, QrCode, Share2, Send, Globe } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';

/**
 * Resolves the public share bridge URL for a product.
 */
export const getProductShareUrl = (productId) => {
  if (!productId) return window.location.href;
  const configuredBase = import.meta.env.VITE_SHARE_BASE_URL;
  if (configuredBase) {
    return `${configuredBase.replace(/\/$/, '')}/share/product/${productId}`;
  }
  const apiUrl = import.meta.env.VITE_API_URL || '';
  if (apiUrl.startsWith('http')) {
    try {
      const parsed = new URL(apiUrl);
      return `${parsed.origin}/share/product/${productId}`;
    } catch (err) {
      // fallback
    }
  }
  return `${window.location.origin}/share/product/${productId}`;
};

export default function ShareModal({ isOpen, onClose, product, onShare }) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('channels'); // 'channels' | 'qrcode'

  if (!isOpen || !product) return null;

  const productId = product._id || product.id;
  const productName = product.name?.en || product.name || 'Super Napier Product';
  const productImage = product.images?.[0] || product.image || '/placeholder.png';
  const categoryName = product.category?.name?.en || product.category?.name || product.category || 'Fodder Seeds';

  // Price resolution
  const baseOption = product.weightOptions?.[0] || {};
  const p1 = Number(baseOption.price || product.price || 0);
  const p2 = Number(baseOption.discountPrice || 0);
  const currentPrice = p2 > 0 ? Math.min(p1, p2) : p1;
  const weight = baseOption.weight || product.weight || '1';
  const unit = baseOption.unit || product.unit || 'kg';

  const shareUrl = getProductShareUrl(productId);

  // Dynamic WhatsApp copy utilizing real product specifications
  const lines = [
    `🌱 Check out *${productName}* on SuperNapier!`,
    '',
    `💰 Price: ₹${currentPrice} (${weight}${unit})`,
  ];
  if (product.germinationRate) {
    lines.push(`🌾 Germination Rate: ${product.germinationRate}`);
  }
  if (product.yieldPotential) {
    lines.push(`📈 Yield Potential: ${product.yieldPotential}`);
  }
  if (product.season) {
    lines.push(`☀️ Season: ${product.season}`);
  }
  lines.push('', '🔗 ' + shareUrl);

  const whatsappMessage = lines.join('\n');

  // Analytics event dispatcher
  const handleTrackShare = (platform) => {
    try {
      window.dispatchEvent(
        new CustomEvent('product_share', {
          detail: { productId, platform, url: shareUrl }
        })
      );
      if (typeof onShare === 'function') {
        onShare({ event: 'product_share', productId, platform });
      }
    } catch (e) {
      console.warn('Share analytics dispatch error:', e);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      handleTrackShare('copy');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link.');
    }
  };

  const handleWhatsAppShare = () => {
    handleTrackShare('whatsapp');
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on SuperNapier!`,
          url: shareUrl,
        });
        handleTrackShare('native');
      } catch (err) {
        if (err.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleTelegramShare = () => {
    handleTrackShare('telegram');
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(productName)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebookShare = () => {
    handleTrackShare('facebook');
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitterShare = () => {
    handleTrackShare('twitter');
    const tweetText = `Check out ${productName} on SuperNapier! ₹${currentPrice} for ${weight}${unit}`;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(tweetText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isNativeShareSupported = typeof navigator !== 'undefined' && !!navigator.share;

  const modalContent = (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#F1F8E9] flex items-center justify-center text-[#1B5E20]">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[#1B5E20]">Share Product</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Snippet Preview */}
          <div className="p-5 bg-gradient-to-b from-[#FAFCF8] to-white border-b border-gray-100">
            <div className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F1F8E9] flex-shrink-0">
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#1B5E20] uppercase tracking-wider bg-[#F1F8E9] px-2 py-0.5 rounded-full">
                  {categoryName}
                </span>
                <h4 className="font-bold text-gray-900 text-sm truncate mt-1">
                  {productName}
                </h4>
                <p className="text-xs text-[#5D4037] font-semibold mt-0.5">
                  ₹{currentPrice.toFixed(2)}{' '}
                  <span className="text-gray-400 font-normal">/ {weight}{unit}</span>
                </p>
              </div>
            </div>

            {/* Tab switchers: Channels vs QR Code */}
            <div className="flex items-center gap-2 mt-4 bg-gray-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('channels')}
                className={`flex-1 py-1.5 rounded-lg transition-all text-center ${
                  activeTab === 'channels'
                    ? 'bg-white text-[#1B5E20] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Social Channels
              </button>
              <button
                onClick={() => setActiveTab('qrcode')}
                className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'qrcode'
                    ? 'bg-white text-[#1B5E20] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                QR Code
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5">
            {activeTab === 'channels' ? (
              <div className="space-y-3.5">
                {/* WhatsApp Primary Button */}
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                  <span>Share on WhatsApp</span>
                </button>

                {/* Native Device Share (if supported) */}
                {isNativeShareSupported && (
                  <button
                    onClick={handleNativeShare}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-[#1B5E20] hover:bg-[#154a19] text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Globe className="w-4 h-4" />
                    <span>More Share Options (Device)</span>
                  </button>
                )}

                {/* Secondary Social Channels */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <button
                    onClick={handleTelegramShare}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors border border-sky-100 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span className="text-[11px] font-bold">Telegram</span>
                  </button>

                  <button
                    onClick={handleFacebookShare}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors border border-blue-100 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-[11px] font-bold">Facebook</span>
                  </button>

                  <button
                    onClick={handleTwitterShare}
                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors border border-gray-200 cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span className="text-[11px] font-bold">X / Twitter</span>
                  </button>
                </div>

                {/* Copy Link Input Bar */}
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                    Share Link
                  </p>
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-1.5">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 bg-transparent px-2 text-xs text-gray-600 outline-none truncate"
                    />
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 bg-[#1B5E20] hover:bg-[#154a19] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* QR Code View */
              <div className="flex flex-col items-center justify-center text-center py-2">
                <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#1B5E20]/30 shadow-inner mb-3">
                  <QRCodeSVG
                    value={shareUrl}
                    size={170}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <p className="text-xs text-gray-600 max-w-xs mb-3">
                  Scan this QR code with any smartphone camera or WhatsApp scanner to instantly open this product.
                </p>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F1F8E9] text-[#1B5E20] font-semibold text-xs hover:bg-[#e4f2d8] transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Copy Direct Link'}</span>
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
