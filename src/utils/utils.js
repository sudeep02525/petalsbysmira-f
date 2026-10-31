import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const cdnImg = (url, w = 800) => {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("/upload/f_auto")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`);
};
