import { BaseEntity } from 'src/infra/db/_base.entity';

export function useBaseEntityFactory(
  data: Partial<BaseEntity>,
): Partial<BaseEntity> {
  return {
    createdAt: new Date(),
    updatedAt: new Date(),
    ...data,
  };
}
