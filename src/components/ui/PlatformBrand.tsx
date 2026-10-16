import Image from "next/image";

/** Original marks retain their aspect ratios and a contrasting backdrop. */
export default function PlatformBrand({ platform, priority = false }: { platform: "iotrics" | "evoltics"; priority?: boolean }) {
  return platform === "iotrics" ? (
    <span className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-4 py-2 shadow-sm border border-slate-200/70">
      <Image src="/logo/iotrics-logo.png" alt="IoTRICs — Experience your data" width={1600} height={568} priority={priority} className="w-[170px] sm:w-[195px] h-auto" />
    </span>
  ) : (
    <span className="inline-flex w-fit items-center justify-center rounded-2xl bg-[#0b1b33] p-2 border border-white/15">
      <Image src="/logo/evoltics-logo.png" alt="EVOLTICS — Powering sustainable mobility" width={622} height={600} priority={priority} className="w-[78px] sm:w-[90px] h-auto" />
    </span>
  );
}
