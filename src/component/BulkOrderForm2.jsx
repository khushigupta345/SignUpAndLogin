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
        // _preview: null,
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
        setEditIndex(index);
        const el = document.getElementById("stoneCategory");
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
            el.focus();
        }
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

                    toast.error(`${files[i].name} exceeds ${MAX_FILE_SIZE_MB}MB limit`);
                }
            }

            setProductData((prev) => {
                const mergedFiles = [...(prev.image || []), ...addedFiles];
                return {
                    ...prev,
                    image: mergedFiles,
                    // _preview: mergedFiles.map((f) => URL.createObjectURL(f)),
                };
            });
        } else {
            setProductData((prev) => ({ ...prev, [name]: value }));
        }
    };
    {
        // products.map((product, index) => (
        //     <div key={index} className="flex gap-3 mt-2 flex-wrap">

        //         {/* Image select button */}
        //         <button className="relative w-20 h-20 border rounded-lg flex flex-col items-center justify-center text-gray-500 text-xs">
        //             + Add Image
        //             <input
        //                 type="file"
        //                 className="absolute inset-0 opacity-0 cursor-pointer"
        //                 accept="image/*"
        //                 onChange={(e) => handleImageSelect(e, index)}
        //             />
        //         </button>

        {/* Preview section for this product */ }
        {/* {product._previews?.map((preview, i) => (
                    <img
                        key={i}
                        src={preview}
                        alt={`product-${index}-file-${i}`}
                        className="w-24 h-20 rounded-lg object-cover border"
                    />
                ))} */}
        //     </div>
        // ))
    }

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        if (type === "file") {
            if (!files?.length) return;

            const validFiles = Array.from(files).filter(file => {
                if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                    toast.error(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit`);
                    return false;
                }
                return true;
            });

            setFormData(prev => ({
                ...prev,
                [name]: [...(prev[name] || []), ...validFiles],
            }));

        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDeleteFile = (type, index) => {
        const updated = [...formData[type]];
        updated.splice(index, 1);
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

        updated[pIndex].image.splice(iIndex, 1);
        setProducts(updated);
    };

    const handleFileUpload = (e, index, type) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        const MAX_SIZE_MB = type === "image" ? 20 : 50;

        let addedFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].size <= MAX_SIZE_MB * 1024 * 1024) {
                addedFiles.push(files[i]);
            } else {
                toast.error(`${files[i].name} exceeds 20MB limit`);
            }
        }


        setProducts((prevProducts) =>
            prevProducts.map((p, i) =>
                i === index
                    ? {
                        ...p,
                        image: [...(p.image || []), ...addedFiles],

                    }
                    : p
            )
        );
    };



    const addProduct = (e) => {
        e.preventDefault();


        const files = productData.image || [];


        for (let file of files) {
            if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
                toast.error(`${file.name} must be less than ${MAX_FILE_SIZE_MB}MB`);
                return;
            }
        }




        const newProduct = {
            ...productData,
            image: files,

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

        console.log(initialProductData)
        setProductData(initialProductData);
    };
    const removeProduct = (index) => {
        setProducts((prev) => {
            const item = prev[index];
            // if (item?._preview) {
            //     URL.revokeObjectURL(item._preview);
            // }
            return prev.filter((_, i) => i !== index);
        });
    };


    const onSubmit = (e) => {
        e.preventDefault();
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
        <div className="min-h-screen font-poppins bg-white px-4 sm:px-6 lg:px-30 py-8">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                <div className="max-w-2xl">
                    <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-medium">
                        Stonepedia Bulk Orders
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-[#BDBDBD]">
                        Fill this form to connect with us.
                    </p>
                    <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-[#BDBDBD]">
                        We only consider 10,000 to 1,00,000 sqft orders here. More than 1,00,000 buy it from project collaboration.
                    </p>

                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">

                    {/* <div className="shadow-2xl p-5 md:p-10 flex-1  w-full bg-white rounded-2xl"> */}
                    <div className="shadow-2xl sm:mt-6 p-5 md:p-10 w-full lg:w-[55%]  bg-white rounded-2xl">
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
                            <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">


                                <div className="w-full flex flex-col ">
                                    <label htmlFor="fullName" className="mb-0.5 font-semibold text-xs min-h-[20px]">
                                        Full Name
                                    </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
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
                                        {tab !== "business" && <span className="text-gray-400 text-sm"> (optional)</span>}
                                    </label>
                                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                                        <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Globex industries pvt.ltd"
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
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
                                        {tab !== "business" && <span className="text-gray-400 text-sm"> (optional)</span>}
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
                                                className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
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
                            <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-3 w-full">


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
                                                // value={productData.stoneFinish}
                                                // onChange={(selected) =>
                                                //     setProductData((prev) => ({ ...prev, stoneFinish: selected }))
                                                // }
                                                // placeholder="Finish"
                                                // className="text-xs"
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

                                            {/* <select
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

                                                    </select> */}

                                        </div>
                                        <div>
                                            <label htmlFor="thickness" className="mb-0.5 font-semibold text-xs">
                                                Thickness
                                            </label>

                                            <Select
                                                // options={[
                                                // { label: "8MM", value: "8mm" },
                                                // { label: "12MM", value: "12mm" },
                                                // { label: "14MM", value: "14mm" },
                                                // { label: "16MM", value: "16mm" },
                                                // { label: "18MM", value: "18mm" },
                                                // { label: "20MM", value: "20mm" },
                                                // { label: "25MM", value: "25mm" },
                                                // { label: "30MM", value: "30mm" },
                                                // { label: "Other", value: "other" },
                                                // ]}
                                                // value={productData.thickness}
                                                // onChange={(selected) =>
                                                //     setProductData((prev) => ({ ...prev, thickness: selected }))
                                                // }
                                                // placeholder="Thickness"
                                                // className="text-xs"
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

                                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">


                                        <div>
                                            <label htmlFor="unit" className="mb-0.5 font-semibold text-xs">
                                                Select Unit
                                            </label>
                                            {/* <Select
                                                options={[
                                                    { label: "MM", value: "mm" },
                                                    { label: "SQFT", value: "sqft" },
                                                ]}
                                                value={
                                                    productData.unit
                                                        ? { label: productData.unit.toUpperCase(), value: productData.unit }
                                                        : null
                                                }
                                                onChange={(selected) =>
                                                    setProductData((prev) => ({
                                                        ...prev,
                                                        unit: selected.value, // sirf value store ho rahi
                                                    }))
                                                }
                                                placeholder="Units"
                                                required
                                                name="unit"
                                                className="text-xs"
                                            /> */}

                                            <Select
                                                // options={[
                                                //     { label: "MM", value: "mm" },
                                                //     { label: "SQFT", value: "sqft" },
                                                // ]}
                                                // value={
                                                //     productData.unit
                                                //         ? { label: productData.unit.toUpperCase(), value: productData.unit }
                                                //         : null
                                                // }
                                                // onChange={(selected) =>
                                                //     setProductData((prev) => ({
                                                //         ...prev,
                                                //         unit: selected.value, // sirf value store ho rahi
                                                //     }))
                                                // }
                                                // placeholder="Units"
                                                // required
                                                // name="unit"
                                                // className="text-xs"
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
                                                        {
                                                    /*

                                                        <Select
                                                            options={[
                                                                { label: "5-8 ft", value: "5-8 ft" },
                                                                { label: "8-11 ft", value: "8-11 ft" },
                                                            ]}
                                                            value={productData.width}
                                                            onChange={(selected) =>
                                                                setProductData((prev) => ({ ...prev, width: selected }))
                                                            }
                                                            placeholder="Width"
                                                            className="text-xs"
                                                        /> */}

                                                        {/* <select
                                                                    id="width"
                                                                    name="width"
                                                                    placeholder="Width"

                                                                    value={productData.width}

                                                                    required
                                                                    onChange={handleProductChange}
                                                                    className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
                                                                >

                                                                    <option value="">Choose</option>
                                                                    <option value="5-8 ft">5-8 ft</option>
                                                                    <option value="8-11 ft">8-11 ft</option>

                                                                </select> */}




                                                    </div>


                                                    <div>
                                                        {/* <select
                                                                    id="height"
                                                                    name="height"
                                                                    placeholder="Height"
                                                                    required

                                                                    value={productData.height}


                                                                    onChange={handleProductChange}
                                                                    className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"


                                                                >

                                                                    <option value="">Choose</option>
                                                                    <option value="2-3 ft">2-3 ft</option>
                                                                    <option value="4-5 ft">4-5 ft</option>

                                                                </select> */}
                                                        {/* <Select
                                                            options={[
                                                                { label: "2-3 ft", value: "2-3 ft" },
                                                                { label: "4-5 ft", value: "4-5 ft" },
                                                            ]}
                                                            value={productData.height}
                                                            onChange={(selected) =>
                                                                setProductData((prev) => ({ ...prev, height: selected }))
                                                            }
                                                            placeholder="Height"
                                                            className="text-xs"
                                                        /> */}
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



                            <div className="w-full h-auto  border border-dashed border-gray-300 rounded-lg pl-4 pr-4 pt-4  relative">



                                <div className="flex items-center mb-4">
                                    <input
                                        type="checkbox"
                                        id="installation"
                                        onChange={(e) => setSelected(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="installation" className="text-lg font-medium text-gray-900">Installation (optional)</label>
                                </div>
                                <div  >

                                    {selected === true && (
                                        <>
                                            <p className="text-[#414141] text-xs font-medium tracking-wide pointer-events-none mb-2">Choose bwtween normal and patterned tiles</p>

                                            <div className="flex gap-4   mb-6  ">

                                                <label className={`" p-2  rounded-lg flex gap-4 items-center ${installationType === "pattern"
                                                    ? "bg-[#FFF7FB] text-black  border border-[#871B58]"
                                                    : "bg-white  text-gray-600  border border-[#D7D7D7]"
                                                    }`}>

                                                    <input
                                                        type="radio"
                                                        name="installationType"
                                                        value="pattern"
                                                        checked={installationType === "pattern"}
                                                        onChange={(e) => setInstallationType(e.target.value)}
                                                        className="mr-1 accent-[#871B58] text-[#871B58]"


                                                    />
                                                    <span className="mr-5 text-sm font-medium">Pattern</span>
                                                </label>

                                                <label className={` p-2  rounded-lg flex gap-4 items-center ${installationType === "normal"
                                                    ? "bg-[#FFF7FB] text-black  border border-[#871B58]"
                                                    : "bg-white  text-gray-600  border border-[#D7D7D7]"
                                                    }`}>
                                                    <input
                                                        type="radio"
                                                        name="installationType"
                                                        value="normal"
                                                        checked={installationType === "normal"}
                                                        onChange={(e) => setInstallationType(e.target.value)}
                                                        className="mr-1 accent-[#871B58] text-[#871B58]"
                                                    />
                                                    <span className="mr-5 text-sm font-medium">Normal</span>
                                                </label>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                                                <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition w-full">
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

                                        </>
                                    )}
                                </div>
                            </div>


                        </form>
                    </div>



                    <div className="w-full  lg:w-[45%]">

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

                                <div className="space-y-4">
                                    {products.map((product, index) => (

                                        <div key={product.id} className="bg-white rounded-2xl shadow-lg p-3">
                                            <div className="flex items-start justify-between gap-3 ">

                                                <div className="flex items-start gap-3 flex-1 min-w-0">

                                                    <div className="shrink-0">
                                                        <button className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gray-50  flex flex-col items-center justify-center text-gray-400 hover:shadow-md transition">
                                                            {product.thumbnail && product.thumbnail.length > 0 ? (
                                                                <img
                                                                    src={URL.createObjectURL(products[index].thumbnail[0])}
                                                                    alt="preview"
                                                                    className="h-full w-full object-cover rounded-xl"
                                                                />
                                                            ) : (
                                                                <div className="flex flex-col w-20 h-20 sm:w-24 sm:h-24 items-center justify-center">
                                                                    <RiGalleryLine className="w-6 h-6 mb-1 sm:w-7 sm:h-7" />
                                                                    <span className="text-[11px] sm:text-xs font-medium">Add Thumbnail</span>
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
                                                                        setProducts((prev) =>
                                                                            prev.map((p, i) =>
                                                                                i === index ? { ...p, thumbnail: [file] } : p
                                                                            )
                                                                        );
                                                                    } else {
                                                                        toast.error(`${file.name} 50MB maximum`);
                                                                    }
                                                                }}
                                                            />
                                                        </button>
                                                    </div>



                                                    <div className="text-xs space-y-1 min-w-0">
                                                        <h3 className="font-semibold text-sm text-gray-800 ">
                                                            {product.stoneName}
                                                        </h3>
                                                        <p className="text-[#A5A5A5]">
                                                            {product.stoneCategory}
                                                        </p>
                                                        {formData.companyName && (
                                                            <p className="text-[10px]  text-[#636363]">
                                                                <span className="font-medium">Company Name: </span>
                                                                {formData.companyName}
                                                            </p>
                                                        )}
                                                        {formData.gstNumber && (
                                                            <p className="text-[10px]  text-[#636363]">
                                                                <span className="font-medium">GST Number: </span>
                                                                {formData.gstNumber}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>


                                                <div className="flex mt-0 sm:mt-1 items-center gap-2 shrink-0">
                                                    {editIndex === null && (
                                                        <>
                                                            <button
                                                                className="cursor-pointer p-2 rounded-lg bg-gray-50 hover:bg-gray-100 shadow-sm transition"
                                                                title="Edit"
                                                                onClick={() => editProduct(index)}
                                                            >
                                                                <FiEdit2 className="w-2 h-2 sm:w-4 sm:h-4 text-gray-600" />
                                                            </button>
                                                            <button
                                                                onClick={() => removeProduct(index)}
                                                                className="cursor-pointer p-2 rounded-lg bg-gray-50 hover:bg-red-50 shadow-sm transition"
                                                                title="Delete"
                                                            >
                                                                <FiTrash2 className="w-2 h-2 sm:w-4 sm:h-4 text-red-600" />
                                                            </button>
                                                        </>
                                                    )}

                                                </div>
                                            </div>


                                            <div className=" border-gray-200 pt-2">
                                                <button
                                                    onClick={() => toggleDetails(index)}
                                                    className="flex gap-3 items-center text-xs cursor-pointer"
                                                >
                                                    <span>Product Details</span>
                                                    <RiArrowDropDownLine
                                                        className={`w-7 h-7 text-[#474747] transition-transform duration-300 ${product.showDetails ? "rotate-180 text-[#871B58]" : ""
                                                            }`}
                                                    />
                                                </button>





                                                {product.showDetails && (
                                                    <div className="  overflow-y-auto px-2 space-y-2 text-xs  max-h-[55vh] sm:max-h-[367px] ">

                                                        <div className="grid grid-cols-2 gap-y-2 border-[1px] p-2 rounded-md border-[#C8C8C8] ">
                                                            <p className="font-medium">
                                                                Selected Finishes:
                                                                <span className="font-normal text-[#838383]"> {product.stoneFinish}</span>
                                                            </p>

                                                            <p className="font-medium">
                                                                Selected Thickness:
                                                                <span className="font-normal text-[#838383]"> {product.thickness}</span>
                                                            </p>

                                                            <p className="font-medium">
                                                                Selected Unit:
                                                                <span className="font-normal text-[#838383]"> {product.unit}</span>
                                                            </p>

                                                            <p className="font-medium">
                                                                Entered Value:
                                                                <span className="font-normal text-[#838383]"> {product.value}</span>
                                                            </p>

                                                            <p className="font-medium">
                                                                Stone Size:
                                                                <span className="font-normal text-[#838383]"> w: {product.width} | H: {product.height}</span>
                                                            </p>

                                                            <p className="font-medium">
                                                                Delivery Expected:
                                                                <span className="font-normal text-[#838383]"> {product.deliveryTime}</span>
                                                            </p>
                                                        </div>


                                                        <div className=" border-[1px] p-2 rounded-md  border-[#C8C8C8] ">

                                                            <p className="font-medium text-xs mb-2">Description:</p>

                                                            <p className=" text-[#3B3B3B]">
                                                                {product.message}
                                                            </p>

                                                        </div>





                                                        <div>

                                                            <p className="text-[#414141] text-xs font-medium">Stone Image’s/Videos</p>

                                                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4   gap-2 w-full">

                                                                <button className="border-dashed border relative aspect-square border-[#871B58] rounded-lg flex flex-col items-center justify-center text-gray-900 text-xs hover:shadow-md transition">
                                                                    <HiPlus className="h-5 w-5 text-black mb-1" />
                                                                    <span className="text-xs text-center">Add Video</span>
                                                                    <input
                                                                        type="file"
                                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                                        accept="video/*"
                                                                        multiple
                                                                        onChange={(e) => handleFileUpload(e, index, "video")}
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
                                                                        onChange={(e) => handleFileUpload(e, index, "image")}
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
                                                                            onClick={() => handleDeleteImage(index, i)}
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
                                                                    onClick={() => handleDeleteFile("boqfiles", index)}
                                                                    //     className="cursor-pointer text-red-500 text-xs font-bold"
                                                                    // >
                                                                    //     <FiTrash2 className="w-4 h-4 text-red-600" />
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
                                                                    onClick={() => handleDeleteFile("installationimages", i)}
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

                                                    className="cursor-pointer font-inter border text-black px-8 py-1 rounded mb-6"

                                                    onClick={handleCancel}
                                                >

                                                    Cancel
                                                </button>
                                                <button form="myForm" type="submit" className="cursor-pointer font-inter bg-[#871B58] text-white px-8 py-1 rounded mb-6 hover:scale-105 transition-transform duration-200" disabled={submitting}>

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
