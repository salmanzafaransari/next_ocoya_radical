"use client";
export default function Content() {
  return (
    <>
      {/* Heading */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          👋 Hey, let's create content!
        </h1>
        <p className="text-gray-600 mt-2">
          Here you can create & publish content quickly.
          <br />
          Get started by opening up our content editor with{" "}
          <span className="font-semibold">10,000+ templates.</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 max-w-5xl mx-auto">
        <div className="border-2 border-dashed border-indigo-400 h-[250px] rounded-sm flex flex-col justify-center items-center bg-white w-full">
          <button className="mb-4 px-6 py-2 border rounded-md hover:bg-gray-100 hover:cursor-pointer">
            Create content
          </button>
          <button className="px-6 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:cursor-pointer">
            Create on Canva
          </button>
        </div>
        <div className="relative bg-white shadow-md rounded-sm overflow-hidden w-full">
          <div className="relative">
            <img src="/dashboard/icon2.svg" alt="Preview" className="w-full h-60" />
            <div className="absolute inset-0 flex flex-col justify-end pb-5 items-center gap-2 bg-black/30 opacity-0 hover:opacity-100 transition">
              <button className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-full hover:cursor-pointer">
                ✕
              </button>
              <button className="bg-success text-white px-4 py-2 rounded-md hover:cursor-pointer">
                Publish
              </button>
              <button className="bg-white text-gray-500 px-4 py-2 rounded-md hover:cursor-pointer">
                Edit caption
              </button>
              <button className="bg-white px-4 py-2 rounded-md hover:cursor-pointer"><b>Download</b></button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-600">
              Want to make more money with your business? Get the best software
              on sale now. Discounts for all software. Click the button to
              explore.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
