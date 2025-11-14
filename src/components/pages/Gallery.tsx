"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Image from "next/image";

import { galleryImages } from "@/Data/Gallery_page_data/gallery-page-data";
import { GalleryImage } from "@/Types/Gallery_Page_types/gallery-page-types";

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".fade-in");
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;

        if (elementTop < window.innerHeight - elementHeight / 2) {
          element.classList.add("visible");
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredImages: GalleryImage[] =
    selectedCategory === "all"
      ? (galleryImages as GalleryImage[])
      : (galleryImages.filter((img) => img.category === selectedCategory) as GalleryImage[]);

  const openModal = (id: number) => {
    setActiveImage(id);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveImage(null);
    document.body.style.overflow = "auto";
  };

  const navigateModal = (direction: "next" | "prev") => {
    if (activeImage === null) return;

    const currentIndex = filteredImages.findIndex((img) => img.id === activeImage);

    // If the currently active image no longer exists in filteredImages, close modal
    if (currentIndex === -1) {
      closeModal();
      return;
    }

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }

    setActiveImage(filteredImages[newIndex].id);
  };

  // helper to return width & height classes for preview cards (when centering 1-2 images)
  const previewSizeClasses = (size: GalleryImage["size"]) => {
    switch (size) {
      case "large":
        return "w-96 h-96";
      case "medium":
        return "w-80 h-80";
      default:
        return "w-72 h-72";
    }
  };

  // helper to return height classes for masonry cards
  const masonryHeightClass = (size: GalleryImage["size"]) => {
    switch (size) {
      case "large":
        return "h-96";
      case "medium":
        return "h-80";
      default:
        return "h-64";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 fade-in">Our Work Gallery</h1>
            <p className="text-gray-600 max-w-3xl mx-auto fade-in">
              Browse through our gallery to see examples of our detailing transformations.
              From interior deep cleans to exterior shine and ceramic coating, we take pride in our work.
            </p>
          </div>

          {/* Category Buttons */}
          <div className="flex justify-center mb-8 overflow-x-auto fade-in">
            <div className="flex space-x-2 p-1">
              {[
                { key: "all", label: "All" },
                { key: "exterior", label: "Exterior Detailing" },
                { key: "interior", label: "Interior Detailing" },
                { key: "ceramic", label: "Ceramic Coating" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-full text-sm ${selectedCategory === cat.key ? "theme-button-accent text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* CASE: 0 images */}
            {filteredImages.length === 0 && (
              <div className="col-span-3 flex items-center justify-center p-12 text-gray-500">
                No images found for this category.
              </div>
            )}

            {/* CASE: 1 or 2 images -> center aligned */}
            {filteredImages.length > 0 && filteredImages.length <= 2 && (
              <div className="col-span-3 flex justify-center flex-wrap gap-6">
                {filteredImages.map((image, idx) => (
                  <div
                    key={image.id}
                    onClick={() => openModal(image.id)}
                    className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer group fade-in ${previewSizeClasses(image.size)}`}
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    {/* parent must be relative with explicit width/height for next/image fill */}
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-darkblack bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50">
                      <div className="opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center">
                        <span className="text-white font-medium px-4 py-2 rounded-full border border-white">View Image</span>
                        <h3 className="text-white font-medium mt-2">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CASE: 3 or more images -> masonry 3-col layout */}
            {filteredImages.length >= 3 &&
              [0, 1, 2].map((colIndex) => (
                <div key={colIndex} className="space-y-6">
                  {filteredImages
                    .filter((_, index) => index % 3 === colIndex)
                    .map((image, index) => (
                      <div
                        key={image.id}
                        className={`relative overflow-hidden rounded-xl shadow-md cursor-pointer group fade-in ${masonryHeightClass(image.size)}`}
                        style={{ animationDelay: `${index * 0.08}s` }}
                        onClick={() => openModal(image.id)}
                      >
                        <Image
                          src={image.src}
                          alt={image.title}
                          fill
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-darkblack bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-50">
                          <div className="opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-center">
                            <span className="text-white font-medium px-4 py-2 rounded-full border border-white">View Image</span>
                            <h3 className="text-white font-medium mt-2">{image.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {/* {activeImage !== null && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-skyblue"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="relative">
              {filteredImages.map(
                (image) =>
                  image.id === activeImage && (
                    <div key={image.id} className="relative">
                      <Image
                        src={image.src}
                        alt={image.title}
                        width={1200}
                        height={800}
                        className="w-full object-contain max-h-[80vh]"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-darkblack bg-opacity-70 p-4">
                        <h3 className="text-white font-medium text-lg">{image.title}</h3>
                      </div>
                    </div>
                  )
              )}
            </div>

            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12">
              <button onClick={() => navigateModal("prev")} className="text-white hover:text-skyblue p-2" aria-label="Previous">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12">
              <button onClick={() => navigateModal("next")} className="text-white hover:text-skyblue p-2" aria-label="Next">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )} */}

      {activeImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <div className="relative w-full max-w-6xl flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Active Image */}
            {filteredImages.map(
              (image) =>
                image.id === activeImage && (
                  <div
                    key={image.id}
                    className="relative flex flex-col items-center animate-zoomIn"
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      width={1400}
                      height={900}
                      className="max-h-[80vh] w-auto rounded-lg shadow-2xl object-contain"
                    />
                    {/* Caption */}
                    <div className="w-full text-center mt-4 bg-gradient-to-t from-black/70 to-transparent py-3 px-6 rounded-b-lg">
                      <h3 className="text-white font-medium text-lg">{image.title}</h3>
                    </div>
                  </div>
                )
            )}

            {/* Prev Button */}
            <button
              onClick={() => navigateModal("prev")}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-2 md:p-3 rounded-full text-white transition"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={() => navigateModal("next")}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 p-2 md:p-3 rounded-full text-white transition"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}


      <Footer />
    </div>
  );
};

export default Gallery;
