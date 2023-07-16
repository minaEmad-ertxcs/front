export const environment = {
    production: false, // Set it to true for production
    chatifyName: 'Chatify Messenger',
    chatifyStorageDisk: 'public',
    chatifyRoutesPrefix: 'chatify',
    chatifyRoutesMiddleware: ['web', 'auth'],
    chatifyRoutesNamespace: 'Chatify\Http\Controllers',
    chatifyApiRoutesPrefix: 'chatify/api',
    chatifyApiRoutesMiddleware: ['api'],
    chatifyApiRoutesNamespace: 'Chatify\Http\Controllers\Api',
    appDebug: false,
    pusherAppKey: '7b96e05e8c8b23a8068f',
    pusherAppSecret: '5809a928fd131cb71da7',
    pusherAppID: '1594076',
    pusherAppCluster: 'eu',
    chatifyMaxFileSize: 150,
  };
  