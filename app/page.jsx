import Weather from "./components/home/Weather";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
    <div className=" w-full max-w-3xl p-6 pt-4  md:w-[500px] mb-40">
      <h1 className="text-center font-semibold text-lg md:text-xl text-white mb-5">Welcome, Salman!</h1>
      <Weather />
    </div>
    </div>
  );
}
