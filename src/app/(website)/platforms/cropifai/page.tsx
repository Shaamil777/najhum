import CropifaiHero from "@/components/cropifai/CropifaiHero";
import CropifaiPerformance from "@/components/cropifai/CropifaiPerformance";
import CropifaiArchitecture from "@/components/cropifai/CropifaiArchitecture";
import CropifaiInterface from "@/components/cropifai/CropifaiInterface";
import CropifaiWorkflow from "@/components/cropifai/CropifaiWorkflow";
import CropifaiMethodology from "@/components/cropifai/CropifaiMethodology";
import CropifaiHardware from "@/components/cropifai/CropifaiHardware";
import CropifaiSolutions from "@/components/cropifai/CropifaiSolutions";
import CropifaiWhyChoose from "@/components/cropifai/CropifaiWhyChoose";
import CropifaiCta from "@/components/cropifai/CropifaiCta";
import CropifaiEcosystem from "@/components/cropifai/CropifaiEcosystem";

export default function CropifaiPage() {
  return (
    <div className="flex flex-col w-full">
      <CropifaiHero />
      <CropifaiPerformance />
      <CropifaiArchitecture />
      <CropifaiInterface />
      <CropifaiWorkflow />
      <CropifaiMethodology />
      <CropifaiHardware />
      <CropifaiSolutions />
      <CropifaiWhyChoose />
      <CropifaiCta />
      <CropifaiEcosystem />
    </div>
  );
}
