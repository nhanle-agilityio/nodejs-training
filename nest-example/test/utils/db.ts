import { DataSource, EntityTarget, ObjectLiteral } from 'typeorm';

export const resetSchema = async (dataSource: DataSource) => {
  await dataSource.synchronize(true);
};

export const clearTables = async (
  dataSource: DataSource,
  entities: EntityTarget<ObjectLiteral>[],
) => {
  for (const entity of entities) {
    await dataSource.getRepository(entity).clear();
  }
};
