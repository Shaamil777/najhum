import CropifaiHero from "@/components/sections/cropifai/CropifaiHero";
import CropifaiAbout from "@/components/sections/cropifai/CropifaiAbout";
import CropifaiArchitecture from "@/components/sections/cropifai/CropifaiArchitecture";
import CropifaiInterface from "@/components/sections/cropifai/CropifaiInterface";
import CropifaiWorkflow from "@/components/sections/cropifai/CropifaiWorkflow";
import CropifaiHardware from "@/components/sections/cropifai/CropifaiHardware";
import CropifaiSolutions from "@/components/sections/cropifai/CropifaiSolutions";
import CropifaiWhyChoose from "@/components/sections/cropifai/CropifaiWhyChoose";
import CropifaiCta from "@/components/sections/cropifai/CropifaiCta";
import CropifaiEcosystem from "@/components/sections/cropifai/CropifaiEcosystem";

export default function CropifaiPage() {
  return (
    <div className="flex flex-col w-full">
      <CropifaiHero />
      <CropifaiAbout />
      <CropifaiArchitecture />
      <CropifaiSolutions />
      <CropifaiInterface />
      <CropifaiWorkflow />
      <CropifaiHardware />
      <CropifaiWhyChoose />
      <CropifaiCta />
      <CropifaiEcosystem />
    </div>
  );
}
