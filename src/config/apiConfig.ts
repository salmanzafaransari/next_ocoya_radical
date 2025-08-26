export const API_KEYS = {
  unsplash: process.env.NEXT_PUBLIC_UNSPLASH_KEY || "YOUR_UNSPLASH_API_KEY",
  pexels: process.env.NEXT_PUBLIC_PEXELS_KEY || "YOUR_PEXELS_API_KEY",
  pixabay: process.env.NEXT_PUBLIC_PIXABAY_KEY || "YOUR_PIXABAY_API_KEY",
};

export const API_ENDPOINTS = {
  unsplash: (query: string, perPage: number = 16) =>
    `https://api.unsplash.com/search/photos?query=${query}&per_page=${perPage}&client_id=${API_KEYS.unsplash}`,

  pexels: (query: string, perPage: number = 16) =>
    `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}`,

  pixabay: (query: string, perPage: number = 16) =>
    `https://pixabay.com/api/?key=${API_KEYS.pixabay}&q=${query}&per_page=${perPage}`,
};
