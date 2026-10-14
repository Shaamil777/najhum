import { afterEach, beforeEach, expect, it, vi } from 'vitest';

const storage = vi.hoisted(() => ({ put: vi.fn(), del: vi.fn(), uploadToR2: vi.fn(), deleteFromR2: vi.fn() }));
vi.mock('@vercel/blob', () => ({ put: storage.put, del: storage.del }));
vi.mock('./r2', () => ({ uploadToR2: storage.uploadToR2, deleteFromR2: storage.deleteFromR2 }));
import { uploadImage, deleteImage } from './image-service';
const image = () => new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])], 'hero.png', { type: 'image/png' });

beforeEach(() => { vi.resetAllMocks(); vi.stubEnv('STORAGE_PROVIDER', 'vercel-blob'); vi.stubEnv('BLOB_READ_WRITE_TOKEN', 'test-token'); });
afterEach(() => vi.unstubAllEnvs());

it('uploads a validated image using the configured Vercel provider and retains its URL for deletion', async () => {
  const url = 'https://test.public.blob.vercel-storage.com/hero.png'; storage.put.mockResolvedValue({ url });
  expect(await uploadImage(image(), 'solution-1')).toEqual({ url, storageKey: url });
  expect(storage.put).toHaveBeenCalledWith(expect.stringMatching(/^solution-1\/.+\.png$/), expect.any(File), expect.objectContaining({ access: 'public', contentType: 'image/png', token: 'test-token' }));
  expect(storage.uploadToR2).not.toHaveBeenCalled();
  await deleteImage(url); expect(storage.del).toHaveBeenCalledWith(url, { token: 'test-token' });
});
it('fails clearly if the selected provider has no credentials', async () => {
  vi.stubEnv('BLOB_READ_WRITE_TOKEN', '');
  await expect(uploadImage(image(), 'solution-1')).rejects.toThrow('Vercel Blob storage credentials');
  expect(storage.put).not.toHaveBeenCalled();
});
it('rejects disguised files before contacting external storage', async () => {
  const file = new File(['<script>bad</script>'], 'hero.png', { type: 'image/png' });
  await expect(uploadImage(file, 'solution-1')).rejects.toThrow('File header validation failed');
  expect(storage.put).not.toHaveBeenCalled();
});
