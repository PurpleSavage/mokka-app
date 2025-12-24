export interface StorageStrategyPort {
  get<T>(key: string): T | null;
  set(key: string, value: unknown): boolean;
  remove(key: string): void;
  clear(): void;
}