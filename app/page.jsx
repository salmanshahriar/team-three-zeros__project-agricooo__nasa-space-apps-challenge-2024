import Weather from "./components/home/Weather";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col items-center h-screen overflow-y-scroll">
    <div className=" w-full max-w-3xl p-6 pt-3">
      <h1 className="text-center text-md md:text-2xl text-white mb-6">Welcome, Salman!</h1>
      <Weather />
    </div>
    </div>
  );
}
