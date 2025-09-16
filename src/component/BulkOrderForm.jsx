import React, { useState } from "react";
import { UserRound, Mail, Phone, Calendar, Upload, ChevronDown, Edit, Trash2, Plus } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";

export default function BulkOrderForm() {
    const [tab, setTab] = useSt
    
    
    
    ate("business");
    const [products, setProducts] = useState([]);
    
    const [formData, setFormData] = useState({
        name: "Harsh Shah",
        companyName: "Globex industries pvt.ltd",
        gstNumber: "",
        email: "",
        country: "India",
        state: "Haryana",
        city: "Gurugram",
        address: "Gurugram",
        phone: "(+91) 98456-27890",
        pincode: "122204"
    });

    const [productData, setProductData] = useState({
        stoneCategory: "Travertine",
        stoneName: "China white travertine",
        stoneFinish: "",
        thickness: "",
        unit: "",
        value: "",
        height: "",
        width: "",
        deliveryExpected: "",
        message: "",
        image: null
    });

    const [boqFiles, setBoqFiles] = useState([]);
    const [installationImages, setInstallationImages] = useState([]);
    const [patternDesignFiles, setPatternDesignFiles] = useState([]);

    const [installationType, setInstallationType] = useState("pattern");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProductChange = (e) => {
        const { name, value, files } = e.target;
        
        if (files) {
            setProductData(prev => ({
                ...prev,
                [name]: files
            }));
        } else {
            setProductData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileUpload = (e, fileType) => {
        const files = Array.from(e.target.files);
        
        switch (fileType) {
            case 'boq':
                setBoqFiles(prev => [...prev, ...files]);
                break;
            case 'installation':
                setInstallationImages(prev => [...prev, ...files]);
                break;
            case 'pattern':
                setPatternDesignFiles(prev => [...prev, ...files]);
                break;
            default:
                break;
        }
    };

    const addProduct = () => {
        if (!productData.stoneName || !productData.stoneFinish || !productData.thickness || !productData.unit || !productData.value) {
            toast.error("Please fill all required fields");
            return;
        }

        const newProduct = {
            id: Date.now(),
            name: productData.stoneName,
            category: productData.stoneCategory,
            companyName: formData.companyName,
            gstNumber: formData.gstNumber,
            showDetails: false,
            finish: productData.stoneFinish,
            thickness: productData.thickness,
            unit: productData.unit,
            value: `${productData.value} ${productData.unit}`,
            size: productData.height && productData.width ? `W:${productData.width} | H:${productData.height}` : "",
            delivery: productData.deliveryExpected,
            message: productData.message,
            images: productData.image ? Array.from(productData.image) : [],
            boqFile: boqFiles.length > 0 ? boqFiles[boqFiles.length - 1].name : "",
            installationImages: installationImages.length > 0 ? Array.from(installationImages) : []
        };

        setProducts(prev => [...prev, newProduct]);
        setProductData({
            stoneCategory: "Travertine",
            stoneName: "China white travertine",
            stoneFinish: "",
            thickness: "",
            unit: "",
            value: "",
            height: "",
            width: "",
            deliveryExpected: "",
            message: "",
            image: null
        });
        toast.success("Product added successfully!");
    };

    const removeProduct = (id) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    const toggleDetails = (id) => {
        setProducts(prev => prev.map(product => 
            product.id === id ? { ...product, showDetails: !product.showDetails } : product
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Form submitted successfully!");
    };

    const handleClear = () => {
        setFormData({
            name: "Harsh Shah",
            companyName: "Globex industries pvt.ltd",
            gstNumber: "",
            email: "",
            country: "India",
            state: "Haryana",
            city: "Gurugram",
            address: "Gurugram",
            phone: "(+91) 98456-27890",
            pincode: "122204"
        });
        setProductData({
            stoneCategory: "Travertine",
            stoneName: "China white travertine",
            stoneFinish: "",
            thickness: "",
            unit: "",
            value: "",
            height: "",
            width: "",
            deliveryExpected: "",
            message: "",
            image: null
        });
        setProducts([]);
        setBoqFiles([]);
        setInstallationImages([]);
        setPatternDesignFiles([]);
    };

    return (
        <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-16 py-8">
            <Toaster position="top-right" />
            
            <div className="max-w-7xl mx-auto">
                {/* Title Section */}
                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-medium text-gray-900 mb-2">Stonepedia Bulk orders</h1>
                    <p className="text-lg text-gray-500 mb-2">Fill this form to connect with us.</p>
                    <p className="text-sm text-gray-400">We only consider 10,000 to 1,00,000 sqft orders here. More than 1,00,000 buy it from project collaboration.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Panel - Form */}
                    <div className="w-full lg:w-[60%]">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            {/* User Type Tabs */}
                            <div className="flex gap-2 mb-8">
                                <button
                                    onClick={() => setTab("individual")}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        tab === "individual" 
                                            ? "bg-white text-gray-600 border border-gray-300" 
                                            : "bg-[#871B58] text-white"
                                    }`}
                                >
                                    Individual
                                </button>
                                <button
                                    onClick={() => setTab("business")}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        tab === "business" 
                                            ? "bg-white text-gray-600 border border-gray-300" 
                                            : "bg-[#871B58] text-white"
                                    }`}
                                >
                                    Business
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                />
                                                <UserRound className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                                        <select
                                            name="gstNumber"
                                            value={formData.gstNumber}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                        >
                                            <option value="">Choose</option>
                                            <option value="123456789012345">123456789012345</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="Email address"
                                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                                            <input
                                                type="text"
                                                name="country"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                />
                                                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details Section */}
                                <div className="border-t-2 border-dashed border-gray-300 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details (Add multiple Products here)</h3>
                                    
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Stone Category</label>
                                                <select
                                                    name="stoneCategory"
                                                    value={productData.stoneCategory}
                                                    onChange={handleProductChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                >
                                                    <option value="Travertine">Travertine</option>
                                                    <option value="Granite">Granite</option>
                                                    <option value="Marble">Marble</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Stone Name</label>
                                                <input
                                                    type="text"
                                                    name="stoneName"
                                                    value={productData.stoneName}
                                                    onChange={handleProductChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Stone Finish</label>
                                                <select
                                                    name="stoneFinish"
                                                    value={productData.stoneFinish}
                                                    onChange={handleProductChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="Polished">Polished</option>
                                                    <option value="Honed">Honed</option>
                                                    <option value="Tumbled">Tumbled</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Thickness</label>
                                                <select
                                                    name="thickness"
                                                    value={productData.thickness}
                                                    onChange={handleProductChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="8MM">8MM</option>
                                                    <option value="12MM">12MM</option>
                                                    <option value="16MM">16MM</option>
                                                    <option value="20MM">20MM</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Unit</label>
                                                <select
                                                    name="unit"
                                                    value={productData.unit}
                                                    onChange={handleProductChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="sqft">Sqft</option>
                                                    <option value="sqm">Sqm</option>
                                                    <option value="MM">MM</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Enter Value</label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        name="value"
                                                        value={productData.value}
                                                        onChange={handleProductChange}
                                                        placeholder="Type value"
                                                        className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                    />
                                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">sqft</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Size of Stone (optional)</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            name="height"
                                                            placeholder="H"
                                                            value={productData.height}
                                                            onChange={handleProductChange}
                                                            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                        />
                                                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    </div>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            name="width"
                                                            placeholder="W"
                                                            value={productData.width}
                                                            onChange={handleProductChange}
                                                            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                        />
                                                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Expected</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        name="deliveryExpected"
                                                        value={productData.deliveryExpected}
                                                        onChange={handleProductChange}
                                                        placeholder="Enter time"
                                                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                                    />
                                                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                            <textarea
                                                name="message"
                                                value={productData.message}
                                                onChange={handleProductChange}
                                                rows={3}
                                                placeholder="Write your message here"
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#871B58]"
                                            />
                                        </div>

                                        {/* Image/Video Upload */}
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                            <input
                                                type="file"
                                                id="productImageInput"
                                                name="image"
                                                multiple
                                                accept="image/*,video/*"
                                                onChange={handleProductChange}
                                                className="hidden"
                                            />
                                            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm font-medium text-gray-700 mb-1">
                                                {productData.image?.length > 0 
                                                    ? `${productData.image.length} files selected`
                                                    : "Choose a Image/Video or drag & drop it here"
                                                }
                                            </p>
                                            <p className="text-xs text-gray-500 mb-4">JPEG, PNG and MP4 formats upto 50MB</p>
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('productImageInput').click()}
                                                className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                                            >
                                                Browse
                                            </button>
                                        </div>

                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={addProduct}
                                                className="bg-[#871B58] text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
                                            >
                                                Add this product
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* BOQ File Upload */}
                                <div>
                                    <label className="block text-lg font-medium text-gray-900 mb-2">Upload BOQ File</label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <input
                                            type="file"
                                            id="boqFileInput"
                                            multiple
                                            accept=".pdf,application/pdf"
                                            onChange={(e) => handleFileUpload(e, 'boq')}
                                            className="hidden"
                                        />
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm font-medium text-gray-700 mb-1">
                                            {boqFiles.length > 0 
                                                ? `${boqFiles.length} files selected`
                                                : "Choose a file or drag & drop it here"
                                            }
                                        </p>
                                        <p className="text-xs text-gray-500 mb-4">Upload PDF BOQ (Bulk order)/Tender Files upto 50MB</p>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById('boqFileInput').click()}
                                            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
                                        >
                                            Browse
                                        </button>
                                    </div>
                                </div>

                                {/* Installation Section */}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            id="installation"
                                            className="mr-2"
                                        />
                                        <label htmlFor="installation" className="text-lg font-medium text-gray-900">Installation (optional)</label>
                                    </div>

                                    <div className="flex gap-6 mb-6">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="installationType"
                                                value="pattern"
                                                checked={installationType === "pattern"}
                                                onChange={(e) => setInstallationType(e.target.value)}
                                                className="mr-2 text-[#871B58]"
                                            />
                                            <span className="text-sm font-medium">Pattern</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="installationType"
                                                value="normal"
                                                checked={installationType === "normal"}
                                                onChange={(e) => setInstallationType(e.target.value)}
                                                className="mr-2 text-[#871B58]"
                                            />
                                            <span className="text-sm font-medium">Normal</span>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <input
                                                type="file"
                                                id="installationImageInput"
                                                multiple
                                                accept="image/*,video/*"
                                                onChange={(e) => handleFileUpload(e, 'installation')}
                                                className="hidden"
                                            />
                                            <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm font-medium text-gray-700 mb-1">
                                                {installationImages.length > 0 
                                                    ? `${installationImages.length} files selected`
                                                    : "Choose a Image & video drag & drop it here"
                                                }
                                            </p>
                                            <p className="text-xs text-gray-500 mb-3">JPEG, PNG and MP4 formats upto 50MB</p>
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('installationImageInput').click()}
                                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
                                            >
                                                Browse
                                            </button>
                                        </div>

                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                            <input
                                                type="file"
                                                id="patternDesignInput"
                                                multiple
                                                accept=".pdf,image/*"
                                                onChange={(e) => handleFileUpload(e, 'pattern')}
                                                className="hidden"
                                            />
                                            <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                                            <p className="text-sm font-medium text-gray-700 mb-1">
                                                {patternDesignFiles.length > 0 
                                                    ? `${patternDesignFiles.length} files selected`
                                                    : "Upload pattern design file here"
                                                }
                                            </p>
                                            <p className="text-xs text-gray-500 mb-3">Upload upto 60mb file here</p>
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById('patternDesignInput').click()}
                                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
                                            >
                                                Browse
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex justify-end gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="px-8 py-2 border border-[#871B58] text-[#871B58] rounded-lg hover:bg-gray-50 transition"
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-8 py-2 bg-[#871B58] text-white rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Panel - Order Products */}
                    <div className="w-full lg:w-[40%]">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-medium text-gray-900 mb-6">Order Products - {products.length}</h3>
                            
                            {products.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                        <Plus className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500">No products added yet</p>
                                    <p className="text-sm text-gray-400">Add products to see them here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="bg-gray-50 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                        {product.images && product.images.length > 0 ? (
                                                            <img 
                                                                src={URL.createObjectURL(product.images[0])} 
                                                                alt="Product thumbnail"
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        ) : (
                                                            <>
                                                                <Plus className="w-6 h-6 text-gray-400" />
                                                                <span className="text-xs text-gray-500">Add Thumbnail</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                                                        <p className="text-sm text-gray-500">{product.category}</p>
                                                        <p className="text-sm text-gray-500">{product.companyName}</p>
                                                        <p className="text-sm text-gray-500">GST: {product.gstNumber}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="p-1 text-gray-400 hover:text-gray-600">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => removeProduct(product.id)}
                                                        className="p-1 text-gray-400 hover:text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 pt-3">
                                                <button
                                                    onClick={() => toggleDetails(product.id)}
                                                    className="flex items-center justify-between w-full text-sm text-gray-600 hover:text-gray-800"
                                                >
                                                    <span>Product details</span>
                                                    <ChevronDown className={`w-4 h-4 transition-transform ${product.showDetails ? 'rotate-180' : ''}`} />
                                                </button>

                                                {product.showDetails && (
                                                    <div className="mt-4 space-y-2 text-sm">
                                                        <p><span className="font-medium text-gray-900">Selected Finishes:</span> {product.finish}</p>
                                                        <p><span className="font-medium text-gray-900">Selected Thickness:</span> {product.thickness}</p>
                                                        <p><span className="font-medium text-gray-900">Selected Unit:</span> {product.unit}</p>
                                                        <p><span className="font-medium text-gray-900">Entered Value:</span> {product.value}</p>
                                                        {product.size && (
                                                            <p><span className="font-medium text-gray-900">Stone Size:</span> {product.size}</p>
                                                        )}
                                                        <p><span className="font-medium text-gray-900">Delivery Expected:</span> {product.delivery}</p>
                                                        {product.message && (
                                                            <>
                                                                <p><span className="font-medium text-gray-900">Message:</span></p>
                                                                <textarea
                                                                    value={product.message}
                                                                    readOnly
                                                                    rows={3}
                                                                    className="w-full p-2 border border-gray-200 rounded text-xs text-gray-600"
                                                                />
                                                            </>
                                                        )}
                                                        
                                                        {/* Product Images */}
                                                        {product.images && product.images.length > 0 && (
                                                            <div className="space-y-2">
                                                                <div className="flex gap-2">
                                                                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">+ Add Video</button>
                                                                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">+ Add Photo</button>
                                                                </div>
                                                                <div className="flex gap-2 flex-wrap">
                                                                    {product.images.map((img, idx) => (
                                                                        <img
                                                                            key={idx}
                                                                            src={URL.createObjectURL(img)}
                                                                            alt={`Product image ${idx + 1}`}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* BOQ Files */}
                                                        {boqFiles.length > 0 && (
                                                            <div className="space-y-2">
                                                                <p className="font-medium text-gray-900">BOQ certificate:</p>
                                                                {boqFiles.map((file, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2">
                                                                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                                                                            <span className="text-red-600 text-xs font-bold">PDF</span>
                                                                        </div>
                                                                        <span className="text-sm text-gray-600">{file.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Installation Images */}
                                                        {installationImages.length > 0 && (
                                                            <div className="space-y-2 mt-4">
                                                                <div className="flex gap-2">
                                                                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">+ Add video</button>
                                                                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">+ Add photo</button>
                                                                </div>
                                                                <div className="flex gap-2 flex-wrap">
                                                                    {installationImages.map((img, idx) => (
                                                                        <img
                                                                            key={idx}
                                                                            src={URL.createObjectURL(img)}
                                                                            alt={`Installation image ${idx + 1}`}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Pattern Design Files */}
                                                        {patternDesignFiles.length > 0 && (
                                                            <div className="space-y-2 mt-4">
                                                                <p className="font-medium text-gray-900">Pattern Design Files:</p>
                                                                {patternDesignFiles.map((file, idx) => (
                                                                    <div key={idx} className="flex items-center gap-2">
                                                                        <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                                                            <span className="text-blue-600 text-xs font-bold">PDF</span>
                                                                        </div>
                                                                        <span className="text-sm text-gray-600">{file.name}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}