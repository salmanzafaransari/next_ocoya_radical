"use client";
import { useState } from "react";
import { API_KEYS, API_ENDPOINTS } from "@/config/apiConfig";

export default function StockImage() {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState("unsplash");
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(16);

  const fetchImages = async () => {
  setLoading(true);

  try {
    const url = API_ENDPOINTS[provider as keyof typeof API_ENDPOINTS](query, perPage);

    const headers =
      provider === "pexels" ? { Authorization: API_KEYS.pexels } : {};

    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // Map provider-specific results into a normalized format
    const resultsMap: Record<string, any[]> = {
      unsplash: data?.results ?? [],
      pexels: data?.photos ?? [],
      pixabay: data?.hits ?? [],
    };

    const results = resultsMap[provider] || [];

    setImages(results);
  } catch (err) {
    console.error("Error fetching images:", err);
    setImages([]); // fallback to empty
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-white rounded-md shadow-sm p-6 flex items-center justify-between">
      <div className="w-full max-w-6xl mx-auto p-2">
        {/* Search Controls */}
        <div className="flex w-full gap-4 mb-6">
          <input
            type="text"
            placeholder="Search for an image"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2"
          />

          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="border rounded-md px-4 py-2"
          >
            <option value="unsplash">Unsplash.com</option>
            <option value="pexels">Pexels.com</option>
            <option value="pixabay">Pixabay.com</option>
          </select>

          <button
            onClick={fetchImages}
            className="bg-success text-white px-6 py-2 rounded-sm hover:cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Gallery */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, idx) => {
              let src = "";
              let photographer = "";

              if (provider === "unsplash" && img.urls) {
                src = img.urls.small;
                photographer = img.user?.name || "Unknown";
              } else if (provider === "pexels" && img.src) {
                src = img.src.medium;
                photographer = img.photographer || "Unknown";
              } else if (provider === "pixabay") {
                src = img.webformatURL;
                photographer = img.user || "Unknown";
              }

              // skip if src is empty
              if (!src) return null;

              return (
                <div
                  key={idx}
                  className="relative group overflow-hidden rounded-sm"
                >
                  <img
                    src={src}
                    alt={query}
                    className="w-full h-54 object-cover rounded-sm"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition">
                    <button className="bg-success hover:cursor-pointer text-white px-4 py-2 rounded-md mb-2">
                      Create a post
                    </button>
                    <p className="text-white text-xs">Credits: {photographer}</p>
                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}
