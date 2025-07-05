// src/components/ProfileCard.tsx
import { SvgAvatar } from "@/components/ui/SvgAvatar";

export default function ProfileCard() {
  return (
    <aside className="bg-gray rounded-lg shadow p-4 flex flex-col items-center w-full max-w-xs">
      <div className="w-54 h-40 mb-4">
        <SvgAvatar />
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