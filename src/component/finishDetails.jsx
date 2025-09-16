import { useParams } from "react-router-dom";
import { finish } from "./Data";


export default function FinishDetails() {
    const { id } = useParams();
    const i = finish.find((f) => f.id === Number(id));

    if (!i) {
        return <p className="p-6">Not Found</p>;
    }

    return (
        <div className="p-6 text-center">

            <h1 className="text-2xl font-bold mt-4">{i.title}</h1>
            <p className="text-xl  mt-4">{i.desc}</p>
        </div>
    );
}
