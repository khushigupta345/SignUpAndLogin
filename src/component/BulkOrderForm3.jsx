import React, { useEffect, useState } from "react";
import { LuUserRound } from "react-icons/lu";
import toast,{Toaster} from "react-hot-toast";

import { useRef } from "react";
import { FiUpload ,FiTrash2} from "react-icons/fi";
import { CiMail,CiMobile3 } from "react-icons/ci";

 
   
export default function BulkOrderForm3() {

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

  productName: "",
  productFinish: "",
  unit: "",
  value: "",
  thickness: "",
  width: "",
  height: "",
  deliveryTime: "",
  image: null,

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
const MAX_FILE_SIZE_MB = 20; 

const handleChange = (e) => {
  const { name, type, files, value } = e.target;

  if (type === "file") {
    const file = files && files[0] ? files[0] : null;
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`${file.name} Maximum ${MAX_FILE_SIZE_MB}MB allowed`);
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: file }));

    if (name === "image") {
      setProductImage(file);
    }
  } else {
    // ye part file ke andar nahi aana chahiye
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    .querySelectorAll("input, select");
      const file = formData.image || null;
    if(file){
const MAX_MB = 20;

if (file.size > MAX_MB * 1024 * 1024) {
  toast.error(`file size must be less than ${MAX_MB}MB`);
  return;
}
    }
    

  for (let field of productFields) {
    if (!field.reportValidity()) {
      return; 
    }
  }

  toast.success("Product added successfully!");


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

  setProducts(prev => [...prev, { ...p, showDetails: false }]);

  // Form reset
  setFormData({
    productName: "",
    productFinish: "",
    unit: "",
    value: "",
    thickness: "",
    width: "",
    height: "",
    deliveryTime: "",
    image: null,
  });
  setProductImage(null);
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
 {/*
const onSubmit = (e) => {

  e.preventDefault();


  const productReqElements = Array.from(
    document.querySelectorAll("#product-fields [required]")
  );


  productReqElements.forEach((el) => (el.required = false));

  try {
    
    const formEl = document.querySelector("form"); 
    if (!formEl.checkValidity()) {

      formEl.reportValidity();
      return;
    }

    // 4) your own checks: ensure at least one product added
    if (products.length === 0) {
      toast.error("At least one product is required");
      return;
    }

    // 5) filesize checks
    for (const f of ["file1", "file2", "file3"]) {
      const file = formData[f];
      if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} Maximum ${MAX_FILE_SIZE_MB}MB allowed`);
        return;
      }
    }

    // 6) proceed with submit flow
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
      message,
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

    console.log("Final data:", finalData);
    toast.success("Submitted successfully");

    // reset UI state
    setFormData(initialFormData);
    setProducts([]);
    setErrors({});
    setProductImage(null);
    setSubmitting(false);
  } finally {
    // 7) always restore the required attributes back
    productReqElements.forEach((el) => (el.required = true));
  }
};

*/}




const onSubmit = (e) => {
  e.preventDefault();

  // --- Step 1: Check at least one product ---
  if (products.length === 0) {
    toast.error("At least one product is required");
    return;
  }

  // --- Step 2: Temporarily disable required for product fields ---
  const productFields = Array.from(
    document.querySelectorAll("#product-fields [required]")
  );
  productFields.forEach((el) => (el.required = false));

  // --- Step 3: Validate other form fields ---
  const formEl = document.querySelector("form");
  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    // Restore required fields before returning
    productFields.forEach((el) => (el.required = true));
    return;
  }

  // --- Step 4: Check file sizes ---
  const MAX_FILE_SIZE_MB = 5; // example
  for (const key in formData) {
    const file = formData[key];
    if (file && file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`${file.name} Maximum ${MAX_FILE_SIZE_MB}MB allowed`);
      productFields.forEach((el) => (el.required = true));
      return;
    }
  }

  // --- Step 5: Submit form ---
  const finalData = { ...formData, products };
  console.log("Form submitted:", finalData);
  toast.success("Form submitted successfully");

  // --- Step 6: Reset form ---
  setFormData(initialFormData);
  setProducts([]);
  setErrors({});
  setProductImage(null);

  // --- Step 7: Restore required fields ---
  productFields.forEach((el) => (el.required = true));
};

 

const handleCancel=()=>{
setFormData(initialFormData);

    window.scrollTo({ top: 0, behavior: "smooth" });
    setProducts([]);
    setErrors({});
    setProductImage(null);
    setSubmitting(false);
}
  const selectedUnit = formData.unit;
  const files1 = formData.file1 ? [formData.file1] : null;
  const files2 = formData.file2 ? [formData.file2] : null;
  const files3 = formData.file3 ? [formData.file3] : null;

  return (
   <div className="min-h-screen font-poppins bg-white px-4 sm:px-6 lg:px-16 py-8">
        <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-3">
          <h1 className="text-2xl sm:text-4xl font-medium text-[#000000]">Stonepedia Bulk Orders</h1>
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

            <form className="space-y-4">
              {tab === "business" ? (
                <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                  {/*      <div className="w-full flex flex-col"> */}
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
                      //  className={${inputClass("companyName")}  rounded-2xl     md:max-w-sm}
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
              
              minLength={3}
      maxLength={30}
 pattern="^[A-Za-z0-9 .,&-]{3,50}$"
                      placeholder="Globex industries pvt.ltd"
                    />
                    </div>
                    </div>
  
                  </div>
                </div>
              ) : (




 <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                  {/*      <div className="w-full flex flex-col"> */}
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
                      //  className={${inputClass("companyName")}  rounded-2xl     md:max-w-sm}
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
              minLength={3}
      maxLength={30}
     pattern="^[A-Za-z0-9 .,&-]{3,50}$"
              
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
                    type="text"
                    name="gstNumber"
                    required
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter here"
                          pattern="^[0-9A-Z]{15}$"
                   className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                  />
                  </div>
                  </div>
                        {errors.gstNumber && <ErrorText>{errors.gstNumber}</ErrorText>}
                </div>
              ) : (
              
                  <div className="grid grid-col-1">
                  



<label htmlFor="gstNumber" className="mb-0.5 font-semibold text-xs">GST Number <span className="text-gray-400 text-sm">(optional)</span> </label>
                    <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent"> 





   <input
   id="gstNumber"
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Enter here"      
                    pattern="^[0-9A-Z]{15}$"

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
  <label htmlFor="name" className="mb-0.5 font-semibold text-xs">
            Full Name
          </label>
  {/* <div className="relative w-full"> */}
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
     pattern="^[A-Za-z ]+$"
     
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
  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$"
  className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
  placeholder="Enter your email"
/>

              <label htmlFor="email" className="pr-3 text-gray-600">
                       <CiMail size={16} />

</label>

    </div>
</div>

</div>
            
     </div>
<div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">

  {/* Phone Field */}
  <div className="w-full md:w-1/2 flex flex-col">
    <label htmlFor="phone" className="mb-0.5 font-semibold text-xs">
      Phone Number
    </label>

     <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
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

  {/* Pincode Field */}
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

</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5 max-w-5xl mx-auto">
                <div>
  <label htmlFor="city" className="mb-0.5 font-semibold text-xs">
    City
  </label>
   <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
      <input
        id="city"
        type="text"
        required
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="Enter City"
        minLength={2}
        maxLength={50}
        pattern="^[A-Za-z\s]{2,50}$"
    
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>

</div>

                <div>
  <label htmlFor="state" className="mb-0.5 font-semibold text-xs">
    State
  </label>
   <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
      <input
        id="state"
        type="text"

        name="state"
        required
        value={formData.state}
        onChange={handleChange}
        placeholder="Enter State"
         minLength={2}
        maxLength={50}
        pattern="^[A-Za-z\s]{2,50}$"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>

</div>
             <div>
  <label htmlFor="country" className="mb-0.5 font-semibold text-xs">
    Country
  </label>
   <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
      <input
        id="country"
        type="text"
        name="country"
        required
        value={formData.country}
        onChange={handleChange}
        placeholder="Enter Country"
        minLength={2}
        maxLength={50}
        pattern="^[A-Za-z\s]{2,50}$"
        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
      />
    </div>
  </div>

</div>
              </div>

              <p className="block font-medium text-[16px] text-black mb-2">Product Details <span className="text-gray-400">(Add multiple products here)</span></p>

              <div  className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
           <div id="product-fields">     <div  className=" grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
  
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
        value={formData.productName}
        onChange={handleChange}
        placeholder="China White Travertine"
         minLength={2}
  maxLength={30}
  pattern="^[A-Za-z0-9 .,&-]{2,30}$"
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
        value={formData.productFinish}
        onChange={handleChange}
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

</div>

{/* Value */}
<div>
  <label htmlFor="value" className="mb-0.5 font-semibold text-xs">
    Enter Value
  </label>
   <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className=" relative flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
      <input
        id="value"
        type="text"
         required
        name="value"
        value={formData.value}
        onChange={handleChange}
        placeholder="Type value"
          min={0.01}
  max={100000}
  step="0.01"
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

</div>
                </div>
<div className="mb-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Size of Product (W × H) */}
  <div>
    <label className="mb-0.5 font-semibold text-xs">Size of Product (W × H)</label>
    <div className="grid grid-cols-2 gap-3">
      {/* Width */}
      <div>
        <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
            <input
              type="text"
              name="width"
              placeholder="Width"
              value={formData.width}
              onChange={handleChange}
               min={1}
  max={10000}
  step="0.01"
              className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
            />
          </div>
        </div>
  
      </div>

      {/* Height */}
      <div>
         <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
            <input
              type="text"
              name="height"
              placeholder="Height"
              value={formData.height}
              onChange={handleChange}
              min={1}
  max={10000}
  step="0.01"
              className="w-full bg-transparent outline-none border-0 px-3 py-2 text-xs"
            />
          </div>
        </div>
        
      </div>
    </div>
  </div>

  {/* Estimate Delivery Time */}
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
          value={formData.deliveryTime}
          onChange={handleChange}
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
                    onChange={handleChange}
                  />
                  

                 <FiUpload size={30} className="mx-auto mb-2 text-gray-900" />

            
                   <p className="text-[#2C2C2C] text-base font-semibold tracking-wide pointer-events-none mb-1">
    {productImage ? productImage.name : "Choose an Image or drag & drop it here"}
    </p>
    <span className="text-xs block mb-4 text-gray-500 tracking-wide leading-relaxed pointer-events-none">
      JPEG, PNG and MP4 formats up to 20MB
    </span>
    <button
      type="button"
      onClick={() => document.getElementById("file3").click()}
      className="inline-block bg-white border  font-medium text-sm px-6 py-2 rounded-xl shadow-sm hover:bg-[#871B58] hover:text-white hover:shadow-md transition"
    >
      Browse
    </button>

              
                </div>

                <div className="flex justify-end mt-[8px]">
              <button
                    type="button"
                    onClick={addProduct}
                    className="font-inter    hover:scale-105 transition-transform duration-200  bg-[#871B58] text-white px-3 py-2 rounded "
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
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                />
                <FiUpload size={30} className="mx-auto mb-2 text-gray-900" />
                
                <p className="text-[#2C2C2C] text-base font-semibold  tracking-wide pointer-events-none mb-1">{files1?.[0]?.name ? files1[0].name : "Choose a file or drag & drop it here"}</p>
                <span className="text-xs block mb-4 text-gray-400 pointer-events-none">Upload PDF BOC(Bulk order)/Tender Files upto 20MB</span>
                <button type="button" onClick={() => document.getElementById("file1").click()} className="inline-block bg-white border font-medium text-sm px-6 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
              
              </div>
           
              
             <div className="w-full h-auto min-h-[160px] border-2 border-dashed border-gray-300 rounded-lg p-4  relative">
  {/* Installation input */}
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
       <FiUpload size={30} className="mx-auto mb-2 text-gray-900" />
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
       <FiUpload size={30} className="mx-auto mb-2 text-gray-900" />
      <p className="text-[#2C2C2C] text-base font-semibold tracking-wide pointer-events-none mb-1">
        {files2?.[0]?.name ? files2[0].name : "Choose an Image or drag & drop it here"}
      </p>
      <span className="text-xs block mb-3 text-gray-400 pointer-events-none">JPEG, PNG and MP4 formats upto 20MB</span>
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

  className="font-inter border text-black px-8 py-1 rounded mb-6"

  onClick={handleCancel}
>
  Cancel
</button>
                <button type="button"   onClick={onSubmit}  className="font-inter bg-[#871B58] text-white px-8 py-1 rounded mb-6 hover:scale-105 transition-transform duration-200" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </button>
              </div>
              
            </form>
          </div>

       
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
                        <h4 className="font-medium text-[16px] text-black">
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

            

<button
  onClick={() => removeProduct(index)}
  aria-label={`Remove ${item.productName}`}
  className="p-1 rounded-md bg-gray-100  transition"
>
       
                   <FiTrash2 className="w-6 h-6 text-red-600" />
</button>

                  </div>

          
                  {item.showDetails && (
                    <div className="mt-3   font-medium text-xs  text-gray-900 space-y-1">
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
