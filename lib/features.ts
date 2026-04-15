/**
 * Feature flag management
 */

export function isShopEnabled(): boolean {
  const enabled = process.env.SHOP_ENABLED?.toUpperCase();
  return enabled === "ENABLE";
}

export const features = {
  shop: isShopEnabled(),
};
