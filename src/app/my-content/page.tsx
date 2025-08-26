"use client";
import Content from "@/components/myContent/content/content";
import LeftCalender from "@/components/myContent/schedular/LeftCalender";
import RighCampaign from "@/components/myContent/schedular/RightCampaign";
import StockImage from "@/components/stockImage/StockImages";
import { useState } from "react";

export default function MyContentPage() {
  const [activeTab, setActiveTab] = useState("My Content");

  const tabs = [
    "My Content",
    "Scheduler",
    "Stock Images",
    "GIFs",
    "My Uploads",
    "My Campaigns",
  ];

  return (
    <div className="p-6 min-h-screen">
      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 transition ${
              activeTab === tab
                ? "text-success font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "My Content" && (
        <Content />
      )}

      {activeTab === "Scheduler" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <LeftCalender />

          {/* Right Section */}
          <RighCampaign />
        </div>
        
      )}

      {activeTab === "Stock Images" && (
        // <div className="bg-white rounded-md shadow-sm p-6">
        //   <h2 className="text-lg font-medium">🖼️ Stock Images</h2>
        //   <p className="text-gray-600 mt-2">Browse stock image library here.</p>
        // </div>
        <>
          <StockImage/>
        </>
      )}

      {activeTab === "GIFs" && (
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-medium">🎞️ GIFs</h2>
          <p className="text-gray-600 mt-2">Explore trending GIFs here.</p>
        </div>
      )}

      {activeTab === "My Uploads" && (
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-medium">📤 My Uploads</h2>
          <p className="text-gray-600 mt-2">Manage your uploaded files here.</p>
        </div>
      )}

      {activeTab === "My Campaigns" && (
        <div className="bg-white rounded-md shadow-sm p-6">
          <h2 className="text-lg font-medium">📢 My Campaigns</h2>
          <p className="text-gray-600 mt-2">Your campaign history & analytics.</p>
        </div>
      )}
    </div>
  );
}
