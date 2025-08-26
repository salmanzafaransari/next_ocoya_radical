export default function LeftCalender (){
return(
 <div className="lg:col-span-2">
   <div className="bg-white rounded-md shadow-sm p-6 flex items-center justify-between">
     <h2 className="text-lg font-medium">My Calendar</h2>
     <button className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-1">
       Schedule <span className="text-xl leading-none">＋</span>
     </button>
   </div>
 </div>
 );
}