import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();
  return (
    <div className="font-poppins min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
          {finishes.map((item) => (
            <div key={item.id} className=" relative h-[350px] sm:h-[420px] md:h-[400px] lg:h-[370px] xl:h-[485px]  ">
              <article
                tabIndex={0}
                onClick={() => navigate(`/finishes/${item.id}`)}
                className="group absolute inset-x-0 top-0 mx-auto w-full max-w-full rounded-xl overflow-visible"
              >
                <div
                  className="mx-0 h-[340px] sm:h-[380px] md:h-[380px] lg:h-[330px] xl:h-[430px] transition-all duration-300 ease-in-out
                   md:group-hover:h-[400px]  lg:group-hover:h-[370px] xl:group-hover:h-[480px]"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl  h-full flex flex-col">
                    <div className="w-full h-[200px]  md:h-[220px] lg:h-[180px] xl:h-[280px] overflow-hidden">

                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="pt-4 pl-4 pr-4 pb-0 flex-1 ">
                      <h3 className="text-black text-lg md:text-xl font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base ">{item.desc}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 bottom-4 -translate-x-1/2 w-full flex justify-center ">
                    <button


                      className="cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#871B58] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"

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
