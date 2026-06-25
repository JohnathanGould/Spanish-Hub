// Run with: node seed-emulator.js
// Requires emulator running: firebase emulators:start
// firebase-admin is installed in frontend/node_modules

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';

const admin = require('./frontend/node_modules/firebase-admin');

admin.initializeApp({ projectId: 'my-spanish-hub' });

const auth = admin.auth();
const db = admin.firestore();

async function seed() {
  let uid;

  try {
    const existing = await auth.getUserByEmail('test@milo.dev');
    uid = existing.uid;
    console.log('Auth user already exists, reusing uid:', uid);
  } catch {
    const created = await auth.createUser({
      email: 'test@milo.dev',
      password: 'testpassword123',
      displayName: 'Test User',
    });
    uid = created.uid;
    console.log('Auth user created, uid:', uid);
  }

  await db.collection('users').doc(uid).set({
    displayName: 'Test User',
    xp: 500,
    weeklyXP: 500,
    streak: { count: 5, lastDate: new Date().toDateString() },
    dailyGoal: 10,
    bones: 50,
    earnedBadges: [],
    completedStops: [
      'p1s1', 'p1s2', 'p1s3', 'p1s4', 'p1s5',
      'p2s1', 'p2s2', 'p2s3', 'p2s4', 'p2s5',
      'p3s1', 'p3s2', 'p3s3', 'p3s4', 'p3s5',
      'p4s1', 'p4s2', 'p4s3', 'p4s4', 'p4s5',
      'p5s1', 'p5s2', 'p5s3', 'p5s4', 'p5s5',
      'p6s1', 'p6s2', 'p6s3', 'p6s4', 'p6s5',
      'p7s1', 'p7s2', 'p7s3', 'p7s4', 'p7s5',
      'p8s1', 'p8s2', 'p8s3', 'p8s4', 'p8s5',
      'p9s1', 'p9s2', 'p9s3', 'p9s4', 'p9s5',
      'p10s1', 'p10s2', 'p10s3', 'p10s4', 'p10s5',
      'p11s1', 'p11s2', 'p11s3', 'p11s4', 'p11s5',
      'p12s1', 'p12s2', 'p12s3', 'p12s4', 'p12s5',
      'p13s1', 'p13s2', 'p13s3', 'p13s4', 'p13s5',
    ],
    completedPaths: ['path1', 'path2', 'path3', 'path4', 'path5', 'path6', 'path7', 'path8', 'path9', 'path10', 'path11', 'path12', 'path13'],
    lessonsCompleted: [],
    progress: {},
    customWords: [],
    importedPacks: [],
    reminderEnabled: false,
    audioListenEnabled: true,
    audioSpeakEnabled: true,
  });

  console.log('Emulator seeded successfully. Test user uid:', uid);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
