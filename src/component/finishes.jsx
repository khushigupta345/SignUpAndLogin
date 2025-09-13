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
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
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
            desc: "Matte finish without shine, perfect for subtle and elegant spaces.", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates asperiores natus repellendus enim ipsam dolores.",
        },
    ];

    return (

        <div className="font-poppins min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-14">

                <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-y-9 gap-x-6 items-start">
                    {finishes.map((item) => (
                        <article
                            key={item.id}
                            tabIndex={0}

                            className="group relative bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl origin-top self-start"
                        >
                            <div className="pb-8 text-center transition-all duration-300 group-focus:pb-17  group-active:pb-17 group-hover:pb-18  sm:focus:pb-20 sm:active:pb-20">

                                <div className="w-full h-71   overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="pt-4 pl-4 pr-4 text-center ">
                                    <h3 className="text-gray-900 text-lg md:text-xl font-medium">{item.title}</h3>
                                    <p className="text-gray-600 text-sm md:text-base ">
                                        {item.desc}
                                    </p>
                                </div>
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