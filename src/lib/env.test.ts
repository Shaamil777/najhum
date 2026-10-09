import { beforeEach, afterEach, expect, it, vi } from 'vitest';
beforeEach(() => {
 vi.resetModules();
 for (const key of ['R2_ACCOUNT_ID','R2_ACCESS_KEY_ID','R2_SECRET_ACCESS_KEY','R2_BUCKET_NAME','R2_PUBLIC_URL','AWS_ACCESS_KEY_ID','AWS_SECRET_ACCESS_KEY','AWS_REGION','AWS_S3_BUCKET']) vi.stubEnv(key, undefined);
 vi.stubEnv('DATABASE_URL','postgresql://test:test@localhost/test');
 vi.stubEnv('ADMIN_USERNAME','test-admin'); vi.stubEnv('ADMIN_PASSWORD','test-password');
 vi.stubEnv('JWT_SECRET','test-secret'.repeat(4)); vi.stubEnv('NEXT_PUBLIC_APP_URL','http://localhost:3000');
 vi.stubEnv('STORAGE_PROVIDER','vercel-blob'); vi.stubEnv('BLOB_READ_WRITE_TOKEN','test-token');
 vi.spyOn(console,'error').mockImplementation(() => {}); vi.spyOn(console,'warn').mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });
it('validates configuration and selects its storage provider', async () => {
 const {env,getStorageProvider}=await import('./env');
 expect(env.ADMIN_USERNAME).toBe('test-admin'); expect(getStorageProvider()).toBe('vercel-blob');
});
it.each(['DATABASE_URL','ADMIN_USERNAME','ADMIN_PASSWORD','NEXT_PUBLIC_APP_URL'])('rejects missing %s',async key => {
 vi.stubEnv(key,undefined); await expect(import('./env')).rejects.toThrow('Environment validation failed');
});
it('rejects weak JWT secrets',async () => {vi.stubEnv('JWT_SECRET','short'); await expect(import('./env')).rejects.toThrow('JWT_SECRET');});
it('requires image storage',async () => {vi.stubEnv('BLOB_READ_WRITE_TOKEN',undefined); await expect(import('./env')).rejects.toThrow('image storage provider');});
it('warns about partial storage configuration',async () => {vi.stubEnv('AWS_ACCESS_KEY_ID','partial'); await import('./env'); expect(console.warn).toHaveBeenCalled();});
