import React from "react";
import { FiEdit2, FiMapPin,FiTrash2} from "react-icons/fi";
export default function QuarryDashboard() {
  const items = [
    {
      id: 1,
      title: "Candia Mines Pvt. ltd",
      subtitle: "White Marble Quarry",
      price: "₹ 240.5 Cr",
      location: "Rajasthan, India",
       image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop",
  
    },
    {
      id: 2,
      title: "Kishangarh Quarry",
      subtitle: "White Marble Quarry",
      price: "₹ 20.5 Cr",
      location: "Kishangarh, Rajasthan",
       image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Rajasthan Quarry",
      subtitle: "Grey Marble",
      price: "₹ 50.5 Cr",
      location: "Kishangarh, Rajasthan",
      image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop",
    },
  ];


  return (
    <div className="max-w-7xl mx-auto px-6 py-8 font-poppins">
      
      <div className="mb-6">
  <h1 className="text-2xl sm:text-3xl font-bold text-[#871B58] font-[Poppins] ">
   Your listed Quarry Postings
  </h1>
 
  <p className="text-sm text-[#878787] mt-1">Manage all your Quarry postings & editing from here.</p>

</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white border border-[#A9A9A9] rounded-lg shadow-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
           
                <div className="w-full sm:w-44 h-28 rounded-lg overflow-hidden ">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

             
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-[#262626]">{item.title}</h2>
                      <div className="text-sm text-[#595959]">{item.subtitle}</div>
                      <div className="text-xl font-semibold text-[#424242]">{item.price}</div>

               <div className="text-sm text-[#595959] mt-1 flex items-center gap-1">
  <FiMapPin className="text-[#595959] " />
  {item.location}
</div>
                    </div>

                  
                    <div className="flex items-center gap-3">
                    
                      <button
                    className="p-2 rounded-md bg-gray-100  transition"
                    title="Edit"
                  >
                    <FiEdit2 className="w-6 h-6 text-gray-600" />
                  </button>
                     
                      <button
                      
                        className="p-2 rounded-md bg-gray-100  transition"
                      >
                      
                   <FiTrash2 className="w-6 h-6 text-red-600" />
                      </button>
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}  
        </div>

        
      </div>
    </div>
  );
}