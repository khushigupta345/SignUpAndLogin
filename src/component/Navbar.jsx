import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiAddressBook } from "react-icons/pi";
import { FiUser } from "react-icons/fi";
import { IoCubeOutline } from "react-icons/io5";
import {
  FaBoxOpen,
  FaIndustry,
} from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="absolute right-80 p-2 "
      >
        <FiUser className="w-5 h-5" />
      </button>

      {open && (
        <div className="absolute right-10 top-3 mt-3 w-64 bg-white rounded-lg shadow-lg  p-3 z-50">
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <FaRegCircleUser className="w-5 h-5 mt-0.5 text-black" />
              <div>
                <p className="text-[#871B58] font-medium">My Profile</p>
                <p className="text-xs text-black">Edit your Basic Details</p>
              </div>
            </li>

            <li className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              < PiAddressBook className="w-5 h-5 mt-0.5 text-black" />
              <div>
                <p className="text-[#871B58] font-medium">My Address</p>
                <p className="text-xs text-black">Edit your Address Details</p>
              </div>
            </li>

            <li className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <FaBoxOpen className="w-5 h-5 mt-0.5 text-black" />
              <div>
                <p className="text-[#871B58] font-medium">My Orders</p>
                <p className="text-xs text-black">
                  Track, Status, Order No, Payment
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <FaIndustry className="w-5 h-5 mt-0.5 text-black" />

              <div>
                <p className="text-[#871B58] font-medium">My Quarry</p>
                <p className="text-xs text-black">Sell your Quarry (Mines) here</p>
              </div>
            </li>

            <li className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <IoCubeOutline className="w-5 h-5 mt-0.5 text-black" />

              <div>
                <p className="text-[#871B58] font-medium">My Blocks</p>
                <p className="text-xs text-black">Sell your blocks here</p>
              </div>
            </li>
          </ul>

          {/* Logout button */}
          <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md flex items-center justify-center gap-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}