import Image from "next/image";

export function SvgAvatar() {
  return (
    <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-gray-200 flex items-center justify-center bg-gray-100">
      <Image
        src="/images/meshachsvg.svg"
        alt="Profile"
        width={128}
        height={128}
        className="w-full h-full"
      />
    </div>
  );
}