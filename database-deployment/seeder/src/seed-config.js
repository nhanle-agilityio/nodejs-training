/**
 * Single large-dataset profile for performance-oriented seeding.
 * Catalog (categories, ingredients, base dish names) stays small; extra dishes
 * and all transactional tables (users, orders, engagement) are sized for load testing.
 */
export const SEED_CONFIG = Object.freeze({
  userCount: 12_000,
  extraDishes: 50,
  ordersPerUserMin: 0,
  ordersPerUserMax: 28,
  powerUserRatio: 0.25,
  powerUserOrdersMaxMultiplier: 3,
  addressesPerUserMin: 1,
  addressesPerUserMax: 4,
  socialLinkProbability: 0.38,
  cartItemsMax: 8,
  reviewsPerUserMax: 20,
  wishlistMax: 18,
  likesMax: 22,
  extraRandomVouchers: 40,
  userBatchSize: 400,
  orderBatchSize: 250,
  addressBatchSize: 600,
  engagementLogEvery: 8000,
});
