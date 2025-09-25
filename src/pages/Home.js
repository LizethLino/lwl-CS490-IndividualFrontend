import film_image from "./film_png.png"

export default function Home() {
    //return <h1>Home</h1>
    return (
        <div className="w-3/4 m-auto">
            <div className="mt-20">
                {data.map((d) => (
                    <div className="bg-white h-[450px] text-black rounded-xl">
                        <div className="h-56 rounded-t-xl bg-indigo-500 flex justify-center items-center">
                            <img src={film_image} alt="" className="h-44 w-44 rounded-full"/>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-4 p-4">
                            <p className="text-xl font-semibold">{d.name}</p>
                            <p>{d.review}</p>
                            <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const data = [
    {
        name: 'Movie1',
        review: 'temp text'
    },
    {
        name: 'Movie2',
        review: 'temp text'
    },
    {
        name: 'Movie3',
        review: 'temp text'
    },
    {
        name: 'Movie4',
        review: 'temp text'
    },
    {
        name: 'Movie5',
        review: 'temp text'
    }
]