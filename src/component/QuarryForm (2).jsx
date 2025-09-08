import React, { useEffect } from "react";
import { LuUserRound } from "react-icons/lu";
import { CiMail, CiMobile3 } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";

import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../firebase/config";

const QuarryForm = ({ setShowQuarryForm, onQuarryAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pincode: "",
    country: null,
    state: null,
    city: null,
    quarryName: "",
    quarryPincode: "",
    quarryCountry: "",
    quarryState: "",
    quarryCity: "",
    address: "",
    licenseNumber: "",
    stoneName: "",
    stoneCategory: "",
    quarryStatus: "",
    expectedPrice: "",
    negotiation: "",
    quarryArea: "",
    validityRemaining: "",
    videos: [],
    images: [],
    description: "",
  });

  const countryOptions = Country.getAllCountries().map((c) => ({
    label: `${c.name}`,
    value: c.isoCode,
    phonecode: c.phonecode,
    phone: c.phone,
  }));

  // Helper function to get states for a given country
  const getStateOptions = (country) => {
    if (!country) return [];
    return State.getStatesOfCountry(country.value).map((s) => ({
      label: s.name,
      value: s.isoCode,
    }));
  };

  // Helper function to get cities for a given state and country
  const getCityOptions = (country, state) => {
    if (!country || !state) return [];
    return City.getCitiesOfState(country.value, state.value).map((c) => ({
      label: c.name,
      value: c.name,
    }));
  };

  // Options for personal address
  const stateOptions = getStateOptions(formData.country);
  const cityOptions = getCityOptions(formData.country, formData.state);

  // Options for quarry address
  const quarryStateOptions = getStateOptions(formData.quarryCountry);
  const quarryCityOptions = getCityOptions(
    formData.quarryCountry,
    formData.quarryState
  );

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleFile = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const maxSize = type === "videos" ? 50 * 1024 * 1024 : 20 * 1024 * 1024;
    const maxFiles = type === "videos" ? 10 : 20; // Limit number of files
    const validFiles = [];
    let hasError = false;

    // Check total files won't exceed limit
    if (formData[type].length + files.length > maxFiles) {
      toast.error(`Maximum ${maxFiles} ${type} allowed`);
      return;
    }

    files.forEach(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} exceeds the maximum ${maxSize / (1024 * 1024)}MB limit`);
        hasError = true;
        return;
      }
      validFiles.push(file);
    });

    if (hasError || validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], ...validFiles]
    }));

    e.target.value = "";
  };

  const resetFormFields = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      pincode: "",
      country: null,
      state: null,
      city: null,
      quarryName: "",
      quarryPincode: "",
      quarryCountry: "",
      quarryState: "",
      quarryCity: "",
      address: "",
      licenseNumber: "",
      stoneName: "",
      stoneCategory: "",
      quarryStatus: "",
      expectedPrice: "",
      negotiation: "",
      quarryArea: "",
      validityRemaining: "",
      videos: [],
      images: [],
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (formData.videos.length === 0) {
        throw new Error("Please upload at least one video");
      }
      if (formData.images.length === 0) {
        throw new Error("Please upload at least one image");
      }

      const storage = getStorage();

      // Upload videos in parallel
      const videoUrls = await Promise.all(
        formData.videos.map(async (file, index) => {
          const storageRef = ref(storage, `quarries/videos/${Date.now()}_${index}_${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );

      // Upload images in parallel
      const imageUrls = await Promise.all(
        formData.images.map(async (file, index) => {
          const storageRef = ref(storage, `quarries/images/${Date.now()}_${index}_${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );

      // Helper function to format date
      const formatDate = () => {
        const date = new Date();
        const pad = num => String(num).padStart(2, '0');
        return `${pad(date.getDate())}-${pad(date.getMonth() + 1)}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
      };

      // Extract values from React-Select objects
      const getSelectValue = (field) => field?.label || null;
      const getSelectCode = (field) => field?.value || null;

      // Prepare data for Firestore
      const quarryData = {
        // Basic fields
        ...formData,
        // Handle select fields
        country: getSelectValue(formData.country),
        countryCode: getSelectCode(formData.country),
        state: getSelectValue(formData.state),
        city: getSelectValue(formData.city),
        quarryCountry: getSelectValue(formData.quarryCountry),
        quarryCountryCode: getSelectCode(formData.quarryCountry),
        quarryState: getSelectValue(formData.quarryState),
        quarryCity: getSelectValue(formData.quarryCity),
        // File URLs
        videoUrls,
        imageUrls,
        // Metadata
        status: 'pending',
        createdAt: formatDate(),
        // Remove file objects
        videos: undefined,
        images: undefined
      };

      // Clean up the data object
      Object.keys(quarryData).forEach(key => {
        if (quarryData[key] === undefined || quarryData[key] === null) {
          delete quarryData[key];
        }
      });

      // Save to Firestore
      const docRef = await addDoc(collection(db, "BuyAndSellQuarry"), quarryData);

      // Create the complete quarry object with ID to pass back to parent
      const newQuarry = {
        id: docRef.id,
        ...quarryData
      };

      // Notify parent component about the new quarry
      if (onQuarryAdded) {
        onQuarryAdded(newQuarry);
      }

      toast.success("Quarry submitted successfully!");
      setShowQuarryForm(false);
      resetFormFields();
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error(error.message || "Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-30 max-md:p-5 overflow-hidden">
      <div className="bg-white p-4 md:p-6 xl:p-8 rounded-lg shadow-lg max-w-xl w-full max-h-[80vh] overflow-y-auto scrollbar-hide">
        <h1 className="text-xl font-semibold text-center mb-3 md:mb-5">
          Sell Quarry(Mines) Form
        </h1>
        <form
          action=""
          className="space-y-2 md:space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
            <div className="w-full flex flex-col md:w-[60%]">
              <label htmlFor="name" className="mb-0.5 text-xs">
                Full Name
              </label>
              <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                  <input
                    id="name"
                    type="text"
                    required
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                  />
                  <label htmlFor="name" className="pr-3 text-gray-600">
                    <LuUserRound size={16} />
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="email" className="mb-0.5 text-xs">
                Email
              </label>
              <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                  />
                  <label htmlFor="email" className="pr-3 text-gray-600">
                    <CiMail size={16} />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
            <div className="min-w-0">
              <label className="mb-0.5 text-xs">Country</label>
              <Select
                options={countryOptions}
                value={formData.country}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    country: value,
                    state: null, // Reset state when country changes
                    city: null, // Reset city when country changes
                    phone: "", // Reset phone when country changes
                  }));
                }}
                placeholder="Country"
                required
                name="country"
                className="text-xs"
              />
            </div>

            <div className="min-w-0">
              <label className="mb-0.5 text-xs">State</label>
              <Select
                options={stateOptions}
                value={formData.state}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    state: value,
                    city: null, // Reset city when state changes
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
              <label className="mb-0.5 text-xs">City</label>
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

          <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
            <div className="w-full flex flex-col">
              <label htmlFor="name" className="mb-0.5 text-xs">
                Phone Number
              </label>
              <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                  <div className="flex items-center w-full">
                    <span className="text-xs text-gray-500 px-2 border-r">
                      {formData.country?.phonecode || "+1"}
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 15);
                        setFormData((prev) => ({ ...prev, phone: value }));
                      }}
                      className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs w-full"
                      required
                      name="phone"
                    />
                  </div>
                  <label className="pr-3 text-gray-600" htmlFor="phone">
                    <CiMobile3 size={16} />
                  </label>
                </div>
              </div>
            </div>
            <div className="w-full md:w-[60%] flex flex-col">
              <label htmlFor="pincode" className="mb-0.5 text-xs">
                Pincode
              </label>
              <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                  <input
                    id="pincode"
                    type="text"
                    maxLength={6}
                    pattern="\d{6}"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                    required
                    name="pincode"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-3">
            <h2 className="text-xs font-semibold mb-1">
              Quarry (Mines) Details
            </h2>
            <div className="border border-dashed border-[#000000]/20 rounded-lg p-2 space-y-1 md:space-y-2">
              <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
                <div className="w-full flex flex-col">
                  <label htmlFor="quarryname" className="mb-0.5 text-xs">
                    Quarry Name
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="quarryname"
                        type="text"
                        placeholder="Quarry Name"
                        value={formData.quarryName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarryName: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="quarryName"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="Quarrypincode" className="mb-0.5 text-xs">
                    Quarry Location Pincode
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="Quarrypincode"
                        type="text"
                        maxLength={6}
                        pattern="\d{6}"
                        placeholder="Pincode"
                        value={formData.quarryPincode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            quarryPincode: e.target.value,
                          }))
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="quarryPincode"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                <div className="min-w-0">
                  <label className="text-xs mb-0.5">Country</label>
                  <Select
                    options={countryOptions}
                    value={formData.quarryCountry}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        quarryCountry: value,
                        quarryState: null, // Reset state when country changes
                        quarryCity: null, // Reset city when country changes
                      }));
                    }}
                    placeholder="Country"
                    required
                    name="quarryCountry"
                    className="text-xs"
                  />
                </div>

                <div className="min-w-0">
                  <label className="text-xs mb-0.5">State</label>
                  <Select
                    options={quarryStateOptions}
                    value={formData.quarryState}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        quarryState: value,
                        quarryCity: null, // Reset city when state changes
                      }));
                    }}
                    placeholder="State"
                    isDisabled={!formData.quarryCountry}
                    required
                    name="quarryState"
                    className="text-xs"
                  />
                </div>

                <div className="min-w-0">
                  <label className="text-xs mb-0.5">City</label>
                  <Select
                    options={quarryCityOptions}
                    value={formData.quarryCity}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        quarryCity: value,
                      }));
                    }}
                    placeholder="City"
                    isDisabled={!formData.quarryState}
                    required
                    name="quarryCity"
                    className="text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full my-3">
                <div className="w-full flex flex-col">
                  <label htmlFor="address" className="mb-0.5 text-xs">
                    Address
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="address"
                        type="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="address"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="licenseNumber" className="mb-0.5 text-xs">
                    License / Lease number
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="licenseNumber"
                        type="text"
                        placeholder="License / Lease number"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            licenseNumber: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="licenseNumber"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full my-3">
                <div className="w-full flex flex-col">
                  <label htmlFor="StoneName" className="mb-0.5 text-xs">
                    Stone Name
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="StoneName"
                        type="text"
                        placeholder="Stone Name"
                        value={formData.stoneName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stoneName: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="stoneName"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="StoneCategory" className="mb-0.5 text-xs">
                    Stone Category
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="StoneCategory"
                        type="text"
                        placeholder="Stone Category"
                        value={formData.stoneCategory}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            stoneCategory: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="stoneCategory"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
                {/* Quarry Status */}
                <div className="min-w-0 flex flex-col">
                  <label className="text-xs mb-0.5">Quarry Status</label>
                  <div className="relative rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <select
                      name="quarryStatus"
                      value={formData.quarryStatus}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quarryStatus: e.target.value,
                        })
                      }
                      className="w-full appearance-none rounded-lg bg-white border border-[#D7D7D7] px-3 py-2 pr-9 text-xs outline-none focus:border-transparent text-gray-900"
                    >
                      <option value="" disabled>
                        Choose
                      </option>
                      <option value="Operational">Operational</option>
                      <option value="Non-Operational">Non-Operational</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <MdKeyboardArrowDown size={20} />
                    </span>
                  </div>
                </div>

                {/* Expected Price */}
                <div className="min-w-0 flex flex-col">
                  <label className="text-xs mb-0.5">Expected Price</label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="ExpectedPrice"
                        type="text"
                        placeholder="Expected Price"
                        value={formData.expectedPrice}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedPrice: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="expectedPrice"
                      />
                    </div>
                  </div>
                </div>

                {/* Negotiable */}
                <div className="min-w-0 flex flex-col">
                  <label className="text-xs mb-0.5">Negotiable</label>
                  <div className="relative rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <select
                      name="negotiable"
                      value={formData.negotiation}
                      required
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          negotiation: e.target.value,
                        })
                      }
                      className="w-full appearance-none rounded-lg bg-white border border-[#D7D7D7] px-3 py-2 pr-9 text-xs outline-none focus:border-transparent text-gray-900"
                    >
                      <option value="" disabled>
                        Choose
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <MdKeyboardArrowDown size={20} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full my-3">
                <div className="w-full flex flex-col">
                  <label htmlFor="QuarryArea" className="mb-0.5 text-xs">
                    Quarry Area (Ha)
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="QuarryArea"
                        type="text"
                        placeholder="Quarry Area"
                        value={formData.quarryArea}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quarryArea: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="quarryArea"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-col">
                  <label htmlFor="ValidityRemaining" className="mb-0.5 text-xs">
                    Validity Remaining (Years)
                  </label>
                  <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
                    <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
                      <input
                        id="ValidityRemaining"
                        type="number"
                        placeholder="Validity Remaining"
                        min={0}
                        value={formData.validityRemaining}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            validityRemaining: e.target.value,
                          })
                        }
                        className="flex-1 bg-transparent outline-none border-0 px-3 py-2 text-xs"
                        required
                        name="validityRemaining"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Upload Quarry Images/Videos
                </label>
                <div className="flex gap-4 flex-col md:flex-row">
                  {/* Video upload */}
                  <label className="flex flex-col items-center justify-center w-full md:w-1/2 border-1 border-dashed border-primary rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                    <FiUpload size={20} className="mb-2 text-gray-900" />
                    <span className="text-xs font-medium">Upload Videos</span>
                    <span className="text-[8px] text-gray-500">
                      Upload videos of mines (max 50MB each, max 10 files)
                    </span>
                    <span className="mt-2 text-[8px] text-gray-600 font-semibold">
                      {formData.videos.length > 0
                        ? `Uploaded ${formData.videos.length}`
                        : "Browse"}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFile(e, "videos")}
                      multiple
                    />
                  </label>

                  {/* Image upload */}
                  <label className="flex flex-col items-center justify-center w-full md:w-1/2 border-1 border-dashed border-primary bg-primary/10 rounded-lg p-6 text-center cursor-pointer hover:bg-primary/10 transition">
                    <FiUpload size={20} className="mb-2 text-gray-900" />
                    <span className="text-xs font-medium">Upload Images</span>
                    <span className="text-[8px] text-gray-500">
                      JPEG, PNG formats up to 20MB (max 20 files)
                    </span>
                    <span className="mt-2 text-[8px] text-gray-600 font-semibold">
                      {formData.images.length > 0
                        ? `Uploaded ${formData.images.length}`
                        : "Browse"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFile(e, "images")}
                      multiple
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="mb-0.5 text-xs">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Tell me about quarry"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-md p-2 text-xs outline-none"
              required
              name="description"
            ></textarea>
          </div>

          {/* Submit and cancel buttons */}
          <div className="flex justify-end gap-2 mt-5 text-xs md:text-sm">
            <button
              className={`cursor-pointer px-4 py-1 border border-gray-400 rounded-lg ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={() => setShowQuarryForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`cursor-pointer px-4 py-1 bg-primary rounded-lg text-white ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuarryForm;
