import {
  PersistedStateOptions,
  StorageLike,
} from "pinia-plugin-persistedstate";

export interface persistConfig {
  key: string;
  storageType?: StorageLike;
  paths?: string[];
}
/**
 * pinia持久化参数配置
 * 存储到持久化的 name
 * 存储的位置 storageType
 * 需要持久化的 state name
 *
 * */
const piniaPersistConfig = ({ key, storageType, paths }: persistConfig) => {
  const persist: PersistedStateOptions = {
    key,
    storage: storageType || localStorage, // 默认保存到localStorage中
    paths,
  };
  return persist;
};

export default piniaPersistConfig;
