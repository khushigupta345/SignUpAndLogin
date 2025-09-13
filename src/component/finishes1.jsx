// import React from "react";


// export default function Finishes() {
//   const finishes = [
//     {
//       id: 1,
//       title: "Polish",
//       image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 2,
//       title: "Mirror Polished",
//       image: "https://via.placeholder.com/400x300?text=Mirror+Polished",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 3,
//       title: "Flamed Finish",
//       image: "https://via.placeholder.com/400x300?text=Flamed+Finish",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 4,
//       title: "Honed Finish",
//       image: "https://via.placeholder.com/400x300?text=Honed+Finish",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 5,
//       title: "Lapato Finish",
//       image: "https://via.placeholder.com/400x300?text=Lapato+Finish",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 6,
//       title: "Leather Finish",
//       image: "https://via.placeholder.com/400x300?text=Leather+Finish",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 7,
//       title: "River-Polished Finish",
//       image: "https://via.placeholder.com/400x300?text=River+Polished",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 8,
//       title: "Sand Blast Finish",
//       image: "https://via.placeholder.com/400x300?text=Sand+Blast+Finish",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
//     {
//       id: 9,
//       title: "Shot Blast Finish",
//       image: "https://via.placeholder.com/400x300?text=Shot+Blast+Finish",
//       desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 py-12">
//         {/* Cards grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {finishes.map((item) => (
//             <article
//               key={item.id}
//               className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition hover:-translate-y-1"
//             >
//               {/* top image */}
//               <div className="w-full h-48 sm:h-56 md:h-52 lg:h-60 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover"
//                 />
//               </div>

//               {/* bottom content */}
//               <div className="p-6 border-t border-gray-100">
//                 <h3 className="text-center font-semibold text-lg md:text-xl mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-center text-sm text-gray-500 leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React from "react";

// import { FaArrowRight } from "react-icons/fa";
// export default function Finishes() {
//     const finishes = [
//         {
//             id: 1,
//             title: "Polish",
//             image: "https://images.unsplash.com/photo-1542831371-d531d36971e6?q=80&w=1200&auto=format&fit=crop ",
  
//         desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
//     },
// {
//     id: 2,
//         title: "Mirror Polished",
//             image: "https://via.placeholder.com/400x300?text=Mirror+Polished",
//                 desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
// },
// {
//     id: 3,
//         title: "Flamed Finish",
//             image: "https://via.placeholder.com/400x300?text=Flamed+Finish",
//                 desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
// },
// {
//     id: 2,
//         title: "Mirror Polished",
//             image: "https://via.placeholder.com/400x300?text=Mirror+Polished",
//                 desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
// },
// {
//     id: 3,
//         title: "Flamed Finish",
//             image: "https://via.placeholder.com/400x300?text=Flamed+Finish",
//                 desc: "Uncover the rare beauty of our finest stones by stonepedia a luxurious touch for truly unique spaces."
// }

//   ];

// return (
//  <div className="font-poppins min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 py-14">
//         <div className="grid md:grid-cols-3 gap-y-9 gap-x-6">
//           {finishes.map((item) => (
//             <article
//               key={item.id}

//             tabIndex={0}
//               className="group relative bg-white rounded-xl overflow-hidden shadow-md 
//                          transition-transform duration-300  
//                  focus:scale-y-104 active:scale-y-104        hover:scale-y-104 origin-top hover:shadow-xl"
//             >
//                 <div className="hover:pb-11 focus:pb-6 active:pb-6">
//               {/* Image */}
//               <div className="w-full h-52 pb-2 sm:h-72 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover 
//                              transition-transform duration-500 
//                            "
//                 />
//               </div>

//               {/* Text //  group-hover:scale-120 */
//               }
//               <div className="p-4  text-center pb-9 transition-all duration-300">
//                 <h3 className="text-black text-xl font-medium ">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>
// </div>
//               {/* Button – sirf isi card pe dikhega */}
//               <button
//                 className="absolute left-1/2 bottom-6 sm:border-2 -translate-x-1/2 
//                            opacity-0 translate-y-4 group-focus:opacity-100
//                            group-active:opacity-100
//                            group-hover:opacity-100 group-hover:translate-y-0
//                            transition-all duration-300
//                            bg-[#871B58] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full 
//                            flex items-center justify-center shadow-lg"
//               >
//                 <FaArrowRight />
//               </button>
//             </article>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function Finishes1() {
    //       id: 3,
//       title: "Flamed Finish",
//       image:
//         "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//       desc: "Rough textured surface created by flame, suitable for outdoor flooring.",
//     },
//     {
//       id: 4,
//       title: "Honed Finish",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//       desc: "Matte finish without shine, perfect for subtle and elegant spaces.",
//     },
//     {
//       id: 5,
//       title: "Sandblasted",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//       desc: "Soft textured finish offering slip-resistance for pathways and pools.",
//     },
//     {
//       id: 6,
//       title: "Leather Finish",
//       image:
//         "https://images.unsplash.com/photo-1523413651479-597eb2da0ad1?q=80&w=1200&auto=format&fit=crop",
//       desc: "Unique tactile texture, giving a modern touch with subtle roughness.",
//     },
//   ];
  const finishes = [
    {
      id: 1,
      title: "Polish",
      image:
         "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
    },
    {
        
      id: 2,
      title: "Mirror Polished",
     image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
    },
    {
      id: 3,
      title: "Flamed Finish",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",    desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",    },
    {
      id: 4,
      title: "Honed Finish",
      image:
         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
               desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",   },
    {
      id: 5,
      title: "Sandblasted",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",

      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",    },
      {
      id: 6,
      title: "Honed Finish",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      desc: "Matte finish without shine, perfect for subtle and elegant spaces.",      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",   },
  ];

  return (
//     <div className="font-poppins min-h-scree">
//       <div className="max-w-6xl mx-auto px-6 py-14 cursor-pointer">
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-y-9 gap-x-6">
//           {finishes.map((item) => (
//             // <article
//             //   key={item.id}
//             //   tabIndex={0} // mobile/tablet tap ke liye
//             //   className="group relative bg-[#FFFFFF] rounded-xl overflow-hidden shadow-md
//             //  transition-transform duration-300
//             //  hover:shadow-xl
//             //  origin-top"
     
//             // >
//             <article
//   key={item.id}
//   tabIndex={0}
//   className="group relative bg-[#FFFFFF] rounded-xl overflow-hidden shadow-md
//              transition-transform duration-300 hover:shadow-xl origin-top"
// >
//                     {/* hover:scale-y-105 hover:shadow-xl
//                          origin-top
//                          focus:scale-y-105
//                          sm:focus:scale-y-105 sm:active:scale-y-105" */}
//               {/* Image */}
//               <div className="w-full h-48 sm:h-72 md:h-[308px] overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover 
//                            "
//                 />
//               </div>

//               {/* Text */}
//               {/* <div className="p-4 pb-16 text-center transition-all duration-300"> */}
//              {/* <div
//     className="p-4 pb-16 text-center transition-all duration-300
//                group-hover:pb-24 sm:group-focus:pb-24 sm:group-active:pb-24"
//   > */}
//   <div
//   className="group p-4 pb-16 text-center transition-all duration-300
//              hover:pb-24 focus:pb-24 active:pb-24"
// >

//                 <h3 className="text-black text-xl font-medium">{item.title}</h3>
//                 <p className="text-gray-700 text-sm md:text-base leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>

//               {/* Button */}
//               <button
//                 className="absolute left-1/2 bottom-6 -translate-x-1/2
//                            opacity-0 translate-y-4
//                            group-hover:opacity-100  group-focus:opacity-100 group-active:opacity-100

                           
//                            transition-all duration-300
//                            bg-[#871B58] text-white w-12 h-12 rounded-full
//                            flex items-center justify-center shadow-lg"
//               >
//                 <FaArrowRight />
//               </button>
//             </article>
//           ))}
//         </div>
        
//       </div>
//     </div>
//   );
// }
<div className="font-poppins min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* IMPORTANT: items-start ensures cards don't stretch to match tallest card */}
        <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-y-9 gap-x-6 items-start">
          {finishes.map((item) => (
            <article
              key={item.id}
              tabIndex={0}
              /* self-start ekstra safety ke liye */
              className="group relative bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl origin-top self-start"
            >
              <div className="w-full h-48   overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>


              {/* NOTE: default pb-16; only hovered card gets pb-24 via group-hover */}
              <div className="p-4 pb-9 text-center transition-all duration-300 group-focus:pb-17  group-active:pb-17 group-hover:pb-20  sm:focus:pb-20 sm:active:pb-20">
                <h3 className="text-gray-900 text-lg md:text-xl font-medium">{item.title}</h3>
                <p className="text-gray-600 text-sm md:text-base ">
                  {item.desc}
                </p>
              </div>

              <button className="absolute left-1/2 bottom-6 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100   group-focus:opacity-100 group-active:opacity-100    transition-all duration-300 bg-[#871B58] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                <FaArrowRight />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
// import React from "react";
// import { FaArrowRight } from "react-icons/fa";

// export default function Finishes() {
//   const finishes = [
//     {
//       id: 1,
//       title: "Polish",
//       image:
//         "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//       desc: "A smooth glossy finish that enhances the stone’s natural color and shine.",
//     },
//     {
//       id: 2,
//       title: "Mirror Polished",
//       image:
//         "https://images.unsplash.com/photo-1523413651479-597eb2da0ad1?q=80&w=1200&auto=format&fit=crop",
//       desc: "High-reflective surface, ideal for luxurious interiors and premium designs.",
//     },
//     {
//       id: 3,
//       title: "Flamed Finish",
//       image:
//         "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//       desc: "Rough textured surface created by flame, suitable for outdoor flooring.",
//     },
//     {
//       id: 4,
//       title: "Honed Finish",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//       desc: "Matte finish without shine, perfect for subtle and elegant spaces.",
//     },
//     {
//       id: 5,
//       title: "Sandblasted",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//       desc: "Soft textured finish offering slip-resistance for pathways and pools.",
//     },
//     {
//       id: 6,
//       title: "Leather Finish",
//       image:
//         "https://images.unsplash.com/photo-1523413651479-597eb2da0ad1?q=80&w=1200&auto=format&fit=crop",
//       desc: "Unique tactile texture, giving a modern touch with subtle roughness.",
//     },
//   ];

//   return (
//     <div className="font-poppins min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 py-14">
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
//           Our Finishes
//         </h2>

//         {/* Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
//           {finishes.map((item) => (
//             <article
//               key={item.id}
//               tabIndex={0}
//               className="group relative bg-white rounded-2xl group-hover:scale-y-145 origin-top overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 "
//             >
//               {/* Image with overlay */}
//               <div className="relative w-full h-56 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover transform transition-transform duration-500 "
//                 />
            
//               </div>

//               {/* Text */}
//               <div className="p-5 pb-16 text-center">
//                 <h3 className="text-gray-900 text-lg md:text-xl font-semibold mb-2">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base line-clamp-2">
//                   {item.desc}
//                 </p>
//               </div>

//               {/* Floating button */}
//               <button
//                 className="absolute left-1/2 bottom-6 -translate-x-1/2 opacity-0 translate-y-4
//                            group-hover:opacity-100 group-hover:translate-y-0
//                            transition-all duration-500 ease-out
//                            bg-[#871B58] hover:bg-[#6b1445] text-white w-12 h-12 rounded-full
//                            flex items-center justify-center shadow-xl hover:scale-110"
//               >
//                 <FaArrowRight />
//               </button>
//             </article>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
