import React, { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";

import { CiMail } from "react-icons/ci";
import { HiOutlinePhone } from 'react-icons/hi'
   import { MdDelete } from "react-icons/md";
export default function BulkOrderForm3() {
  
const nameRegex = /^(?=.{1,100}$)[\p{L}]+(?:[ .'-][\p{L}]+)*$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const phoneRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
const pinRegex = /^[1-9][0-9]{5}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z0-9][0-9A-Z]$/i;
const twoDecimalRegex = /^-?\d+(?:\.\d{1,2})?$/;

  const MAX_MESSAGE_WORDS = 50;
  const MAX_MESSAGE_CHARS = 300;
const countWords = (str = "") => {
  const s = String(str).trim();
  if (!s) return 0;
  return s.split(/\s+/).length;
};

  const validateSizeNumber = (value) => {
    if (value === undefined || value === null || value === "") return null; // optional
    if (isNaN(Number(value))) return "Must be a number";
    const num = Number(value);
    if (num <= 0) return "Value must be greater than 0";
    if (num < 100) return "Min 100mm";
    if (num > 3000) return "Max 3000mm";
    if (!twoDecimalRegex.test(String(value))) return "Max 2 decimal places allowed";
    return null;
  };

  const validateFile = (file, maxMB = 50) => {
  if (!file) return null;
  
  if (file instanceof File || file instanceof Blob) {
    const ok = file.size <= maxMB * 1024 * 1024;
    return ok ? null : `Max size ${maxMB}MB`;
  }

  return null;
};

const ErrorText = ({ children }) => (
  <p className="flex items-center gap-1 text-sm text-red-600 mt-1" role="alert">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v2m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 5a2 2 0 00-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
      />
    </svg>
    {children}
  </p>
);

  const validateProduct = (p) => {
    const errs = {};
    if (!p.productName) errs.productName = "Product name required";
    if (!p.productFinish) errs.productFinish = "Product finish required";
    if (!p.unit) errs.unit = "Unit is required";
    if (p.value === "" || p.value === null || p.value === undefined) {
      errs.value = "Value is required";
    } else if (isNaN(Number(p.value))) {
      errs.value = "Enter a number";
    } else if (Number(p.value) < 0.0001) {
      errs.value = "Value must be greater than 0";
    } else if (!twoDecimalRegex.test(String(p.value))) {
      errs.value = "Max 2 decimal places allowed";
    }
    if (!p.thickness) errs.thickness = "Thickness is required";
    if (!p.deliveryTime) {
      errs.deliveryTime = "DeliveryTime is Required";
    } else if (new Date(p.deliveryTime) < new Date().setHours(0,0,0,0)) {
      errs.deliveryTime = "Date cannot be in the past";
  }
    const wErr = validateSizeNumber(p.width);
    if (wErr) errs.width = wErr;
    const hErr = validateSizeNumber(p.height);
    if (hErr) errs.height = hErr;

    const imgErr = validateFile(p.image, 50);
    if (imgErr) errs.image = imgErr;
    return errs;
  };

  const validateForm = (data, tab) => {
    const errs = {};

    // Business-only fields
    if (tab === "business") {
      if (!data.companyType) errs.companyType = "Company Type is required";
      if (!data.companyName) errs.companyName = "Company Name is required";
      else if (!nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
      if (!data.gstNumber) errs.gstNumber = "GST Number is required";
      else if (!gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
    } else {
      // Optional in Individual mode: if provided, still validate format
      if (data.companyName && !nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
      if (data.gstNumber && !gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
    }

    // Personal Info
    if (!data.fullName) errs.fullName = "Full Name is required";
    else if (!nameRegex.test(data.fullName)) errs.fullName = "Enter valid name";

    if (!data.email) errs.email = "Email is required";
    else if (!emailRegex.test(data.email)) errs.email = "Invalid email";

    if (!data.phone) errs.phone = "Phone number is required";
    else if (!phoneRegex.test(data.phone)) errs.phone = "Phone must be 10 digits";

    if (!data.pinCode) errs.pinCode = "Pincode is required";
    else if (!pinRegex.test(data.pinCode)) errs.pinCode = "Pincode must be 6 digits";

    if (!data.city) errs.city = "City is required";
    else if (!nameRegex.test(data.city)) errs.city = "Enter a valid city name";

    if (!data.state) errs.state = "State is required";
    else if (!nameRegex.test(data.state)) errs.state = "Enter a state name";

    if (!data.country) errs.country = "Country is required";
    else if (!nameRegex.test(data.country)) errs.country = "Enter a valid country name";
if (data.message && typeof data.message === "string" && data.message.trim() !== "") {
  const trimmed = data.message.trim();
  const words = trimmed.split(/\s+/).length;
  const chars = trimmed.length;

  if (words > MAX_MESSAGE_WORDS) {
    errs.message = `Max ${MAX_MESSAGE_WORDS} words allowed (you have ${words})`;
  } else if (chars > MAX_MESSAGE_CHARS) {
    errs.message = `Max ${MAX_MESSAGE_CHARS} characters allowed (you have ${chars})`;
  }
}

    // Files
    const f1Err = validateFile(data.file1, 50);
    if (f1Err) errs.file1 = f1Err;
    const f2Err = validateFile(data.file2, 50);
    if (f2Err) errs.file2 = f2Err;
    const f3Err = validateFile(data.file3, 50);
    if (f3Err) errs.file3 = f3Err;

    return errs;
  };

  const initialFormData = {
  companyType: "",
  companyName: "",
  gstNumber: "",
  fullName: "",
  email: "",
  phone: "",
  pinCode: "",
  city: "",
  state: "",
  country: "",
  // product fields
  productName: "",
  productFinish: "",
  unit: "",
  value: "",
  thickness: "",
  width: "",
  height: "",
  deliveryTime: "",
  image: null,
  // files
  file1: null,
  file2: null,
  file3: null,
    
installation: "",
  message: "",
};


  const [tab, setTab] = useState("individual");
  const [submitting, setSubmitting] = useState(false);
  const [products, setProducts] = useState([]);
  const [productImage, setProductImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files && files[0] ? files[0] : null;
      setFormData((prev) => ({ ...prev, [name]: file }));
      if (name === "image") setProductImage(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (isSubmitted) {
      const fieldErrs = validateForm({ ...formData, [name]: type === 'file' ? (files && files[0] ? files[0] : null) : value }, tab);
      setErrors((prev) => ({ ...prev, [name]: fieldErrs[name] }));
    }
  };

  const toggleDetails = (index) => {
    const newProducts = [...products];
    newProducts[index].showDetails = !newProducts[index].showDetails;
    setProducts(newProducts);
  };
  const inputClass = (field) =>
  `w-full rounded-lg px-3 py-2 text-gray-700 outline-none transition duration-300 
   ${isSubmitted && errors[field] 
      ? "border border-red-500 bg-white" 
      : "border border-[#D7D7D7] bg-white focus:border-transparent focus:bg-gradient-to-t focus:from-[#d6c9ea] focus:to-[#871B58]"
   }`;

const addProduct = () => {
  const file = formData.image || null;
  const preview = file && typeof file !== "string" ? URL.createObjectURL(file) : null;

  const p = {
    productName: formData.productName,
    productFinish: formData.productFinish,
    unit: formData.unit,
    value: formData.value,
    thickness: formData.thickness,
    width: formData.width,
    height: formData.height,
    deliveryTime: formData.deliveryTime,
    image: file,
    _preview: preview,
  };

  const perrs = validateProduct(p);
  if (Object.keys(perrs).length) {
    if (preview) URL.revokeObjectURL(preview);
    setErrors(prev => ({ ...prev, ...perrs }));
    return;
  }

  setProducts(prev => [...prev, { ...p, showDetails: false }]);

  setFormData(prev => ({
    ...prev,
    productName: "",
    productFinish: "",
    unit: "",
    value: "",
    thickness: "",
    width: "",
    height: "",
    deliveryTime: "",
    image: null,
  }));
  setProductImage(null);
    setErrors((prev) => {  
    const copy = { ...prev };  
    ["productName", "productFinish", "unit", "value", "thickness", "width", "height", "deliveryTime", "image"].forEach(k => delete copy[k]);  
    return copy;  
  });
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
  setIsSubmitted(true);

  const ferrs = validateForm(formData, tab);
  if (Object.keys(ferrs).length) {
    setErrors(ferrs);
    const firstKey = Object.keys(ferrs)[0];
    const el = document.querySelector(`[name="${firstKey}"]`);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  if (products.length === 0) {
    alert("At least one product is required");
    return;
  }

  setSubmitting(true);

  const {
    companyType,
    companyName,
    gstNumber,
    fullName,
    email,
    phone,
    pinCode,
    city,
    state,
    country,
    file1,
    file2,
    file3,
    message
  } = formData;

  const finalData = {
    companyType,
    companyName,
    gstNumber,
    fullName,
    email,
    phone,
    pinCode,
    city,
    state,
    country,
    file1,
    file2,
    file3,
    message,
    products,
  };

  console.log("Final Payload:", finalData);
  alert("submit successfully");

  setFormData(initialFormData);
  setProducts([]);
  setErrors({});
  setProductImage(null);
  setSubmitting(false);
};
useEffect(() => {
  return () => {
    products.forEach((p) => {
      if (p?._preview) URL.revokeObjectURL(p._preview);
    });
  };
}, [products]);


  const selectedUnit = formData.unit;
  const files1 = formData.file1 ? [formData.file1] : null;
  const files2 = formData.file2 ? [formData.file2] : null;
  const files3 = formData.file3 ? [formData.file3] : null;

  return (
   <div className="min-h-screen font-poppins bg-white px-4 sm:px-6 lg:px-16 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-3">
          <h1 className="text-2xl sm:text-4xl font-semibold text-[#000000]">Stonepedia Bulk Orders</h1>
          <p className="text-sm sm:text-lg text-[#BDBDBD]">Fill this form to connect with us..</p>
        </div>

        {/* <div className="flex flex-col lg:flex-row gap-8"> */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* <div className="shadow-2xl p-5 md:p-10 w-full bg-white rounded-2xl"> */}
          <div className="shadow-2xl p-5 md:p-10 flex-1  w-full bg-white rounded-2xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                disabled={submitting}
                onClick={() => setTab("individual")}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                  tab === "individual" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
                }`}
              >
                Individual
              </button>

              <button
                onClick={() => setTab("business")}
                className={`px-5 py-2 rounded-lg text-sm font-medium ${
                  tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
                }`}
              >
                Business
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              {tab === "business" ? (
                <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                  {/*      <div className="w-full flex flex-col"> */}
                  <div className="w-full flex flex-col">
                    <label htmlFor="companyType" className="mb-0.5 text-xs">Company Type </label>
                    <div className={`rounded-lg p-[1px] transition ${
    errors.companyName
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.companyName ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>  
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
                      {errors.companyType && <ErrorText>{errors.companyType}</ErrorText>}
                  </div>

                       <div className="w-full flex flex-col">
<label htmlFor="companyName" className="mb-0.5 text-xs">Company Name  </label>
                    <div className={`rounded-lg p-[1px] transition ${
    errors.companyName
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.companyName ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>  

                        
                   
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      //  className={`${inputClass("companyName")}  rounded-2xl     md:max-w-sm`}
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
              
              
                      placeholder="Globex industries pvt.ltd"
                    />
                    </div>
                    </div>
  {errors.companyName && <ErrorText>{errors.companyName}</ErrorText>}
                  </div>
                </div>
              ) : (




 <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                  {/*      <div className="w-full flex flex-col"> */}
                  <div className="w-full flex flex-col">
                    <label htmlFor="companyType" className="mb-0.5 text-xs">Company Type<span className="text-gray-400 text-sm">(optional)</span> </label>
                    <div className={`rounded-lg p-[1px] transition ${
    errors.companyName
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.companyName ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>  
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
                      {errors.companyType && <ErrorText>{errors.companyType}</ErrorText>}
                  </div>

                       <div className="w-full flex flex-col">
<label htmlFor="companyName" className="mb-0.5 text-xs">Company Name <span className="text-gray-400 text-sm">(optional)</span> </label>
                    <div className={`rounded-lg p-[1px] transition ${
    errors.companyName
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.companyName ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>  

                        
                   
                    <input
                    id="companyName"
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      //  className={`${inputClass("companyName")}  rounded-2xl     md:max-w-sm`}
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
              
              
                      placeholder="Globex industries pvt.ltd"
                    />
                    </div>
                    </div>
  {errors.companyName && <ErrorText>{errors.companyName}</ErrorText>}
                  </div>
                </div>

              )}

              {tab === "business" ? (
            <div className="grid grid-col-1">



<label htmlFor="gstNumber" className="mb-0.5 text-xs">GST Number  </label>
                    <div className={`rounded-lg p-[1px] transition ${
    errors.gstNumber
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.gstNumber ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>  





   <input
   id="gstNumber"
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter here"
                   className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                  />
                  </div>
                  </div>
                        {errors.gstNumber && <ErrorText>{errors.gstNumber}</ErrorText>}
                </div>
              ) : (
              
                  <div className="grid grid-col-1">
                  



<label htmlFor="gstNumber" className="mb-0.5 text-xs">GST Number <span className="text-gray-400 text-sm">(optional)</span> </label>
                    <div className={`rounded-lg p-[1px] transition ${
    errors.gstNumber
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.gstNumber ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>  





   <input
   id="gstNumber"
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter here"
                   className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                  />
                  </div>
                  </div>
                        {errors.gstNumber && <ErrorText>{errors.gstNumber}</ErrorText>}
                </div>    
              
              )}

              {/* Personal Info */}
              <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
              {/* <div className="flex flex-col sm:flex-row gap-4 w-full"> */}
     {/* <div className="flex-1 min-w-[200px]"> */}
<div className="w-full flex flex-col md:w-[60%]">
  {/* <label className="block font-semibold text-[16px] text-black mb-1">Full Name</label> */}
  <label htmlFor="name" className="mb-0.5 text-xs">
            Full Name
          </label>
  {/* <div className="relative w-full"> */}
    <div className={`rounded-lg p-[1px] transition ${
    errors.fullName
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.fullName ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>

    <input
     className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
            id="name"
     type="text"
      name="fullName"
      value={formData.fullName}
      
      onChange={handleChange}
   
      // className={`${inputClass("fullName")} md:max-w-sm`}
      placeholder="Enter full name"
    />
    {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
    >
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.3 0-9.9 1.7-9.9 5v2.7h19.8V19c0-3.3-6.6-5-9.9-5z" />
    </svg> */}
         <label htmlFor="name" className="pr-3 text-gray-600">
                    <LuUserRound size={16} />
                  </label>
  {/* </div> */}
    </div>
</div>


   {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
</div>




<div className="w-full flex flex-col ">
  {/* <label className="block font-semibold text-[16px] text-black mb-1">Full Name</label> */}
  <label htmlFor="email" className="mb-0.5 text-xs">
           Email Address
          </label>
  {/* <div className="relative w-full"> */}
    <div className={`rounded-lg p-[1px] transition ${
    errors.email
      ? "bg-gradient-to-t from-red-400 to-red-600" // error state
      : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
}`}>
  <div className={`flex items-center gap-2 rounded-lg bg-white border transition ${
      errors.email ? "border-red-500" : "border-[#D7D7D7] focus-within:border-transparent"
  }`}>

    <input
   
            id="email"
     type="text"
      name="email"
      value={formData.eamil}
      onChange={handleChange}
       className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
  
      placeholder="Enter full name"
    />

              <label htmlFor="email" className="pr-3 text-gray-600">
                       <CiMail size={16} />

</label>
  {/* </div> */}
    </div>
</div>


   {errors.email && <ErrorText>{errors.email}</ErrorText>}
</div>
            
     </div>
<div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">

  {/* Phone Field */}
  <div className="w-full md:w-1/2 flex flex-col">
    <label htmlFor="phone" className="mb-0.5 text-xs">
      Phone Number
    </label>

    <div
      className={`rounded-lg p-[1px] transition ${
        errors.phone
          ? "bg-gradient-to-t from-red-400 to-red-600"
          : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
      }`}
    >
      <div
        className={`flex items-center gap-2 rounded-lg bg-white border transition ${
          errors.phone
            ? "border-red-500"
            : "border-[#D7D7D7] focus-within:border-transparent"
        }`}
      >
        <input
          id="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
        />

        <label htmlFor="phone" className="pr-3 text-gray-600">
          <HiOutlinePhone size={16} />
        </label>
      </div>
    </div>

    {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
  </div>

  {/* Pincode Field */}
  <div className="w-full md:w-1/2 flex flex-col">
    <label htmlFor="pinCode" className="mb-0.5 text-xs">
      Pincode
    </label>

    <div
      className={`rounded-lg p-[1px] transition ${
        errors.pinCode
          ? "bg-gradient-to-t from-red-400 to-red-600"
          : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
      }`}
    >
      <div
        className={`flex items-center gap-2 rounded-lg bg-white border transition ${
          errors.pinCode
            ? "border-red-500"
            : "border-[#D7D7D7] focus-within:border-transparent"
        }`}
      >
        <input
          id="pinCode"
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          placeholder="Enter pincode"
          className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
        />
      </div>
    </div>

    {errors.pinCode && <ErrorText>{errors.pinCode}</ErrorText>}
  </div>

</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 max-w-5xl mx-auto">
                <div>
  <label htmlFor="city" className="mb-0.5 text-xs">
    City
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.city
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.city
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <input
        id="city"
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Enter City"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>
  {errors.city && <ErrorText>{errors.city}</ErrorText>}
</div>

                <div>
  <label htmlFor="state" className="mb-0.5 text-xs">
    State
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.state
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.state
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <input
        id="state"
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="Enter State"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>
  {errors.state && <ErrorText>{errors.state}</ErrorText>}
</div>
             <div>
  <label htmlFor="country" className="mb-0.5 text-xs">
    Country
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.country
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.country
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <input
        id="country"
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        placeholder="Enter Country"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>
  {errors.country && <ErrorText>{errors.country}</ErrorText>}
</div>
              </div>

              <p className="block font-semibold text-[16px] text-black mb-2">Product Details <span className="text-gray-400">(Add multiple products here)</span></p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
  <label htmlFor="productName" className="mb-0.5 text-xs">
    Product Name
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.productName
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.productName
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <input
        id="productName"
        type="text"
        name="productName"
        value={formData.productName}
        onChange={handleChange}
        placeholder="China White Travertine"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>
  {errors.productName && <ErrorText>{errors.productName}</ErrorText>}
</div>

<div>
  <label htmlFor="productFinish" className="mb-0.5 text-xs">
    Product Finish
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.productFinish
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.productFinish
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <select
        id="productFinish"
        name="productFinish"
        value={formData.productFinish}
        onChange={handleChange}
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      >
        <option value="">Choose finish</option>
        <option value="polished">Polished</option>
        <option value="honed">Honed</option>
        <option value="tumbled">Tumbled</option>
        <option value="brushed">Brushed</option>
      </select>
    </div>
  </div>
  {errors.productFinish && <ErrorText>{errors.productFinish}</ErrorText>}
</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
  <label htmlFor="unit" className="mb-0.5 text-xs">
    Select Unit
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.unit
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.unit
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <select
        id="unit"
        name="unit"
        value={formData.unit}
        onChange={handleChange}
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      >
        <option value="">Choose</option>
        <option value="sqft">Sqft</option>
        <option value="sqm">Sqm</option>
      </select>
    </div>
  </div>
  {errors.unit && <ErrorText>{errors.unit}</ErrorText>}
</div>

{/* Value */}
<div>
  <label htmlFor="value" className="mb-0.5 text-xs">
    Enter Value
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.value
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`relative flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.value
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <input
        id="value"
        type="text"
        name="value"
        value={formData.value}
        onChange={handleChange}
        placeholder="Type value"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs pr-12"
      />
      <span className="absolute right-3 text-xs text-gray-500">
        {selectedUnit}
      </span>
    </div>
  </div>
  {errors.value && <ErrorText>{errors.value}</ErrorText>}
</div>

<div>
  <label htmlFor="thickness" className="mb-0.5 text-xs">
    Thickness
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.thickness
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.thickness
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <select
        id="thickness"
        name="thickness"
        value={formData.thickness}
        onChange={handleChange}
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
  {errors.thickness && <ErrorText>{errors.thickness}</ErrorText>}
</div>
                </div>
<div className="mb-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Size of Product (W × H) */}
  <div>
    <label className="mb-0.5 text-xs">Size of Product (W × H)</label>
    <div className="grid grid-cols-2 gap-3">
      {/* Width */}
      <div>
        <div
          className={`rounded-lg p-[1px] transition ${
            errors.width
              ? "bg-gradient-to-t from-red-400 to-red-600"
              : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
          }`}
        >
          <div
            className={`flex items-center gap-2 rounded-lg bg-white border transition ${
              errors.width
                ? "border-red-500"
                : "border-[#D7D7D7] focus-within:border-transparent"
            }`}
          >
            <input
              type="text"
              name="width"
              placeholder="Width"
              value={formData.width}
              onChange={handleChange}
              className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
            />
          </div>
        </div>
        {errors.width && <ErrorText>{errors.width}</ErrorText>}
      </div>

      {/* Height */}
      <div>
        <div
          className={`rounded-lg p-[1px] transition ${
            errors.height
              ? "bg-gradient-to-t from-red-400 to-red-600"
              : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
          }`}
        >
          <div
            className={`flex items-center gap-2 rounded-lg bg-white border transition ${
              errors.height
                ? "border-red-500"
                : "border-[#D7D7D7] focus-within:border-transparent"
            }`}
          >
            <input
              type="text"
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
            />
          </div>
        </div>
        {errors.height && <ErrorText>{errors.height}</ErrorText>}
      </div>
    </div>
  </div>

  {/* Estimate Delivery Time */}
  <div>
    <label htmlFor="deliveryTime" className="mb-0.5 text-xs">
      Estimate Delivery Time
    </label>
    <div
      className={`rounded-lg p-[1px] transition ${
        errors.deliveryTime
          ? "bg-gradient-to-t from-red-400 to-red-600"
          : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
      }`}
    >
      <div
        className={`flex items-center gap-2 rounded-lg bg-white border transition ${
          errors.deliveryTime
            ? "border-red-500"
            : "border-[#D7D7D7] focus-within:border-transparent"
        }`}
      >
        <input
          id="deliveryTime"
          type="date"
          name="deliveryTime"
          value={formData.deliveryTime}
          onChange={handleChange}
          className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
        />
      </div>
    </div>
    {errors.deliveryTime && <ErrorText>{errors.deliveryTime}</ErrorText>}
  </div>
</div>

                <div className="border mt-4 border-dashed mb-4 border-[#871B58] rounded-lg p-6 text-center text-gray-600 relative bg-white hover:shadow-md transition">
                  
                  <input
                    id="productImageInput"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    name="image"
                    onChange={handleChange}
                  />
                  

                
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
                  </svg>

            
                   <p className="text-[#2C2C2C] text-base font-semibold tracking-wide pointer-events-none mb-1">
    {productImage ? productImage.name : "Choose an Image or drag & drop it here"}
    </p>
    <span className="text-xs block mb-4 text-gray-500 tracking-wide leading-relaxed pointer-events-none">
      JPEG, PNG and MP4 formats up to 50MB
    </span>
    <button
      type="button"
      onClick={() => document.getElementById("file3").click()}
      className="inline-block bg-white border  font-medium text-sm px-6 py-2 rounded-xl shadow-sm hover:bg-[#871B58] hover:text-white hover:shadow-md transition"
    >
      Browse
    </button>

                  {errors.image && <ErrorText>{errors.image}</ErrorText>}
                </div>

                <div className="flex justify-end mt-[8px]">
              <button
                    type="button"
                    onClick={addProduct}
                    className="font-inter    hover:scale-105 transition-transform duration-200  bg-[#871B58] text-white px-6 py-2 rounded "
                    disabled={submitting}
                  >
                    Add this Product
                  </button>
                </div>
              </div>
              </div>
                <label className="block  font-semibold text-[16px] text-black mb-1">Upload BOQ File</label>
              <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">

                <input
                  type="file"
                  id="file1"
                  name="file1"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
                </svg>
                <p className="text-[#2C2C2C] text-base font-semibold tracking-wide pointer-events-none mb-1">{files1?.[0]?.name ? files1[0].name : "Choose a file or drag & drop it here"}</p>
                <span className="text-xs block mb-4 text-gray-400 pointer-events-none">Upload PDF BOC(Bulk order)/Tender Files upto 50MB</span>
                <button type="button" onClick={() => document.getElementById("file1").click()} className="inline-block bg-white border font-medium text-sm px-6 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
               {errors.file1 && <ErrorText>{errors.file1}</ErrorText>}
              </div>
           
              
             <div className="w-full h-auto min-h-[160px] border-2 border-dashed border-gray-300 rounded-lg p-4  relative">
  {/* Installation input */}
  <div className="mb-4">
    <label htmlFor="installation" className="mb-0.5 text-xs">
      Installation <span className="text-gray-400 text-sm">(optional)</span>
    </label>
    <div
      className={`rounded-lg p-[1px] transition ${
        errors.installation
          ? "bg-gradient-to-t from-red-400 to-red-600"
          : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
      }`}
    >
      <div
        className={`flex items-center gap-2 rounded-lg bg-white border transition ${
          errors.installation
            ? "border-red-500"
            : "border-[#D7D7D7] focus-within:border-transparent"
        }`}
      >
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

  {/* File upload boxes */}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
      </svg>
      <p className="text-[#2C2C2C] text-base font-semibold tracking-wide pointer-events-none mb-1">
        {files3?.[0]?.name ? files3[0].name : "Choose a Rate list or drag & drop it here"}
      </p>
      <span className="text-xs block mb-4 text-gray-400 pointer-events-none">Upload rate list (If Any)</span>
      <button
        type="button"
        onClick={() => document.getElementById("file3").click()}
        className="inline-block bg-white border font-medium text-sm px-6 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
      >
        Browse
      </button>
      {errors.file3 && <ErrorText>{errors.file3}</ErrorText>}
    </div>

    <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition w-full">
      <input
        type="file"
        id="file2"
        name="file2"
        className="absolute inset-0 opacity-0 cursor-pointer"
        accept="image/*,video/mp4"
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
      </svg>
      <p className="text-[#2C2C2C] text-base font-semibold tracking-wide pointer-events-none mb-1">
        {files2?.[0]?.name ? files2[0].name : "Choose an Image or drag & drop it here"}
      </p>
      <span className="text-xs block mb-3 text-gray-400 pointer-events-none">JPEG, PNG and MP4 formats upto 50MB</span>
      <button
        type="button"
        onClick={() => document.getElementById("file2").click()}
        className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
      >
        Browse
      </button>
      {errors.file2 && <ErrorText>{errors.file2}</ErrorText>}
    </div>
  </div>
</div>
              <div className="mb-7 mt-2">
  <label htmlFor="message" className="mb-0.5 text-xs">
    Write your query
  </label>
  <div
    className={`rounded-lg p-[1px] transition ${
      errors.message
        ? "bg-gradient-to-t from-red-400 to-red-600"
        : "bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]"
    }`}
  >
    <div
      className={`flex items-center gap-2 rounded-lg bg-white border transition ${
        errors.message
          ? "border-red-500"
          : "border-[#D7D7D7] focus-within:border-transparent"
      }`}
    >
      <textarea
        id="message"
        name="message"
        rows={3}
        value={formData.message}
        onChange={handleChange}
        placeholder="Write your message here"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs resize-none"
      />
    </div>
  </div>
  {errors.message && <ErrorText>{errors.message}</ErrorText>}
</div>

              <div className="flex justify-end gap-3">
             <button
  type="button"
  className="font-inter border text-black px-8 py-1 rounded mb-6"

  onClick={() => {
setFormData(initialFormData);

    window.scrollTo({ top: 0, behavior: "smooth" });
    setProducts([]);
    setErrors({});
    setProductImage(null);
    setSubmitting(false);
  }}
>
  Cancel
</button>
                <button type="submit" className="font-inter bg-[#871B58] text-white px-8 py-1 rounded mb-6 hover:scale-105 transition-transform duration-200" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              {errors.products && <ErrorText>{errors.products}</ErrorText>}
            </form>
          </div>

          {/* <div className="bg-white/90 backdrop-blur-md w-full shadow-xl rounded-2xl p-4 border border-gray-100"> */}
            <div className="w-full max-w-5xl mx-auto px-4 bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 border border-gray-100">

          
      <div className="w-full">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <h4 className="text-lg font-semibold text-gray-700">
              No products added yet
            </h4>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-pink-900 rounded-full"></span>
              All Products
            </h3>
            <h3 className="text-gray-800 font-medium mb-4">
              Products Added - {products.length}
            </h3>

            <div className="space-y-4">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="bg-white w-full shadow-2xl rounded-2xl p-6"
                >
                
                  <div className="flex justify-between items-start gap-4">
                    
                    <div className="flex gap-4 items-center flex-1 min-w-[200px]">
                      
                     {(item._preview || item.image) && (
  <img
    src={
      item._preview ?? (typeof item.image === "string" ? item.image : undefined)
    }
    alt={`product-${index}`}
    className="w-24 h-24 rounded-lg object-cover"
  />
)}

                      <div className="break-words whitespace-normal">
                        <h4 className="text-2xl font-medium text-black">
                          {item.productName}
                        </h4>
                        <p className="text-sm text-[#838383]">
                          {item.productFinish}
                        </p>
                        <button
                          onClick={() => toggleDetails(index)}
                          className="text-gray-600 text-sm underline"
                        >
                          {item.showDetails ? "Hide" : "Show"} Details
                        </button>
                      </div>
                    </div>

            
                    {/* <button
                      onClick={() => removeProduct(index)}
                      aria-label={`Remove ${item.productName}`}
                      className="text-red-500 hover:text-red-700 transition  rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 7h12M9 7V4h6v3m2 0v13a2 2 0 01-2 2H9a2 2 0 01-2-2V7h10z"
                        />

                      </svg>

                      
                    </button> */}
                 

<button
  onClick={() => removeProduct(index)}
  aria-label={`Remove ${item.productName}`}
  className="p-1 rounded-md bg-gray-100 hover:bg-red-200 transition"
>
  <MdDelete className="w-5 h-5 text-red-600" />
</button>

                  </div>

          
                  {item.showDetails && (
                    <div className="mt-3 text-sm text-gray-900 space-y-1">
                      <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
                               <p><strong>Selected Finishes:</strong> {item.productFinish}</p>
                              <p><strong>Selected Unit:</strong> {item.unit}</p>
                              <p><strong>Selected {item.unit} value
                                :</strong> {item.value}</p>
                              <p><strong>Selected Thickness:</strong> {item.thickness}</p>
 {item.width && item.height && (
        <p>
          <strong>Selected Size:</strong> W: {item.width} | H: {item.height}
        </p>
      )}
                              <p><strong>Estimate Delivery timer:</strong> {item.deliveryTime}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
