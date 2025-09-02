

// import React, { useState } from "react";
// import image from "../assets/stone.png";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Building2,
//   Hash,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Landmark,
//   Globe,
//   Package,
//   Layers,
//   Ruler,
//   Trash2 ,
//   Square,
//   Calendar,
//   Upload,
//   Wrench,
//   FileText,
// } from "lucide-react";

// export default function BulkOrderForm() {
// const sizeNumber = yup
// .number()
// .typeError("Must be a number")
// .positive("Value must be greater than 0")
// .min(100, "Min value is 100mm")
// .max(3000, "Max value is 3000mm")
// .test("decimal-precision", "Max 2 decimal places allowed", (value) =>
// value ? /^\d+(.\d{1,2})?$/.test(String(value)) : true
// )
// .nullable();
// const fileValidation = yup
//   .mixed()
//   .nullable()
//   .test("fileSize", "Max size 50MB", (file) =>
//     file ? file.size <= 50 * 1024 * 1024 : true
//   );
// const productSchema = yup.object().shape({
//   productName: yup.string().required("Product name required"),
//   productFinish: yup.string().required("Product finish required"),
//   unit: yup.string().required("Unit is required"),
//     image: fileValidation,
//   value: yup
//     .number()
//     .typeError("Enter a number").required("Value is required")  .min(0.0001, "Value must be greater than 0")
//  ,
//   thickness: yup.string().required("Thickness is required"),
  
//   deliveryTime: yup.string().required("Delivery time required"),
//   width: sizeNumber.notRequired().nullable(),
//   height: sizeNumber.notRequired().nullable(),

// });


// const schema = yup.object().shape({
//  companyName: yup.string().when("$tab", {
//     is: "business",
//     then: (schema) => schema.required("Company Name is required").matches(/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/, "Enter valid name"),
//     otherwise: (schema) => schema.nullable(),
//   }),
//   companyType: yup.string().when("$tab", {
//     is: "business",
//     then: (schema) => schema.required("Company Type is required"),
//     otherwise: (schema) => schema.nullable(),
//   }),
// gstNumber: yup.string().when("$tab", {
//   is: "business",
//   then: (schema) => schema.required("GST Number is required").matches(/^[0-9A-Z]{15}$/, "Invalid GST Number"),
//   otherwise: (schema) => schema.nullable(),
// }),
//   fullName: yup.string().required("Full Name is required").matches(/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/, "Enter valid name"),
//   email: yup.string().required("Email is required").matches(
//      /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/, "Invalid email"
//     ),
//   phone: yup
//     .string()
//    .required("Phone is required")
//     .matches(/^\+?\d{10,15}$/, "Phone must be 10 digits"),
//   pinCode: yup
  
//     .string()
//     .required("Pincode is required")
//     .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
    
//   city: yup
//   .string()
//   .required("City is required")
//   .matches(/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/, "Enter a valid city name"),

// state: yup
//   .string()
//   .required("State is required")
//   .matches(/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/, "Enter a valid state name"),

// country: yup
//   .string()
//   .required("Country is required")
//   .matches(/^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/, "Enter a valid country name"),
//     file1: fileValidation,
  
//   file2: fileValidation,
//     file3: fileValidation,

// products: yup.array().min(1, "At least one product is required"),

// });



//   const [tab, setTab] = useState("individual");
//   const [submitting, setSubmitting] = useState(false);
  
// const [products, setProducts] = useState(
//    []
//   );

  
 
  
// const toggleDetails = (index) => {
//     const newProducts = [...products];
//     newProducts[index].showDetails = !newProducts[index].showDetails;
//     setProducts(newProducts);
//   };


  
//   const {
//   register,
//   handleSubmit,
//   formState: { errors },
//   trigger,
//   control,
//   getValues,
//   clearErrors,
//   watch,
//    setError,
//   reset,
 
// } = useForm({
//   resolver: yupResolver(schema),  
//   context: { tab },
//   defaultValues: {
//     productName: "",
//     productFinish: "",
//     unit: "",
//     value: "",
//     thickness: "",
//       width:"",
//       height:"",
  
//     deliveryTime: "",
//     image: "",
//   },
// }); 



// const selectedUnit = watch("unit");

//    const files1 = watch("file1");
//  const files2 = watch("file2");
//  const files3 = watch("file3");
// const onSubmit = (data) => {
//   if (products.length === 0) {
//     alert("At least one product is required");
//     return;
//   }
// alert("submit successfully");
//   const finalData = {
//     ...data,
//     products,   
   
//   };

//   console.log("Final Payload:", finalData);
//   reset();
// };

// const [productImage, setProductImage] = useState(null);
 

// const addProduct = async () => {
//   const values = getValues();

//   try {
//     await productSchema.validate(
//       {
//         productName: values.productName,
//         productFinish: values.productFinish,
//         unit: values.unit,
//         value: values.value,
//         thickness: values.thickness,
//         image:values.image,
//       //  width: values.width,
//       //        height: values.height,
//         deliveryTime: values.deliveryTime,
//       },
//       { abortEarly: false }
//     );
//   } catch (err) {
//     if (err.inner) {
//       err.inner.forEach((e) => {
//         setError(e.path, {
//           type: "manual",
//           message: e.message,
//         });
//       });
//     }
//     return;
//   }

 
//   setProducts((prev) => [...prev, {
//     ...values,
//     image: productImage,
//     showDetails: false,
//   }]);


//   reset({
//     // ...values,
//     productName: "",
//     productFinish: "",
//     unit: "",
//     value: "",
//     thickness: "",
//  width: "",
//  height:"",
//     deliveryTime: "",
//   }, { keepErrors: false });

//   setProductImage(null);
// };



  
//   const RightIconInput = ({ icon: Icon, type = "text", placeholder, ...props }) => (
//   <div className="relative w-full">
//     <input
//       type={type}
//       placeholder={placeholder}
//       {...props}
//       className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//     />
//     {Icon && <Icon className="absolute right-3 top-4 text-gray-400 w-5 h-5" />}
//   </div>
// );



//   return (

//     <div className="min-h-screen font-poppins shadow  bg-white px-4 sm:px-8 py-6">

//       <div className="max-w-5xl mx-auto ">
//         <h1 className="text-xl sm:text-4xl font-semibold text-gray-900">
//           Stonepedia Bulk Orders
//         </h1>
//         <p className="text-xl text-gray-500 ">Fill this form to connect with us.</p>
//       </div>


//       <div className="max-w-5xl shadow-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
      
//         <div className="lg:col-span-3 bg-white shadow-xl  rounded-2xl p-6">
   
//           <div className="flex space-x-2 mb-6">
//             <button
//               disabled={submitting}
//               onClick={() => setTab("individual")}
//               className={`px-6  font-inter py-2 rounded-lg text-sm font-medium ${
//                 tab === "individual" ? "bg-[#871B58] text-white" : "bg-white border   text-gray-600"
//               }`}
//             >
//               Individual
//             </button>
//             <button
//               onClick={() => setTab("business")}
//               className={`px-5  font-inter py-3 rounded-lg text-sm font-medium ${
//                 tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
//               }`}
//             >
//               Business
//             </button>
//           </div>

  

//        <form onSubmit={handleSubmit(onSubmit)}>
       
//           {tab === "business" ? (
//                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                      <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Company Type</label>
//               <select
//                 {...register("companyType")}
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//               >
//                 <option value="">Choose</option>
//                 <option value="pvt">Private Ltd</option>
//                 <option value="llp">LLP</option>
//                 <option value="proprietor">Proprietor</option>
//               </select>
//                {errors.companyType && <p className=" text-sm text-red-600">{errors.companyType.message}</p>}
//             </div>
//                <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Company Name </label>
//               <input
//                 type="text"
//                 {...register("companyName")}
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 placeholder="Globex industries pvt.ltd"
//               />
//                {errors.companyName && <p className=" text-sm text-red-600">{errors.companyName.message}</p>}
//             </div>
//           </div>
//               ) : (
//                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                             <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Company Type (optional)</label>
//               <select
//                 {...register("companyType")}
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//               >
//                 <option value="">Choose</option>
//                 <option value="pvt">Private Ltd</option>
//                 <option value="llp">LLP</option>
//                 <option value="proprietor">Proprietor</option>
//               </select>
//             </div>
//                <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Company Name (optional)</label>
//               <input
//                 type="text"
//                 {...register("companyName")}
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 placeholder="Globex industries pvt.ltd"
//               />
//             </div>
//           </div>
               
//               )}
              
              
              

//   {tab === "business" ? (

//           <div className="mb-6">
//             <label className="block font-semibold  text-[16px] text-black mb-1">GST Number</label>
//             <input
//               type="text"
//               {...register("gstNumber")}
//               placeholder="Choose"
//               className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//             />
//              {errors.gstNumber && <p className=" text-sm text-red-600">{errors.gstNumber.message}</p>}
//           </div>
//            ) : (

//  <div className="mb-6">
//             <label className="block font-semibold  text-[16px] text-black mb-1">GST Number(optional)</label>
//             <input
//               type="text"
//               {...register("gstNumber")}
//               placeholder="Choose"
//               className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//             />

           
//           </div>


//            )}

//           {/* Personal Info */}

//               <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
//             <div className="col-span-2">
//               <label className="block font-semibold  text-[16px] text-black mb-1">Full Name</label>
//               <RightIconInput className="w-[40px]" icon={User} {...register("fullName")} placeholder="Harsh Shah" />
//               {errors.fullName && <p className=" text-sm text-red-600">{errors.fullName.message}</p>}
//             </div>
//             <div className="col-span-3">
//               <label className="block font-semibold  text-[16px] text-black mb-1">Email Address</label>
//               <RightIconInput icon={Mail} {...register("email")} type="email" placeholder="Enter Email Address" />
//               {errors.email && <p className=" text-sm text-red-600">{errors.email.message}</p>}
//             </div>
//             </div>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Phone Number</label>
//               <RightIconInput
//                 icon={Phone}
//                 {...register("phone")}
//                 placeholder="(+91) 6456783456"
 
//               />
//               {errors.phone && <p className=" text-sm text-red-600">{errors.phone.message}</p>}
//             </div>

//             <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Pincode</label>
//               <RightIconInput type="text" {...register("pinCode")} placeholder="122204" />
//               {errors.pinCode && <p className=" text-sm text-red-600">{errors.pinCode.message}</p>}
//             </div>
//           </div>

    
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-w-5xl mx-auto">
//             <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">City</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 {...register("city")}
//                 placeholder="Gurugram"
//               />
//               {errors.city && <p className=" text-sm text-red-600">{errors.city.message}</p>}
//             </div>
//             <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">State</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 {...register("state")}
//                 placeholder="Haryana"
//               />
//               {errors.state && <p className=" text-sm text-red-600">{errors.state.message}</p>}
//             </div>
//             <div>
//               <label className="block font-semibold  text-[16px] text-black mb-1">Country</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 {...register("country")}
//                 placeholder="India"
//               />
//               {errors.country && <p className=" text-sm text-red-600">{errors.country.message}</p>}
//             </div>
//           </div>

     
//           <p className="text-sm text-gray-500 mb-2">
//             Product Details <span className="text-gray-400">(Add multiple products here)</span>
//           </p>

        
        
// <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">


//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//     <div>
//       <label className="block font-semibold text-[16px] text-black mb-1">Product Name</label>
//       <input
//         type="text"
//         {...register("productName")}
//         placeholder="China White Travertine"
//         className="w-full border border-gray-300 rounded-2xl px-3 py-[18px] text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//       />
// {errors.productName && (
//     <p className=" text-sm text-red-600">{errors.productName.message}</p>
//   )}
//     </div>

//     <div>
//       <label className="block font-semibold text-[16px] text-black mb-1">Product Finish</label>
//       <select
//         {...register("productFinish")}
//         className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//       >
//         <option value="">Choose</option>
//         <option value="polished">Polished</option>
//         <option value="mirror-polished">Mirror Polished</option>
//         <option value="flamed">Flamed</option>
//         <option value="honed">Honed</option>
//         <option value="lapato">Lapato</option>
//         <option value="leather">Leather</option>
//         <option value="river-polished">River-Polished</option>
//         <option value="sand-blast">Sand-blast</option>
//         <option value="shot-blast">Shot-blast</option>
//         <option value="other">Other</option>
//       </select>
//      {errors.productFinish && (
//     <p className=" text-sm text-red-600">{errors.productFinish.message}</p>
//   )}
//     </div>
//   </div>

//  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
  
//   <div>
//     <label className="block font-semibold text-[16px] text-black mb-1">Select Unit</label>
//     <select
//       {...register("unit")}
//       className="w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//     >
//       <option value="">Choose</option>
//       <option value="sqft">Sqft</option>
//       <option value="sqm">Sqm</option>
//     </select>
//     {errors.unit && <p className=" text-sm text-red-600">{errors.unit.message}</p>}
//   </div>

//   <div>
//     <label className="block font-semibold  text-gray-700 mb-1">Enter Value</label>
//     <div className="flex items-center w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus-within:ring-2 focus-within:ring-pink-700">
//       <input
//         type="text"
//         {...register("value")}
//         placeholder="Type value"
//         className="w-full outline-none "
//       />
//       <span >{selectedUnit}</span>  
  
//     </div>
//     {errors.value && <p className=" text-sm text-red-600">{errors.value.message}</p>}
//   </div>


//   <div>
//     <label className="block font-semibold text-[16px] text-black mb-1">Thickness</label>
//     <select
//       {...register("thickness")}
//       className="w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//     >
//       <option value="">Choose</option>
//       <option value="8mm">8MM</option>
//       <option value="12mm">12MM</option>
//       <option value="14mm">14MM</option>
//       <option value="16mm">16MM</option>
//       <option value="18mm">18MM</option>
//       <option value="20mm">20MM</option>
//       <option value="25mm">25MM</option>
//       <option value="30mm">30MM</option>
//       <option value="other">Other</option>
//     </select>
//     {errors.thickness && (
//       <p className=" text-sm text-red-600">{errors.thickness.message}</p>
//     )}
//   </div>

// </div>

 

// <div className="mb-10">
//   <div className="flex items-center gap-2">
//     <label className="block font-semibold text-sm text-gray-700">
//       Size of product
//     </label>
//     <span className="text-gray-400 text-sm">(optional)</span>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
 
//     <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 h-12">
//       <span className="mr-2 font-medium text-sm">H</span>
//       <input
//         type="text"
//         {...register("height")}
//         placeholder="|Enter value"
//         className="w-full outline-none text-sm"
//       />
      
//     </div>

//     <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 h-12">
//       <span className="mr-2 font-medium text-sm">W</span>
//       <input
//         type="text"
//         {...register("width")}
//         placeholder="|Enter value"
//         className="w-full outline-none text-sm"
//       />
    
//     </div>
     

//     <div>
//       <label className="block font-semibold text-[16px] text-black mb-1 mt-[-20px]">
//         Estimate Delivery Time
//       </label>
//       <input
//         type="date"
//         {...register("deliveryTime")}
//         className="w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none text-sm h-12"
//       />
//       {errors.deliveryTime && (
//         <p className=" text-sm text-red-600">{errors.deliveryTime.message}</p>
//       )}
//     </div>
//   </div>
// </div>

//   <div className="border-1 border-dashed mb-3b dhases  border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative">
//   <input
//     type="file"
//     className="absolute inset-0 opacity-0 cursor-pointer"
//     accept="image/*"
//        {...register("image")}
//     onChange={(e) => setProductImage(e.target.files[0])}
//   />
//   <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//   <p className=" text-black  text-sm sm:text-base md:text-lg ">{productImage ? productImage.name : "Choose a Image or drag & drop it here"}</p>
//   <span className="text-xs block mb-2 text-gray-400">
//     JPEG, PNG and MP4 formats up to 50MB
//   </span>
//    <button
//       type="button"
//       className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg"
//     >
//       Browse
//     </button>
    
// </div>


//          <div className="flex justify-end mt-[15px]">
//           <button
//             type="button"
//            onClick={addProduct}
//             className=" flext justify-end  font-inter ra bg-[#871B58] text-white px-6 py-2 rounded mb-6"
//             disabled={submitting} 
//           >
//             Add this Product
//           </button>
//           </div>
//           </div>


//           <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative">
//               <input
//                 type="file"
//                    {...register("file1")}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
          
//                 accept=".pdf,application/pdf"
//               />
//               <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//               <p className="text-black  text-sm sm:text-base md:text-lg">{files1?.[0]?.name
//     ? files1[0].name
//     : "Choose a file or drag & drop it here"}</p>
//               <span className="text-xs block text-gray-400">Upload PDF BOC(Bulk order)/Tender Files upto 5MB</span>
//               <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">Browser</button>
//           {errors.file1 && (
//     <p className="text-red-500 text-xs ">{errors.file1.message}</p>
//   )}
//             </div>
           
//          {/* Installation */}
//          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4  text-gray-500 relative">
//           <div className="mb-6">
//             <label className="block font-semibold  text-[16px] text-black mb-1">Installation (optional)</label>
//             <input
//               type="text"
             
//               placeholder="Enter here"
//               className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//             />
//                 </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div className="        border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative">
//               <input
//                 type="file"
//                 {...register("file3")}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
               
//                 accept=".pdf,image/*"
//               />
//               <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//               <p className="text-black  text-sm sm:text-base md:text-lg">{files3?.[0]?.name
//     ? files3[0].name: "Choose a Rate list or drag & drop it here"}</p>
//               <span className="text-xs block text-gray-400">Upload rate list (If Any)</span>
//               <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">Browser</button>
//         {errors.file3 && (
//     <p className="text-red-500 text-xs ">{errors.file3.message}</p>
//   )}
//             </div>
            

//             <div className=" border-1 border-dashed border-[#871B58]  rounded-lg p-4 text-center text-gray-500 relative">
//               <input
//                 type="file"
//                     {...register("file2")}
//                 className="absolute inset-0 opacity-0 cursor-pointer"
               
//                 accept="image/*,video/mp4"
//               />
//               <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//               <p className="text-black  text-sm sm:text-base md:text-lg">{files2?.[0]?.name
//     ? files2[0].name: "Choose a Image or drag & drop it here"}</p>
//               <span className="text-xs block text-gray-400">JPEG, PNG and MP4 formats upto 50MB</span>
//               <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">Browse</button>
//                   {errors.file2 && (
//     <p className="text-red-500 text-xs ">{errors.file2.message}</p>
//   )}
//             </div>


//           </div>
//           </div>
          


       
//           <div className="mb-6 mt-2">
//             <label className="block font-semibold  text-[16px] text-black mb-1">Query / Message</label>
//             <textarea
              
//               className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//               placeholder="Write your message here"
//               rows="3"
//             />
           
//           </div>



//            {errors.products && <p>{errors.products.message}</p>}

//           <div className="flex justify-end">
//   <button
//     // onClick={handleSubmit(onSubmit)}
//     type="submit"
//     className="font-inter bg-[#871B58] text-white px-8 py-2 rounded mb-6"
//     disabled={submitting}
//   >
//     {submitting ? "Submitting..." : "Submit"}
//   </button>
// </div>
//     </form>
//         </div>
    


        
//            <div className="lg:col-span-2">
// <div className="bg-white/90 backdrop-blur-md w-full lg:w-[95%] max-w-5xl mx-auto shadow-xl rounded-2xl p-3 h-fit border border-gray-100">
// {products.length === 0 ? (
//  <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-14 w-14 text-gray-300 mb-4"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M12 4v16m8-8H4"
//         />
//       </svg>
//       <h4 className="text-lg font-semibold text-gray-700">
//         No products added yet
//       </h4>
      
//     </div>
// ) : (
//   <>
  
//   <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//     <span className="w-2 h-6 bg-pink-900 rounded-full"></span>
//     All Products
//   </h3>
//     <h3 className="text-gray-800 font-medium mb-4">
//       Products Added - {products.length}
//     </h3>

//     <div className="space-y-4">
//       {products.map((item, index) => (
//         <div
//           key={index}
//          className="bg-white w-full max-w-3xl mx-auto shadow rounded-2xl p-6 h-fit"
//         >
//           <div className="flex justify-between items-start">
//             <div className="flex gap-4 items-center">
//               {item.image && (
//                 <img
//                   src={URL.createObjectURL(item.image)}
//                   alt={`product-${index}`}
//                   className="w-24 h-24 rounded-lg object-cover"
//                 />
//               )}
//               <div>
//                 <h4 className="font-medium text-gray-900">
//                   {item.productName}
//                 </h4>
//                 <p className="text-sm text-[#838383]">
//                   {item.productFinish}
//                 </p>
//                  <button
//                 onClick={() => toggleDetails(index)}
//                 className="text-gray-600 text-sm underline"
//               >
//                 {item.showDetails ? "Hide" : "Show"} Details
//               </button>
//               </div>
              
//             </div>

//             <div className="flex gap-2">
             
             

         
//               <button
//                 onClick={() =>
//                   setProducts((prev) => prev.filter((_, i) => i !== index))
//                 }
//                 className="text-red-500 hover:text-red-700 transition"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

       
//           {item.showDetails && (
//             <div className="mt-3 text-sm text-gray-600 space-y-1">
//              <div  className="border border-gray-200 rounded-lg p-4 flex flex-col">
//               <p><strong>Unit:</strong> {item.unit}</p>
//               <p><strong>Value:</strong> {item.value}</p>
//               <p><strong>Thickness:</strong> {item.thickness}</p>
//               <p><strong>Size:</strong> W: {item.width } | H: {item.height}</p>
//               <p><strong>Delivery:</strong> {item.deliveryTime}</p>
//             </div>
//             </div>
//           )}

//         </div>
//       ))}
//     </div>
// </>  
// )}  
// </div>
// </div>      </div>
        
    
//       </div>
  
//   );
// }
// import React, { useState } from "react";
// import image from "../assets/stone.png";
// import {
//   Building2,
//   Hash,
//   User,
//   Mail,
//   Phone,
//   MapPin,
//   Landmark,
//   Globe,
//   Package,
//   Layers,
//   Ruler,
//   Trash2,
//   Square,
//   Calendar,
//   Upload,
//   Wrench,
//   FileText,
// } from "lucide-react";

// export default function BulkOrderForm() {
//   // -------------------- Helpers (no external libs) --------------------
// const nameRegex = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const phoneRegex = /^(\+91[-\s]?|0)?[6-9]\d{9}$/;;
// const pinRegex = /^\d{6}$/;
// const gstRegex = /^[0-9A-Z]{15}$/;
// const twoDecimalRegex = /^\d+(\.\d{1,2})?$/;

//   const validateSizeNumber = (value) => {
//     if (value === undefined || value === null || value === "") return null; // optional
//     if (isNaN(Number(value))) return "Must be a number";
//     const num = Number(value);
//     if (num <= 0) return "Value must be greater than 0";
//     if (num < 100) return "Min value is 100mm";
//     if (num > 3000) return "Max value is 3000mm";
//     if (!twoDecimalRegex.test(String(value))) return "Max 2 decimal places allowed";
//     return null;
//   };

//   const validateFile = (file, maxMB = 50) => {
//     if (!file) return null; // optional
//     const ok = file.size <= maxMB * 1024 * 1024;
//     return ok ? null : `Max size ${maxMB}MB`;
//   };

//   const validateProduct = (p) => {
//     const errs = {};
//     if (!p.productName) errs.productName = "Product name required";
//     if (!p.productFinish) errs.productFinish = "Product finish required";
//     if (!p.unit) errs.unit = "Unit is required";
//     if (p.value === "" || p.value === null || p.value === undefined) {
//       errs.value = "Value is required";
//     } else if (isNaN(Number(p.value))) {
//       errs.value = "Enter a number";
//     } else if (Number(p.value) < 0.0001) {
//       errs.value = "Value must be greater than 0";
//     } else if (!twoDecimalRegex.test(String(p.value))) {
//       // keep same 2dp rule for value as well (optional; remove if not needed)
//       // errs.value = "Max 2 decimal places allowed";
//     }
//     if (!p.thickness) errs.thickness = "Thickness is required";
//     if (!p.deliveryTime) errs.deliveryTime = "Delivery time required";

//     const wErr = validateSizeNumber(p.width);
//     if (wErr) errs.width = wErr;
//     const hErr = validateSizeNumber(p.height);
//     if (hErr) errs.height = hErr;

//     const imgErr = validateFile(p.image, 50);
//     if (imgErr) errs.image = imgErr;
//     return errs;
//   };

//   const validateForm = (data, tab) => {
//     const errs = {};

//     // Business-only fields
//     if (tab === "business") {
//       if (!data.companyType) errs.companyType = "Company Type is required";
//       if (!data.companyName) errs.companyName = "Company Name is required";
//       else if (!nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
//       if (!data.gstNumber) errs.gstNumber = "GST Number is required";
//       else if (!gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
//     } else {
//       // Optional in Individual mode: if provided, still validate format
//       if (data.companyName && !nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
//       if (data.gstNumber && !gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
//     }

//     // Personal Info
//     if (!data.fullName) errs.fullName = "Full Name is required";
//     else if (!nameRegex.test(data.fullName)) errs.fullName = "Enter valid name";

//     if (!data.email) errs.email = "Email is required";
//     else if (!emailRegex.test(data.email)) errs.email = "Invalid email";

//     if (!data.phone) errs.phone = "Phone is required";
//     else if (!phoneRegex.test(data.phone)) errs.phone = "Phone must be 10 digits";

//     if (!data.pinCode) errs.pinCode = "Pincode is required";
//     else if (!pinRegex.test(data.pinCode)) errs.pinCode = "Pincode must be 6 digits";

//     if (!data.city) errs.city = "City is required";
//     else if (!nameRegex.test(data.city)) errs.city = "Enter a valid city name";

//     if (!data.state) errs.state = "State is required";
//     else if (!nameRegex.test(data.state)) errs.state = "Enter a valid state name";

//     if (!data.country) errs.country = "Country is required";
//     else if (!nameRegex.test(data.country)) errs.country = "Enter a valid country name";

//     // Files
//     const f1Err = validateFile(data.file1, 50);
//     if (f1Err) errs.file1 = f1Err;
//     const f2Err = validateFile(data.file2, 50);
//     if (f2Err) errs.file2 = f2Err;
//     const f3Err = validateFile(data.file3, 50);
//     if (f3Err) errs.file3 = f3Err;

//     return errs;
//   };

//   // -------------------- State --------------------
//   const [tab, setTab] = useState("individual");
//   const [submitting, setSubmitting] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [productImage, setProductImage] = useState(null);
//   const [errors, setErrors] = useState({});
// const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({

//     companyType: "",
//     companyName: "",
//     gstNumber: "",
 
//     fullName: "",
//     email: "",
//     phone: "",
//     pinCode: "",
//     city: "",
//     state: "",
//     country: "",
 
//     productName: "",
//     productFinish: "",
//     unit: "",
//     value: "",
//     thickness: "",
//     width: "",
//     height: "",
//     deliveryTime: "",
//     image: null,
//     // files
//     file1: null,
//     file2: null,
//     file3: null,
//     // message
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       const file = files && files[0] ? files[0] : null;
//       setFormData((prev) => ({ ...prev, [name]: file }));
//       if (name === "image") setProductImage(file);
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
  
//     if (isSubmitted) {
//     const fieldErrs = validateForm({ ...formData, [name]: value }, tab);
//     setErrors((prev) => ({ ...prev, [name]: fieldErrs[name] }));
//   }
//   };

//   const toggleDetails = (index) => {
//     const newProducts = [...products];
//     newProducts[index].showDetails = !newProducts[index].showDetails;
//     setProducts(newProducts);
//   };


//     const addProduct = () => {
  
//     const p = {
//       productName: formData.productName,
//       productFinish: formData.productFinish,
//       unit: formData.unit,
//       value: formData.value,
//       thickness: formData.thickness,
//       width: formData.width,
//       height: formData.height,
//       deliveryTime: formData.deliveryTime,
//       image: formData.image,
//     };
//     const perrs = validateProduct(p);
//     console.log(perrs);
//     if (Object.keys(perrs).length) {
//       setErrors((prev) => ({ ...prev, ...perrs }));
//       return;
//     }

//   const newProduct = {
//     productName: formData.productName,
//     productFinish: formData.productFinish,
//     unit: formData.unit,
//     value: formData.value,
//     thickness: formData.thickness,
//     width: formData.width,
//     height: formData.height,
//     deliveryTime: formData.deliveryTime,
//     image: formData.image || null,   
//     showDetails: false,              
//   };
//         console.log("jj")

//   setProducts((prev) => [...prev, newProduct]);
//   console.log(products)

//   // reset form
//   setFormData({
//     productName: "",
//     productFinish: "",
//     unit: "",
//     value: "",
//     thickness: "",
//     width: "",
//     height: "",
//     deliveryTime: "",
//     image: null,
//   });
// };
//   const onSubmit = (e) => {
//     e.preventDefault();
//   setIsSubmitted(true);

//     const ferrs = validateForm(formData, tab);
//     console.log(ferrs);
//     if (Object.keys(ferrs).length) {
//       setErrors(ferrs);
//       // scroll to first error
//       const firstKey = Object.keys(ferrs)[0];
//       const el = document.querySelector(`[name="${firstKey}"]`);
//       if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
//       return;
//     }
//        if (products.length === 0) {
//       alert("At least one product is required");
//       return; 
//     }

//     setSubmitting(true);
//     const finalData = { ...formData, products };
//     console.log("Final Payload:", finalData);
//     alert("submit successfully");

//     // reset everything
//     setFormData({
//       companyType: "",
//       companyName: "",
//       gstNumber: "",
//       fullName: "",
//       email: "",
//       phone: "",
//       pinCode: "",
//       city: "",
//       state: "",
//       country: "",
//       productName: "",
//       productFinish: "",
//       unit: "",
//       value: "",
//       thickness: "",
//       width: "",
//       height: "",
//       deliveryTime: "",
//       image: null,
//       file1: null,
//       file2: null,
//       file3: null,
//       message: "",
//     });
//     setProducts([]);
//     setErrors({});
//     setProductImage(null);
//     setSubmitting(false);
//   };


//   const selectedUnit = formData.unit;
//   const files1 = formData.file1 ? [formData.file1] : null;
//   const files2 = formData.file2 ? [formData.file2] : null;
//   const files3 = formData.file3 ? [formData.file3] : null;

//   return (
//     <div className="min-h-screen font-poppins shadow  bg-white px-4 sm:px-8 py-6">
//       <div className="max-w-5xl mx-auto ">
//         <h1 className="text-xl sm:text-4xl font-semibold text-gray-900">Stonepedia Bulk Orders</h1>
//         <p className="text-xl text-gray-500 ">Fill this form to connect with us.</p>
//       </div>

//       <div className="max-w-5xl shadow-7xl mx-auto mt-6 grid grid-cols-1 lg:grid-cols-5 gap-12">
//         <div className="lg:col-span-3 bg-white shadow-xl  rounded-2xl p-6">
//           <div className="flex space-x-2 mb-6">
//             <button
//               disabled={submitting}
//               onClick={() => setTab("individual")}
//               className={`px-6  font-inter py-2 rounded-lg text-sm font-medium ${
//                 tab === "individual" ? "bg-[#871B58] text-white" : "bg-white border   text-gray-600"
//               }`}
//             >
//               Individual
//             </button>
//             <button
//               onClick={() => setTab("business")}
//               className={`px-5  font-inter py-3 rounded-lg text-sm font-medium ${
//                 tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
//               }`}
//             >
//               Business
//             </button>
//           </div>

//           <form onSubmit={onSubmit}>
//             {tab === "business" ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Type</label>
//                   <select
//                     name="companyType"
//                     value={formData.companyType}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
//                     <option value="">Choose</option>
//                     <option value="pvt">Private Ltd</option>
//                     <option value="llp">LLP</option>
//                     <option value="proprietor">Proprietor</option>
//                   </select>
//                   {errors.companyType && <p className=" text-sm text-red-600">{errors.companyType}</p>}
//                 </div>
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Name </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                     placeholder="Globex industries pvt.ltd"
//                   />
//                   {errors.companyName && <p className=" text-sm text-red-600">{errors.companyName}</p>}
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Type (optional)</label>
//                   <select
//                     name="companyType"
//                     value={formData.companyType}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
                    

//                     <option value="">Choose</option>
//                     <option value="pvt">Private Ltd</option>
//                     <option value="llp">LLP</option>
//                     <option value="proprietor">Proprietor</option>
//                   </select>
//                      {errors.companyType && <p className=" text-sm text-red-600">{errors.companyType}</p>}
                
//                 </div>
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Name (optional)</label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                     placeholder="Globex industries pvt.ltd"
//                   />
//                       {errors.companyName && <p className=" text-sm text-red-600">{errors.companyName}</p>}
//                 </div>
//               </div>
//             )}

//             {tab === "business" ? (
//               <div className="mb-6">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">GST Number</label>
//                 <input
//                   type="text"
//                   name="gstNumber"
//                   value={formData.gstNumber}
//                   onChange={handleChange}
//                   placeholder="Choose"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 />
//                 {errors.gstNumber && <p className=" text-sm text-red-600">{errors.gstNumber}</p>}
//               </div>
//             ) : (
//               <div className="mb-6">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">GST Number(optional)</label>
//                 <input
//                   type="text"
//                   name="gstNumber"
//                   value={formData.gstNumber}
//                   onChange={handleChange}
//                   placeholder="Choose"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 />
//                  {errors.gstNumber && <p className=" text-sm text-red-600">{errors.gstNumber}</p>}
//               </div>
//             )}

//             {/* Personal Info */}
//             <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
//               <div className="col-span-2">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Full Name</label>
        


// <div
//                     className="relative 
// "
//                   >
                    

                
//                     <input
//   type="text"
//   name="fullName"
//   value={formData.fullName}
//   onChange={handleChange}
//   placeholder="Full Name"
//   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
// />
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="currentColor"
//                       viewBox="0 0 24 24"
//                       className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
//                     >
//                       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4      
//                           1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8      
//                           4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                     </svg>
//                   </div>



//                 {errors.fullName && <p className=" text-sm text-red-600">{errors.fullName}</p>}
//               </div>
//               <div className="col-span-3">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Email Address</label>
               
// <div
//                     className="relative 
// "
//                   >
                    

                 
//                     <input
//   type="text"
//   name="email"
//   value={formData.email}
//   onChange={handleChange}
//   placeholder="Enter email"
//   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
// />

                    
//                    <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="currentColor"
//   viewBox="0 0 24 24"
//   className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
// >
//   <path d="M4 4h16v16H4z" />
//   <polyline points="22,6 12,13 2,6" />
// </svg>
//                   </div>
//                 {errors.email && <p className=" text-sm text-red-600">{errors.email}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Phone Number</label>
        


                               
// <div
//                     className="relative 
// "
//                   >
//                                      <input
//   type="text"
//   name="phone"
//   value={formData.phone}
//   onChange={handleChange}
//   placeholder="Enter phone nmber"
//   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
// /> 

                   

// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="currentColor"
//   viewBox="0 0 24 24"
//   className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
// >
//   <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.53.74 3.89.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.92 22 2 13.08 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.36.26 2.69.74 3.89a1 1 0 01-.21 1.11l-2.2 2.2z" />
// </svg>
//                   </div>
//                 {errors.phone && <p className=" text-sm text-red-600">{errors.phone}</p>}
//               </div>
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Pincode</label>
         
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="pinCode"
//                   value={formData.pinCode}
//                   onChange={handleChange}
//                   placeholder="122204"
//                 />
//                 {errors.pinCode && <p className=" text-sm text-red-600">{errors.pinCode}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-w-5xl mx-auto">
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">City</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="Gurugram"
//                 />
//                 {errors.city && <p className=" text-sm text-red-600">{errors.city}</p>}
//               </div>
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">State</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   placeholder="Haryana"
//                 />
//                 {errors.state && <p className=" text-sm text-red-600">{errors.state}</p>}
//               </div>
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Country</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   placeholder="India"
//                 />
//                 {errors.country && <p className=" text-sm text-red-600">{errors.country}</p>}
//               </div>
//             </div>

//             <p className="text-sm text-gray-500 mb-2">
//               Product Details <span className="text-gray-400">(Add multiple products here)</span>
//             </p>

//             <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Product Name</label>
//                   <input
//                     type="text"
//                     name="productName"
//                     value={formData.productName}
//                     onChange={handleChange}
//                     placeholder="China White Travertine"
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-[18px] text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   />
//                   {errors.productName && (
//                     <p className=" text-sm text-red-600">{errors.productName}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Product Finish</label>
//                   <select
//   name="productFinish"
//   value={formData.productFinish}
//   onChange={handleChange}
//   className="w-full border border-gray-300 rounded-2xl px-3 py-[18px] text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
// >
//   <option value="">Choose finish</option>
//   <option value="polished">Polished</option>
//   <option value="honed">Honed</option>
//   <option value="tumbled">Tumbled</option>
//   <option value="brushed">Brushed</option>
// </select>
// {errors.productFinish && (
//   <p className=" text-sm text-red-600">{errors.productFinish}</p>
// )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Select Unit</label>
//                   <select
//                     name="unit"
//                     value={formData.unit}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
//                     <option value="">Choose</option>
//                     <option value="sqft">Sqft</option>
//                     <option value="sqm">Sqm</option>
//                   </select>
//                   {errors.unit && <p className=" text-sm text-red-600">{errors.unit}</p>}
//                 </div>

//                 <div>
//                   <label className="block font-semibold  text-gray-700 mb-1">Enter Value</label>
//                   <div className="flex items-center w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus-within:ring-2 focus-within:ring-pink-700">
//                     <input
//                       type="text"
//                       name="value"
//                       value={formData.value}
//                       onChange={handleChange}
//                       placeholder="Type value"
//                       className="w-full outline-none "
//                     />
//                     <span>{selectedUnit}</span>
//                   </div>
//                   {errors.value && <p className=" text-sm text-red-600">{errors.value}</p>}
//                 </div>

//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Thickness</label>
//                   <select
//                     name="thickness"
//                     value={formData.thickness}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
//                     <option value="">Choose</option>
//                     <option value="8mm">8MM</option>
//                     <option value="12mm">12MM</option>
//                     <option value="14mm">14MM</option>
//                     <option value="16mm">16MM</option>
//                     <option value="18mm">18MM</option>
//                     <option value="20mm">20MM</option>
//                     <option value="25mm">25MM</option>
//                     <option value="30mm">30MM</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {errors.thickness && (
//                     <p className=" text-sm text-red-600">{errors.thickness}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-10">
//                 <div className="flex items-center gap-2">
//                   <label className="block font-semibold text-sm text-gray-700">Size of product</label>
//                   <span className="text-gray-400 text-sm">(optional)</span>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//              <div>
//                   <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 h-12">
                 
//                     <span className="mr-2 font-medium text-sm">H</span>
//                     <input
//                       type="text"
//                       name="height"
//                       value={formData.height}
//                       onChange={handleChange}
//                       placeholder="|Enter value"
//                       className="w-full outline-none text-sm"
//                     />
//                        </div> 
//                           <p className=" text-sm text-red-600 min-h-[1.25rem]">{errors.height}</p>
              
//                   </div>
// <div>
//                   <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 h-12">
//                     <span className="mr-2 font-medium text-sm">W</span>
//                     <input
//                       type="text"
//                       name="width"
//                       value={formData.width}
//                       onChange={handleChange}
//                       placeholder="|Enter value"
//                       className="w-full outline-none text-sm"
//                     />
//                     </div>
//                           <p className="  mb-2 md:mb-0 text-sm text-red-600 min-h-[1.25rem]">{errors.height}</p>
//                   </div>

//                   <div>
//                     <label className="block font-semibold text-[16px] text-black mb-1 mt-[-20px]">Estimate Delivery Time</label>
//                     <input
//                       type="date"
//                       name="deliveryTime"
//                       value={formData.deliveryTime}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none text-sm h-12"
//                     />
//                     {errors.deliveryTime && (
//                       <p className=" text-sm text-red-600">{errors.deliveryTime}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="border-1 border-dashed mb-3b dhases  border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative">
//                 <input
//                   type="file"
//                   className="absolute inset-0 opacity-0 cursor-pointer"
//                   accept="image/*"
//                   name="image"
//                   onChange={handleChange}
//                 />
//                 <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//                 <p className=" text-black  text-sm sm:text-base md:text-lg ">{
//                   productImage ? productImage.name : "Choose a Image or drag & drop it here"
//                 }</p>
//                 <span className="text-xs block mb-2 text-gray-400">JPEG, PNG and MP4 formats up to 50MB</span>
//                 <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">
//                   Browse
//                 </button>
//                 {errors.image && (
//                   <p className="text-red-500 text-xs ">{errors.image}</p>
//                 )}
//               </div>

//               <div className="flex justify-end mt-[15px]">
//                 <button
//                   type="button"
//                   onClick={addProduct}
//                   className=" flext justify-end  font-inter ra bg-[#871B58] text-white px-6 py-2 rounded mb-6"
//                   disabled={submitting}
//                 >
//                   Add this Product
//                 </button>
//               </div>
//             </div>

//             <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative">
//               <input
//                 type="file"
//                 name="file1"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept=".pdf,application/pdf"
//                 onChange={handleChange}
//               />
//               <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//               <p className="text-black  text-sm sm:text-base md:text-lg">{
//                 files1?.[0]?.name ? files1[0].name : "Choose a file or drag & drop it here"
//               }</p>
//               <span className="text-xs block text-gray-400">Upload PDF BOC(Bulk order)/Tender Files upto 5MB</span>
//               <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">Browser</button>
//               {errors.file1 && (
//                 <p className="text-red-500 text-xs ">{errors.file1}</p>
//               )}
//             </div>

//             {/* Installation */}
//             <div className="border-2 border-dashed border-gray-300 rounded-lg p-4  text-gray-500 relative">
//               <div className="mb-6">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Installation (optional)</label>
//                 <input
//                   type="text"
//                   name="installation"
//                   placeholder="Enter here"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div className="        border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative">
//                   <input
//                     type="file"
//                     name="file3"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     accept=".pdf,image/*"
//                     onChange={handleChange}
//                   />
//                   <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//                   <p className="text-black  text-sm sm:text-base md:text-lg">{
//                     files3?.[0]?.name ? files3[0].name : "Choose a Rate list or drag & drop it here"
//                   }</p>
//                   <span className="text-xs block text-gray-400">Upload rate list (If Any)</span>
//                   <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">Browser</button>
//                   {errors.file3 && (
//                     <p className="text-red-500 text-xs ">{errors.file3}</p>
//                   )}
//                 </div>

//                 <div className=" border-1 border-dashed border-[#871B58]  rounded-lg p-4 text-center text-gray-500 relative">
//                   <input
//                     type="file"
//                     name="file2"
//                     className="absolute inset-0 opacity-0 cursor-pointer"
//                     accept="image/*,video/mp4"
//                     onChange={handleChange}
//                   />
//                   <Upload className="mx-auto mb-2 w-6 h-6 text-black font-bold" />
//                   <p className="text-black  text-sm sm:text-base md:text-lg">{
//                     files2?.[0]?.name ? files2[0].name : "Choose a Image or drag & drop it here"
//                   }</p>
//                   <span className="text-xs block text-gray-400">JPEG, PNG and MP4 formats upto 50MB</span>
//                   <button type="button" className="bg-white border border-gray-300 text-gray-300 text-sm px-4 py-2 rounded-lg">Browse</button>
//                   {errors.file2 && (
//                     <p className="text-red-500 text-xs ">{errors.file2}</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="mb-6 mt-2">
//               <label className="block font-semibold  text-[16px] text-black mb-1">Query / Message</label>
//               <textarea
//                 name="message"
//                 className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 placeholder="Write your message here"
//                 rows={3}
//                 value={formData.message}
//                 onChange={handleChange}
//               />
//             </div>

//             {errors.products && <p>{errors.products}</p>}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="font-inter bg-[#871B58] text-white px-8 py-2 rounded mb-6"
//                 disabled={submitting}
//               >
//                 {submitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="lg:col-span-2">
//           <div className="bg-white/90 backdrop-blur-md w-full lg:w-[95%] max-w-5xl mx-auto shadow-xl rounded-2xl p-3 h-fit border border-gray-100">
//             {products.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-14 w-14 text-gray-300 mb-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 <h4 className="text-lg font-semibold text-gray-700">No products added yet</h4>
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <span className="w-2 h-6 bg-pink-900 rounded-full"></span>
//                   All Products
//                 </h3>
//                 <h3 className="text-gray-800 font-medium mb-4">Products Added - {products.length}</h3>

//                 <div className="space-y-4">
//                   {products.map((item, index) => (
//                     <div key={index} className="bg-white w-full max-w-3xl mx-auto shadow rounded-2xl p-6 h-fit">
//                       <div className="flex justify-between items-start">
//                         <div className="flex gap-4 items-center">
//                           {item.image && (
//                             <img
//                               src={URL.createObjectURL(item.image)}
//                               alt={`product-${index}`}
//                               className="w-24 h-24 rounded-lg object-cover"
//                             />
//                           )}
//                           <div>
//                             <h4 className="font-medium text-gray-900">{item.productName}</h4>
//                             <p className="text-sm text-[#838383]">{item.productFinish}</p>
//                             <button onClick={() => toggleDetails(index)} className="text-gray-600 text-sm underline">
//                               {item.showDetails ? "Hide" : "Show"} Details
//                             </button>
//                           </div>
//                         </div>

//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => setProducts((prev) => prev.filter((_, i) => i !== index))}
//                             className="text-red-500 hover:text-red-700 transition"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>

//                       {item.showDetails && (
//                         <div className="mt-3 text-sm text-gray-600 space-y-1">
//                           <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
//                             <p><strong>Unit:</strong> {item.unit}</p>
//                             <p><strong>Value:</strong> {item.value}</p>
//                             <p><strong>Thickness:</strong> {item.thickness}</p>
//                             <p><strong>Size:</strong> W: {item.width} | H: {item.height}</p>
//                             <p><strong>Delivery:</strong> {item.deliveryTime}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useState } from "react";
// import image from "../assets/stone.png";


// export default function BulkOrderForm() {
//   // -------------------- Helpers (no external libs) --------------------
// const nameRegex = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const phoneRegex = /^(\+91[-\s]?|0)?[6-9]\d{9}$/;;
// const pinRegex = /^\d{6}$/;
// const gstRegex = /^[0-9A-Z]{15}$/;
// const twoDecimalRegex = /^\d+(\.\d{1,2})?$/;

//   const validateSizeNumber = (value) => {
//     if (value === undefined || value === null || value === "") return null; // optional
//     if (isNaN(Number(value))) return "Must be a number";
//     const num = Number(value);
//     if (num <= 0) return "Value must be greater than 0";
//     if (num < 100) return "Min value is 100mm";
//     if (num > 3000) return "Max value is 3000mm";
//     if (!twoDecimalRegex.test(String(value))) return "Max 2 decimal places allowed";
//     return null;
//   };

//   const validateFile = (file, maxMB = 50) => {
//     if (!file) return null; // optional
//     const ok = file.size <= maxMB * 1024 * 1024;
//     return ok ? null : `Max size ${maxMB}MB`;
//   };

//   const validateProduct = (p) => {
//     const errs = {};
//     if (!p.productName) errs.productName = "Product name required";
//     if (!p.productFinish) errs.productFinish = "Product finish required";
//     if (!p.unit) errs.unit = "Unit is required";
//     if (p.value === "" || p.value === null || p.value === undefined) {
//       errs.value = "Value is required";
//     } else if (isNaN(Number(p.value))) {
//       errs.value = "Enter a number";
//     } else if (Number(p.value) < 0.0001) {
//       errs.value = "Value must be greater than 0";
//     } else if (!twoDecimalRegex.test(String(p.value))) {
//       // keep same 2dp rule for value as well (optional; remove if not needed)
//       // errs.value = "Max 2 decimal places allowed";
//     }
//     if (!p.thickness) errs.thickness = "Thickness is required";
//     if (!p.deliveryTime) errs.deliveryTime = "Delivery time required";

//     const wErr = validateSizeNumber(p.width);
//     if (wErr) errs.width = wErr;
//     const hErr = validateSizeNumber(p.height);
//     if (hErr) errs.height = hErr;

//     const imgErr = validateFile(p.image, 50);
//     if (imgErr) errs.image = imgErr;
//     return errs;
//   };

//   const validateForm = (data, tab) => {
//     const errs = {};

//     // Business-only fields
//     if (tab === "business") {
//       if (!data.companyType) errs.companyType = "Company Type is required";
//       if (!data.companyName) errs.companyName = "Company Name is required";
//       else if (!nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
//       if (!data.gstNumber) errs.gstNumber = "GST Number is required";
//       else if (!gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
//     } else {
//       // Optional in Individual mode: if provided, still validate format
//       if (data.companyName && !nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
//       if (data.gstNumber && !gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
//     }

//     // Personal Info
//     if (!data.fullName) errs.fullName = "Full Name is required";
//     else if (!nameRegex.test(data.fullName)) errs.fullName = "Enter valid name";

//     if (!data.email) errs.email = "Email is required";
//     else if (!emailRegex.test(data.email)) errs.email = "Invalid email";

//     if (!data.phone) errs.phone = "Phone is required";
//     else if (!phoneRegex.test(data.phone)) errs.phone = "Phone must be 10 digits";

//     if (!data.pinCode) errs.pinCode = "Pincode is required";
//     else if (!pinRegex.test(data.pinCode)) errs.pinCode = "Pincode must be 6 digits";

//     if (!data.city) errs.city = "City is required";
//     else if (!nameRegex.test(data.city)) errs.city = "Enter a valid city name";

//     if (!data.state) errs.state = "State is required";
//     else if (!nameRegex.test(data.state)) errs.state = "Enter a valid state name";

//     if (!data.country) errs.country = "Country is required";
//     else if (!nameRegex.test(data.country)) errs.country = "Enter a valid country name";

//     // Files
//     const f1Err = validateFile(data.file1, 50);
//     if (f1Err) errs.file1 = f1Err;
//     const f2Err = validateFile(data.file2, 50);
//     if (f2Err) errs.file2 = f2Err;
//     const f3Err = validateFile(data.file3, 50);
//     if (f3Err) errs.file3 = f3Err;

//     return errs;
//   };

//   // -------------------- State --------------------
//   const [tab, setTab] = useState("individual");
//   const [submitting, setSubmitting] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [productImage, setProductImage] = useState(null);
//   const [errors, setErrors] = useState({});
// const [isSubmitted, setIsSubmitted] = useState(false);
//   const [formData, setFormData] = useState({

//     companyType: "",
//     companyName: "",
//     gstNumber: "",
 
//     fullName: "",
//     email: "",
//     phone: "",
//     pinCode: "",
//     city: "",
//     state: "",
//     country: "",
 
//     productName: "",
//     productFinish: "",
//     unit: "",
//     value: "",
//     thickness: "",
//     width: "",
//     height: "",
//     deliveryTime: "",
//     image: null,
//     // files
//     file1: null,
//     file2: null,
//     file3: null,
//     // message
//     message: "",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === "file") {
//       const file = files && files[0] ? files[0] : null;
//       setFormData((prev) => ({ ...prev, [name]: file }));
//       if (name === "image") setProductImage(file);
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
  
//     if (isSubmitted) {
//     const fieldErrs = validateForm({ ...formData, [name]: value }, tab);
//     setErrors((prev) => ({ ...prev, [name]: fieldErrs[name] }));
//   }
//   };

//   const toggleDetails = (index) => {
//     const newProducts = [...products];
//     newProducts[index].showDetails = !newProducts[index].showDetails;
//     setProducts(newProducts);
//   };


//     const addProduct = () => {
  
//     const p = {
//       productName: formData.productName,
//       productFinish: formData.productFinish,
//       unit: formData.unit,
//       value: formData.value,
//       thickness: formData.thickness,
//       width: formData.width,
//       height: formData.height,
//       deliveryTime: formData.deliveryTime,
//       image: formData.image,
//     };
//     const perrs = validateProduct(p);
//     console.log(perrs);
//     if (Object.keys(perrs).length) {
//       setErrors((prev) => ({ ...prev, ...perrs }));
//       return;
//     }

//   const newProduct = {
//     productName: formData.productName,
//     productFinish: formData.productFinish,
//     unit: formData.unit,
//     value: formData.value,
//     thickness: formData.thickness,
//     width: formData.width,
//     height: formData.height,
//     deliveryTime: formData.deliveryTime,
//     image: formData.image || null,   
//     showDetails: false,              
//   };
//         console.log("jj")

//   setProducts((prev) => [...prev, newProduct]);
//   console.log(products)

//   // reset form
//   setFormData({
//     productName: "",
//     productFinish: "",
//     unit: "",
//     value: "",
//     thickness: "",
//     width: "",
//     height: "",
//     deliveryTime: "",
//     image: null,
//   });
// };
//   const onSubmit = (e) => {
//     e.preventDefault();
//   setIsSubmitted(true);

//     const ferrs = validateForm(formData, tab);
//     console.log(ferrs);
//     if (Object.keys(ferrs).length) {
//       setErrors(ferrs);
//       // scroll to first error
//       const firstKey = Object.keys(ferrs)[0];
//       const el = document.querySelector(`[name="${firstKey}"]`);
//       if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
//       return;
//     }
//        if (products.length === 0) {
//       alert("At least one product is required");
//       return; 
//     }

//     setSubmitting(true);
//     const finalData = { ...formData, products };
//     console.log("Final Payload:", finalData);
//     alert("submit successfully");

//     // reset everything
//     setFormData({
//       companyType: "",
//       companyName: "",
//       gstNumber: "",
//       fullName: "",
//       email: "",
//       phone: "",
//       pinCode: "",
//       city: "",
//       state: "",
//       country: "",
//       productName: "",
//       productFinish: "",
//       unit: "",
//       value: "",
//       thickness: "",
//       width: "",
//       height: "",
//       deliveryTime: "",
//       image: null,
//       file1: null,
//       file2: null,
//       file3: null,
//       message: "",
//     });
//     setProducts([]);
//     setErrors({});
//     setProductImage(null);
//     setSubmitting(false);
//   };


//   const selectedUnit = formData.unit;
//   const files1 = formData.file1 ? [formData.file1] : null;
//   const files2 = formData.file2 ? [formData.file2] : null;
//   const files3 = formData.file3 ? [formData.file3] : null;

//   return (
//     <div className="min-h-screen font-poppins   bg-white ">
//       {/* <div className="mx-5 md:mx-[139px] mt-auto  md:mt-[88px] max-w-5xl  "> */}
//       <div className="mx-5 md:mx-[139px] my-auto md:mt-[88px] max-w-5xl">
//         <h1 className="text-xl sm:text-5xl font-semibold font-poppins text-[#000000]">Stonepedia Bulk Orders</h1>
//         <p className="text-2xl text-[#BDBDBD] ">Fill this form to connect with us..</p>
//       </div>

//       <div className="  mx-auto md:mx-[130px] mt-auto  md:mt-[14px] flex flex-col md:flex-row lg:flex-row gap-12">
//         {/* <div className="  shadow-2xl p-5 md:p-[46px] w-full max-w-[779px] pt-3 md:pt-[44px] bg-white  rounded-[20px] shadow-md  min-h-[2160px] h-auto bg-white shadow-xl  rounded-2xl "> */}
//         <div className="shadow-2xl p-5 md:p-10 w-full max-w-3xl bg-white rounded-2xl">
//           <div className="flex space-x-2 mb-6">
//             <button
//               disabled={submitting}
//               onClick={() => setTab("individual")}
//               className={`px-6 md:w-120px  font-inter py-2 rounded-lg text-sm font-medium ${
//                 tab === "individual" ? "bg-[#871B58] text-white" : "bg-white border   text-gray-600"
//               }`}
//             >
//               Individual
//             </button>
//             {/* <button
//               onClick={() => setTab("business")}
//               className={`px-5 md:w-120px  font-inter py-3 rounded-lg text-sm font-medium ${
//                 tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
//               }`}
//             >
//               Business
//             </button> */}
//              <button
//               onClick={() => setTab("business")}
//               className={`px-5  font-inter py-3 rounded-lg text-sm font-medium ${
//                 tab === "business" ? "bg-[#871B58] text-white" : "bg-white border text-gray-600"
//               }`}
//             >
//               Business
//             </button>
//           </div>

//           <form onSubmit={onSubmit} className="space-y-4">
//             {tab === "business" ? (


//               // <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div className="flex  flex-col md:flex-row">
//                 <div >
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Type</label>
//                   <select
//                     name="companyType"
//                     value={formData.companyType}
//                     onChange={handleChange}
//                     className="w-full mt-[15px]  p-7  max-w-[317px] border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
//                     <option value="">Choose</option>
//                     <option value="pvt">Private Ltd</option>
//                     <option value="llp">LLP</option>
//                     <option value="proprietor">Proprietor</option>
//                   </select>
//                   {errors.companyType && <p className=" text-sm text-red-600">{errors.companyType}</p>}
//                 </div>
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Name </label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     className="w-full mt-[15px]  max-w-[317px] border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                     placeholder="Globex industries pvt.ltd"
//                   />
//                   {errors.companyName && <p className=" text-sm text-red-600">{errors.companyName}</p>}
//                 </div>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Type (optional)</label>
//                   <select
//                     name="companyType"
//                     value={formData.companyType}
//                     onChange={handleChange}
//                     className=" mt-[15px]  p-4 w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
                    

//                     <option value="">Choose</option>
//                     <option value="pvt">Private Ltd</option>
//                     <option value="llp">LLP</option>
//                     <option value="proprietor">Proprietor</option>
//                   </select>
//                      {errors.companyType && <p className=" text-sm text-red-600">{errors.companyType}</p>}
                
//                 </div>
//                 <div>
//                   <label className="block font-semibold  text-[16px] text-black mb-1">Company Name (optional)</label>
//                   <input
//                     type="text"
//                     name="companyName"
//                     value={formData.companyName}
//                     onChange={handleChange}
//                     className=" mt-[15px] w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                     placeholder="Globex industries pvt.ltd"
//                   />
//                       {errors.companyName && <p className=" text-sm text-red-600">{errors.companyName}</p>}
//                 </div>
//               </div>
//             )}

//             {tab === "business" ? (
//               <div className="mb-6">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">GST Number</label>
//                 <input
//                   type="text"
//                   name="gstNumber"
//                   value={formData.gstNumber}
//                   onChange={handleChange}
//                   placeholder="Choose"
//                   className="mt-[15px] w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 />
//                 {errors.gstNumber && <p className=" text-sm text-red-600">{errors.gstNumber}</p>}
//               </div>
//             ) : (
//               <div className="mb-6">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">GST Number(optional)</label>
//                 <input
//                   type="text"
//                   name="gstNumber"
//                   value={formData.gstNumber}
//                   onChange={handleChange}
//                   placeholder="Choose"
//                   className="mt-[15px] w-full max-w-[] border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 />
//                  {errors.gstNumber && <p className=" text-sm text-red-600">{errors.gstNumber}</p>}
//               </div>
//             )}

//             {/* Personal Info */}
//             {/* <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6"> */}
//               {/* <div className="flex flex-wrap gap-4 w-full"> */}
//                 <div className="flex flex-col sm:flex-row gap-4 w-full">
//   {/* Full Name - chhota */}
// <div className="flex-1 min-w-[200px]">

//     <label className="block text-sm font-medium">Full Name</label>
//     <input
//       type="text"
//       className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//       placeholder="Enter full name"
//     />
//   </div>

//   {/* Email - bada */}
//  <div className="flex-1 min-w-[250px]">
//     <label className="block text-sm font-medium">Email Address</label>
//     <input
//       type="email"
//       className="w-full w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//       placeholder="Enter email"
//     />
//   </div>
// </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Phone Number</label>
        


                               
// <div
//                     className="relative 
// "
//                   >
//                                      <input
//   type="text"
//   name="phone"
//   value={formData.phone}
//   onChange={handleChange}
//   placeholder="Enter phone nmber"
//   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
// /> 

                   

// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   fill="currentColor"
//   viewBox="0 0 24 24"
//   className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
// >
//   <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.53.74 3.89.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.92 22 2 13.08 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.36.26 2.69.74 3.89a1 1 0 01-.21 1.11l-2.2 2.2z" />
// </svg>
//                   </div>
//                 {errors.phone && <p className=" text-sm text-red-600">{errors.phone}</p>}
//               </div>
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Pincode</label>
         
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="pinCode"
//                   value={formData.pinCode}
//                   onChange={handleChange}
//                   placeholder="122204"
//                 />
//                 {errors.pinCode && <p className=" text-sm text-red-600">{errors.pinCode}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-w-5xl mx-auto">
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">City</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="Gurugram"
//                 />
//                 {errors.city && <p className=" text-sm text-red-600">{errors.city}</p>}
//               </div>
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">State</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   placeholder="Haryana"
//                 />
//                 {errors.state && <p className=" text-sm text-red-600">{errors.state}</p>}
//               </div>
//               <div>
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Country</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   placeholder="India"
//                 />
//                 {errors.country && <p className=" text-sm text-red-600">{errors.country}</p>}
//               </div>
//             </div>

//             <p className="block font-semibold  text-[16px] text-black mb-1">
//               Product Details <span className="text-gray-400">(Add multiple products here)</span>
//             </p>

//             <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 space-y-4">
//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Product Name</label>
//                   <input
//                     type="text"
//                     name="productName"
//                     value={formData.productName}
//                     onChange={handleChange}
//                     placeholder="China White Travertine"
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-[18px] text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   />
//                   {errors.productName && (
//                     <p className=" text-sm text-red-600">{errors.productName}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Product Finish</label>
//                   <select
//   name="productFinish"
//   value={formData.productFinish}
//   onChange={handleChange}
//   className="w-full border border-gray-300 rounded-2xl px-3 py-[18px] text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
// >
//   <option value="">Choose finish</option>
//   <option value="polished">Polished</option>
//   <option value="honed">Honed</option>
//   <option value="tumbled">Tumbled</option>
//   <option value="brushed">Brushed</option>
// </select>
// {errors.productFinish && (
//   <p className=" text-sm text-red-600">{errors.productFinish}</p>
// )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Select Unit</label>
//                   <select
//                     name="unit"
//                     value={formData.unit}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
//                     <option value="">Choose</option>
//                     <option value="sqft">Sqft</option>
//                     <option value="sqm">Sqm</option>
//                   </select>
//                   {errors.unit && <p className=" text-sm text-red-600">{errors.unit}</p>}
//                 </div>

//                 <div>
//                   <label className="block font-semibold  text-gray-700 mb-1">Enter Value</label>
//                   <div className="flex items-center w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus-within:ring-2 focus-within:ring-pink-700">
//                     <input
//                       type="text"
//                       name="value"
//                       value={formData.value}
//                       onChange={handleChange}
//                       placeholder="Type value"
//                       className="w-full outline-none "
//                     />
//                     <span>{selectedUnit}</span>
//                   </div>
//                   {errors.value && <p className=" text-sm text-red-600">{errors.value}</p>}
//                 </div>

//                 <div>
//                   <label className="block font-semibold text-[16px] text-black mb-1">Thickness</label>
//                   <select
//                     name="thickness"
//                     value={formData.thickness}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-2xl px-3 py-3 sm:py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   >
//                     <option value="">Choose</option>
//                     <option value="8mm">8MM</option>
//                     <option value="12mm">12MM</option>
//                     <option value="14mm">14MM</option>
//                     <option value="16mm">16MM</option>
//                     <option value="18mm">18MM</option>
//                     <option value="20mm">20MM</option>
//                     <option value="25mm">25MM</option>
//                     <option value="30mm">30MM</option>
//                     <option value="other">Other</option>
//                   </select>
//                   {errors.thickness && (
//                     <p className=" text-sm text-red-600">{errors.thickness}</p>
//                   )}
//                 </div>
//               </div>

//               <div className="mb-9 ">
               
//                   <div></div>
//                 <div className="flex items-center mb-3 gap-2">
                  
//                   <label className="block font-semibold text-sm text-gray-700">Size of product</label>
//                   <span className="text-gray-400  text-sm">(optional)</span>
//                 </div>
//                  <div className="flex flex-col md:flex-row gap-2">

//                 {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"> */}
//              <div>
//                   <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 h-12">
                 
//                     <span className="mr-2 font-medium text-sm">H</span>
//                     <input
//                       type="text"
//                       name="height"
//                       value={formData.height}
//                       onChange={handleChange}
//                       placeholder="|Enter value"
//                       className="w-full outline-none   text-sm"
//                     />
//                        </div> 
//                           <p className=" text-sm text-red-600 min-h-[1.25rem]">{errors.height}</p>
              
//                   </div>
// <div>
//                   <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 h-12">
//                     <span className="mr-2 font-medium text-sm">W</span>
//                     <input
//                       type="text"
//                       name="width"
//                       value={formData.width}
//                       onChange={handleChange}
//                       placeholder="|Enter value"
//                       className="w-full ml-3 outline-none text-sm"
//                     />
//                     </div>
//                           <p className="  mb-2 md:mb-0 text-sm text-red-600 min-h-[1.25rem]">{errors.height}</p>
//                   </div>

//                   <div>
//                     <label className="block font-semibold text-[16px] text-black mb-1 mt-[-20px]">Estimate Delivery Time</label>
//                     <input
//                       type="date"
//                       name="deliveryTime"
//                       value={formData.deliveryTime}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-2xl px-3 py-2 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none text-sm h-12"
//                     />
//                     {errors.deliveryTime && (
//                       <p className=" text-sm text-red-600">{errors.deliveryTime}</p>
//                     )}
//                   </div>
//                   </div>
              
//               </div>

//             <div className="border border-dashed mb-3 border-[#871B58] rounded-lg p-6 text-center text-gray-600 relative bg-white hover:shadow-md transition">
//   {/* Hidden file input */}
//   <input
//     id="fileInput"
//     type="file"
//     className="absolute inset-0 opacity-0 cursor-pointer"
//     accept="image/*"
//     name="image"
//     onChange={handleChange}
//   />

//   {/* Upload Icon */}
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
//     />
//   </svg>

//   {/* Text */}
//   <p className="text-black text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">
//     {productImage ? productImage.name : "Choose an Image or drag & drop it here"}
//   </p>
//   <span className="text-xs block mb-4 text-gray-400 pointer-events-none">
//     JPEG, PNG and MP4 formats up to 50MB
//   </span>

//   {/* Browse button */}
//   <button
//     type="button"
//     onClick={() => document.getElementById("fileInput").click()}
//     className="inline-block bg-white border   font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
//   >
//     Browse
//   </button>

//   {/* Error Message */}
//   {errors.image && (
//     <p className="text-red-500 text-xs mt-2">{errors.image}</p>
//   )}
// </div>

//               <div className="flex justify-end mt-[15px]">
//                 <button
//                   type="button"
//                   onClick={addProduct}
//                   className=" flext justify-end  font-inter ra bg-[#871B58] text-white px-6 py-2 rounded mb-6"
//                   disabled={submitting}
//                 >
//                   Add this Product
//                 </button>
//               </div>
//             </div>


//             <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">
//               <input
//                 type="file"
//                 name="file1"
//                 className="absolute inset-0 opacity-0 cursor-pointer"
//                 accept=".pdf,application/pdf"
//                 onChange={handleChange}
//               />
//              <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
//     />
//   </svg>
// <p className="text-black text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">
//     {files1?.[0]?.name ? files1[0].name : "Choose a file or drag & drop it here"
//               }</p>
//   <span className="text-xs block mb-4 text-gray-400 pointer-events-none">
//    Upload PDF BOC(Bulk order)/Tender Files upto 5MB
//   </span>

//   {/* Browse button */}
//   <button
//     type="button"
//     onClick={() => document.getElementById("fileInput").click()}
//     className="inline-block bg-white border   font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
//   >
//     Browse
//   </button>

//   {/* Error Message */}
//   {errors.file1 && (
//     <p className="text-red-500 text-xs mt-2">{errors.file1}</p>
//   )}
// </div>



//             {/* Installation */}
//             <div className=" h-auto min-h-[302px]  border-2 w-full max-w-[688px] border-dashed border-gray-300 rounded-lg p-2  text-gray-500 relative">
//               <div className="mb-6">
//                 <label className="block font-semibold  text-[16px] text-black mb-1">Installation (optional)</label>
//                 <input
//                   type="text"
//                   name="installation"
//                   placeholder="Enter here"
//                   className=" h-auto  w-full border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//   {/* Upload Rate List */}
//   <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">
//     <input
//       type="file"
//       id="file3"
//       name="file3"
//       className="absolute inset-0 opacity-0 cursor-pointer"
//       accept=".pdf,image/*"
//       onChange={handleChange}
//     />
//     {/* Upload Icon */}
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
//       />
//     </svg>

//     {/* File Text */}
//     <p className="text-black text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">
//       {files3?.[0]?.name
//         ? files3[0].name
//         : "Choose a Rate list or drag & drop it here"}
//     </p>
//     <span className="text-xs block mb-4 text-gray-400 pointer-events-none">
//       Upload rate list (If Any)
//     </span>

//     {/* Browse Button */}
//     <button
//       type="button"
//       onClick={() => document.getElementById("file3").click()}
//       className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
//     >
//       Browse
//     </button>

//     {/* Error */}
//     {errors.file3 && (
//       <p className="text-red-500 text-xs mt-2">{errors.file3}</p>
//     )}
//   </div>

//   {/* Upload Image / Video */}
//   <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">
//     <input
//       type="file"
//       id="file2"
//       name="file2"
//       className="absolute inset-0 opacity-0 cursor-pointer"
//       accept="image/*,video/mp4"
//       onChange={handleChange}
//     />
//     {/* Upload Icon */}
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth="2"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4"
//       />
//     </svg>

//     {/* File Text */}
//     <p className="text-black font-semibold      text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">
//       {files2?.[0]?.name
//         ? files2[0].name
//         : "Choose an Image or drag & drop it here"}
//     </p>
//     <span className=" text-xs block mb-4 text-gray-400 pointer-events-none">
//       JPEG, PNG and MP4 formats upto 50MB
//     </span>

//     {/* Browse Button */}
//     <button
//       type="button"
//       onClick={() => document.getElementById("file2").click()}
//       className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
//     >
//       Browse
//     </button>

//     {/* Error */}
//     {errors.file2 && (
//       <p className="text-red-500 text-xs mt-2">{errors.file2}</p>
//     )}
//   </div>
// </div>
//             </div>

//             <div className="mb-6 mt-2">
//               <label className="block font-semibold  text-[16px] text-black mb-1">Query / Message</label>
//               <textarea
//                 name="message"
//                 className="w-full h-auto min-h-[146px] border border-gray-300 rounded-2xl px-3 py-4 text-gray-500 focus:ring-2 focus:ring-pink-700 outline-none"
//                 placeholder="Write your message here"
//                 rows={3}
//                 value={formData.message}
//                 onChange={handleChange}
//               />
//             </div>

//             {errors.products && <p>{errors.products}</p>}

//             <div className="flex justify-end">
//               <button
//                 type="submit"
//                 className="font-inter bg-[#871B58] text-white px-8 py-2 rounded mb-6"
//                 disabled={submitting}
//               >
//                 {submitting ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="bg-white/90 over backdrop-blur-md w-full max-w-screen-lg mx-auto shadow-xl rounded-2xl p-2 h-fit border border-gray-100 px-4 sm:px-4 lg:px-2">
//           <div className="bg-white/90 backdrop-blur-md w-full lg:w-[95%] max-w-5xl mx-auto shadow-xl rounded-2xl p-3 h-fit border border-gray-100">
//             {products.length === 0 ? (
//               <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-gradient-to-br from-gray-50 to-white">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-14 w-14 text-gray-300 mb-4"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                 </svg>
//                 <h4 className="text-lg font-semibold text-gray-700">No products added yet</h4>
//               </div>
//             ) : (
//               <>
//                 <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//                   <span className="w-2 h-6 bg-pink-900 rounded-full"></span>
//                   All Products
//                 </h3>
//                 <h3 className="text-gray-800 font-medium mb-4">Products Added - {products.length}</h3>

//                 <div className="space-y-4">
//                   {products.map((item, index) => (
//                     <div key={index} className="bg-white w-full max-w-3xl mx-auto shadow rounded-2xl p-6 h-fit">
//                  <div className="flex flex-wrap justify-between gap-4">
//   {/* Left section */}
//   <div className="flex gap-4 items-center flex-1 min-w-[250px]">
//     {item.image && (
//       <img
//         src={URL.createObjectURL(item.image)}
//         alt={`product-${index}`}
//         className="w-24 h-24 rounded-lg object-cover max-w-full"
//       />
//     )}
//     <div className="break-words whitespace-normal">
//       <h4 className="font-medium text-gray-900">{item.productName}</h4>
//       <p className="text-sm text-[#838383]">{item.productFinish}</p>
//       <button
//         onClick={() => toggleDetails(index)}
//         className="text-gray-600 text-sm underline"
//       >
//         {item.showDetails ? "Hide" : "Show"} Details
//       </button>
//     </div>
//   </div>

//   {/* Right section (Delete btn) */}
//   <div className="flex gap-2 flex-shrink-0">
//     <button
//       onClick={() =>
//         setProducts((prev) => prev.filter((_, i) => i !== index))
//       }
//       className="text-red-500 hover:text-red-700 transition"
//     >
//       <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="w-5 h-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//       strokeWidth={2}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M6 7h12M9 7V4h6v3m2 0v13a2 2 0 01-2 2H9a2 2 0 01-2-2V7h10z"
//       />
//     </svg>
//     </button>
//   </div>
// </div>

//                       {item.showDetails && (
//                         <div className="mt-3 text-sm text-gray-600 space-y-1">
//                           <div className="border border-gray-200 rounded-lg p-4 flex flex-col">
//                             <p><strong>Unit:</strong> {item.unit}</p>
//                             <p><strong>Value:</strong> {item.value}</p>
//                             <p><strong>Thickness:</strong> {item.thickness}</p>
//                             <p><strong>Size:</strong> W: {item.width} | H: {item.height}</p>
//                             <p><strong>Delivery:</strong> {item.deliveryTime}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react"; import image from "../assets/stone.png";

// export default function BulkOrderForm() { 
//   // -------------------- Helpers (no external libs) -------------------- const nameRegex = /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/; const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]{2,}$/; const phoneRegex = /^(?:+91[-\s]?|0)?[6-9]\d{9}$/; const pinRegex = /^\d{6}$/; const gstRegex = /^[0-9A-Z]{15}$/; const twoDecimalRegex = /^\d+(.\d{1,2})?$/;

// const validateSizeNumber = (value) => {
//    if (value === undefined || value === null || value === "") return null; // optional if (isNaN(Number(value))) return "Must be a number"; const num = Number(value); if (num <= 0) return "Value must be greater than 0"; if (num < 100) return "Min value is 100mm"; if (num > 3000) return "Max value is 3000mm"; if (!twoDecimalRegex.test(String(value))) return "Max 2 decimal places allowed"; return null; };

// const validateFile = (file, maxMB = 50) => { 
//   if (!file) return null; // optional const ok = file.size <= maxMB * 1024 * 1024; return ok ? null : Max size ${maxMB}MB; };

// const validateProduct = (p) => { const errs = {}; if (!p.productName) errs.productName = "Product name required"; if (!p.productFinish) errs.productFinish = "Product finish required"; if (!p.unit) errs.unit = "Unit is required"; if (p.value === "" || p.value === null || p.value === undefined) { errs.value = "Value is required"; } else if (isNaN(Number(p.value))) { errs.value = "Enter a number"; } else if (Number(p.value) < 0.0001) { errs.value = "Value must be greater than 0"; } else if (!twoDecimalRegex.test(String(p.value))) { errs.value = "Max 2 decimal places allowed"; } if (!p.thickness) errs.thickness = "Thickness is required"; if (!p.deliveryTime) errs.deliveryTime = "Delivery time required";

// const wErr = validateSizeNumber(p.width);
// if (wErr) errs.width = wErr;
// const hErr = validateSizeNumber(p.height);
// if (hErr) errs.height = hErr;

// const imgErr = validateFile(p.image, 50);
// if (imgErr) errs.image = imgErr;
// return errs;

// };

// const validateForm = (data, tab) => { const errs = {};

// // Business-only fields
// if (tab === "business") {
//   if (!data.companyType) errs.companyType = "Company Type is required";
//   if (!data.companyName) errs.companyName = "Company Name is required";
//   else if (!nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
//   if (!data.gstNumber) errs.gstNumber = "GST Number is required";
//   else if (!gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
// } else {
//   // Optional in Individual mode: if provided, still validate format
//   if (data.companyName && !nameRegex.test(data.companyName)) errs.companyName = "Enter valid name";
//   if (data.gstNumber && !gstRegex.test(data.gstNumber)) errs.gstNumber = "Invalid GST Number";
// }

// // Personal Info
// if (!data.fullName) errs.fullName = "Full Name is required";
// else if (!nameRegex.test(data.fullName)) errs.fullName = "Enter valid name";

// if (!data.email) errs.email = "Email is required";
// else if (!emailRegex.test(data.email)) errs.email = "Invalid email";

// if (!data.phone) errs.phone = "Phone is required";
// else if (!phoneRegex.test(data.phone)) errs.phone = "Phone must be 10 digits";

// if (!data.pinCode) errs.pinCode = "Pincode is required";
// else if (!pinRegex.test(data.pinCode)) errs.pinCode = "Pincode must be 6 digits";

// if (!data.city) errs.city = "City is required";
// else if (!nameRegex.test(data.city)) errs.city = "Enter a valid city name";

// if (!data.state) errs.state = "State is required";
// else if (!nameRegex.test(data.state)) errs.state = "Enter a valid state name";

// if (!data.country) errs.country = "Country is required";
// else if (!nameRegex.test(data.country)) errs.country = "Enter a valid country name";

// // Files
// const f1Err = validateFile(data.file1, 50);
// if (f1Err) errs.file1 = f1Err;
// const f2Err = validateFile(data.file2, 50);
// if (f2Err) errs.file2 = f2Err;
// const f3Err = validateFile(data.file3, 50);
// if (f3Err) errs.file3 = f3Err;

// return errs;

// };

// // -------------------- State -------------------- const [tab, setTab] = useState("individual"); const [submitting, setSubmitting] = useState(false); const [products, setProducts] = useState([]); const [productImage, setProductImage] = useState(null); const [errors, setErrors] = useState({}); const [isSubmitted, setIsSubmitted] = useState(false); const [formData, setFormData] = useState({ companyType: "", companyName: "", gstNumber: "", fullName: "", email: "", phone: "", pinCode: "", city: "", state: "", country: "", productName: "", productFinish: "", unit: "", value: "", thickness: "", width: "", height: "", deliveryTime: "", image: null, // files file1: null, file2: null, file3: null, // message message: "", });

// const handleChange = (e) => { const { name, value, type, files } = e.target; if (type === "file") { const file = files && files[0] ? files[0] : null; setFormData((prev) => ({ ...prev, [name]: file })); if (name === "image") setProductImage(file); } else { setFormData((prev) => ({ ...prev, [name]: value })); }

// if (isSubmitted) {
//   const fieldErrs = validateForm({ ...formData, [name]: type === 'file' ? (files && files[0] ? files[0] : null) : value }, tab);
//   setErrors((prev) => ({ ...prev, [name]: fieldErrs[name] }));
// }

// };

// const toggleDetails = (index) => { const newProducts = [...products]; newProducts[index].showDetails = !newProducts[index].showDetails; setProducts(newProducts); };

// const addProduct = () => { const p = { productName: formData.productName, productFinish: formData.productFinish, unit: formData.unit, value: formData.value, thickness: formData.thickness, width: formData.width, height: formData.height, deliveryTime: formData.deliveryTime, image: formData.image, }; const perrs = validateProduct(p); if (Object.keys(perrs).length) { setErrors((prev) => ({ ...prev, ...perrs })); return; }

// const newProduct = {
//   productName: formData.productName,
//   productFinish: formData.productFinish,
//   unit: formData.unit,
//   value: formData.value,
//   thickness: formData.thickness,
//   width: formData.width,
//   height: formData.height,
//   deliveryTime: formData.deliveryTime,
//   image: formData.image || null,
//   showDetails: false,
// };

// setProducts((prev) => [...prev, newProduct]);

// // reset only product-related fields so we don't lose user's personal info
// setFormData((prev) => ({
//   ...prev,
//   productName: "",
//   productFinish: "",
//   unit: "",
//   value: "",
//   thickness: "",
//   width: "",
//   height: "",
//   deliveryTime: "",
//   image: null,
// }));
// setProductImage(null);
// setErrors((prev) => {
//   const copy = { ...prev };
//   ["productName", "productFinish", "unit", "value", "thickness", "width", "height", "deliveryTime", "image"].forEach(k => delete copy[k]);
//   return copy;
// });

// };

// const onSubmit = (e) => { e.preventDefault(); setIsSubmitted(true);

// const ferrs = validateForm(formData, tab);
// if (Object.keys(ferrs).length) {
//   setErrors(ferrs);
//   const firstKey = Object.keys(ferrs)[0];
//   const el = document.querySelector(`[name="${firstKey}"]`);
//   if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "center" });
//   return;
// }
// if (products.length === 0) {
//   alert("At least one product is required");
//   return;
// }

// setSubmitting(true);
// const finalData = { ...formData, products };
// console.log("Final Payload:", finalData);
// alert("submit successfully");

// // reset everything
// setFormData({
//   companyType: "",
//   companyName: "",
//   gstNumber: "",
//   fullName: "",
//   email: "",
//   phone: "",
//   pinCode: "",
//   city: "",
//   state: "",
//   country: "",
//   productName: "",
//   productFinish: "",
//   unit: "",
//   value: "",
//   thickness: "",
//   width: "",
//   height: "",
//   deliveryTime: "",
//   image: null,
//   file1: null,
//   file2: null,
//   file3: null,
//   message: "",
// });
// setProducts([]);
// setErrors({});
// setProductImage(null);
// setSubmitting(false);

// };

// const selectedUnit = formData.unit; const files1 = formData.file1 ? [formData.file1] : null; const files2 = formData.file2 ? [formData.file2] : null; const files3 = formData.file3 ? [formData.file3] : null;

// // ---------- Small visual helper classes to keep markup tidy ---------- const inputBase = "w-full rounded-2xl px-4 py-3 transition-shadow outline-none bg-gray-50 border border-transparent focus:border-transparent focus:ring-2 focus:ring-pink-600"; const labelBase = "block font-semibold text-sm text-gray-800 mb-1"; const sectionCard = "bg-white/95 rounded-3xl shadow-lg ring-1 ring-gray-100 p-6";

// return ( <div className="min-h-screen font-poppins bg-gradient-to-br from-gray-50 to-white px-4 sm:px-6 lg:px-16 py-10"> <div className="max-w-6xl mx-auto"> <div className="mb-6 text-center"> <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">Stonepedia Bulk Orders</h1> <p className="text-sm sm:text-base text-gray-500 mt-1">Fill this form to connect with us — we will get back within 24–48 hours.</p> </div>

// <div className="flex flex-col lg:flex-row gap-8">
//       <div className={`${sectionCard} flex-1`}> 
//         <div className="flex flex-wrap gap-3 mb-6">
//           <button
//             disabled={submitting}
//             onClick={() => setTab("individual")}
//             className={`px-6 py-2 rounded-xl text-sm font-medium shadow-sm transition transform ${
//               tab === "individual" ? "bg-[#871B58] text-white scale-100" : "bg-white text-gray-600 border border-gray-200 hover:shadow"
//             }`}
//           >
//             Individual
//           </button>

//           <button
//             onClick={() => setTab("business")}
//             className={`px-5 py-2 rounded-xl text-sm font-medium shadow-sm transition transform ${
//               tab === "business" ? "bg-[#871B58] text-white" : "bg-white text-gray-600 border border-gray-200 hover:shadow"
//             }`}
//           >
//             Business
//           </button>
//         </div>

//         <form onSubmit={onSubmit} className="space-y-6">
//           {tab === "business" ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelBase}>Company Type</label>
//                 <select name="companyType" value={formData.companyType} onChange={handleChange} className={inputBase}>
//                   <option value="">Choose</option>
//                   <option value="pvt">Private Ltd</option>
//                   <option value="llp">LLP</option>
//                   <option value="proprietor">Proprietor</option>
//                 </select>
//                 {errors.companyType && <p className=" text-sm text-red-600 mt-1">{errors.companyType}</p>}
//               </div>

//               <div>
//                 <label className={labelBase}>Company Name</label>
//                 <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputBase} placeholder="Globex industries pvt.ltd" />
//                 {errors.companyName && <p className=" text-sm text-red-600 mt-1">{errors.companyName}</p>}
//               </div>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className={labelBase}>Company Type <span className="text-xs text-gray-400">(optional)</span></label>
//                 <select name="companyType" value={formData.companyType} onChange={handleChange} className={inputBase}>
//                   <option value="">Choose</option>
//                   <option value="pvt">Private Ltd</option>
//                   <option value="llp">LLP</option>
//                   <option value="proprietor">Proprietor</option>
//                 </select>
//                 {errors.companyType && <p className=" text-sm text-red-600 mt-1">{errors.companyType}</p>}
//               </div>

//               <div>
//                 <label className={labelBase}>Company Name <span className="text-xs text-gray-400">(optional)</span></label>
//                 <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputBase} placeholder="Globex industries pvt.ltd" />
//                 {errors.companyName && <p className=" text-sm text-red-600 mt-1">{errors.companyName}</p>}
//               </div>
//             </div>
//           )}

//           <div>
//             <label className={labelBase}>{tab === "business" ? "GST Number" : "GST Number (optional)"}</label>
//             <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className={inputBase} placeholder="Enter GST number" />
//             {errors.gstNumber && <p className=" text-sm text-red-600 mt-1">{errors.gstNumber}</p>}
//           </div>

//           {/* Personal Info */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className={labelBase}>Full Name</label>
//               <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputBase} placeholder="Enter full name" />
//               {errors.fullName && <p className=" text-sm text-red-600 mt-1">{errors.fullName}</p>}
//             </div>

//             <div>
//               <label className={labelBase}>Email Address</label>
//               <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputBase} placeholder="Enter email" />
//               {errors.email && <p className=" text-sm text-red-600 mt-1">{errors.email}</p>}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className={labelBase}>Phone Number</label>
//               <div className="relative">
//                 <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className={inputBase + ' pr-10'} />
//                 <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.53.74 3.89.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.92 22 2 13.08 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.36.26 2.69.74 3.89a1 1 0 01-.21 1.11l-2.2 2.2z" />
//                 </svg>
//               </div>
//               {errors.phone && <p className=" text-sm text-red-600 mt-1">{errors.phone}</p>}
//             </div>

//             <div>
//               <label className={labelBase}>Pincode</label>
//               <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className={inputBase} placeholder="122204" />
//               {errors.pinCode && <p className=" text-sm text-red-600 mt-1">{errors.pinCode}</p>}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <div>
//               <label className={labelBase}>City</label>
//               <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputBase} placeholder="Gurugram" />
//               {errors.city && <p className=" text-sm text-red-600 mt-1">{errors.city}</p>}
//             </div>
//             <div>
//               <label className={labelBase}>State</label>
//               <input type="text" name="state" value={formData.state} onChange={handleChange} className={inputBase} placeholder="Haryana" />
//               {errors.state && <p className=" text-sm text-red-600 mt-1">{errors.state}</p>}
//             </div>
//             <div>
//               <label className={labelBase}>Country</label>
//               <input type="text" name="country" value={formData.country} onChange={handleChange} className={inputBase} placeholder="India" />
//               {errors.country && <p className=" text-sm text-red-600 mt-1">{errors.country}</p>}
//             </div>
//           </div>

//           <p className="block font-semibold text-base text-gray-800 mb-2">Product Details <span className="text-gray-400 text-sm">(Add multiple products)</span></p>

//           <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5 bg-white">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
//               <div>
//                 <label className={labelBase}>Product Name</label>
//                 <input type="text" name="productName" value={formData.productName} onChange={handleChange} placeholder="China White Travertine" className={inputBase} />
//                 {errors.productName && <p className=" text-sm text-red-600 mt-1">{errors.productName}</p>}
//               </div>

//               <div>
//                 <label className={labelBase}>Product Finish</label>
//                 <select name="productFinish" value={formData.productFinish} onChange={handleChange} className={inputBase}>
//                   <option value="">Choose finish</option>
//                   <option value="polished">Polished</option>
//                   <option value="honed">Honed</option>
//                   <option value="tumbled">Tumbled</option>
//                   <option value="brushed">Brushed</option>
//                 </select>
//                 {errors.productFinish && <p className=" text-sm text-red-600 mt-1">{errors.productFinish}</p>}
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
//               <div>
//                 <label className={labelBase}>Select Unit</label>
//                 <select name="unit" value={formData.unit} onChange={handleChange} className={inputBase}>
//                   <option value="">Choose</option>
//                   <option value="sqft">Sqft</option>
//                   <option value="sqm">Sqm</option>
//                 </select>
//                 {errors.unit && <p className=" text-sm text-red-600 mt-1">{errors.unit}</p>}
//               </div>

//               <div>
//                 <label className={labelBase}>Enter Value</label>
//                 <div className="flex items-center w-full rounded-2xl px-4 py-3 bg-gray-50 border border-transparent focus-within:ring-2 focus-within:ring-pink-600">
//                   <input type="text" name="value" value={formData.value} onChange={handleChange} placeholder="Type value" className="w-full bg-transparent outline-none" />
//                   <span className="ml-2 text-sm text-gray-500">{selectedUnit}</span>
//                 </div>
//                 {errors.value && <p className=" text-sm text-red-600 mt-1">{errors.value}</p>}
//               </div>

//               <div>
//                 <label className={labelBase}>Thickness</label>
//                 <select name="thickness" value={formData.thickness} onChange={handleChange} className={inputBase}>
//                   <option value="">Choose</option>
//                   <option value="8mm">8MM</option>
//                   <option value="12mm">12MM</option>
//                   <option value="14mm">14MM</option>
//                   <option value="16mm">16MM</option>
//                   <option value="18mm">18MM</option>
//                   <option value="20mm">20MM</option>
//                   <option value="25mm">25MM</option>
//                   <option value="30mm">30MM</option>
//                   <option value="other">Other</option>
//                 </select>
//                 {errors.thickness && <p className=" text-sm text-red-600 mt-1">{errors.thickness}</p>}
//               </div>
//             </div>

//             <div className="mb-5">
//               <div className="flex items-center justify-between mb-3">
//                 <div>
//                   <label className={labelBase}>Size of product <span className="text-sm text-gray-400">(optional)</span></label>
//                 </div>
//                 <div className="text-sm text-gray-400">mm</div>
//               </div>

//               <div className="flex flex-col md:flex-row gap-3">
//                 <div className="flex-1">
//                   <div className="flex items-center rounded-2xl px-4 py-2 bg-gray-50 border border-transparent h-12">
//                     <span className="mr-3 font-medium text-sm text-gray-700">H</span>
//                     <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="Enter value" className="w-full bg-transparent outline-none text-sm" />
//                   </div>
//                   <p className=" text-sm text-red-600 min-h-[1.25rem] mt-1">{errors.height}</p>
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex items-center rounded-2xl px-4 py-2 bg-gray-50 border border-transparent h-12">
//                     <span className="mr-3 font-medium text-sm text-gray-700">W</span>
//                     <input type="text" name="width" value={formData.width} onChange={handleChange} placeholder="Enter value" className="w-full bg-transparent outline-none text-sm" />
//                   </div>
//                   <p className=" text-sm text-red-600 min-h-[1.25rem] mt-1">{errors.width}</p>
//                 </div>

//                 <div className="w-full md:w-56">
//                   <label className={labelBase}>Estimate Delivery Time</label>
//                   <input type="date" name="deliveryTime" value={formData.deliveryTime} onChange={handleChange} className={inputBase + ' h-12 px-3'} />
//                   {errors.deliveryTime && <p className=" text-sm text-red-600 mt-1">{errors.deliveryTime}</p>}
//                 </div>
//               </div>
//             </div>

//             <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center bg-white hover:bg-gray-50 transition">
//               <input id="productImageInput" type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" name="image" onChange={handleChange} />

//               <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 w-10 h-10 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
//               </svg>

//               <p className="text-gray-800 font-medium mb-1">{productImage ? productImage.name : "Choose an Image or drag & drop it here"}</p>
//               <span className="text-xs block mb-4 text-gray-400">JPEG, PNG and MP4 formats up to 50MB</span>

//               <button type="button" onClick={() => document.getElementById("productImageInput").click()} className="inline-block bg-white border border-gray-200 font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
//               {errors.image && <p className="text-red-500 text-xs mt-2">{errors.image}</p>}
//             </div>

//             <div className="flex justify-end mt-4">
//               <button type="button" onClick={addProduct} className="inline-flex items-center gap-2 bg-[#871B58] text-white px-6 py-2 rounded-2xl shadow hover:scale-[1.01] transition" disabled={submitting}>Add this Product</button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="border-2 border-dashed rounded-2xl p-5 text-center bg-white hover:bg-gray-50 transition">
//               <input type="file" id="file1" name="file1" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,application/pdf" onChange={handleChange} />
//               <p className="text-gray-800 font-medium mb-1">{files1?.[0]?.name ? files1[0].name : "Choose a file or drag & drop it here"}</p>
//               <span className="text-xs block mb-4 text-gray-400">Upload PDF BOC(Tender Files) up to 50MB</span>
//               <button type="button" onClick={() => document.getElementById("file1").click()} className="inline-block bg-white border border-gray-200 font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
//               {errors.file1 && <p className="text-red-500 text-xs mt-2">{errors.file1}</p>}
//             </div>

//             <div className="border-2 border-dashed rounded-2xl p-5 text-center bg-white hover:bg-gray-50 transition">
//               <input type="file" id="file3" name="file3" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,image/*" onChange={handleChange} />
//               <p className="text-gray-800 font-medium mb-1">{files3?.[0]?.name ? files3[0].name : "Choose Rate list or drag & drop it here"}</p>
//               <span className="text-xs block mb-4 text-gray-400">Upload rate list (If Any)</span>
//               <button type="button" onClick={() => document.getElementById("file3").click()} className="inline-block bg-white border border-gray-200 font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
//               {errors.file3 && <p className="text-red-500 text-xs mt-2">{errors.file3}</p>}
//             </div>
//           </div>

//           <div>
//             <label className={labelBase}>Installation (optional)</label>
//             <input type="text" name="installation" placeholder="Enter here" className={inputBase} onChange={handleChange} />
//           </div>

//           <div>
//             <label className={labelBase}>Query / Message</label>
//             <textarea name="message" className={inputBase + ' min-h-[120px] resize-none'} placeholder="Write your message here" rows={3} value={formData.message} onChange={handleChange} />
//           </div>

//           {errors.products && <p className="text-red-600">{errors.products}</p>}

//           <div className="flex justify-end">
//             <button type="submit" className="inline-flex items-center gap-2 bg-[#871B58] text-white px-8 py-2 rounded-2xl shadow hover:scale-[1.01] transition" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
//           </div>
//         </form>
//       </div>

//       <div className={"w-full md:w-96 " + sectionCard}>
//         <div className="w-full">
//           {products.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-10 px-6 text-center rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//               </svg>
//               <h4 className="text-lg font-semibold text-gray-700">No products added yet</h4>
//               <p className="text-sm text-gray-400 mt-2">Add products on the left to see them appear here.</p>
//             </div>
//           ) : (
//             <>
//               <h3 className="text-xl font-bold text-gray-900 mb-4">All Products</h3>
//               <h4 className="text-gray-600 font-medium mb-4">Products Added — {products.length}</h4>

//               <div className="space-y-4">
//                 {products.map((item, index) => (
//                   <div key={index} className="bg-white shadow-md rounded-2xl p-4">
//                     <div className="flex items-center gap-3">
//                       {item.image && (
//                         <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
//                           <img src={typeof item.image === 'string' ? item.image : URL.createObjectURL(item.image)} alt={`product-${index}`} className="w-full h-full object-cover" />
//                         </div>
//                       )}

//                       <div className="flex-1">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <h4 className="font-semibold text-gray-900">{item.productName}</h4>
//                             <p className="text-sm text-gray-500">{item.productFinish}</p>
//                           </div>

//                           <div className="flex items-center gap-2">
//                             <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{item.unit}</span>
//                             <button onClick={() => setProducts((prev) => prev.filter((_, i) => i !== index))} className="text-red-500 hover:text-red-700 transition">
//                               Remove
//                             </button>
//                           </div>
//                         </div>

//                         <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
//                           <div>
//                             <p><strong>Value:</strong> {item.value}</p>
//                             <p className="mt-1"><strong>Thickness:</strong> {item.thickness}</p>
//                           </div>

//                           <div className="text-right">
//                             <p><strong>Size:</strong></p>
//                             <p className="text-sm">W: {item.width || '-'} | H: {item.height || '-'}</p>
//                             <p className="mt-1 text-xs text-gray-400">Delivery: {item.deliveryTime || '-'}</p>
//                           </div>
//                         </div>

//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
import React, { useEffect, useState } from "react";
import image from "../assets/stone.png";

export default function BulkOrderForm() {
  
const nameRegex = /^(?=.{1,100}$)[\p{L}]+(?:[ .'-][\p{L}]+)*$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const phoneRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
const pinRegex = /^[1-9][0-9]{5}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/i;
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
    if (num < 100) return "Min value is 100mm";
    if (num > 3000) return "Max value is 3000mm";
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
    if (!p.deliveryTime) errs.deliveryTime = "Delivery time required";

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
  `w-full border rounded-2xl px-3 py-3 text-gray-700 outline-none transition duration-300
   ${
     isSubmitted && errors[field]
       ? "border-red-500 focus:ring-2 focus:ring-red-500 focus:rounded-2xl"
       : "border-gray-300 focus:[border-image:linear-gradient(90deg,#871858,#F3F3F9)_1] focus:border-transparent focus:rounded-xl"
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
        <div className="mb-6">
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

            <form onSubmit={onSubmit} className="space-y-4">
              {tab === "business" ? (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold text-[16px] text-black mb-1">Company Type </label>
                   
                    <select
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleChange}
                      className={`${inputClass("companyType")} md:max-w-sm`}
                    >
                      <option value="">Choose</option>
                      <option value="pvt">Private Ltd</option>
                      <option value="llp">LLP</option>
                      <option value="proprietor">Proprietor</option>
                    </select>
                      {errors.companyType && <ErrorText>{errors.companyType}</ErrorText>}
                  </div>

                  <div className="flex-1">
                    <label className="block font-semibold text-[16px] text-black mb-1">Company Name  </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                       className={`${inputClass("company")}meNa md:max-w-sm`}
                      placeholder="Globex industries pvt.ltd"
                    />
  {errors.companyName && <ErrorText>{errors.companyName}</ErrorText>}
                  </div>
                </div>
              ) : (
                 <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold text-[16px] text-black mb-1">Company Type <span className="text-gray-400 text-sm">(optional)</span></label>
                    <select
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleChange}
                      className={`${inputClass("companyName")} md:max-w-sm`}
                    >
                      <option value="">Choose</option>
                      <option value="pvt">Private Ltd</option>
                      <option value="llp">LLP</option>
                      <option value="proprietor">Proprietor</option>
                    </select>
                      {errors.companyType && <ErrorText>{errors.companyType}</ErrorText>}
                  </div>

                  <div className="flex-1">
                    <label className="block font-semibold text-[16px] text-black mb-1">Company Name <span className="text-gray-400 text-sm">(optional)</span> </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
 className={`${inputClass("companyName")} md:max-w-sm`}
                      placeholder="Globex industries pvt.ltd"
                    />
                      {errors.companyName && <ErrorText>{errors.companyName}</ErrorText>}
                  </div>
                </div>
              )}

              {tab === "business" ? (
                <div className="mb-6">
                  <label className="block font-semibold text-[16px] text-black mb-1">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Choose"
                     className={`${inputClass("gstNumber")} w-full`}
                  />
                        {errors.gstNumber && <ErrorText>{errors.gstNumber}</ErrorText>}
                </div>
              ) : (
                <div className="mb-6">
                  <div className="grid grid-col-1">
                  
                  <label className="block font-semibold text-[16px] text-black mb-1">GST Number <span className="text-gray-400 text-sm">(optional)</span></label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="Choose"
                     className={`${inputClass("gstNumber")} w-full`}
                />
                           {errors.gstNumber && <ErrorText>{errors.gstNumber}</ErrorText>}
                </div>
                </div>
              )}

              {/* Personal Info */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
     <div className="flex-1 min-w-[200px]">
  <label className="block font-semibold text-[16px] text-black mb-1">Full Name</label>

  <div className="relative w-full">
    <input
      type="text"
      name="fullName"
      value={formData.fullName}
      onChange={handleChange}
      className={`${inputClass("fullName")} md:max-w-sm`}
      placeholder="Enter full name"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
    >
      <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.3 0-9.9 1.7-9.9 5v2.7h19.8V19c0-3.3-6.6-5-9.9-5z" />
    </svg>
  </div>

   {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
</div>


                <div className="flex-1 min-w-[250px]">
  <label className="block font-semibold text-[16px] text-black mb-1">Email Address</label>

  <div className="relative w-full">
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
    className={`${inputClass("email")} md:max-w-sm`}
      placeholder="Enter email"
    />
    {/* Email icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
    >
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
    </svg>
  </div>

            {errors.email && <ErrorText>{errors.email}</ErrorText>}
</div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block font-semibold text-[16px] text-black mb-1">Phone Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
              className={`${inputClass("phone")} md:max-w-sm`}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                    >
                      <path d="M6.62 10.79a15.091 15.091 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.2.48 2.53.74 3.89.74a1 1 0 011 1v3.5a1 1 0 01-1 1C10.92 22 2 13.08 2 3.5a1 1 0 011-1H6.5a1 1 0 011 1c0 1.36.26 2.69.74 3.89a1 1 0 01-.21 1.11l-2.2 2.2z" />
                    </svg>
                  </div>
               {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
                </div>

                <div>
                  <label className="block font-semibold text-[16px] text-black mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                 className={`${inputClass("pincode")} md:max-w-sm`}
                    placeholder="122204"
                  />
                  {errors.pinCode && <ErrorText>{errors.pinCode}</ErrorText>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-w-5xl mx-auto">
                <div>
                  <label className="block font-semibold text-[16px] text-black mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
               className={`${inputClass("city")} md:max-w-sm`}
                    placeholder="Gurugram"
                  />
                          {errors.city && <ErrorText>{errors.city}</ErrorText>}
                </div>
                <div>
                  <label className="block font-semibold text-[16px] text-black mb-1">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                   className={`${inputClass("state")} md:max-w-sm`}
                    placeholder="Haryana"
                  />
                           {errors.state && <ErrorText>{errors.state}</ErrorText>}
                </div>
                <div>
                  <label className="block font-semibold text-[16px] text-black mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
 className={`${inputClass("country")} md:max-w-sm`}
                    placeholder="India"
                  />    {errors.country && <ErrorText>{errors.country}</ErrorText>}     
                </div>
              </div>

              <p className="block font-semibold text-[16px] text-black mb-2">Product Details <span className="text-gray-400">(Add multiple products here)</span></p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg mb-6 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block font-semibold text-[16px] text-black mb-1">Product Name</label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      placeholder="China White Travertine"
                    className={`${inputClass("productName")} md:max-w-sm`}
                    />     {errors.productName && <ErrorText>{errors.productName}</ErrorText>}  
                  </div>

                  <div>
                    <label className="block font-semibold text-[16px] text-black mb-1">Product Finish</label>
                    <select
                      name="productFinish"
                      value={formData.productFinish}
                      onChange={handleChange}
                     className={`${inputClass("productFinish")} md:max-w-sm`}
                    >
                      <option value="">Choose finish</option>
                      <option value="polished">Polished</option>
                      <option value="honed">Honed</option>
                      <option value="tumbled">Tumbled</option>
                      <option value="brushed">Brushed</option>
                    </select>
                         {errors.productFinish && <ErrorText>{errors.productFinish}</ErrorText>}
                  </div>
     
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block font-semibold text-[16px] text-black mb-1">Select Unit</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                     className={`${inputClass("unit")} md:max-w-sm`}
                    >
                      <option value="">Choose</option>
                      <option value="sqft">Sqft</option>
                      <option value="sqm">Sqm</option>
                    </select>
                     {errors.unit && <ErrorText>{errors.unit}</ErrorText>}
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Enter Value</label>
                    <div className="flex items-center w-full ">
                      <input
                        type="text"
                        name="value"
                        value={formData.value}
                        onChange={handleChange}
                        placeholder="Type value"
                      className={`${inputClass("value")} md:max-w-sm`}
                      />
                      <span className="ml-2">{selectedUnit}</span>
                    </div>
                  {errors.value && <ErrorText>{errors.value}</ErrorText>}
                  </div>

                  <div>
                    <label className="block font-semibold text-[16px] text-black mb-1">Thickness</label>
                    <select
                      name="thickness"
                      value={formData.thickness}
                      onChange={handleChange}
                   className={`${inputClass("thickness")} md:max-w-sm`}
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
                        {errors.thickness && <ErrorText>{errors.thickness}</ErrorText>}
                  </div>
                </div>
<div className="mb-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div>
  <label className="block mb-2 font-medium">Size of Product (W × H)</label>
  <div className="flex gap-2">
    
    <div className="w-full">
      <input
        type="text"
        name="width"
        placeholder="Width"
        value={formData.width}
        onChange={handleChange}
         className={`${inputClass("width")} md:max-w-sm`}
      />
      {errors.width && <ErrorText>{errors.width}</ErrorText>}
    </div>

    
    <div className="w-full">
      <input
        type="text"
        name="height"
        placeholder="Height"
        value={formData.height}
        onChange={handleChange}
         className={`${inputClass("height")} md:max-w-sm`}
      />
      {errors.height && <ErrorText>{errors.height}</ErrorText>}
    </div>
  </div>
</div>


<div>
  <label className="block mb-2 font-medium">Estimate Delivery Time</label>
  <input
    type="date"
    name="deliveryTime"
    value={formData.deliveryTime}
    onChange={handleChange}
    className={`${inputClass("deliveryTime")} md:max-w-sm`}
  />
  {errors.deliveryTime && <ErrorText>{errors.deliveryTime}</ErrorText>}
</div></div>
                <div className="border mt-4 border-dashed mb-8 border-[#871B58] rounded-lg p-6 text-center text-gray-600 relative bg-white hover:shadow-md transition">
                  
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

                  <p className="text-black text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">
                    {productImage ? productImage.name : "Choose an Image or drag & drop it here"}
                  </p>
                  <span className="text-xs  block mb-4 text-gray-400 pointer-events-none">JPEG, PNG and MP4 formats up to 50MB</span>

                  <button
                    type="button"
                    onClick={() => document.getElementById("productImageInput").click()}
                    className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition"
                  >
                    Browse
                  </button>
                  {errors.image && <ErrorText>{errors.image}</ErrorText>}
                </div>

                <div className="flex justify-end mt-[8px]">
                  <button
                    type="button"
                    onClick={addProduct}
                    className="font-inter bg-[#871B58] text-white px-6 py-2 rounded mb-6"
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
                <p className="text-black text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">{files1?.[0]?.name ? files1[0].name : "Choose a file or drag & drop it here"}</p>
                <span className="text-xs block mb-4 text-gray-400 pointer-events-none">Upload PDF BOC(Bulk order)/Tender Files upto 50MB</span>
                <button type="button" onClick={() => document.getElementById("file1").click()} className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
               {errors.file1 && <ErrorText>{errors.file1}</ErrorText>}
              </div>
           
              
              <div className="h-auto min-h-[160px] border-2 w-full max-w-[688px] border-dashed border-gray-300 rounded-lg p-4 text-gray-500 relative">
                <div className="mb-4">
                  <label className="block font-semibold text-[16px] text-black mb-1">Installation <span className="text-gray-400 text-sm">(optional)</span></label>
                  
                     <input
                    type="text"
                   name="installation"
                    value={formData.installation}
                    onChange={handleChange}
                   className={`${inputClass("installation")} w-full `}
 placeholder="Enter here"
                  />           
                
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">
                    <input type="file" id="file3" name="file3" className="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,image/*" onChange={handleChange} />
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
                    </svg>
                    <p className="text-black text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">{files3?.[0]?.name ? files3[0].name : "Choose a Rate list or drag & drop it here"}</p>
                    <span className="text-xs block mb-4 text-gray-400 pointer-events-none">Upload rate list (If Any)</span>
                    <button type="button" onClick={() => document.getElementById("file3").click()} className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
                     {errors.file3 && <ErrorText>{errors.file3}</ErrorText>}
                  </div>

                  <div className="mb-5 border-1 border-dashed border-[#871B58] rounded-lg p-4 text-center text-gray-500 relative bg-white hover:shadow-md transition">
                    <input type="file" id="file2" name="file2" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,video/mp4" onChange={handleChange} />
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3 w-10 h-10 text-black pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0l-4 4m4-4l4 4M20 16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4" />
                    </svg>
                    <p className="text-black font-semibold text-sm sm:text-base md:text-lg font-medium pointer-events-none mb-1">{files2?.[0]?.name ? files2[0].name : "Choose an Image or drag & drop it here"}</p>
                    <span className="text-xs block mb-4 text-gray-400 pointer-events-none">JPEG, PNG and MP4 formats upto 50MB</span>
                    <button type="button" onClick={() => document.getElementById("file2").click()} className="inline-block bg-white border font-medium text-sm px-5 py-2 rounded-lg shadow-sm hover:bg-[#871B58] hover:text-white transition">Browse</button>
                    {errors.file2 && <ErrorText>{errors.file2}</ErrorText>}
                  </div>
                </div>
              </div>

              <div className="mb-7 mt-2">
                <label className="block font-semibold text-[16px] text-black mb-1">Write your query</label>
                <textarea name="message"   className={`${inputClass("installation")} w-full`}
  placeholder="Write your message here" rows={3} value={formData.message} onChange={handleChange} />
              </div>
             {errors.message && <ErrorText>{errors.message}</ErrorText>}
             
              <div className="flex justify-end gap-3">
              <button
  type="button"
  className="font-inter border text-black px-8 py-2 rounded mb-6"

  onClick={() => {
setFormData(initialFormData);
    setProducts([]);
    setErrors({});
    setProductImage(null);
    setSubmitting(false);
  }}
>
  Cancel
</button>
                <button type="submit" className="font-inter bg-[#871B58] text-white px-8 py-2 rounded mb-6" disabled={submitting}>
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

            
                    <button
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
