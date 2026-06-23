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
    completedStops: ['p1s1', 'p1s2', 'p1s3', 'p1s4', 'p1s5', 'p1s6',
                     'p2s1', 'p2s2', 'p2s3', 'p2s4', 'p2s5', 'p2s6',
                     'p3s1', 'p3s2', 'p3s3', 'p3s4', 'p3s5', 'p3s6'],
    completedPaths: ['path1', 'path2', 'path3'],
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
