import { faker } from '@faker-js/faker';

export const seedUsers = async (client, count = 20) => {
  console.log(`  Seeding ${count} users...`);

  const userIds = [];

  for (let i = 0; i < count; i++) {
    const hasPassword = faker.datatype.boolean(0.7);
    const res = await client.query(
      `INSERT INTO users (name, email, password, phone, date_of_birth)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        faker.person.fullName(),
        faker.internet.email().toLowerCase(),
        hasPassword ? '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Pzo4/VXvG7yW1kJNQi1Ge' : null,
        faker.phone.number({ style: 'national' }),
        faker.date.birthdate({ min: 18, max: 55, mode: 'age' }),
      ]
    );
    userIds.push(res.rows[0].id);
  }

  console.log(`    ✓ ${userIds.length} users created`);
  return userIds;
};

export const seedSocialAccounts = async (client, userIds) => {
  const providers = ['google', 'facebook'];
  let count = 0;

  for (const userId of userIds) {
    if (!faker.datatype.boolean(0.4)) continue;

    const provider = faker.helpers.arrayElement(providers);
    await client.query(
      `INSERT INTO social_accounts (user_id, provider, client_id, client_secret, access_token, refresh_token, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_id, provider) DO NOTHING`,
      [
        userId,
        provider,
        `${provider}-client-id-${faker.string.alphanumeric(8)}`,
        `${provider}-client-secret-${faker.string.alphanumeric(12)}`,
        `access-token-${faker.string.alphanumeric(20)}`,
        `refresh-token-${faker.string.alphanumeric(16)}`,
        faker.date.future({ years: 1 }),
      ]
    );
    count++;
  }

  console.log(`    ✓ ${count} social accounts created`);
};

export const seedAddresses = async (client, userIds) => {
  const addressIds = [];
  const userAddressMap = {};

  for (const userId of userIds) {
    const numAddresses = faker.number.int({ min: 1, max: 3 });

    for (let i = 0; i < numAddresses; i++) {
      const res = await client.query(
        `INSERT INTO addresses (user_id, house_no, street, city, phone, special_note, is_default)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [
          userId,
          faker.location.buildingNumber(),
          faker.location.street(),
          faker.location.city(),
          faker.phone.number({ style: 'national' }),
          faker.datatype.boolean(0.3) ? faker.lorem.sentence() : null,
          i === 0,
        ]
      );
      addressIds.push(res.rows[0].id);
      if (!userAddressMap[userId]) userAddressMap[userId] = [];
      userAddressMap[userId].push(res.rows[0].id);
    }
  }

  console.log(`    ✓ ${addressIds.length} addresses created`);
  return { addressIds, userAddressMap };
};
