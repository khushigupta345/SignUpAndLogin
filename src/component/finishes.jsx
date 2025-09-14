// import { FaArrowRight } from "react-icons/fa";
// export default function Finishes() {

//     const finishes = [
//         {
//             id: 1,
//             title: "Polish",
//             image:
//                 "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {

//             id: 2,
//             title: "Mirror Polished",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 3,
//             title: "Flamed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 4,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 5,
//             title: "Sandblasted",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",

//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 6,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//             desc: "Matte finish without shine, perfect for subtle and elegant spaces.", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//     ];

//     return (

//         <div className="font-poppins min-h-screen">
//             <div className="max-w-6xl mx-auto px-6 py-14">

//                 <div className="grid sm:grid-cols-2  md:grid-cols-3  gap-y-9  gap-x-6 items-start">
//                     {finishes.map((item) => (
//                         <article
//                             key={item.id}
//                             tabIndex={0}

//                             className="group relative bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 origin-top self-start"
//                         >
//                             <div className="pb-8 text-center transition-all duration-300 group-focus:pb-17  group-active:pb-17 group-hover:pb-18  sm:focus:pb-20 sm:active:pb-20">

//                                 <div className="w-full h-42 sm:h-71   overflow-hidden">
//                                     <img
//                                         src={item.image}
//                                         alt={item.title}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
// <div className="pt-4 pl-4 pr-4 text-center ">
//     <h3 className="text-gray-900 text-lg md:text-xl font-medium">{item.title}</h3>
//     <p className="text-gray-600 text-sm md:text-base ">
//         {item.desc}
//     </p>
// </div>
//                             </div>
//                             <button className="absolute left-1/2 bottom-6 -translate-x-1/2 opacity-0 translate-y-4 group-hover:opacity-100   group-focus:opacity-100 group-active:opacity-100    transition-all duration-300 bg-[#871B58] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
//                                 <FaArrowRight />
//                             </button>
//                         </article>

// {/* <article
//   key={item.id}
//   tabIndex={0}
//   className="group shadow-md relative rounded-xl overflow-hidden transition-all duration-300 self-start"
// >
//   {/* expanding wrapper */}
//   <div className="absolute inset-0 bg-white rounded-xl shadow-md 
//                   transition-all duration-300 group-hover:-inset-2 
//                   group-hover:shadow-xl"></div>

//   {/* content wrapper (upar fixed) */}
//   <div className="pb-20 text-center relative z-10">
//     <div className="w-full h-42 sm:h-71 overflow-hidden">
//       <img
//         src={item.image}
//         alt={item.title}
//         className="w-full h-full object-cover rounded-t-xl"
//       />
//     </div>
// <div className="pt-4 px-4 text-center">
//   <h3 className="text-gray-900 text-lg md:text-xl font-medium">
//     {item.title}
//   </h3>
//   <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
// </div>
//   </div>


//   <button
//     className="absolute left-1/2 bottom-6 -translate-x-1/2 opacity-0 translate-y-4 
//                group-hover:translate-y-0 group-hover:opacity-100 
//                transition-all duration-300 bg-[#871B58] text-white 
//                w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20"
//   >
//     <FaArrowRight />
//   </button>
// </article> */}


//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


// import { FaArrowRight } from "react-icons/fa";
// export default function Finishes() {
//        const finishes = [
//         {
//             id: 1,
//             title: "Polish",
//             image:
//                 "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {

//             id: 2,
//             title: "Mirror Polished",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 3,
//             title: "Flamed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 4,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 5,
//             title: "Sandblasted",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",

//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 6,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//             desc: "Matte finish without shine, perfect for subtle and elegant spaces.", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//     ];


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
// import { FaArrowRight } from "react-icons/fa";

// export default function Finishes() {
//   const finishes = [
//     {
//       id: 1,
//       title: "Polish",
//       image:
//         "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//       id: 2,
//       title: "Mirror Polished",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//       id: 3,
//       title: "Flamed Finish",
//       image:
//         "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//       id: 4,
//       title: "Honed Finish",
//       image:
//         "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//       id: 5,
//       title: "Sandblasted",
//       image:
//         "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//       id: 6,
//       title: "Honed Finish",
//       image:
//         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//       desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//   ];

//   return (
//     <div className="font-poppins min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 py-14">
//         <div className="grid md:grid-cols-3 gap-y-14 gap-x-6">
//           {finishes.map((item) => (
//             <article
//               key={item.id}
//               tabIndex={0}
//               className="group relative bg-white rounded-xl overflow-hidden shadow-md
//                          transition-transform duration-300 origin-top hover:scale-110 hover:shadow-xl"
//             >
//               {/* Image */}
//               <div className="w-full h-52 sm:h-72 overflow-hidden">
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="w-full h-full object-cover  
//                            "
//                 />
//               </div>

//               {/* Text */}
//               <div className="p-4 text-center">
//                 <h3 className="text-black text-xl font-medium ">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base leading-relaxed">
//                   {item.desc}
//                 </p>
//               </div>

//               {/* Button – card ke andar fix */}
//               <button
//                 className="absolute left-1/2 bottom-4 -translate-x-1/2 
//                            opacity-0 translate-y-4 
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

// import { FaArrowRight } from "react-icons/fa";

// export default function Finishes() {
// const finishes = [
//     {
//         id: 1,
//         title: "Polish",
//         image:
//             "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//         id: 2,
//         title: "Mirror Polished",
//         image:
//             "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//         id: 3,
//         title: "Flamed Finish",
//         image:
//             "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//         id: 4,
//         title: "Honed Finish",
//         image:
//             "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//         id: 5,
//         title: "Sandblasted",
//         image:
//             "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
//     {
//         id: 6,
//         title: "Honed Finish",
//         image:
//             "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//     },
// ];

//     return (
//         <div className="font-poppins min-h-screen bg-gray-50">
//             <div className="max-w-6xl mx-auto px-6 py-14">
//                 <div className="grid md:grid-cols-3 gap-y-14 gap-x-6">
//                     {finishes.map((item) => (
//                         <article
//                             key={item.id}
//                             tabIndex={0}
//                             className="group relative bg-white rounded-xl overflow-hidden shadow-md  
// transition-transform duration-300 origin-top hover:scale-y-107  hover:shadow-xl"
//                         >
//                             {/* Image */}
//                             <div className="w-full h-52 sm:h-72 overflow-hidden">
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className="w-full h-full object-cover hover:scale:none    
// "
//                                 />
//                             </div>

//                             {/* Text */}
//                             <div className="p-4  pb-17 text-center">
//                                 <h3 className="text-black text-xl font-medium ">
//                                     {item.title}
//                                 </h3>
//                                 <p className="text-gray-700 text-sm md:text-base leading-relaxed">
//                                     {item.desc}
//                                 </p>
//                             </div>

//                             {/* Button – card ke andar fix */}
//                             <button
//                                 className="absolute left-1/2 bottom-4 -translate-x-1/2   
//                        opacity-0 translate-y-4   
//                        group-hover:opacity-100 group-hover:translate-y-0  
//                        transition-all duration-300  
//                        bg-[#871B58] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full   
//                        flex items-center justify-center shadow-lg"
//                             >
//                                 <FaArrowRight />
//                             </button>
//                         </article>
//                     ))}

//                 </div>
//             </div>
//         </div>

//     );
// }
// import { FaArrowRight } from "react-icons/fa";

// export default function Finishes() {
//      const finishes = [
//         {
//             id: 1,
//             title: "Polish",
//             image:
//                 "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 2,
//             title: "Mirror Polished",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 3,
//             title: "Flamed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 4,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 5,
//             title: "Sandblasted",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 6,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//     ];

//   return (
//     <div className="font-poppins min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-6 py-14">
//         <div className="grid md:grid-cols-3 gap-y-4 gap-x-6">

//           {finishes.map((item) => (
//             // OUTER wrapper reserves the expanded height so grid doesn't change
//             <div
//               key={item.id}
//               className="relative h-[480px] sm:h-[485px]" // <-- Reserve space for expanded card
//             >
//               {/* INNER card: its height will change on hover, but wrapper space remains constant */}
//               <article
//                 tabIndex={0}
//                 className="group absolute inset-x-0 top-0 mx-auto w-full max-w-full rounded-xl overflow-visible"
//               >
//                 <div
//                   className="mx-0 h-[420px] sm:h-[440px] transition-all duration-300 ease-in-out
//                              group-hover:h-[480px] sm:group-hover:h-[485px]"
//                 >
//                   {/* Card container */}
//                   <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl h-full flex flex-col">
//                     {/* Image */}
//                     <div className="w-full h-52 sm:h-72 flex-shrink-0 overflow-hidden">
//                       <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                     </div>
//                     {/* Text area grows/shrinks as card height changes */}
//                     <div className="pt-4 pl-4 pr-4 pb-0  flex-1 text-center">
//                      <h3 className="text-black text-lg md:text-xl font-medium">{item.title}</h3>
//                                     <p className="text-gray-600 text-sm md:text-base ">
//                                         {item.desc}
//                                     </p>
//                     </div>
//                   </div>

//                   {/* Floating button */}
//                   <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-full flex justify-center pointer-events-none">
//                     <button
//                       className="pointer-events-auto opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-[#871B58] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg"
//                       aria-label={`Open ${item.title}`}
//                     >
//                       <FaArrowRight />
//                     </button>
//                   </div>
//                 </div>
//               </article>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }
// import { FaArrowRight } from "react-icons/fa";

// export default function Finishes() {
//     const finishes = [
//         {
//             id: 1,
//             title: "Polish",
//             image:
//                 "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 2,
//             title: "Mirror Polished",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 3,
//             title: "Flamed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 4,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 5,
//             title: "Sandblasted",
//             image:
//                 "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//         {
//             id: 6,
//             title: "Honed Finish",
//             image:
//                 "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//             desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
//         },
//     ];

//     return (
//         <div className="font-poppins min-h-screen bg-gray-50">
//             <div className="max-w-6xl mx-auto px-6 py-14">
//                 <div className="grid md:grid-cols-3 gap-y-4 gap-x-6">
//                     {finishes.map((item) => (
//                         // OUTER wrapper reserves the expanded height so grid doesn't change
//                         <div key={item.id} className=" relative h-[375px]sm:h-[590px] md:h-[485px]">
//                             {/* INNER card: focus-within for mobile; group-hover for desktop */}
//                             <article
//                                 tabIndex={0} // IMPORTANT: enables focus on tap (mobile)
//                                 className="group absolute inset-x-0 top-0 mx-auto w-full max-w-full rounded-xl overflow-visible"
//                             >
//                                 <div
//                                     /* card-inner: default height, grows on hover OR focus-within */
//                                     className="mx-0 h-[340px] sm:h-[560px]  md:h-[440px] transition-all duration-300 ease-in-out
//                              group-hover:h-[480px] group-focus-within:h-[380px] sm:group-hover:h-[485px] sm:group-focus-within:h-[485px]"
//                                 >
//                                     {/* Card container: same shadow change for hover + focus-within */}
//                                     <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl group-focus-within:shadow-xl h-full flex flex-col">
//                                         {/* Image */}
//                                         <div className="w-full h-52 sm:h-72 flex-shrink-0 overflow-hidden">
//                                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                                         </div>

//                                         {/* Text area grows/shrinks as card height changes */}
//                                         <div className="pt-4 pl-4 pr-4 pb-0 flex-1 text-center">
//                                             <h3 className="text-black text-lg md:text-xl font-medium">{item.title}</h3>
//                                             <p className="text-gray-600 text-sm md:text-base ">{item.desc}</p>
//                                         </div>
//                                     </div>

//                                     {/* Floating button wrapper keeps pointer-events-none, button overrides it */}
//                                     <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-full flex justify-center pointer-events-none">
//                                         <button
//                                             /* float-btn: hidden by default, shown on hover OR focus-within */
//                                             className="pointer-events-auto opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 bg-[#871B58] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg"
//                                             aria-label={`Open ${item.title}`}
//                                         >
//                                             <FaArrowRight />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </article>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import { FaArrowRight } from "react-icons/fa";

export default function Finishes() {
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
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
    },
    {
      id: 4,
      title: "Honed Finish",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
    },
    {
      id: 5,
      title: "Sandblasted",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
    },
    {
      id: 6,
      title: "Honed Finish",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
    },
  ];

  return (
    <div className="font-poppins min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
          {finishes.map((item) => (
            // OUTER wrapper reserves the expanded height so grid doesn't change
            <div key={item.id} className="relative h-[375px]  md:h-[485px] ">
              {/* INNER card: focus-within for mobile; group-hover for desktop */}
              <article
                tabIndex={0} // IMPORTANT: enables focus on tap (mobile)
                className="group absolute inset-x-0 top-0 mx-auto w-full max-w-full rounded-xl overflow-visible"
              >
                <div
                  /* card-inner: default height, grows on hover OR focus-within */
                  className="mx-0 h-[340px] sm:h-[440px] transition-all duration-300 ease-in-out
                             group-hover:h-[480px] group-focus-within:h-[380px] md:group-hover:h-[485px] sm:group-focus-within:h-[485px]"
                >
                  {/* Card container: same shadow change for hover + focus-within */}
                  <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl group-focus-within:shadow-xl h-full flex flex-col">
                    {/* Image */}
                    <div className="w-full h-52 sm:h-72 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Text area grows/shrinks as card height changes */}
                    <div className="pt-4 pl-4 pr-4 pb-0 flex-1 text-center">
                      <h3 className="text-black text-lg md:text-xl font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base ">{item.desc}</p>
                    </div>
                  </div>

                  {/* Floating button wrapper keeps pointer-events-none, button overrides it */}
                  <div className="absolute left-1/2 bottom-3 -translate-x-1/2 w-full flex justify-center pointer-events-none">
                    <button
                      /* float-btn: hidden by default, shown on hover OR focus-within */
                      className="pointer-events-auto opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 bg-[#871B58] text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg"
                      aria-label={`Open ${item.title}`}
                    >
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 