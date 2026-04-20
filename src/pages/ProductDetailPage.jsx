import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { productApi } from '../api/productApi';

import ProductHero from '../components/product/ProductHero';
import ProductTabs from '../components/product/ProductTabs';
import SuggestedProducts from '../components/product/SuggestedProducts';
import HowToUseSection from '../components/product/HowToUseSection';
import StatisticalHighlights from '../components/StatisticalHighlights';

import SEO from '../components/SEO';

export default function ProductDetailPage({ addToCart }) {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [suggestedProducts, setSuggestedProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await productApi.getProductById(id);
                setProduct(response.data.data);
                
                // Fetch suggestion potentially from same category
                const suggestionsResponse = await productApi.getAllProducts();
                const filtered = suggestionsResponse.data.data
                    .filter(p => p._id !== id)
                    .slice(0, 4);
                setSuggestedProducts(filtered);
            } catch (err) {
                console.error('Error fetching product details:', err);
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#1B5E20]" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold text-[#1B5E20] mb-4">{error || 'Product not found'}</h2>
                <Link to="/products" className="bg-[#1B5E20] text-white px-6 py-2 rounded-xl">Back to Products</Link>
            </div>
        );
    }

    const localizedName = product.name?.en || 'Product';
    const localizedDesc = product.description?.en || '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 bg-[#FAFCF8]"
        >
            <SEO 
                title={`${localizedName} | Super Napier`} 
                description={localizedDesc} 
                image={product.images?.[0] || '/placeholder.png'}
                url={window.location.href}
            />
            <div className="max-w-7xl mx-auto px-4 mt-15 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    to="/products"
                    className="inline-flex items-center space-x-2 text-[#1B5E20] font-medium hover:text-[#5D4037] mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Products</span>
                </Link>

                {/* ── Product Hero ── */}
                <ProductHero product={product} addToCart={addToCart} />

                {/* ── Tabbed Info ── */}
                <ProductTabs product={product} />
            </div>
            <StatisticalHighlights/>
            {/* ── How to Use Section ── */}
            <HowToUseSection />

            {/* ── Suggested Products ── */}
            <SuggestedProducts products={suggestedProducts} addToCart={addToCart} />
        </motion.div>
    );
}
