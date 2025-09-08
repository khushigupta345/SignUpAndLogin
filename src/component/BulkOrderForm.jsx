import React, { useEffect, useState } from "react";
// import { LuUserRound } from "react-icons/lu";
import { UserRound as LuUserRound } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import { FiUpload, FiTrash2 } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { CiMail, CiMobile3 } from "react-icons/ci";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
export default function BulkOrderForm() {

    const [tab, setTab] = useState("individual");
    const [submitting, setSubmitting] = useState(false);
    const [products, setProducts] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const initialFormData = {
        companyType: "",
        companyName: "",
        gstNumber: "",
        fullName: "",
        email: "",
        phone: "",
        // pinCode: "",
        city: null,
        state: null,
        country: null,

        file1: [],
        file2: [],
        file3: [],

        installation: "",
        message: "",
    };
    const initialProductData = {
        productName: "",
        productFinish: "",
        unit: "",
        value: "",
        thickness: "",
        width: "",
        height: "",
        deliveryTime: "",
        image: [],
        _preview: null,
    }
    const [formData, setFormData] = useState(initialFormData);

    const [productData, setProductData] = useState(initialProductData)
    const countryOptions = Country.getAllCountries().map(c => ({
        label: c.name,
        value: c.isoCode,
        phonecode: c.phonecode
    }));

    const getStateOptions = (country) => {
        if (!country) return [];
        return State.getStatesOfCountry(country.value).map(s => ({
            label: s.name,
            value: s.isoCode
        }));
    };

    const getCityOptions = (country, state) => {
        if (!country || !state) return [];
        return City.getCitiesOfState(country.value, state.value).map(c => ({
            label: c.name,
            value: c.name
        }));
    };


    const stateOptions = getStateOptions(formData.country);
    const cityOptions = getCityOptions(formData.country, formData.state);

    const quarryStateOptions = getStateOptions(formData.quarryCountry);
    const quarryCityOptions = getCityOptions(
        formData.quarryCountry,
        formData.quarryState
    );


    const MAX_FILE_SIZE_MB = 20;

    const handleProductChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === "file") {
            if (!files?.length) return;

            let addedFiles = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
                    addedFiles.push(files[i]);
                } else {
                    toast.error(`${files[i].name} ${MAX_FILE_SIZE_MB}MB se jyada hai`);
                }
            }

            setProductData((prev) => {
                const mergedFiles = [...(prev.image || []), ...addedFiles];
                return {
                    ...prev,
                    image: mergedFiles,
                    _preview: mergedFiles.map((f) => URL.createObjectURL(f)),
                };
            });
        } else {
            setProductData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        if (type === "file") {
            if (!files?.length) return;

            const validFiles = Array.from(files).filter(file => {
                if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                    toast.error(`${file.name} Maximum ${MAX_FILE_SIZE_MB}MB allowed`);
                    return false;
                }
                return true;
            });

            setFormData(prev => ({
                ...prev,
                [name]: [...(prev[name] || []), ...validFiles],
            }));

        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const toggleDetails = (index) => {
        const newProducts = [...products];
        newProducts[index].showDetails = !newProducts[index].showDetails;
        setProducts(newProducts);
    };


    const addProduct = () => {
        const productFields = document
            .getElementById("product-fields")
            ?.querySelectorAll("input, select");


        const files = productData.image || [];


        for (let file of files) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`${file.name} must be less than ${MAX_FILE_SIZE_MB}MB`);
                return;
            }
        }

        if (productFields) {
            for (let field of productFields) {
                if (!field.reportValidity()) return;
            }
        }

        toast.success("Product added successfully!");


        const previews = files.map(file => URL.createObjectURL(file));

        const newProduct = {
            ...productData,
            image: files,
            _previews: previews,
            showDetails: false,
        };

        setProducts((prev) => [...prev, newProduct]);


        setProductData(initialProductData);
    };
    const removeProduct = (index) => {
        setProducts((prev) => {
            const item = prev[index];
            if (item?._preview) {
                URL.revokeObjectURL(item._preview);
            }
            return prev.filter((_, i) => i !== index);
        });
    };


    const onSubmit = (e) => {
        e.preventDefault();
        const formEl = e.target;
        const productContainer = formEl.querySelector("#product-fields");


        const topLevelFields = Array.from(formEl.querySelectorAll("[required]"))
            .filter(el => !productContainer?.contains(el));

        for (const el of topLevelFields) {
            if (!el.reportValidity()) return;
        }

        if (products.length === 0) {
            toast.error("At least one product is required");
            return;
        }

        for (const key in formData) {
            const file = formData[key];
            if (file && file.size && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`${file.name} Maximum ${MAX_FILE_SIZE_MB}MB allowed`);
                return;
            }
        }


        const finalProducts = products.map(({ _preview, ...rest }) => rest);


        const finalData = {
            ...formData,
            products: finalProducts,
        };

        console.log("Form submitted:", finalData);
        toast.success("Form submitted successfully");


        products.forEach(p => p._preview && URL.revokeObjectURL(p._preview));
        setFormData(initialFormData);
        setProducts([]);

    };

    const handleCancel = () => {
        setFormData(initialFormData);

        window.scrollTo({ top: 0, behavior: "smooth" });
        setProducts([]);
        setSubmitting(false);

    }

    const selectedUnit = productData.unit;

    return (
        <div className="min-h-screen font-poppins bg-white px-4 sm:px-6 lg:px-16 py-8">
            <Toaster position="top-right" />
            <div className="max-w-5xl mx-auto">
                <div className="mb-3">

                    <h1 className="text-2xl sm:text-4xl font-medium text-[#000000]">Stonepedia Bulk Orders</h1>
                    <p className="text-sm sm:text-lg text-[#BDBDBD]">Fill this form to connect with us..</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* <div className="shadow-2xl p-5 md:p-10 flex-1  w-full bg-white rounded-2xl"> */}
                    <div className="shadow-2xl p-5 md:p-10 w-full lg:w-[60%]  bg-white rounded-2xl">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <button
                                disabled={submitting}
                                onClick={() => setTab("individual")}
                                className={`cursor-pointer px-6 py-2 rounded-lg text-sm font-medium ${tab === "individual" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
                                    }`}
                            >
                                Individual
                            </button>

                            <button
                                onClick={() => setTab("business")}
                                className={` cursor-pointer px-5 py-2 rounded-lg text-sm font-medium ${tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
                                    }`}
                            >
                                Business
                            </button>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                            {tab === "business" ? (
                                <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">

                                    <div className="w-full flex flex-col">
                                        <label htmlFor="companyType" className="mb-0.5 font-semibold text-xs">Company Type </label>
                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                <select
                                                    name="companyType"
                                                    required
                                                    value={formData.companyType}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="pvt">Private Ltd</option>
                                                    <option value="llp">LLP</option>
                                                    <option value="proprietor">Proprietor</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="w-full flex flex-col">
                                        <label htmlFor="companyName" className="mb-0.5 font-semibold text-xs">Company Name  </label>
                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">


                                                <input
                                                    type="text"
                                                    required
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleChange}

                                                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"


                                                    placeholder="Globex industries pvt.ltd"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (




                                <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">

                                    <div className="w-full flex flex-col">
                                        <label htmlFor="companyType" className="mb-0.5 font-semibold text-xs">Company Type<span className="text-gray-400 text-sm">(optional)</span> </label>
                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                <select
                                                    name="companyType"
                                                    value={formData.companyType}
                                                    onChange={handleChange}
                                                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"

                                                >
                                                    <option value="">Choose</option>
                                                    <option value="pvt">Private Ltd</option>
                                                    <option value="llp">LLP</option>
                                                    <option value="proprietor">Proprietor</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="w-full flex flex-col">
                                        <label htmlFor="companyName" className="mb-0.5 font-semibold text-xs">Company Name <span className="text-gray-400 text-sm">(optional)</span> </label>
                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">



                                                <input
                                                    id="companyName"
                                                    type="text"
                                                    name="companyName"
                                                    value={formData.companyName}
                                                    onChange={handleChange}

                                                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"

                                                    placeholder="Globex industries pvt.ltd"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            )}

                            {tab === "business" ? (
                                <div className="grid grid-col-1">



                                    <label htmlFor="gstNumber" className="mb-0.5 font-semibold text-xs">GST Number  </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">




                                            <input
                                                id="gstNumber"
                                                type="number"
                                                name="gstNumber"
                                                required
                                                value={formData.gstNumber}
                                                onChange={handleChange}
                                                placeholder="Enter here"

                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                            />
                                        </div>
                                    </div>

                                </div>
                            ) : (

                                <div className="grid grid-col-1">




                                    <label htmlFor="gstNumber" className="mb-0.5 font-semibold text-xs">GST Number <span className="text-gray-400 text-sm">(optional)</span> </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">





                                            <input
                                                id="gstNumber"
                                                type="number"
                                                name="gstNumber"
                                                value={formData.gstNumber}
                                                onChange={handleChange}
                                                placeholder="Enter here"


                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                            />
                                        </div>
                                    </div>

                                </div>

                            )}

                            <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">


                                <div className="w-full flex flex-col md:w-[60%]">

                                    <label htmlFor="name" className="mb-0.5 font-semibold text-xs">
                                        Full Name
                                    </label>

                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">

                                            <input
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                id="name"
                                                type="text"
                                                required
                                                name="fullName"
                                                value={formData.fullName}

                                                onChange={handleChange}


                                                placeholder="Enter full name"
                                            />

                                            <label htmlFor="name" className="pr-3 text-gray-600">
                                                <LuUserRound size={16} />
                                            </label>

                                        </div>
                                    </div>


                                </div>




                                <div className="w-full flex flex-col ">

                                    <label htmlFor="email" className="mb-0.5 font-semibold text-xs">
                                        Email Address
                                    </label>

                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input

                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}

                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"

                                                placeholder="Enter email"
                                            />

                                            <label htmlFor="email" className="pr-3 text-gray-600">
                                                <CiMail size={16} />

                                            </label>

                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">


                                <div className="w-full  flex flex-col">
                                    <label htmlFor="phone" className="mb-0.5 font-semibold text-xs">
                                        Phone Number
                                    </label>

                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <span className="text-xs text-gray-500 px-2 border-r">
                                                {formData.country?.phonecode || "+1"}
                                            </span>
                                            <input
                                                id="phone"
                                                type="text"
                                                required
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="Enter phone number"
                                                maxLength={10}
                                                pattern="\d{10}"
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                            />

                                            <label htmlFor="phone" className="pr-3 text-gray-600">

                                                <CiMobile3 size={16} />

                                            </label>
                                        </div>

                                    </div>

                                </div>
                                {/* 
                                <div className="w-full md:w-1/2 flex flex-col">
                                    <label htmlFor="pinCode" className="mb-0.5 font-semibold text-xs">
                                        Pincode
                                    </label>

                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                id="pinCode"
                                                type="text"
                                                required
                                                name="pinCode"

                                                value={formData.pinCode}
                                                onChange={handleChange}
                                                placeholder="Enter pincode"

                                                maxLength={6}
                                                pattern="\d{6}"
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                            />
                                        </div>
                                    </div>

                                </div>
*/}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 max-w-5xl mx-auto">

                                <div className="min-w-0">
                                    <label className="mb-0.5 font-semibold text-xs">Country</label>

                                    <Select
                                        options={countryOptions}
                                        value={formData.country}
                                        onChange={(value) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                country: value,
                                                state: null,
                                                city: null,
                                                phone: "",
                                            }));
                                        }}
                                        placeholder="Country"
                                        required
                                        name="country"
                                        className="text-xs"
                                    />
                                </div>


                                <div className="min-w-0">
                                    <label className="mb-0.5 font-semibold text-xs">State</label>

                                    <Select
                                        options={stateOptions}
                                        value={formData.state}
                                        onChange={(value) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                state: value,
                                                city: null,
                                            }));
                                        }}
                                        placeholder="State"
                                        isDisabled={!formData.country}
                                        required
                                        name="state"
                                        className="text-xs"
                                    />
                                </div>


                                <div className="min-w-0">
                                    <label className="mb-0.5  font-semibold text-xs">City</label>

                                    <Select
                                        options={cityOptions}
                                        value={formData.city}
                                        onChange={(value) => setFormData({ ...formData, city: value })}
                                        placeholder="City"
                                        isDisabled={!formData.state}
                                        className="text-xs outline-none"
                                        required
                                        name="city"
                                    />

                                </div>


                            </div>

                            <p className="block font-medium text-[16px] text-black mb-2">Product Details <span className="text-gray-400">(Add multiple products here)</span></p>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
                                <div id="product-fields">     <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">

                                    <div>
                                        <label htmlFor="productName" className="mb-0.5 font-semibold text-xs">
                                            Product Name
                                        </label>
                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                <input
                                                    id="productName"
                                                    type="text"
                                                    required
                                                    name="productName"
                                                    value={productData.productName}

                                                    // value={formData.productName}
                                                    // onChange={handleChange}
                                                    onChange={handleProductChange}

                                                    placeholder="China White Travertine"

                                                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div>
                                        <label htmlFor="productFinish" className="mb-0.5 font-semibold text-xs">
                                            Product Finish
                                        </label>
                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                <select
                                                    id="productFinish"
                                                    required
                                                    name="productFinish"

                                                    value={productData.productFinish}
                                                    onChange={handleProductChange}


                                                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                >
                                                    <option value="">Choose</option>
                                                    <option value="mirror polished">Mirror Polished</option>
                                                    <option value="honed">Honed</option>
                                                    <option value="tumbled">Tumbled</option>
                                                    <option value="brushed">Brushed</option>

                                                    <option value="flamed">Flamed</option>

                                                    <option value="lapato">Lapato</option>
                                                    <option value="leather">Leather</option>
                                                    <option value="river-polished">River-Polished</option>
                                                    <option value="sand-blast">Sand-blast</option>
                                                    <option value="shot-blast">Shot-blast</option>

                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                        <div>
                                            <label htmlFor="unit" className="mb-0.5 font-semibold text-xs">
                                                Select Unit
                                            </label>
                                            <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                    <select
                                                        id="unit"
                                                        required
                                                        name="unit"

                                                        value={productData.unit}
                                                        onChange={handleProductChange}


                                                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                    >
                                                        <option value="">Choose</option>
                                                        <option value="sqft">Sqft</option>
                                                        <option value="sqm">Sqm</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>


                                        <div>
                                            <label htmlFor="value" className="mb-0.5 font-semibold text-xs">
                                                Enter Value
                                            </label>
                                            <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                <div className=" relative flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                    <input
                                                        id="value"
                                                        type="number"
                                                        required
                                                        name="value"
                                                        // value={formData.value}
                                                        value={productData.value}

                                                        // onChange={handleChange}
                                                        onChange={handleProductChange}

                                                        placeholder="Type value"

                                                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs pr-12"
                                                    />
                                                    <span className="absolute right-3 text-xs text-gray-500">
                                                        {selectedUnit}
                                                    </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <label htmlFor="thickness" className="mb-0.5 font-semibold text-xs">
                                                Thickness
                                            </label>
                                            <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                    <select
                                                        id="thickness"
                                                        required
                                                        name="thickness"
                                                        // value={formData.thickness}
                                                        value={productData.thickness}

                                                        // onChange={handleChange}
                                                        onChange={handleProductChange}

                                                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                    >
                                                        <option value="">Choose</option>
                                                        <option value="8mm">8MM</option>
                                                        <option value="12mm">12MM</option>
                                                        <option value="14mm">14MM</option>
                                                        <option value="16mm">16MM</option>
                                                        <option value="18mm">18MM</option>
                                                        <option value="20mm">20MM</option>
                                                        <option value="25mm">25MM</option>
                                                        <option value="30mm">30MM</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <div>
                                                <label className="mb-0.5 font-semibold text-xs">Size of Product (W × H)</label>
                                                <div className="grid grid-cols-2 gap-3">

                                                    <div>
                                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                                <input
                                                                    type="number"
                                                                    name="width"
                                                                    placeholder="Width"

                                                                    value={productData.width}


                                                                    onChange={handleProductChange}



                                                                    className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div>
                                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                                <input
                                                                    type="number"
                                                                    name="height"
                                                                    placeholder="Height"

                                                                    value={productData.height}


                                                                    onChange={handleProductChange}


                                                                    className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="deliveryTime" className="mb-0.5 font-semibold text-xs">
                                                    Estimate Delivery Time
                                                </label>
                                                <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                        <input
                                                            id="deliveryTime"
                                                            required
                                                            type="date"
                                                            name="deliveryTime"

                                                            onChange={handleProductChange}

                                                            min={new Date().toISOString().split("T")[0]}
                                                            className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                        />
                                                    </div>
                                                </div>

                                            </div>


                                        </div>

                                        <div className="border mt-4 border-dashed mb-4 border-[#871B58] rounded-lg p-6 text-center text-gray-600 relative bg-white hover:shadow-md transition">

                                            <input
                                                id="productImageInput"
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="image/*"
                                                name="image"
                                                multiple

                                                onChange={handleProductChange}

                                            />


                                            <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />


                                            <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">
                                                {productData.image?.length > 0
                                                    ? `Uploaded: ${productData.image.length}`
                                                    : "Choose an Image or drag & drop it here"}
                                            </p>
                                            <span className="text-[8px] block mb-4 text-gray-500 tracking-wide leading-relaxed pointer-events-none">
                                                JPEG, PNG and MP4 formats up to 20MB
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => document.getElementById("productImageInput").click()}
                                                className="inline-block bg-white border  font-medium text-sm px-6 py-2 rounded-xl shadow-sm hover:bg-[#871B58] hover:text-white hover:shadow-md transition"
                                            >
                                                Browse
                                            </button>


                                        </div>

                                        <div className="flex justify-end mt-[8px]">
                                            <button
                                                type="button"
                                                onClick={addProduct}
                                                className="font-inter cursor-pointer   hover:scale-105 transition-transform duration-200  bg-[#871B58] text-white px-3 py-2 rounded "
                                                disabled={submitting}
                                            >
                                                Add this Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <label className="block  font-medium text-[16px] text-black mb-1">Upload BOQ File</label>
                            <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">

                                <input
                                    type="file"
                                    id="file1"
                                    name="file1"
                                    multiple
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept=".pdf,application/pdf"
                                    onChange={handleChange}
                                />
                                <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />

                                <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">  {formData.file1?.length > 0
                                    ? ` Uploaded ${formData.file1.length}`
                                    : "Choose a file or drag & drop it here"}
                                </p>
                                <span className="text-[8px] block mb-4 text-gray-400 pointer-events-none">Upload PDF BOC(Bulk order)/Tender Files upto 20MB</span>
                                <button type="button" onClick={() => document.getElementById("file1").click()} className="inline-block bg-white border font-medium text-sm px-6 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>

                            </div>


                            <div className="w-full h-auto min-h-[160px] border-2 border-dashed border-gray-300 rounded-lg p-4  relative">

                                <div className="mb-4">
                                    <label htmlFor="installation" className="mb-0.5 font-semibold text-xs">
                                        Installation <span className="text-gray-400 text-sm">(optional)</span>
                                    </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                id="installation"
                                                type="text"
                                                name="installation"
                                                value={formData.installation}
                                                onChange={handleChange}
                                                placeholder="Enter here"
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                    <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition w-full">
                                        <input
                                            type="file"
                                            id="file3"
                                            name="file3"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept=".pdf,image/*"
                                            onChange={handleChange}
                                        />
                                        <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />
                                        <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">
                                            {formData.file3?.length > 0
                                                ? ` Uploaded ${formData.file3.length} `
                                                : "Choose a Rate list or drag & drop it here"}

                                        </p>
                                        <span className="text-[8px] block mb-4 text-gray-400 pointer-events-none">Upload rate list (If Any)</span>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById("file3").click()}
                                            className="inline-block bg-white border font-medium text-sm px-6 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
                                        >
                                            Browse
                                        </button>

                                    </div>

                                    <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition w-full">
                                        <input
                                            type="file"
                                            id="file2"
                                            multiple
                                            name="file2"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*,video/mp4"
                                            onChange={handleChange}
                                        />
                                        <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />
                                        <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">
                                            {formData.file2?.length > 0
                                                ? `Uploaded ${formData.file2.length} `
                                                : "Choose an Image or drag & drop it here"}

                                        </p>
                                        <span className="text-[8px] block mb-3 text-gray-400 pointer-events-none">JPEG, PNG and MP4 formats upto 20MB</span>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById("file2").click()}
                                            className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
                                        >
                                            Browse
                                        </button>

                                    </div>
                                </div>
                            </div>
                            <div className="mb-7 mt-2">
                                <label htmlFor="message" className="mb-0.5 font-semibold text-xs">
                                    Write your query
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message here"
                                    className="resize-y  w-full border border-gray-300 rounded-md p-2 mt-1 text-xs outline-none "
                                />

                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"

                                    className="cursor-pointer font-inter border text-black px-8 py-1 rounded mb-6"

                                    onClick={handleCancel}
                                >

                                    Cancel
                                </button>
                                <button type="submit" formNoValidate className="cursor-pointer font-inter bg-[#871B58] text-white px-8 py-1 rounded mb-6 hover:scale-105 transition-transform duration-200" disabled={submitting}>
                                    {submitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>

                        </form>
                    </div>


                    {/* <div className="w-full max-w-5xl mx-auto px-4 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 border border-gray-100"> */}
                    <div className="w-full sm:w-11/12 lg:w-[40%] mx-auto px-4 py-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-2xl rounded-3xl border border-gray-100">
                        <div className="w-full">
                            {products.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50">
                                    <HiPlus className="h-10 w-10 text-[#871B58]  mb-6" />
                                    <h4 className="text-2xl font-semibold text-gray-700 mb-2">No products added yet</h4>

                                </div>
                            ) : (
                                <>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-pink-900 rounded-full"></span>
                                        All Products
                                    </h3>
                                    <h3 className="text-gray-800 font-medium mb-4">Products Added - {products.length}</h3>

                                    <div className="  space-y-6">
                                        {products.map((item, index) => (
                                            <div key={index} className={`bg-white shadow-lg rounded-3xl p-10 hover:shadow-2xl flex flex-col transition
                                             ${item._previews?.length > 0 ? "h-80" : "h-full"}`}
                                            >
                                                <div className="flex   flex-1 overflow-y-auto justify-between items-start gap-4 w-full">
                                                    <div className="flex flex-col gap-4 flex-1 min-w-0 ">
                                                        {item._previews?.length > 0 ? (
                                                            <div className="flex gap-2 flex-wrap">
                                                                {item._previews.map((preview, i) => (
                                                                    <img
                                                                        key={i}
                                                                        src={preview}
                                                                        alt={`product-${index}-file-${i}`}
                                                                        className=" w-full h-30 sm:w-100 sm:h-40  rounded-lg object-cover  transition"
                                                                    />
                                                                ))}
                                                            </div>
                                                        ) : item.image && typeof item.image === "string" ? (
                                                            <img
                                                                src={item.image}
                                                                alt={`product-${index}`}
                                                                className="w-24 h-24 rounded-lg object-cover hover:scale-105 transition"
                                                            />
                                                        ) : null}
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <div className="flex justify-between items-center">
                                                                <h4 className="text-lg sm:text-xl font-semibold text-black break-words">{item.productName}</h4>
                                                                <button
                                                                    onClick={() => removeProduct(index)}
                                                                    aria-label={`Remove ${item.productName}`}
                                                                    className="cursor-pointer p-2 mt-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                                                                >
                                                                    <FiTrash2 className="w-6 h-6 text-red-600" />
                                                                </button>
                                                            </div>
                                                            <p className="text-sm text-gray-500">{item.productFinish}</p>


                                                            <div className="mt-1">
                                                                <button
                                                                    onClick={() => toggleDetails(index)}
                                                                    className="cursor-pointer text-gray-600 text-sm underline whitespace-nowrap"
                                                                >
                                                                    {item.showDetails ? "Hide" : "Product"} Details
                                                                </button>
                                                            </div>
                                                            {item.showDetails && (
                                                                <div className="mt-4 p-4 bg-gray-50  text-gray-500 border border-gray-200 rounded-xl space-y-2">
                                                                    <p>
                                                                        <span className="text-black font-medium sm:text-sm">Selected Finishes:</span> {item.productFinish}
                                                                    </p>
                                                                    <p>
                                                                        <span className="text-black font-medium sm:text-sm">Selected Unit:</span> {item.unit}
                                                                    </p>
                                                                    <p>
                                                                        <span className="text-black font-medium sm:text-sm">Selected {item.unit} value:</span> {item.value}
                                                                    </p>
                                                                    <p>
                                                                        <span className="text-black font-medium sm:text-sm">Selected Thickness:</span> {item.thickness}
                                                                    </p>
                                                                    {item.width && item.height && (
                                                                        <p>
                                                                            <span className="text-black font-medium sm:text-sm">Selected Size:</span> W: {item.width} | H: {item.height}
                                                                        </p>
                                                                    )}
                                                                    <p><span className="text-black font-medium sm:text-sm">Estimate Delivery timer:</span>{item.deliveryTime}</p>
                                                                </div>
                                                            )}

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
