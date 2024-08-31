import Weather from "./components/home/Weather";

export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-700 via-indigo-900 to-gray-600">
    <div className=" mx-auto p-1 sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3">
      <h1 className="text-center text-xl md:text-2xl text-white mb-2 ml-1 ">Welcome, Salman!</h1>
      <Weather />
    </div>
    </div>
  );
}
