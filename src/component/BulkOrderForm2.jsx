import React, { useEffect, useState } from "react";

// Polished, single-file React component using Tailwind CSS. // Fixes syntax bugs from the original and improves visual design, spacing and UX.

export default function BulkOrderForm2() {

  const nameRegex = /^(?=.{1,100}$)[\p{L}]+(?:[ .'-][\p{L}]+)*$/u;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^(?:\+91[-\s]?)?[6-9]\d{9}$/;
  const pinRegex = /^[1-9][0-9]{5}$/;
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z][Z0-9][0-9A-Z]$/i;
  const twoDecimalRegex = /^-?\d+(?:\.\d{1,2})?$/;
const MAX_MESSAGE_WORDS = 50; const MAX_MESSAGE_CHARS = 300;

const countWords = (str = "") => { const s = String(str).trim(); if (!s) return 0; return s.split(/\s+/).length; };

const validateSizeNumber = (file, maxMB = 2) => {
  if (!file) return null; 
  const ok = file.size <= maxMB * 1024 * 1024;
  return ok ? null : `Max size ${maxMB}MB`;
};
const validateFile = (file, maxMB = 50) => { if (!file) return null; if (file instanceof File || file instanceof Blob) { const ok = file.size <= maxMB * 1024 * 1024; return ok ? null : `Max size ${maxMB}MB`; } return null; };

// -------------------- Validation -------------------- const validateProduct = (p) => { const errs = {}; if (!p.productName) errs.productName = "Product name required"; if (!p.productFinish) errs.productFinish = "Product finish required"; if (!p.unit) errs.unit = "Unit is required"; if (p.value === "" || p.value === null || p.value === undefined) { errs.value = "Value is required"; } else if (isNaN(Number(p.value))) { errs.value = "Enter a number"; } else if (Number(p.value) < 0.0001) { errs.value = "Value must be greater than 0"; } else if (!twoDecimalRegex.test(String(p.value))) { errs.value = "Max 2 decimal places allowed"; } if (!p.thickness) errs.thickness = "Thickness is required"; if (!p.deliveryTime) errs.deliveryTime = "Delivery time required";

const wErr = validateSizeNumber(p.width);
if (wErr) errs.width = wErr;
const hErr = validateSizeNumber(p.height);
if (hErr) errs.height = hErr;

const imgErr = validateFile(p.image, 50);
if (imgErr) errs.image = imgErr;
return errs;

};

const validateForm = (data, tab) => { const errs = {};

// Business-only fields
if (tab === "business") {
  if (!data.companyType) errs.companyType = "Company Type is required";
  if (!data.companyName) errs.companyName = "Company Name is required";
  else if (!nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
  if (!data.gstNumber) errs.gstNumber = "GST Number is required";
  else if (!gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
} else {
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
else if (!nameRegex.test(data.state)) errs.state = "Enter a valid state name";

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

// -------------------- State -------------------- const initialFormData = { companyType: "", companyName: "", gstNumber: "", fullName: "", email: "", phone: "", pinCode: "", city: "", state: "", country: "", // product fields productName: "", productFinish: "", unit: "", value: "", thickness: "", width: "", height: "", deliveryTime: "", image: null, // files file1: null, file2: null, file3: null,

installation: "",
message: "",

};

const [tab, setTab] = useState("individual"); const [submitting, setSubmitting] = useState(false); const [products, setProducts] = useState([]); const [productImage, setProductImage] = useState(null); const [errors, setErrors] = useState({}); const [isSubmitted, setIsSubmitted] = useState(false); const [formData, setFormData] = useState(initialFormData); const [toast, setToast] = useState(null);

// -------------------- Helpers -------------------- const inputClass = (field) => w-full border rounded-2xl px-3 py-3 text-gray-700 outline-none transition duration-200 shadow-sm placeholder-gray-400 focus:shadow-md focus:outline-none ${ isSubmitted && errors[field] ? "border-red-400 ring-1 ring-red-200" : "border-gray-200 focus:border-transparent" };

const handleChange = (e) => { const { name, value, type, files } = e.target; const file = type === "file" ? (files && files[0] ? files[0] : null) : null; const newForm = type === "file" ? { ...formData, [name]: file } : { ...formData, [name]: value };

setFormData(newForm);
if (name === "image") setProductImage(file);

if (isSubmitted) {
  const fieldErrs = validateForm(newForm, tab);
  setErrors((prev) => ({ ...prev, [name]: fieldErrs[name] }));
}

};

const addProduct = () => { const file = formData.image || null; const preview = file && typeof file !== "string" ? URL.createObjectURL(file) : null;

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
  setErrors((prev) => ({ ...prev, ...perrs }));
  return;
}

setProducts((prev) => [...prev, { ...p, showDetails: false }]);

setFormData((prev) => ({
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
  [
    "productName",
    "productFinish",
    "unit",
    "value",
    "thickness",
    "width",
    "height",
    "deliveryTime",
    "image",
  ].forEach((k) => delete copy[k]);
  return copy;
});

};
const inputClass = (field) =>
  `w-full border rounded-2xl px-3 py-3 text-gray-700 outline-none transition duration-200 shadow-sm placeholder-gray-400 focus:shadow-md focus:outline-none ${
    isSubmitted && errors[field]
      ? "border-red-400 ring-1 ring-red-200"
      : "border-gray-200 focus:border-transparent"
  }`;
const toggleDetails = (index) => { setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, showDetails: !p.showDetails } : p))); };

const removeProduct = (index) => { setProducts((prev) => { const item = prev[index]; if (item?._preview) URL.revokeObjectURL(item.preview); return prev.filter((_, i) => i !== index); }); };

const onSubmit = (e) => { e.preventDefault(); setIsSubmitted(true);

const ferrs = validateForm(formData, tab);
if (Object.keys(ferrs).length) {
  setErrors(ferrs);
  const firstKey = Object.keys(ferrs)[0];
  const el = document.querySelector(`[name="${firstKey}"]`);
  if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
  return;
}
if (products.length === 0) {
  setErrors((prev) => ({ ...prev, products: "At least one product is required" }));
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  return;
}

setSubmitting(true);

// Build final payload (simulate)
const finalData = {
  ...formData,
  products,
};

console.log("Final Payload:", finalData);

// fake success
setTimeout(() => {
  setToast({ type: "success", message: "Form submitted successfully" });
  setFormData(initialFormData);
  setProducts([]);
  setErrors({});
  setProductImage(null);
  setSubmitting(false);
  setIsSubmitted(false);
  window.scrollTo({ top: 0, behavior: "smooth" });

  setTimeout(() => setToast(null), 3500);
}, 800);

};

useEffect(() => { return () => { products.forEach((p) => { if (p?._preview) URL.revokeObjectURL(p._preview); }); }; }, [products]);

const selectedUnit = formData.unit; const files1 = formData.file1 ? [formData.file1] : null; const files2 = formData.file2 ? [formData.file2] : null; const files3 = formData.file3 ? [formData.file3] : null;

return ( <div className="min-h-screen bg-gray-50 py-10 px-4"> <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"> <div className="lg:col-span-2"> <div className="bg-white rounded-2xl shadow-lg p-8"> <header className="mb-6"> <h1 className="text-3xl font-bold text-gray-900">Stonepedia Bulk Orders</h1> <p className="text-gray-500 mt-1">Fill this form to connect with us. Add one or more products below.</p> </header>

<div className="flex gap-3 mb-6">
          <button
            disabled={submitting}
            onClick={() => setTab("individual")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${tab === "individual" ? "bg-rose-600 text-white" : "bg-white border"}`}
          >
            Individual
          </button>
          <button
            disabled={submitting}
            onClick={() => setTab("business")}
            className={`px-4 py-2 rounded-full text-sm font-medium ${tab === "business" ? "bg-rose-600 text-white" : "bg-white border"}`}
          >
            Business
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Company / Business */}
          {tab === "business" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Company Type</label>
                <select name="companyType" value={formData.companyType} onChange={handleChange} className={`${inputClass("companyType")} md:max-w-sm`}>
                  <option value="">Choose</option>
                  <option value="pvt">Private Ltd</option>
                  <option value="llp">LLP</option>
                  <option value="proprietor">Proprietor</option>
                </select>
                {errors.companyType && <p className="text-red-500 mt-1 text-sm">{errors.companyType}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Company Name</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={`${inputClass("companyName")} md:max-w-sm`} placeholder="Globex Industries Pvt. Ltd" />
                {errors.companyName && <p className="text-red-500 mt-1 text-sm">{errors.companyName}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">GST Number</label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className={`${inputClass("gstNumber")} w-full md:max-w-lg`} placeholder="12ABCDE1234F1Z5" />
                {errors.gstNumber && <p className="text-red-500 mt-1 text-sm">{errors.gstNumber}</p>}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Type <span className="text-xs text-gray-400">(optional)</span></label>
                <select name="companyType" value={formData.companyType} onChange={handleChange} className={`${inputClass("companyType")} md:max-w-sm`}>
                  <option value="">Choose</option>
                  <option value="pvt">Private Ltd</option>
                  <option value="llp">LLP</option>
                  <option value="proprietor">Proprietor</option>
                </select>
                {errors.companyType && <p className="text-red-500 mt-1 text-sm">{errors.companyType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Company Name <span className="text-xs text-gray-400">(optional)</span></label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={`${inputClass("companyName")} md:max-w-sm`} placeholder="Globex Industries Pvt. Ltd" />
                {errors.companyName && <p className="text-red-500 mt-1 text-sm">{errors.companyName}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">GST Number <span className="text-xs text-gray-400">(optional)</span></label>
                <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className={`${inputClass("gstNumber")} w-full md:max-w-lg`} placeholder="12ABCDE1234F1Z5" />
                {errors.gstNumber && <p className="text-red-500 mt-1 text-sm">{errors.gstNumber}</p>}
              </div>
            </div>
          )}

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`${inputClass("fullName")} md:max-w-sm`} placeholder="Enter full name" />
              {errors.fullName && <p className="text-red-500 mt-1 text-sm">{errors.fullName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className={`${inputClass("email")} md:max-w-sm`} placeholder="Enter email" />
              {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className={`${inputClass("phone")} md:max-w-sm`} placeholder="Enter phone number" />
              {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className={`${inputClass("pinCode")} md:max-w-sm`} placeholder="122204" />
              {errors.pinCode && <p className="text-red-500 mt-1 text-sm">{errors.pinCode}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className={`${inputClass("city")} md:max-w-sm`} placeholder="Gurugram" />
              {errors.city && <p className="text-red-500 mt-1 text-sm">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} className={`${inputClass("state")} md:max-w-sm`} placeholder="Haryana" />
              {errors.state && <p className="text-red-500 mt-1 text-sm">{errors.state}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className={`${inputClass("country")} md:max-w-sm`} placeholder="India" />
              {errors.country && <p className="text-red-500 mt-1 text-sm">{errors.country}</p>}
            </div>
          </div>

          {/* Product Card */}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-5 bg-white">
            <h3 className="text-lg font-semibold mb-3">Product Details <span className="text-sm text-gray-400">(Add multiple products)</span></h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input type="text" name="productName" value={formData.productName} onChange={handleChange} className={`${inputClass("productName")} md:max-w-sm`} placeholder="China White Travertine" />
                {errors.productName && <p className="text-red-500 mt-1 text-sm">{errors.productName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Finish</label>
                <select name="productFinish" value={formData.productFinish} onChange={handleChange} className={`${inputClass("productFinish")} md:max-w-sm`}>
                  <option value="">Choose finish</option>
                  <option value="polished">Polished</option>
                  <option value="honed">Honed</option>
                  <option value="tumbled">Tumbled</option>
                  <option value="brushed">Brushed</option>
                </select>
                {errors.productFinish && <p className="text-red-500 mt-1 text-sm">{errors.productFinish}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4"> 
              <div>
                <label className="block text-sm font-medium mb-1">Select Unit</label>
                <select name="unit" value={formData.unit} onChange={handleChange} className={`${inputClass("unit")} md:max-w-sm`}>
                  <option value="">Choose</option>
                  <option value="sqft">Sqft</option>
                  <option value="sqm">Sqm</option>
                </select>
                {errors.unit && <p className="text-red-500 mt-1 text-sm">{errors.unit}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Enter Value</label>
                <div className="relative">
                  <input type="text" name="value" value={formData.value} onChange={handleChange} className={`${inputClass("value")} pr-12`} placeholder="Type value" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600">{selectedUnit}</span>
                </div>
                {errors.value && <p className="text-red-500 mt-1 text-sm">{errors.value}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Thickness</label>
                <select name="thickness" value={formData.thickness} onChange={handleChange} className={`${inputClass("thickness")} md:max-w-sm`}>
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
                {errors.thickness && <p className="text-red-500 mt-1 text-sm">{errors.thickness}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Size of Product (W × H in mm)</label>
                <div className="flex gap-2">
                  <input type="text" name="width" value={formData.width} onChange={handleChange} className={`${inputClass("width")} md:max-w-sm`} placeholder="Width (e.g. 1200)" />
                  <input type="text" name="height" value={formData.height} onChange={handleChange} className={`${inputClass("height")} md:max-w-sm`} placeholder="Height (e.g. 600)" />
                </div>
                {errors.width && <p className="text-red-500 mt-1 text-sm">{errors.width}</p>}
                {errors.height && <p className="text-red-500 mt-1 text-sm">{errors.height}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Estimate Delivery Time</label>
                <input type="date" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className={`${inputClass("deliveryTime")} md:max-w-sm`} />
                {errors.deliveryTime && <p className="text-red-500 mt-1 text-sm">{errors.deliveryTime}</p>}
              </div>
            </div>

            <div className="mt-4 border border-gray-100 rounded-lg p-4 text-center relative bg-white">
              <input id="productImageInput" type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" name="image" onChange={handleChange} />
              <div className="py-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 w-8 h-8 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
                </svg>
                <p className="font-medium text-gray-900">{productImage ? productImage.name : "Choose an Image or drag & drop it here"}</p>
                <p className="text-xs text-gray-400">JPEG, PNG up to 50MB</p>
                <div className="mt-3">
                  <button type="button" onClick={() => document.getElementById("productImageInput").click()} className="px-4 py-2 rounded-lg border bg-white">Browse</button>
                </div>
                {errors.image && <p className="text-red-500 mt-2 text-sm">{errors.image}</p>}
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button type="button" onClick={addProduct} disabled={submitting} className="px-5 py-2 rounded-lg bg-rose-600 text-white font-medium">Add this Product</button>
            </div>
          </div>

          {/* Files & installation */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload BOQ File</label>
            <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
              <div>
                <p className="font-medium">{files1?.[0]?.name ? files1[0].name : "Choose a file"}</p>
                <p className="text-xs text-gray-400">PDF up to 50MB</p>
              </div>
              <div>
                <input type="file" id="file1" name="file1" className="opacity-0 absolute inset-0 cursor-pointer" onChange={handleChange} />
                <button type="button" onClick={() => document.getElementById("file1").click()} className="px-4 py-2 rounded-lg border bg-white">Browse</button>
              </div>
            </div>
            {errors.file1 && <p className="text-red-500 mt-1 text-sm">{errors.file1}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Installation <span className="text-xs text-gray-400">(optional)</span></label>
              <input type="text" name="installation" value={formData.installation} onChange={handleChange} className={`${inputClass("installation")} w-full`} placeholder="Enter details" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rate list / Images</label>
              <div className="flex gap-3">
                <div className="flex-1 border rounded-lg p-3 text-center bg-white">
                  <p className="font-medium text-sm">{files3?.[0]?.name ? files3[0].name : "Choose rate list"}</p>
                  <div className="mt-2">
                    <input type="file" id="file3" name="file3" className="opacity-0 absolute inset-0 cursor-pointer" onChange={handleChange} />
                    <button type="button" onClick={() => document.getElementById("file3").click()} className="px-3 py-2 rounded-lg border bg-white">Browse</button>
                  </div>
                </div>

                <div className="flex-1 border rounded-lg p-3 text-center bg-white">
                  <p className="font-medium text-sm">{files2?.[0]?.name ? files2[0].name : "Choose image / video"}</p>
                  <div className="mt-2">
                    <input type="file" id="file2" name="file2" className="opacity-0 absolute inset-0 cursor-pointer" onChange={handleChange} />
                    <button type="button" onClick={() => document.getElementById("file2").click()} className="px-3 py-2 rounded-lg border bg-white">Browse</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Write your query</label>
            <textarea name="message" className={`${inputClass("message")} w-full`} placeholder="Write your message here" rows={3} value={formData.message} onChange={handleChange} />
            {errors.message && <p className="text-red-500 mt-1 text-sm">{errors.message}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2 rounded-lg border bg-white"
              onClick={() => {
                setFormData(initialFormData);
                setProducts([]);
                setErrors({});
                setProductImage(null);
                setSubmitting(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 rounded-lg bg-rose-600 text-white" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>

          {errors.products && <p className="text-red-500 mt-2">{errors.products}</p>}
        </form>
      </div>

      {/* Product preview list */}
      <div className="mt-6">
        {products.length === 0 ? (
          <div className="text-center text-gray-400 py-8 border border-dashed rounded-lg bg-white">No products added yet</div>
        ) : (
          <div className="space-y-4">
            {products.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 flex gap-4 items-start">
                <div className="w-24 h-24 rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                  {item._preview || item.image ? (
                    <img src={item._preview ?? (typeof item.image === "string" ? item.image : undefined)} alt={`product-${index}`} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-8 h-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7M3 7h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900">{item.productName}</h4>
                      <p className="text-sm text-gray-500">{item.productFinish} • {item.unit} {item.value} • {item.thickness}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleDetails(index)} className="text-sm text-rose-600">{item.showDetails ? 'Hide' : 'Show'}</button>
                      <button onClick={() => removeProduct(index)} className="text-sm text-red-500">Remove</button>
                    </div>
                  </div>

                  {item.showDetails && (
                    <div className="mt-3 text-sm text-gray-700">
                      {item.width && item.height && <p><strong>Size:</strong> W: {item.width} mm | H: {item.height} mm</p>}
                      <p><strong>Delivery:</strong> {item.deliveryTime}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Side / summary card */}
    <aside className="hidden lg:block">
      <div className="sticky top-6 bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Summary</h3>
        <p className="text-sm text-gray-600 mb-4">Products added: <strong>{products.length}</strong></p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Tip: Add images for faster response.</p>
          <p className="text-sm text-gray-500">We accept PDF and images up to 50MB.</p>
        </div>
      </div>
    </aside>
  </div>

  {/* Toast */}
  {toast && (
    <div className={`fixed right-6 bottom-6 bg-white shadow-lg rounded-lg px-4 py-3 border ${toast.type === 'success' ? 'border-emerald-200' : 'border-red-200'}`}>
      <p className="text-sm">{toast.message}</p>
    </div>
  )}
</div>

); }

