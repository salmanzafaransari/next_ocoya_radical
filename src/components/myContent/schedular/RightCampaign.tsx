export default function RighCampaign(){
 return(
<div className="space-y-4">
 {/* Launch Campaign */}
  <div className="bg-white rounded-md shadow-sm p-4">
    <h3 className="font-medium text-gray-800">Launch a Campaign</h3>
    <p className="text-sm text-gray-600 mt-1">
      Create a new campaign and schedule it
    </p>
    <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
      Launch →
    </button>
  </div>

  {/* Did you know */}
  <div className="bg-[#e6faf7] rounded-md shadow-sm p-4">
    <h3 className="font-medium text-gray-800">Did you know?</h3>
    <p className="text-sm text-gray-600 mt-2">
      Profiles that post at least 3 times per week, increase their sales
      by <span className="font-semibold">15%</span>
    </p>
    <div className="mt-4 flex justify-end">
      <div className="w-12 h-12 bg-gradient-to-t from-blue-400 to-blue-200 rounded-full flex items-center justify-center">
        ✋
      </div>
    </div>
  </div>
</div>

 );
}