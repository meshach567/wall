// src/components/ProfileCard.tsx
import Image from "next/image";

export default function ProfileCard() {
  return (
    <aside className="bg-white rounded-lg shadow p-4 flex flex-col items-center w-full max-w-xs">
      <div className="w-24 h-24 mb-2 relative">
        <Image
          src="/images/meshach.jpg"
          alt="Greg Wientjes"
          className="rounded-full object-cover"
          fill
          priority
        />
      </div>
      <h2 className="font-bold text-lg mb-2">Greg Wientjes</h2>
      <div className="w-full text-sm">
        <div className="mb-2">
          <div className="font-semibold">Networks</div>
          <div>Stanford Alum</div>
        </div>
        <div>
          <div className="font-semibold">Current City</div>
          <div>Palo Alto, CA</div>
        </div>
      </div>
    </aside>
  );
}