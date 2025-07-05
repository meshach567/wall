import ProfileCard from "@/components/ProfileCard";
import WallInput from "@/components/WaLLInput";
import WallList from "@/components/WallList";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full flex justify-center md:justify-start">
          <ProfileCard />
        </div>
        {/* Wall */}
        <div className="md:w-3/4 w-full flex flex-col gap-4">
          <div className="bg-blue-600 text-white rounded-t-lg px-6 py-2 font-bold text-xl mb-0 shadow">wall</div>
          <div className="p-6 bg-gray-50 rounded-b-lg shadow flex flex-col gap-4">
            <WallInput />
            <WallList />
          </div>
        </div>
      </div>
    </main>
  );
}
