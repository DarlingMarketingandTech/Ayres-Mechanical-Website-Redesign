import { cn } from "@/lib/utils";
import { CommercialIcon } from "./CommercialIcon";
import { CoolingIcon } from "./CoolingIcon";
import { DuctworkIcon } from "./DuctworkIcon";
import { EmergencyIcon } from "./EmergencyIcon";
import { HeatingIcon } from "./HeatingIcon";
import { IndustrialIcon } from "./IndustrialIcon";
import { MaintenanceIcon } from "./MaintenanceIcon";

const icons = {
  heating: HeatingIcon,
  cooling: CoolingIcon,
  maintenance: MaintenanceIcon,
  ductwork: DuctworkIcon,
  commercial: CommercialIcon,
  industrial: IndustrialIcon,
  emergency: EmergencyIcon,
};

export function ServiceIcon({ icon, className }: { icon: keyof typeof icons; className?: string }) {
  const Icon = icons[icon];
  return (
    <span className={cn("inline-flex size-12 items-center justify-center rounded-xl bg-secondary text-primary", className)}>
      <Icon className="size-6" aria-hidden="true" />
    </span>
  );
}
