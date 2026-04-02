import { faker } from '@faker-js/faker';

const buildUserRow = (uniqueIndex) => {
  const hasPassword = faker.datatype.boolean(0.7);
  return {
    name: faker.person.fullName(),
    email: `user.${uniqueIndex}.${faker.string.alphanumeric({ length: 8, casing: 'lower' })}@seed.warachow.test`,
    password: hasPassword ? '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Pzo4/VXvG7yW1kJNQi1Ge' : null,
    phone: faker.phone.number({ style: 'national' }),
    date_of_birth: faker.date.birthdate({ min: 18, max: 55, mode: 'age' }),
  };
};

export const seedUsers = async (client, count, batchSize = 200) => {
  console.log(`  Seeding ${count} users (batch ${batchSize})...`);

  const userIds = [];

  for (let offset = 0; offset < count; offset += batchSize) {
    const n = Math.min(batchSize, count - offset);
    const rows = Array.from({ length: n }, (_, j) => buildUserRow(offset + j));
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of rows) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(r.name, r.email, r.password, r.phone, r.date_of_birth);
    }
    const res = await client.query(
      `INSERT INTO users (name, email, password, phone, date_of_birth)
       VALUES ${parts.join(', ')}
       RETURNING id`,
      params
    );
    for (const row of res.rows) userIds.push(row.id);
  }

  console.log(`    ✓ ${userIds.length} users created`);
  return userIds;
};

export const seedSocialAccounts = async (client, userIds, linkProbability) => {
  const providers = ['google', 'facebook'];
  const rows = [];

  for (const userId of userIds) {
    if (!faker.datatype.boolean(linkProbability)) continue;
    const provider = faker.helpers.arrayElement(providers);
    rows.push({
      user_id: userId,
      provider,
      client_id: `${provider}-client-id-${faker.string.alphanumeric(8)}`,
      client_secret: `${provider}-client-secret-${faker.string.alphanumeric(12)}`,
      access_token: `access-token-${faker.string.alphanumeric(20)}`,
      refresh_token: `refresh-token-${faker.string.alphanumeric(16)}`,
      expires_at: faker.date.future({ years: 1 }),
    });
  }

  const batchSize = 400;
  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(
        r.user_id,
        r.provider,
        r.client_id,
        r.client_secret,
        r.access_token,
        r.refresh_token,
        r.expires_at
      );
    }
    await client.query(
      `INSERT INTO social_accounts (user_id, provider, client_id, client_secret, access_token, refresh_token, expires_at)
       VALUES ${parts.join(', ')}
       ON CONFLICT (user_id, provider) DO NOTHING`,
      params
    );
  }

  console.log(`    ✓ ${rows.length} social accounts created`);
};

export const seedAddresses = async (client, userIds, cfg) => {
  const minA = cfg.addressesPerUserMin;
  const maxA = cfg.addressesPerUserMax;
  const batchSize = cfg.addressBatchSize;

  const pending = [];

  for (const userId of userIds) {
    const numAddresses = faker.number.int({ min: minA, max: maxA });
    for (let i = 0; i < numAddresses; i++) {
      pending.push({
        user_id: userId,
        house_no: faker.location.buildingNumber(),
        street: faker.location.street(),
        city: faker.location.city(),
        phone: faker.phone.number({ style: 'national' }),
        special_note: faker.datatype.boolean(0.3) ? faker.lorem.sentence() : null,
        is_default: i === 0,
      });
    }
  }

  const userAddressMap = {};

  for (let i = 0; i < pending.length; i += batchSize) {
    const chunk = pending.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(
        r.user_id,
        r.house_no,
        r.street,
        r.city,
        r.phone,
        r.special_note,
        r.is_default
      );
    }
    const res = await client.query(
      `INSERT INTO addresses (user_id, house_no, street, city, phone, special_note, is_default)
       VALUES ${parts.join(', ')}
       RETURNING id, user_id`,
      params
    );
    for (const row of res.rows) {
      const uid = row.user_id;
      if (!userAddressMap[uid]) userAddressMap[uid] = [];
      userAddressMap[uid].push(row.id);
    }
  }

  console.log(`    ✓ ${pending.length} addresses created`);
  return { addressIds: [], userAddressMap };
};
