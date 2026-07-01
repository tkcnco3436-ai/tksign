import {
  IconArrowUp,
  IconBrandInstagram,
  IconBuildingSkyscraper,
  IconBuildingStore,
  IconCards,
  IconChevronRight,
  IconFlask,
  IconHandFinger,
  IconHistory,
  IconMail,
  IconPhone,
  IconRosetteDiscountCheckFilled,
  IconShoppingBag,
  IconX,
  IconZoomIn,
} from "@tabler/icons-react";

const MAP = {
  "ti-arrow-up": IconArrowUp,
  "ti-brand-instagram": IconBrandInstagram,
  "ti-building-skyscraper": IconBuildingSkyscraper,
  "ti-building-store": IconBuildingStore,
  "ti-cards": IconCards,
  "ti-chevron-right": IconChevronRight,
  "ti-flask": IconFlask,
  "ti-hand-finger": IconHandFinger,
  "ti-history": IconHistory,
  "ti-mail": IconMail,
  "ti-phone": IconPhone,
  "ti-rosette-discount-check-filled": IconRosetteDiscountCheckFilled,
  "ti-shopping-bag": IconShoppingBag,
  "ti-x": IconX,
  "ti-zoom-in": IconZoomIn,
};

/* Thin SVG icons. Sizes to current font-size (1em), inherits color via currentColor. */
export default function Icon({ name, className, stroke = 1.5, style }) {
  const C = MAP[name];
  if (!C) return null;
  return (
    <C className={`tic${className ? ` ${className}` : ""}`} stroke={stroke} style={style} />
  );
}
