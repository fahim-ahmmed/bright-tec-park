import { getDb } from './mongodb';
import { MOCK_CERTIFICATES } from '@/data/mockData';

// Accepts both the app shape and the original firebase-blueprint shape.
function normalize(doc) {
  return {
    certificateId: doc.certificateId || doc.certificateNo || '',
    studentName: doc.studentName || '',
    fatherName: doc.fatherName || '',
    courseNameBn: doc.courseNameBn || doc.courseName || '',
    courseNameEn: doc.courseNameEn || doc.courseName || '',
    btebRoll: doc.btebRoll || doc.rollNo || '',
    regNo: doc.regNo || '',
    session: doc.session || '',
    grade: doc.grade || '',
    cgpa: doc.cgpa || doc.grade || '',
    issueDate: doc.issueDate || '',
    status: 'Verified',
    instituteCode: doc.instituteCode || '27117',
  };
}

// Looks up by Certificate ID, Roll or Reg number. Only real records are ever returned:
// MongoDB `certificates` collection first, then the bundled sample records.
export async function findCertificate(rawId) {
  const id = String(rawId || '').trim().slice(0, 60);
  if (id.length < 3) return null;
  const upper = id.toUpperCase();

  try {
    const doc = await getDb().collection('certificates').findOne({
      $or: [{ certificateId: upper }, { certificateNo: upper }, { rollNo: id }, { btebRoll: id }, { regNo: id }],
    });
    if (doc) return normalize(doc);
  } catch (err) {
    console.warn('certificates lookup (mongo) skipped:', err.message);
  }
  return MOCK_CERTIFICATES[upper] || null;
}
