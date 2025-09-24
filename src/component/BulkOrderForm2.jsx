import React, { useState } from "react";
// import { LuUserRound } from "react-icons/lu";
import { UserRound as LuUserRound } from 'lucide-react';
import toast, { Toaster } from "react-hot-toast";
import { FiUpload } from "react-icons/fi";
import { RiDeleteBin5Line, RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { HiPlus } from "react-icons/hi";
import { CiMail, CiMobile3 } from "react-icons/ci";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import { addDoc, collection } from "firebase/firestore";
import { firestorage } from "./firebase"
export default function BulkOrderForm2() {
    const [showFull, setShowFull] = useState(false);
    const [selected, setSelected] = useState("");
    const [tab, setTab] = useState("individual");
    const [submitting, setSubmitting] = useState(false);
    const [products, setProducts] = useState([]);
    const [installationType, setInstallationType] = useState("pattern");
    const initialFormData = {
        companyName: "",
        gstNumber: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        pinCode: "",
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
    const editProduct = (index) => {
        setProductData(products[index]);
        setEditIndex(index);
        const el = document.getElementById("stoneCategory");
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 40;
            window.scrollTo({ top: y, behavior: "smooth" });
            el.focus();
        }
    };
    const MAX_FILE_SIZE_MB = 20;
    const handleProductChange = (e) => {
        const { name, type, value, files } = e.target;

        if (type === "file" && files?.length) {
            const validFiles = validateFiles(files, MAX_FILE_SIZE_MB);
            setProductData((prev) => ({
                ...prev,
                image: [...(prev.image || []), ...validFiles],
            }));
        } else {
            setProductData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === "file" && files?.length) {
            const validFiles = validateFiles(files, MAX_FILE_SIZE_MB);
            setFormData((prev) => ({
                ...prev,
                [name]: [...(prev[name] || []), ...validFiles],
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleDelete = (type, pIndex, iIndex) => {
        if (["boqfiles", "installationimages"].includes(type)) {
            setFormData(p => ({
                ...p,
                [type]: p[type].filter((_, i) => i !== iIndex)
            }));
        } else if (type === "image") {
            setProducts(p =>
                p.map((x, i) =>
                    i === pIndex
                        ? { ...x, image: x.image.filter((_, j) => j !== iIndex) }
                        : x
                )
            );
        }
    };
    const toggleDetails = (index) => {
        const newProducts = [...products];
        newProducts[index].showDetails = !newProducts[index].showDetails;
        setProducts(newProducts);
    };
    const validateFiles = (files, maxSizeMB) => {
        return Array.from(files).filter((file) => {
            if (file.size > maxSizeMB * 1024 * 1024) {
                toast.error(`${file.name} exceeds ${maxSizeMB}MB limit`);
                return false;
            }
            return true;
        });
    };
    const handleFileUpload = (e, index) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        const MAX_SIZE_MB = 20;
        const addedFiles = validateFiles(files, MAX_SIZE_MB);
        if (!addedFiles.length) return;
        setProducts((prevProducts) =>
            prevProducts.map((p, i) =>
                i === index
                    ? { ...p, image: [...(p.image || []), ...addedFiles] }
                    : p
            )
        );
    };
    const addProduct = (e) => {
        e.preventDefault();
        if (productData.image.length === 0) {
            toast.error("At least one image is required");
            return;
        }
        const newProduct = { ...productData, showDetails: false };
        if (editIndex !== null) {
            setProducts((prev) =>
                prev.map((p, i) => (i === editIndex ? newProduct : p))
            );
            toast.success("Product updated successfully!");
            setEditIndex(null);
        } else {
            setProducts((prev) => [...prev, newProduct]);
            toast.success("Product added successfully!");
        }
        setProductData(initialProductData);
    };
    const editCancel = () => {
        setProductData(initialProductData);
        setEditIndex(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const removeProduct = (index) => {
        setProducts((prev) => {
            const item = prev[index];
            return prev.filter((_, i) => i !== index);
        });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        // if (products.length === 0) {
        //     toast.error("At least one product is required");
        //     return;
        // }

        
            if (selected &&formData.boqfiles.length === 0) {
                toast.error("At least one boq file is required");
                return;
            }
        try {
            setSubmitting(true)
            const finalData = {
                companyName: formData.companyName || "",
                gstNumber: formData.gstNumber || "",
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                pinCode: formData.pinCode,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                boqfiles: formData.boqfiles.map(f => f.name) || [],
                installationimages: formData.installationimages.map(f => f.name) || [],
                file2: formData.file2.map(f => f.name) || [],
                products: products.map(({ showDetails, ...p }) => ({
                    ...p,
                    image: p.image.map(f => f.name),
                }))
            };
            await addDoc(collection(firestorage, "orders"), finalData);
            console.log("Form submitted:", finalData);
            toast.success("Form submitted successfully");
            setFormData(initialFormData);
            setProducts([]);
        }
        catch (error) {
            toast.error("submission failed");
            console.log(error)
        }
        finally {
            setSubmitting(false)
        }
    };
    const handleCancel = () => {
        setFormData(initialFormData);
        setProducts([]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    const selectedUnit = productData.unit;
    return (
        <div className="min-h-screen font-poppins bg-white px-6 md:px-16 lg:px-24 xl:px-32 py-8">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl ">
                    <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium mb-4">
                        Stonepedia Bulk Orders
                    </h1>
                    <h2 className="text-[#BDBDBD] text-base md:text-md lg:text-lg xl:text-xl 2xl:text-2xl">
                        Fill this form to connect with us.
                    </h2>
                    <div className="max-w-xl">
                        <p className=" text-xs lg:text-sm xl:text-base md:max-w-md lg:max-w-xl xl:max-w-2xl text-[#BDBDBD]">
                            We only consider 10,000 to 1,00,000 sqft orders here. More than 1,00,000 buy it from project collaboration.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    <div className=" shadow-lg md:shadow-2xl sm:mt-5  p-4 w-full md:w-[60%]  bg-white rounded-2xl">
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
                                className={` cursor-pointer px-6 py-2 rounded-lg text-sm font-medium  ${tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
                                    }`}
                            >
                                Business
                            </button>
                        </div>
                        <form id="myForm" onSubmit={onSubmit} className="space-y-4">
                            <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                                <div className="w-full flex flex-col ">
                                    <label htmlFor="fullName" className="mb-0.5 font-semibold text-xs min-h-[20px]">
                                        Full Name
                                    </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
                                                id="fullName"
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleChange}
                                                placeholder="Enter full name"
                                                required
                                            />
                                            <label htmlFor="fullName" className="pr-3 text-gray-600">
                                                <LuUserRound size={16} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col">
                                    <label htmlFor="companyName" className="mb-0.5 font-semibold text-xs min-h-[20px]">
                                        Company Name
                                        <span className={`text-gray-400 text-sm ${tab === "business" ? "invisible" : "visible"}`}> (optional)</span>
                                    </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Globex industries pvt.ltd"
                                                className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
                                                required={tab === "business"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                                <div className="w-full flex flex-col">
                                    <label htmlFor="gstNumber" className="mb-0.5 font-semibold text-xs min-h-[20px]">
                                        GST Number
                                        <span className={`text-gray-400 text-sm ${tab === "business" ? "invisible" : "visible"}`}> (optional)</span>
                                    </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                id="gstNumber"
                                                type="number"
                                                name="gstNumber"
                                                value={formData.gstNumber}
                                                onChange={handleChange}
                                                placeholder="Enter here"
                                                className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
                                                required={tab === "business"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col ">
                                    <label htmlFor="email" className="mb-0.5 font-semibold text-xs min-h-[20px]">
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
                                                className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
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
                                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                        <textarea
                                            id="address"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter here"
                                            className="flex-1 bg-transparent outline-none border-0 p-3 text-xs w-full"
                                            rows={3}               
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
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
                                                className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
                                            />
                                            <label htmlFor="phone" className="pr-3 text-gray-600">
                                                <CiMobile3 size={16} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full  flex flex-col">
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
                                                className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form onSubmit={addProduct} className="space-y-4">
                            <p className="block font-medium text-[16px] text-black mt-3 mb-2">Product Details <span className="text-gray-400">(Add multiple products here)</span></p>
                            <div className="border border-dashed border-gray-300 rounded-lg mb-6 p-4">
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
                                                        className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
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

                                                        className="flex-1 bg-transparent outline-none border-0 p-3 text-xs appearance-none w-full"
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
                                            <Select
                                                options={[
                                                    { label: "Mirror Polished", value: "mirror polished" },
                                                    { label: "Honed", value: "honed" },
                                                    { label: "Tumbled", value: "tumbled" },
                                                    { label: "Brushed", value: "brushed" },
                                                    { label: "Flamed", value: "flamed" },
                                                    { label: "Lapato", value: "lapato" },
                                                    { label: "Leather", value: "leather" },
                                                    { label: "River-Polished", value: "river-polished" },
                                                    { label: "Sand-blast", value: "sand-blast" },
                                                    { label: "Shot-blast", value: "shot-blast" },
                                                ]}

                                                value={
                                                    productData.stoneFinish
                                                        ? { label: productData.stoneFinish, value: productData.stoneFinish }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setProductData((prev) => ({ ...prev, stoneFinish: selected.value }))
                                                }
                                                required
                                                placeholder="Finish"
                                                className="text-xs"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="thickness" className="mb-0.5 font-semibold text-xs">
                                                Thickness
                                            </label>
                                            <Select
                                                options={[
                                                    { label: "8MM", value: "8mm" },
                                                    { label: "12MM", value: "12mm" },
                                                    { label: "14MM", value: "14mm" },
                                                    { label: "16MM", value: "16mm" },
                                                    { label: "18MM", value: "18mm" },
                                                    { label: "20MM", value: "20mm" },
                                                    { label: "25MM", value: "25mm" },
                                                    { label: "30MM", value: "30mm" },
                                                    { label: "Other", value: "other" },
                                                ]}
                                                value={
                                                    productData.thickness
                                                        ? { label: productData.thickness, value: productData.thickness }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setProductData((prev) => ({ ...prev, thickness: selected.value }))
                                                }
                                                required
                                                placeholder="Thickness"
                                                className="text-xs"
                                            />
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">                                        <div>
                                        <label htmlFor="unit" className="mb-0.5 font-semibold text-xs">
                                            Select Unit
                                        </label>
                                        <Select
                                            options={[
                                                { label: "MM", value: "mm" },
                                                { label: "SQFT", value: "sqft" },
                                            ]}
                                            value={
                                                productData.unit
                                                    ? { label: productData.unit, value: productData.unit }
                                                    : null
                                            }
                                            onChange={(selected) =>
                                                setProductData((prev) => ({ ...prev, unit: selected.value }))
                                            }
                                            required
                                            placeholder="Units"
                                            className="text-xs"
                                        />
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

                                                        className="flex-1 bg-transparent outline-none border-0 px-3  py-3  md:py-2.5 text-xs appearance-none w-full"
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
                                                        <Select
                                                            options={[
                                                                { label: "5-8 ft", value: "5-8 ft" },
                                                                { label: "8-11 ft", value: "8-11 ft" },
                                                            ]}
                                                            value={
                                                                productData.width
                                                                    ? { label: productData.width, value: productData.width }
                                                                    : null
                                                            }
                                                            onChange={(selected) =>
                                                                setProductData((prev) => ({ ...prev, width: selected.value }))
                                                            }
                                                            required
                                                            placeholder="Width"
                                                            className="text-xs"
                                                        />
                                                    </div>
                                                    <div>

                                                        <Select
                                                            options={[
                                                                { label: "2-3 ft", value: "2-3 ft" },
                                                                { label: "4-5 ft", value: "4-5 ft" },
                                                            ]}
                                                            value={
                                                                productData.height
                                                                    ? { label: productData.height, value: productData.height }
                                                                    : null
                                                            }
                                                            onChange={(selected) =>
                                                                setProductData((prev) => ({ ...prev, height: selected.value }))
                                                            }
                                                            required
                                                            placeholder="Height"
                                                            className="text-xs"
                                                        />
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
                                                            min={new Date().toLocaleDateString('en-CA')}
                                                            className="flex-1 bg-transparent outline-none border-0 px-3 py-2.5 text-xs"
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
                                                className="resize-y   w-full border border-gray-300 rounded-md p-2 mt-1 text-xs outline-none "
                                            />
                                        </div>
                                        <div
                                            className="border mt-4 border-dashed mb-4 border-[#871B58] rounded-lg p-6 text-center text-gray-600 relative bg-white hover:shadow-md transition">
                                            <input
                                                id="productImageInput"
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                accept="video/*,image/*"
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
                                        <div className="flex gap-2 justify-end mt-[8px]">
                                            {editIndex != null && (
                                                <>

                                                    <button
                                                        onClick={editCancel}
                                                        disabled={editIndex === null}
                                                        type="button"
                                                        className="px-4 py-2 md:px-8 border border-gray-300 rounded-md text-gray-700 text-xs cursor-pointer hover:bg-gray-50 "
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                type="submit"
                                                className="text-white text-xs cursor-pointer bg-[#871B58] px-4 py-2 md:px-8 lg:px-10 xl:px-14 rounded-md  "
                                            >
                                                {editIndex !== null ? "Save Changes" : "Add Product"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <form id="myForm" onSubmit={onSubmit} className="space-y-4">
                            <div className="w-full h-auto pl-4 pr-4 pt-4 relative">
                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="installation"
                                        onChange={(e) => setSelected(e.target.checked)}
                                        className=" w-4 h-4   accent-[#871B58] mr-2"
                                    />
                                    <label htmlFor="installation" className=" text-lg font-medium text-gray-900">
                                        Installation <span className="text-[#CACACA] text-sm">(optional)</span>
                                    </label>
                                </div>
                                {selected && (
                                    <div className="border border-dashed border-gray-300 rounded-lg pr-4 pt-4 pl-4">
                                        <p className="text-[#414141] text-xs font-medium tracking-wide pointer-events-none mb-2">
                                            Choose between normal and patterned tiles
                                        </p>
                                        <div className="flex gap-4 mb-6">
                                            <label
                                                className={`p-2 rounded-lg flex gap-4 items-center ${installationType === "normal"
                                                    ? "bg-[#FFF7FB] text-black border border-[#871B58]"
                                                    : "bg-white text-gray-600 border border-[#D7D7D7]"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="installationType"
                                                    value="normal"
                                                    checked={installationType === "normal"}
                                                    onChange={(e) => setInstallationType(e.target.value)}
                                                    className=" accent-[#871B58] text-[#871B58]"
                                                />
                                                <span className="mr-3 md:mr-5 text-sm font-medium">Normal</span>
                                            </label>
                                            <label
                                                className={`p-2 rounded-lg flex gap-4 items-center ${installationType === "pattern"
                                                    ? "bg-[#FFF7FB] text-black border border-[#871B58]"
                                                    : "bg-white text-gray-600 border border-[#D7D7D7]"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="installationType"
                                                    value="pattern"
                                                    checked={installationType === "pattern"}
                                                    onChange={(e) => setInstallationType(e.target.value)}
                                                    className=" accent-[#871B58] text-[#871B58]"
                                                />
                                                <span className="mr-3 md:mr-5 text-sm font-medium">Pattern</span>
                                            </label>
                                        </div>
                                        {installationType === "pattern" && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                                                <div
                                                    className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition w-full">
                                                    <input
                                                        type="file"
                                                        id="installationimages"
                                                        name="installationimages"
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        accept="video/*,image/*"
                                                        onChange={handleChange}
                                                    />
                                                    <FiUpload size={20} className="mx-auto mb-2 text-gray-900" />
                                                    <p className="text-[#2C2C2C] text-xs font-medium tracking-wide pointer-events-none mb-1">
                                                        {formData.installationimages?.length > 0
                                                            ? ` Uploaded ${formData.installationimages.length} `
                                                            : "Choose a Image & video drag & drop it here"}
                                                    </p>
                                                    <span className="text-[8px] block mb-4 text-gray-400 pointer-events-none">
                                                        JPEG, PNG and MP4 formats upto 20MB
                                                    </span>
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
                                                    <span className="text-[8px] block mb-3 text-gray-400 pointer-events-none">
                                                        Upload upto 20mb file here
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => document.getElementById("file2").click()}
                                                        className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
                                                    >
                                                        Browse
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-[40%]">
                        {products.length === 0 ? (
                            <div
                                onClick={() => {
                                    const el = document.getElementById("stoneCategory");
                                    if (el) {
                                        const y =
                                            el.getBoundingClientRect().top + window.scrollY - 80;
                                        window.scrollTo({ top: y, behavior: "smooth" });
                                        el.focus();
                                    }
                                }}
                                className="flex flex-col   sm:mt-6  items-center justify-center py-13 px-8 text-center border border-dashed border-gray-300 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl hover:border-[#871B58]/60 transition-all duration-300 cursor-pointer"
                            >
                                <HiPlus className="h-12 w-12 text-[#871B58] mb-4" />
                                <h4 className="text-2xl font-semibold text-gray-700">
                                    No products added yet
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">
                                    Click to start adding your products
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-[#414141] font-semibold text-sm ">
                                    {products.length < 10
                                        ? `Products Added -0${products.length}`
                                        : `Products Added - ${products.length}`
                                    }
                                </h3>
                                <div className="space-y-3">
                                    {products.map((product, index) => (
                                        <div key={index} className="shadow-md rounded-lg p-3 bg-white  w-full">
                                            <div className="flex mb-1 justify-between gap-3">
                                                <div className="flex flex-col gap-0 min-w-0 text-xs md:text-sm">
                                                    <h3 className="font-semibold capitalize">
                                                        {product.stoneName}
                                                    </h3>
                                                    <p className="text-xs md:text-sm text-[#A5A5A5]">
                                                        {product.stoneCategory}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 items-start shrink-0">
                                                    {editIndex === null && (
                                                        <>
                                                            <button
                                                                className="p-1 bg-[#F7F7F7] text-sm lg:text-lg rounded-md cursor-pointer"
                                                                title="Edit"
                                                                onClick={() => editProduct(index)}
                                                            >
                                                                <MdOutlineEdit size={18} className=" text-black" />
                                                            </button>
                                                            <button
                                                                onClick={() => removeProduct(index)}
                                                                className="p-1 bg-[#F7F7F7] text-sm lg:text-lg rounded-md cursor-pointer"
                                                                title="Delete"
                                                            >
                                                                <RiDeleteBin5Line size={18} className=" text-red-500 hover:text-red-700" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className=" space-y-2 text-[10px] md:text-xs ">
                                                <div className="grid grid-cols-2 pt-2   pb-2 gap-y-2  ">
                                                    <p className="font-medium text-black">
                                                        Selected Finishes:
                                                        <span className=" text-[#838383]"> {product.stoneFinish}</span>
                                                    </p>
                                                    <p className="font-medium text-black">
                                                        Selected Thickness:
                                                        <span className=" text-[#838383]"> {product.thickness}</span>
                                                    </p>
                                                    <p className="font-medium text-black">
                                                        Selected Unit:
                                                        <span className=" text-[#838383]"> {product.unit}</span>
                                                    </p>
                                                    <p className="font-medium text-black">
                                                        Entered Value:
                                                        <span className=" text-[#838383]"> {product.value}</span>
                                                    </p>
                                                    <p className="font-medium text-black">
                                                        Stone Size:
                                                        <span className=" text-[#838383]"> w: {product.width} | H: {product.height}</span>
                                                    </p>

                                                    <p className="font-medium text-black">
                                                        Delivery Expected:
                                                        <span className="font-normal text-[#838383]"> {product.deliveryTime}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" border-gray-200 ">
                                                <button
                                                    onClick={() => toggleDetails(index)}
                                                    className="flex gap-1 items-center text-xs cursor-pointer"
                                                >
                                                    <span className="text-xs">Product Details</span>
                                                    <RiArrowDropDownLine
                                                        className={`w-7 h-7 text-[#474747] transition-transform duration-300 ${product.showDetails ? "rotate-180 text-[#871B58]" : ""
                                                            }`}
                                                    />
                                                </button>
                                                {product.showDetails && (
                                                    <div className="  overflow-y-auto px-2 space-y-2 text-xs  max-h-[55vh] sm:max-h-[367px] ">
                                                        <div className="  rounded-md space-y-1 border-[1px] border-[#E8E8E8] p-2">
                                                            <p className="font-medium text-sm ">Description:</p>
                                                            <p className={` text-xs text-[#3B3B3B] ${!showFull ? "line-clamp-3" : "line-clamp-none"}`}>{product.message}</p>
                                                            {product.message.split(" ").length > 15 && (
                                                                <button onClick={() => setShowFull(!showFull)} className="text-[#871B58] text-primary cursor-pointer hover:underline ml-1 font-medium text-xs">
                                                                    {showFull ? "Read less" : "Read more"}
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-[#414141] font-semibold">Stone Image’s/Videos</p>
                                                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4   gap-2 w-full">
                                                                <button className="border-dashed border relative aspect-square border-[#871B58] rounded-lg flex flex-col items-center justify-center text-gray-900 text-xs hover:shadow-md transition">
                                                                    <HiPlus className="h-5 w-5 text-black mb-1" />
                                                                    <span className="text-xs text-center">Add Video</span>
                                                                    <input
                                                                        type="file"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        accept="video/*"
                                                                        multiple
                                                                        onChange={(e) => handleFileUpload(e, index)}
                                                                    />
                                                                </button>
                                                                <button className="border-dashed border relative aspect-square border-[#871B58] rounded-lg flex flex-col items-center justify-center text-gray-900 text-xs hover:shadow-md transition">
                                                                    <HiPlus className="h-5 w-5 text-black mb-1" />
                                                                    <span className="text-xs text-center">Add Image</span>
                                                                    <input
                                                                        type="file"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        accept="image/*"
                                                                        multiple
                                                                        onChange={(e) => handleFileUpload(e, index)}
                                                                    />
                                                                </button>

                                                                {product.image.map((img, i) => (
                                                                    <div key={i} className="group  relative aspect-square  "
                                                                    >
                                                                        <img

                                                                            src={URL.createObjectURL(img)}
                                                                            alt=""
                                                                            className="w-full h-full rounded-lg object-coverr"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleDelete("image", index, i)}
                                                                            className="cursor-pointer absolute -top-3 -right-2 text-red-600 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                                                        >
                                                                            <TiDeleteOutline size={24} />
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {((formData.boqfiles && formData.boqfiles.length > 0) ||
                                    (formData.installationimages && formData.installationimages.length > 0)) && (
                                        <div className="bg-white rounded-2xl shadow-lg mt-5 p-5">
                                            {formData.boqfiles && formData.boqfiles.length > 0 && (
                                                <div>
                                                    <p className="text-[#414141] text-xs font-medium">BOQ Certificate:</p>
                                                    <div className="flex flex-col gap-2 mt-2 mb-2 border-[1px] p-3 rounded-md bg-[#ABABAB1F] border-[#C8C8C8] ">
                                                        {formData.boqfiles.map((file, index) => (
                                                            <div key={index} className="flex items-center  justify-between gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-7 h-7 bg-[#FF0000] rounded flex items-center justify-center">
                                                                        <span className="text-white text-xs font-bold">PDF</span>
                                                                    </div>
                                                                    <span className="text-xs text-[#000000]">{file.name}</span>
                                                                </div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleDelete("boqfiles", null, index)
                                                                    }
                                                                    className="cursor-pointer   text-red-600 rounded-full w-6 h-6 flex items-center justify-center  transition"
                                                                >
                                                                    <TiDeleteOutline size={24} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            {formData.installationimages && formData.installationimages.length > 0 && (
                                                <div>
                                                    <p className="text-[#414141] text-xs font-medium">Installation Design Image/Video:</p>
                                                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4   gap-2 w-full">
                                                        <button className="border-dashed border relative aspect-square border-[#871B58] rounded-lg flex flex-col items-center justify-center text-gray-900 text-xs hover:shadow-md transition"
                                                        >
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
                                                        <button className="border-dashed dashed-4 relative  border border-[#871B58] rounded-lg flex flex-col hover:shadow-md transition items-center justify-center text-gray-900 text-xs">
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
                                                            <div key={i} className="group relative aspect-square  ">
                                                                <img
                                                                    src={URL.createObjectURL(img)}
                                                                    alt=""
                                                                    className="w-full h-full rounded-lg object-coverr"
                                                                />
                                                                <button
                                                                    onClick={() => handleDelete("installationimages", null, i)}
                                                                    className="cursor-pointer absolute -top-3 -right-2 text-red-600 rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                                                >
                                                                    <TiDeleteOutline size={24} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                <div>
                                    {editIndex === null && (
                                        <div className="flex justify-end gap-3 mt-4">
                                            <div className="flex justify-end gap-3">
                                                <button
                                                    type="button"
                                                    className="cursor-pointer font-inter border text-black px-4 py-1 rounded-lg mb-6"
                                                    onClick={handleCancel}
                                                >
                                                    Clear
                                                </button>
                                                <button form="myForm" type="submit" className="cursor-pointer font-inter bg-[#871B58] text-white px-4 py-1 rounded-lg mb-6 hover:scale-105 transition-transform duration-200" disabled={submitting}>
                                                    {submitting ? "Submitting..." : "Submit"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}
