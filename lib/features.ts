/**
 * Feature flag management
 */

export function isShopEnabled(): boolean {
  const enabled = process.env.SHOP_ENABLED?.toLowerCase();
  return enabled === "true";
}

export const features = {
  shop: isShopEnabled(),
};
