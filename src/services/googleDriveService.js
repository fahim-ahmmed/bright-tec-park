const DRIVE = 'https://www.googleapis.com/drive/v3';

async function check(res, fallback) {
  if (res.ok) return res;
  const err = await res.json().catch(() => ({}));
  throw new Error(err.error?.message || fallback);
}

export async function listDriveFiles(token, { pageSize = 30, folderId, mimeTypeFilter, searchQuery } = {}) {
  const q = ['trashed = false'];
  if (folderId) q.push(`'${folderId}' in parents`);
  if (mimeTypeFilter === 'folder') q.push("mimeType = 'application/vnd.google-apps.folder'");
  if (mimeTypeFilter === 'document') q.push("(mimeType contains 'document' or mimeType contains 'text' or mimeType = 'application/pdf')");
  if (mimeTypeFilter === 'image') q.push("mimeType contains 'image/'");
  if (searchQuery?.trim()) q.push(`name contains '${searchQuery.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`);
  const fields = 'nextPageToken, files(id,name,mimeType,size,modifiedTime,webViewLink,thumbnailLink)';
  const url = `${DRIVE}/files?pageSize=${pageSize}&q=${encodeURIComponent(q.join(' and '))}&fields=${encodeURIComponent(fields)}&orderBy=${encodeURIComponent('folder,modifiedTime desc')}`;
  const res = await check(await fetch(url, { headers: { Authorization: `Bearer ${token}` } }), 'Failed to list Drive files');
  return res.json();
}

export async function createDriveFolder(token, name, parentId) {
  const body = { name, mimeType: 'application/vnd.google-apps.folder', ...(parentId ? { parents: [parentId] } : {}) };
  const res = await check(await fetch(`${DRIVE}/files`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }), 'Failed to create folder');
  return res.json();
}

export async function uploadFileToDrive(token, file, fileName, parentId) {
  const metadata = { name: fileName, mimeType: file.type || 'application/octet-stream', ...(parentId ? { parents: [parentId] } : {}) };
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', file);
  const res = await check(await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form }), 'Failed to upload file');
  return res.json();
}

export async function deleteDriveFile(token, id) {
  const res = await fetch(`${DRIVE}/files/${encodeURIComponent(id)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok && res.status !== 204) await check(res, 'Failed to delete file');
  return true;
}

export async function getDriveStorageInfo(token) {
  const res = await check(await fetch(`${DRIVE}/about?fields=storageQuota,user(displayName,emailAddress)`, { headers: { Authorization: `Bearer ${token}` } }), 'Failed to load storage info');
  const d = await res.json();
  return { limit: d.storageQuota?.limit, usage: d.storageQuota?.usage, user: d.user };
}

export async function createSpreadsheet(token, title) {
  const res = await check(await fetch('https://sheets.googleapis.com/v4/spreadsheets', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ properties: { title } }) }), 'Failed to create spreadsheet');
  const d = await res.json();
  return { id: d.spreadsheetId, url: d.spreadsheetUrl };
}

export async function createDocument(token, title) {
  const res = await check(await fetch('https://docs.googleapis.com/v1/documents', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) }), 'Failed to create document');
  const d = await res.json();
  return { id: d.documentId, url: `https://docs.google.com/document/d/${d.documentId}/edit` };
}
