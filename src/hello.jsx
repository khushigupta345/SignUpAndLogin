import React, { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { CiMail } from "react-icons/ci";

export default function Hello() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // API call or logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-2xl mx-auto p-4"
    >
      {/* Row - Name & Email */}
      <div className="flex flex-col md:flex-row md:justify-between gap-2 w-full">
        {/* Full Name */}
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

        {/* Email */}
        <div className="w-full flex flex-col">
          <label htmlFor="email" className="mb-0.5 text-xs">
            Email
          </label>
          <div className="rounded-lg p-[1px] transition bg-transparent focus-within:bg-gradient-to-t focus-within:from-[#d6c9ea] focus-within:to-[#871B58]">
            <div className="flex items-center gap-2 rounded-lg bg-white border border-[#D7D7D7] transition focus-within:border-transparent">
              <input
                id="email"
                type="email"
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

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 bg-[#871B58] text-white py-2 px-4 rounded-lg text-sm hover:bg-[#6d1547] transition"
      >
        Submit
      </button>
    </form>
  );
}