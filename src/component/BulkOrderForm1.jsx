import React, { useEffect, useState } from "react";
// import { LuUserRound } from "react-icons/lu";
import { UserRound as LuUserRound } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import { FiUpload, FiTrash2, FiEdit2 } from "react-icons/fi";
import { TiDeleteOutline } from "react-icons/ti";
import { HiPlus } from "react-icons/hi";
import { RiGalleryLine } from "react-icons/ri";
import { CiMail, CiMobile3 } from "react-icons/ci";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
export default function BulkOrderForm() {

    const [tab, setTab] = useState("individual");
    const [submitting, setSubmitting] = useState(false);
    const [products, setProducts] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [installationType, setInstallationType] = useState("pattern");
    const initialFormData = {

        companyName: "",
        gstNumber: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        // pinCode: "",
        city: null,
        state: null,
        country: null,

        boqfiles: [],
        file2: [],
        installationimages: [],

        installation: "",

    };
    const initialProductData = {
        stoneCategory: "",
        stoneName: "",

        stoneFinish: "",
        unit: "",
        value: "",
        thickness: "",
        width: "",
        height: "",
        deliveryTime: "",
        image: [],
        message: "",
        _preview: null,
    }
    const [editIndex, setEditIndex] = useState(null);
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

    const editProduct = (index) => {
        setProductData(products[index]);
        setEditIndex(index);              // editing index set
        document.getElementById("stoneCategory").focus(); // cursor first field me
    };


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
                    toast.error(`${files[i].name} ${MAX_FILE_SIZE_MB}MB maximum`);
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
    {
        products.map((product, index) => (
            <div key={index} className="flex gap-3 mt-2 flex-wrap">

                {/* Image select button */}
                <button className="relative w-20 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
                    + Add Image
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        onChange={(e) => handleImageSelect(e, index)}
                    />
                </button>

                {/* Preview section for this product */}
                {product._previews?.map((preview, i) => (
                    <img
                        key={i}
                        src={preview}
                        alt={`product-${index}-file-${i}`}
                        className="w-24 h-20 rounded-lg object-cover border"
                    />
                ))}
            </div>
        ))
    }

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
    const handleDeleteFile = (type, index) => {
        const updated = [...formData[type]];  // copy of the array
        updated.splice(index, 1);             // remove the file at index
        setFormData({
            ...formData,
            [type]: updated
        });
    };

    const toggleDetails = (index) => {
        const newProducts = [...products];
        newProducts[index].showDetails = !newProducts[index].showDetails;
        setProducts(newProducts);
    };
    const handleDeleteImage = (pIndex, iIndex) => {
        const updated = [...products];
        updated[pIndex]._previews.splice(iIndex, 1);
        updated[pIndex].image.splice(iIndex, 1);
        setProducts(updated);
    };


    const addProduct = (e) => {
        e.preventDefault();
        // const productFields = document
        //     .getElementById("product-fields")
        //     ?.querySelectorAll("input, select,textarea");


        const files = productData.image || [];


        for (let file of files) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`${file.name} must be less than ${MAX_FILE_SIZE_MB}MB`);
                return;
            }
        }


        // if (productFields) {
        //     for (let field of productFields) {
        //         if (!field.reportValidity()) return;
        //     }
        // }

        // toast.success("Product added successfully!");


        const previews = files.map(file => URL.createObjectURL(file));

        const newProduct = {
            ...productData,
            image: files,
            _previews: previews,
            showDetails: false,
        };

        if (editIndex !== null) {
            const updated = [...products];
            updated[editIndex] = newProduct;
            setProducts(updated);
            setEditIndex(null);
            toast.success("Product updated successfully!");
        } else {
            if (files.length === 0) {
                toast.error("At least one image is required");
                return;
            }

            setProducts((prev) => [...prev, newProduct]);
            toast.success("Product added successfully!");
        }

        // setProducts((prev) => [...prev, newProduct]);


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
        // const formEl = e.target;
        // const productContainer = formEl.querySelector("#product-fields");


        // const topLevelFields = Array.from(formEl.querySelectorAll("[required]"))
        //     .filter(el => !productContainer?.contains(el));

        // for (const el of topLevelFields) {
        //     if (!el.reportValidity()) return;
        // }

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
    const companyName = formData.companyName;
    const gstNumber = formData.gstNumber;
    return (
        <div className="min-h-screen font-poppins bg-white px-4 sm:px-6 lg:px-16 py-8">
            <Toaster position="top-right" />
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">

                    <h1 className="text-2xl sm:text-4xl font-medium text-[#000000]">Stonepedia Bulk Orders</h1>
                    <p className="text-sm sm:text-lg text-[#BDBDBD]">Fill this form to connect with us.</p>
                    <p className="text-sm text-gray-400">We only consider 10,000 to 1,00,000 sqft orders here. More than 1,00,000 buy it
                    </p>
                    <p className="text-sm text-gray-400">from project collaboration.</p>

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

                        <form id="myForm" onSubmit={onSubmit} className="space-y-4">
                            {tab === "business" ? (
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

                                    <div className="w-full flex flex-col">
                                        <label htmlFor="companyName" className="mb-0.5 font-semibold text-xs">Company Name<span className="text-gray-400 text-sm">(optional)</span>  </label>
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











                            )}


                            <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">

                                {tab === "business" ? (
                                    <div className="w-full flex flex-col ">




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

                                    <div className="w-full flex flex-col ">



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
                            <div className="grid grid-col-1">



                                <label htmlFor="address" className="mb-0.5 font-semibold text-xs">Address </label>
                                <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">  <input
                                        id="address"
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter here"

                                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                    />
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
                            </div>
                        </form>
                        <form onSubmit={addProduct} className="space-y-4">
                            <p className="block font-medium text-[16px] text-black mb-2">Product Details <span className="text-gray-400">(Add multiple products here)</span></p>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
                                <div id="product-fields">
                                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">



                                        <div>
                                            <label htmlFor="stoneCategory" className="mb-0.5 font-semibold text-xs">
                                                Stone Category
                                            </label>
                                            <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                    <input
                                                        id="stoneCategory"
                                                        type="text"
                                                        required
                                                        name="stoneCategory"
                                                        value={productData.stoneCategory}

                                                        onChange={handleProductChange}

                                                        placeholder="Enter here"
                                                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                        <div>
                                            <label htmlFor="stoneName" className="mb-0.5 font-semibold text-xs">
                                                Stone Name
                                            </label>
                                            <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                    <input
                                                        id="stoneName"
                                                        type="text"
                                                        required
                                                        name="stoneName"
                                                        value={productData.stoneName}
                                                        onChange={handleProductChange}

                                                        placeholder="China White Travertine"

                                                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">



                                        <div>
                                            <label htmlFor="stoneFinish" className="mb-0.5 font-semibold text-xs">
                                                Stone Finish
                                            </label>
                                            <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                    <select
                                                        id="stoneFinish"
                                                        required
                                                        name="stoneFinish"

                                                        value={productData.stoneFinish}
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

                                                        value={productData.thickness}


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

                                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">


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
                                                        <option value="sqm">MM</option>
                                                        <option value="sqft">Sqft</option>

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

                                                        value={productData.value}


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


                                    </div>
                                    <div className="mb-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            <div>
                                                <label className="mb-0.5 font-semibold text-xs">Size of Product (W × H)</label>
                                                <div className="grid grid-cols-2 gap-3">

                                                    <div>
                                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                                <select
                                                                    id="width"
                                                                    name="width"
                                                                    placeholder="Width"

                                                                    value={productData.width}

                                                                    required
                                                                    onChange={handleProductChange}
                                                                    className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                                >

                                                                    <option value="">Choose</option>
                                                                    <option value="5-8ft">5-8ft</option>
                                                                    <option value="8-11ft">8-11ft</option>

                                                                </select>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div>
                                                        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                                            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                                                <select
                                                                    id="height"
                                                                    name="height"
                                                                    placeholder="Height"
                                                                    required

                                                                    value={productData.height}


                                                                    onChange={handleProductChange}
                                                                    className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"


                                                                >

                                                                    <option value="">Choose</option>
                                                                    <option value="2-3ft">2-3ft</option>
                                                                    <option value="4-5ft">4-5ft</option>

                                                                </select>
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
                                        <div className="mb-7 mt-2">
                                            <label htmlFor="message" className="mb-0.5 font-semibold text-xs">
                                                Description
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={4}
                                                required
                                                value={productData.message}
                                                onChange={handleProductChange}

                                                placeholder="Write your message here"
                                                className="resize-none   w-full border border-gray-300 rounded-md p-2 mt-1 text-xs outline-none "
                                            />

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
                                                    : "Choose a Image/Video or drag & drop it here"}
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
                                                type="submit"
                                                // onClick={addProduct}
                                                className="font-inter cursor-pointer   hover:scale-105 transition-transform duration-200  bg-[#871B58] text-white px-3 py-2 rounded "
                                                disabled={submitting}
                                            >
                                                {editIndex !== null ? "Save Changes" : "Add this Product"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <form id="myForm" onSubmit={onSubmit} className="space-y-4">
                            <label className="block  font-medium text-[16px] text-black mb-1">Upload BOQ File</label>
                            <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">

                                <input
                                    type="file"
                                    id="boqfiles"
                                    name="boqfiles"
                                    multiple
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    accept=".pdf,application/pdf"
                                    onChange={handleChange}
                                />
                                <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />

                                <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">  {formData.boqfiles?.length > 0
                                    ? ` Uploaded ${formData.boqfiles.length}`
                                    : "Choose a file or drag & drop it here"}
                                </p>
                                <span className="text-[8px] block mb-4 text-gray-400 pointer-events-none">Upload PDF BOC(Bulk order)/Tender Files upto 20MB</span>
                                <button type="button" onClick={() => document.getElementById("boqfiles").click()} className="inline-block bg-white border font-medium text-sm px-6 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>

                            </div>


                            <div className="w-full h-auto min-h-[160px] border-2 border-dashed border-gray-300 rounded-lg p-4  relative">



                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="installation"
                                        className="mr-2"
                                    />
                                    <label htmlFor="installation" className="text-lg font-medium text-gray-900">Installation (optional)</label>
                                </div>
                                <p className="text-[#414141] text-xs font-medium tracking-wide pointer-events-none mb-1">Choose bwtween normal and patterned tiles</p>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                    <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition w-full">
                                        <input
                                            type="file"
                                            id="installationimages"
                                            name="installationimages"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept=".pdf,image/*"
                                            onChange={handleChange}
                                        />
                                        <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />
                                        <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">
                                            {formData.installationimages?.length > 0
                                                ? ` Uploaded ${formData.installationimages.length} `
                                                : "Choose a Image & video drag & drop it here"}

                                        </p>
                                        <span className="text-[8px] block mb-4 text-gray-400 pointer-events-none">JPEG, PNG and MP4 formats upto 20MB</span>
                                        <button
                                            type="button"
                                            onClick={() => document.getElementById("installationimages").click()}
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
                                                : "Upload pattern design file here"}

                                        </p>
                                        <span className="text-[8px] block mb-3 text-gray-400 pointer-events-none">Upload upto 20mb file here</span>
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



                        </form>
                    </div>



                    <div className="w-full lg:w-[50%]">
                        {/* <button onClick={(e)=>{document.getElementById("stoneCategory").focus()}}></button> */}
                        {products.length === 0 ? (

                            <div onClick={(e) => { document.getElementById("stoneCategory").focus() }} className="flex flex-col items-center justify-center py-20 px-6 text-center border-2 border-dashed border-gray-300 rounded-2xl ">
                                <HiPlus className="h-10 w-10 text-[#871B58]  mb-6" />
                                <h4 className="text-2xl font-semibold text-gray-700 mb-2">No products added yet</h4>

                            </div>
                        ) : (


                            <div className="space-y-4">
                                {products.map((product, index) => (

                                    <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6">
                                        <div className="flex items-start gap-5 justify-between w-full">

                                            <div className="flex items-start gap-3">
                                                <div>
                                                    {/* <div className="w-20 h-20 bg-gray-100 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
                                                    <RiGalleryLine className="w-6 h-6 mb-1" />
                                                    <button>Add Thumbnail</button>
                                                </div> */}
                                                    <div key={index} className="flex gap-3 mt-2 flex-wrap">
                                                        <button className=" relative w-20 h-20 bg-gray-100  flex flex-col items-center justify-center text-gray-500 text-xs" >
                                                            {product.thumbnail && product.thumbnail.length > 0 ? (
                                                                <img
                                                                    src={URL.createObjectURL(products[index].thumbnail[0])}
                                                                    alt="preview"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (

                                                                <div clsassName="border rounded-lg">
                                                                    <RiGalleryLine className="w-6 h-6 mb-1" />
                                                                    <span>Add Tumbnail</span>
                                                                </div>

                                                            )}




                                                            <input
                                                                type="file"
                                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                                accept="image/*"

                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    if (!file) return;


                                                                    if (file.size <= 50 * 1024 * 1024) {

                                                                        setProducts((prevProducts) =>
                                                                            prevProducts.map((p, i) =>
                                                                                i === index
                                                                                    ? {
                                                                                        ...p,
                                                                                        thumbnail: [file],

                                                                                    }
                                                                                    : p
                                                                            )
                                                                        );
                                                                    } else {
                                                                        toast.error(`${files[i].name} 50MB maximum`);
                                                                    }




                                                                }}

                                                            />

                                                        </button>
                                                    </div></div>


                                                <div className="flex flex-col">
                                                    <div className="mb-2">
                                                        <h3 className="text-base font-semibold text-gray-800">
                                                            {product.stoneName}
                                                        </h3>
                                                        <p className="text-sm text-gray-600">{product.stoneFinish}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500">
                                                            Company Name: {formData.companyName}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            GST Number: {formData.gstNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="p-2 rounded-md bg-gray-100 transition"
                                                    title="Edit"
                                                    onClick={() => editProduct(index)}
                                                >
                                                    <FiEdit2 className="w-6 h-6 text-gray-600" />
                                                </button>
                                                <button
                                                    onClick={() => removeProduct(index)}
                                                    className="p-2 rounded-md bg-gray-100 transition"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="w-6 h-6 text-red-600" />
                                                </button>
                                            </div>
                                        </div>






                                        <div className=" border-gray-200 pt-3">



                                            <button
                                                onClick={() => toggleDetails(index)}
                                                className="cursor-pointer text-gray-600 text-sm underline whitespace-nowrap"
                                            >
                                                <span>Product details</span>
                                                <RiArrowDropDownLine className={`w-4 h-4 transition-transform ${product.showDetails ? 'rotate-180' : ''}`} />
                                            </button>
                                            {product.showDetails && (
                                                <div className="space-y-4 text-sm text-gray-700">
                                                    {/* Grid Details */}
                                                    <div className="grid grid-cols-2 gap-y-2 text-gray-700">
                                                        <p>
                                                            <span className="font-medium">Selected Finishes: </span>
                                                            {product.stoneFinish}
                                                        </p>

                                                        <p>
                                                            <span className="font-medium">Selected Thickness: </span>
                                                            {product.thickness}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Selected Unit: </span>
                                                            {product.unit}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Entered Value: </span>
                                                            {product.value}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Stone Size: </span>
                                                            w: {product.width} || H:{product.height}
                                                        </p>
                                                        <p>
                                                            <span className="font-medium">Delivery Expected: </span>
                                                            {product.deliveryTime}
                                                        </p>
                                                    </div>


                                                    <div >

                                                        <p className="font-medium">Description:</p>

                                                        <p className="mt-1 border rounded-lg bg-gray-50 p-3 border-gray-400 text-gray-600 leading-relaxed">
                                                            {product.message}
                                                        </p>
                                                    </div>





                                                    <div>
                                                        <p className="font-medium">Stone Images / Videos:</p>
                                                        <div className="flex gap-3 mt-2 flex-wrap">



                                                            {/* {products.map((product, index) => ( */}


                                                            <div key={index} className="grid grid-cols-4 gap-3 mt-2 ">
                                                                <button className="border-dashed dashed-4 relative w-20 h-20 border border-[#871B58] rounded-lg flex flex-col hover:shadow-md transition items-center justify-center text-gray-900 text-xs">
                                                                    <HiPlus className="  text-black  mb-6" /> Add Video
                                                                    <input
                                                                        type="file"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        accept="video/*"
                                                                        multiple
                                                                        onChange={(e) => {
                                                                            const files = Array.from(e.target.files);
                                                                            if (!files.length) return;

                                                                            let addedFiles = [];
                                                                            for (let i = 0; i < files.length; i++) {
                                                                                if (files[i].size <= 50 * 1024 * 1024) {
                                                                                    addedFiles.push(files[i]);
                                                                                } else {
                                                                                    toast.error(`${files[i].name} 50MB maximum`);
                                                                                }
                                                                            }


                                                                            const previews = addedFiles.map((file) => URL.createObjectURL(file));

                                                                            setProducts((prevProducts) =>
                                                                                prevProducts.map((p, i) =>
                                                                                    i === index
                                                                                        ? {
                                                                                            ...p,
                                                                                            image: [...(p.image || []), ...addedFiles],
                                                                                            _previews: [...(p._previews || []), ...previews],
                                                                                        }
                                                                                        : p
                                                                                )
                                                                            );
                                                                        }}

                                                                    />

                                                                </button>
                                                                <button className="border-dashed dashed-4 relative w-20 h-20 border border-[#871B58] rounded-lg flex flex-col hover:shadow-md transition items-center justify-center text-gray-900 text-xs">
                                                                    <HiPlus className=" text-black  mb-6" /> Add Image
                                                                    <input
                                                                        type="file"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={(e) => {
                                                                            const files = Array.from(e.target.files);
                                                                            if (!files.length) return;
                                                                            let addedFiles = [];
                                                                            for (let i = 0; i < files.length; i++) {
                                                                                if (files[i].size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
                                                                                    addedFiles.push(files[i]);
                                                                                } else {
                                                                                    toast.error(`${files[i].name} exceeds ${MAX_FILE_SIZE_MB}MB limit`);
                                                                                }
                                                                            }

                                                                            const previews = addedFiles.map((file) => URL.createObjectURL(file));


                                                                            setProducts((prevProducts) =>
                                                                                prevProducts.map((p, i) =>
                                                                                    i === index
                                                                                        ? {
                                                                                            ...p,
                                                                                            image: [...(p.image || []), ...addedFiles],
                                                                                            _previews: [...(p._previews || []), ...previews],
                                                                                        }
                                                                                        : p
                                                                                )
                                                                            );
                                                                        }}
                                                                    />

                                                                </button>


                                                                {product._previews?.map((preview, i) => (
                                                                    <div key={i} className="relative inline-block mr-2">
                                                                        <img
                                                                            key={`${product.id}-${preview}`}

                                                                            src={preview}
                                                                            alt={`product-${index}-file-${i}`}
                                                                            className=" rounded-lg object-cover border"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleDeleteImage(index, i)}
                                                                            className="absolute top-0 right-0  text-red-700 rounded-full w-5 h-5 flex items-center justify-center opacity-0 hover:opacity-100"
                                                                        >
                                                                            <TiDeleteOutline />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            {/* ))} */}

                                                        </div>
                                                    </div>

                                                    {/* BOQ Files */}

                                                    {/* Installation Images */}
                                                    {/* {installationimages.length > 0 && (
                                                            <div className="space-y-2 mt-4">
                                                                <div className="flex gap-2">
                                                                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">+ Add video</button>
                                                                    <button className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded">+ Add photo</button>
                                                                </div>
                                                                <div className="flex gap-2 flex-wrap">
                                                                    {installationimages.map((img, idx) => (
                                                                        <img
                                                                            key={idx}
                                                                            src={URL.createObjectURL(img)}
                                                                            alt={`Installation image ${idx + 1}`}
                                                                            className="w-12 h-12 object-cover rounded"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )} */}

                                                    {/* Pattern Design Files */}
                                                    {/* {patternDesignFiles.length > 0 && (
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
                                                        )} */}

                                                </div>
                                            )}

                                        </div>
                                    </div>
                                ))}

                            </div>
                        )}


                        {/*                       
                        {formData.boqFiles.length > 0 && (
                            <div className="space-y-2">
                                <p className="font-medium text-gray-900">BOQ certificate:</p>
                                {formData.boqFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                                            <span className="text-red-600 text-xs font-bold">PDF</span>
                                        </div>
                                        <span className="text-sm text-gray-600">{file.name}</span>
                                    </div>
                                ))}
                            </div>
                        )} */}
                        {/* Stone Images/Videos */}
                        {((formData.boqfiles && formData.boqfiles.length > 0) ||
                            (formData.installationimages && formData.installationimages.length > 0)) && (
                                <div className="bg-white rounded-2xl shadow-lg mt-5 p-6">
                                    {formData.boqfiles && formData.boqfiles.length > 0 && (
                                        <div>
                                            <p className="font-medium">BOQ Certificate:</p>
                                            <div className="flex flex-col gap-2 mt-2 border rounded-lg px-3 py-2">
                                                {formData.boqfiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center">
                                                                <span className="text-red-600 text-xs font-bold">PDF</span>
                                                            </div>
                                                            <span className="text-sm text-gray-700">{file.name}</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteFile("boqfiles", index)}
                                                            className="text-red-500 text-xs font-bold"
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    )}
                                    {formData.installationimages && formData.installationimages.length > 0 && (
                                        <div>
                                            <p className="font-medium">Stone Images / Videos:</p>
                                            <div className="flex gap-3 mt-2 flex-wrap">
                                                <button className="border-dashed dashed-4 relative w-20 h-20 border border-[#871B58] rounded-lg flex flex-col hover:shadow-md transition items-center justify-center text-gray-900 text-xs">
                                                    <HiPlus className="h-5 w-5 text-black  mb-6" /> Add Video
                                                    <input
                                                        type="file"
                                                        id="installationimages"
                                                        name="installationimages"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        accept="video/*"
                                                        multiple
                                                        onChange={handleChange}
                                                    />




                                                </button>
                                                <button className="border-dashed dashed-4 relative w-20 h-20 border border-[#871B58] rounded-lg flex flex-col hover:shadow-md transition items-center justify-center text-gray-900 text-xs">
                                                    <HiPlus className="h-5 w-5 text-black  mb-6" /> Add Image
                                                    <input
                                                        id="installationimages"
                                                        name="installationimages"
                                                        type="file"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleChange}
                                                    />

                                                </button>

                                                {formData.installationimages.map((img, i) => (
                                                    <div key={i} className="relative inline-block mr-2">
                                                        <img

                                                            src={URL.createObjectURL(img)}
                                                            alt=""
                                                            className="w-24 h-20 rounded-lg object-cover border"
                                                        />
                                                        <button
                                                            onClick={() => handleDeleteFile("installationimages", i)}
                                                            className="absolute top-0 right-0  text-red-700 rounded-full w-5 h-5 flex items-center justify-center opacity-0 hover:opacity-100"
                                                        >
                                                            <TiDeleteOutline />
                                                        </button>
                                                    </div>
                                                ))}

                                            </div>

                                        </div>
                                    )}



                                </div>


                            )}

                        <div>



                            <div className="flex justify-end gap-3 mt-4">
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"

                                        className="font-inter border text-black px-8 py-1 rounded mb-6"

                                        onClick={handleCancel}
                                    >

                                        Cancel
                                    </button>
                                    <button form="myForm" type="submit" className="font-inter bg-[#871B58] text-white px-8 py-1 rounded mb-6 hover:scale-105 transition-transform duration-200" disabled={submitting}>

                                        {submitting ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </div>




                    </div>
                </div>
            </div>
        </div>
    );
}
// import { useState } from "react";
// import { HiPlus } from "react-icons/hi";
// import { RiArrowDropDownLine } from "react-icons/ri";

// export default function ProductsPanel() {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Stonepedia White granite",
//       category: "Granite",
//       company: "Globex Industries Pvt. Ltd.",
//       gst: "09ABCDE4567R",
//       finish: "Polished",
//       thickness: "18MM",
//       unit: "MM",
//       value: "345 sqft",
//       stoneSize: "W: 10ft | H: 2.5ft",
//       delivery: "1 Month",
//       message:
//         "I’m looking for stunning tiles and stones to elevate your home décor? Our collection features a variety of textures and colors that can transform any space into a stylish haven.",
//       images: [
//         "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=200",
//         "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=200",
//       ],
//       videos: [],
//       boqFile: { name: "BOQ-certificate.PDF" },
//       installationimages: [
//         "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=200",
//       ],
//       showDetails: true,
//     },
//   ]);

//   const toggleDetails = (index) => {
//     const updated = [...products];
//     updated[index].showDetails = !updated[index].showDetails;
//     setProducts(updated);
//   };

//   return (
// <div className="w-full lg:w-[40%] space-y-6">
//   {products.map((product, index) => (
//     <div
//       key={product.id}
//       className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4"
//     >
//       {/* Thumbnail + Header */}
//       <div className="flex items-start gap-4">
//         {/* Thumbnail */}
//     <div className="w-16 h-16 bg-gray-100 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
//       <HiPlus className="w-6 h-6 mb-1" />
//       <span>Add Thumbnail</span>
//     </div>

//     {/* Product Info */}
//     <div className="flex-1">
//       <h3 className="text-base font-semibold text-gray-800">
//         {product.name}
//       </h3>
//       <p className="text-sm text-gray-600">{product.category}</p>
//       <p className="text-xs text-gray-500">
//         Company Name: {product.company}
//       </p>
//       <p className="text-xs text-gray-500">
//         GST Number: {product.gst}
//       </p>
//     </div>

//     {/* Edit/Delete Buttons */}
//     <div className="flex gap-3">
//       <button className="text-gray-500 hover:text-gray-700">✏️</button>
//       <button className="text-gray-500 hover:text-red-600">🗑️</button>
//     </div>
//   </div>

//       {/* Toggle Button */}
//       <button
//         onClick={() => toggleDetails(index)}
//         className="flex items-center text-sm text-gray-700"
//       >
//         Product details
//         <RiArrowDropDownLine
//           className={`w-5 h-5 transition-transform ${
//             product.showDetails ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Details Section */}
//   {product.showDetails && (
//     <div className="space-y-4 text-sm text-gray-700">
//       {/* Grid Details */}
//       <div className="grid grid-cols-2 gap-y-2 text-gray-700">
//         <p>
//           <span className="font-medium">Selected Finishes: </span>
//           {product.finish}
//         </p>
//         <p>
//           <span className="font-medium">Selected Thickness: </span>
//           {product.thickness}
//         </p>
//         <p>
//           <span className="font-medium">Selected Unit: </span>
//           {product.unit}
//         </p>
//         <p>
//           <span className="font-medium">Entered Value: </span>
//           {product.value}
//         </p>
//         <p>
//           <span className="font-medium">Stone Size: </span>
//           {product.stoneSize}
//         </p>
//         <p>
//           <span className="font-medium">Delivery Expected: </span>
//           {product.delivery}
//         </p>
//       </div>

//   {/* Message */}
//   <div>
//     <p className="font-medium">Message:</p>
//     <p className="mt-1 border rounded-lg bg-gray-50 p-3 text-gray-600 leading-relaxed">
//       {product.message}
//     </p>
//   </div>

//   {/* Stone Images/Videos */}
//   <div>
//     <p className="font-medium">Stone Images / Videos:</p>
//     <div className="flex gap-3 mt-2 flex-wrap">
//       <button className="w-24 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
//         + Add Video
//       </button>
//       <button className="w-24 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
//         + Add Photo
//       </button>
//       {product.images.map((img, i) => (
//         <img
//           key={i}
//           src={img}
//           alt=""
//           className="w-24 h-20 rounded-lg object-cover border"
//         />
//       ))}
//     </div>
//   </div>

//               {/* BOQ Certificate */}
//   <div>
//     <p className="font-medium">BOQ Certificate:</p>
//     <div className="flex items-center gap-2 mt-2 border rounded-lg px-3 py-2">
//       <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center">
//         <span className="text-red-600 text-xs font-bold">PDF</span>
//       </div>
//       <span className="text-sm text-gray-700">
//         {product.boqFile?.name}
//       </span>
//     </div>
//   </div>

//               {/* Installation Images */}
//               <div>
//                 <p className="font-medium">Installation Design Image / Video:</p>
//                 <div className="flex gap-3 mt-2 flex-wrap">
//                   <button className="w-24 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
//                     + Add Video
//                   </button>
//                   <button className="w-24 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
//                     + Add Photo
//                   </button>
//                   {product.installationimages.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img}
//                       alt=""
//                       className="w-24 h-20 rounded-lg object-cover border"
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}

//       {/* Bottom Buttons */}
//       <div className="flex justify-end gap-4 pt-4">
//         <button className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
//           Clear
//         </button>
//         <button className="px-6 py-2 bg-[#871B58] text-white rounded-lg hover:bg-[#6c1546]">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// }
