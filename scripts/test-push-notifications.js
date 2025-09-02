const admin = require('firebase-admin');

// Inicializar Firebase Admin
const serviceAccount = require('../service-account-key.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const messaging = admin.messaging();

async function testPushNotification(restaurantId = 'demo-restaurant-1') {
  try {
    console.log(`Testando notificações push para restaurante: ${restaurantId}`);

    // Buscar tokens de dispositivos do restaurante
    const devicesSnapshot = await db
      .collection('restaurants')
      .doc(restaurantId)
      .collection('devices')
      .where('deleted', '!=', true)
      .get();

    if (devicesSnapshot.empty) {
      console.log('❌ Nenhum dispositivo registrado encontrado');
      return;
    }

    const tokens = [];
    devicesSnapshot.forEach(doc => {
      const deviceData = doc.data();
      if (deviceData.token && !deviceData.deleted) {
        tokens.push(deviceData.token);
        console.log(`📱 Dispositivo: ${deviceData.userEmail} (${deviceData.platform})`);
      }
    });

    if (tokens.length === 0) {
      console.log('❌ Nenhum token válido encontrado');
      return;
    }

    console.log(`📤 Enviando notificação para ${tokens.length} dispositivos...`);

    // Criar notificação de teste
    const message = {
      notification: {
        title: '🧪 Teste de Notificação',
        body: 'Esta é uma notificação de teste do sistema de delivery!',
      },
      data: {
        type: 'test',
        timestamp: Date.now().toString(),
        restaurantId: restaurantId
      },
      webpush: {
        notification: {
          icon: '/icons/icon.svg',
          badge: '/icons/icon.svg',
          vibrate: [100, 50, 100],
          requireInteraction: true,
          actions: [
            {
              action: 'view',
              title: 'Ver Painel',
              icon: '/icons/icon.svg'
            },
            {
              action: 'close',
              title: 'Fechar',
              icon: '/icons/icon.svg'
            }
          ]
        },
        fcmOptions: {
          link: '/admin'
        }
      }
    };

    // Enviar notificação
    const response = await messaging.sendToDevice(tokens, message);

    console.log('✅ Notificação enviada com sucesso!');
    console.log('📊 Resultados:');
    
    let successCount = 0;
    let errorCount = 0;

    response.results.forEach((result, index) => {
      if (result.error) {
        console.log(`❌ Erro no dispositivo ${index + 1}:`, result.error.message);
        errorCount++;
      } else {
        console.log(`✅ Dispositivo ${index + 1}: Notificação enviada`);
        successCount++;
      }
    });

    console.log(`\n📈 Resumo:`);
    console.log(`   ✅ Sucessos: ${successCount}`);
    console.log(`   ❌ Erros: ${errorCount}`);
    console.log(`   📱 Total: ${tokens.length}`);

  } catch (error) {
    console.error('❌ Erro ao enviar notificação de teste:', error);
  }
}

// Função para listar dispositivos registrados
async function listDevices(restaurantId = 'demo-restaurant-1') {
  try {
    console.log(`📋 Dispositivos registrados para restaurante: ${restaurantId}`);

    const devicesSnapshot = await db
      .collection('restaurants')
      .doc(restaurantId)
      .collection('devices')
      .get();

    if (devicesSnapshot.empty) {
      console.log('❌ Nenhum dispositivo encontrado');
      return;
    }

    console.log('\n📱 Lista de dispositivos:');
    console.log('─'.repeat(80));

    devicesSnapshot.forEach((doc, index) => {
      const deviceData = doc.data();
      console.log(`${index + 1}. Token: ${doc.id.slice(0, 20)}...`);
      console.log(`   Email: ${deviceData.userEmail}`);
      console.log(`   Plataforma: ${deviceData.platform}`);
      console.log(`   Criado em: ${deviceData.createdAt?.toDate?.() || deviceData.createdAt}`);
      console.log(`   Último uso: ${deviceData.lastUsed?.toDate?.() || deviceData.lastUsed}`);
      console.log(`   Status: ${deviceData.deleted ? '❌ Deletado' : '✅ Ativo'}`);
      console.log('─'.repeat(80));
    });

  } catch (error) {
    console.error('❌ Erro ao listar dispositivos:', error);
  }
}

// Função para limpar dispositivos antigos
async function cleanupDevices(restaurantId = 'demo-restaurant-1') {
  try {
    console.log(`🧹 Limpando dispositivos antigos do restaurante: ${restaurantId}`);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const oldDevicesSnapshot = await db
      .collection('restaurants')
      .doc(restaurantId)
      .collection('devices')
      .where('lastUsed', '<', thirtyDaysAgo)
      .get();

    const deletedDevicesSnapshot = await db
      .collection('restaurants')
      .doc(restaurantId)
      .collection('devices')
      .where('deleted', '==', true)
      .get();

    const devicesToDelete = [...oldDevicesSnapshot.docs, ...deletedDevicesSnapshot.docs];

    if (devicesToDelete.length === 0) {
      console.log('✅ Nenhum dispositivo para limpar');
      return;
    }

    const batch = db.batch();
    
    devicesToDelete.forEach(deviceDoc => {
      batch.delete(deviceDoc.ref);
    });

    await batch.commit();
    
    console.log(`✅ ${devicesToDelete.length} dispositivos removidos`);

  } catch (error) {
    console.error('❌ Erro ao limpar dispositivos:', error);
  }
}

// Executar comando baseado no argumento
const command = process.argv[2];
const restaurantId = process.argv[3] || 'demo-restaurant-1';

switch (command) {
  case 'test':
    testPushNotification(restaurantId);
    break;
  case 'list':
    listDevices(restaurantId);
    break;
  case 'cleanup':
    cleanupDevices(restaurantId);
    break;
  default:
    console.log('📖 Uso: node test-push-notifications.js [comando] [restaurantId]');
    console.log('');
    console.log('Comandos disponíveis:');
    console.log('  test     - Enviar notificação de teste');
    console.log('  list     - Listar dispositivos registrados');
    console.log('  cleanup  - Limpar dispositivos antigos');
    console.log('');
    console.log('Exemplos:');
    console.log('  node test-push-notifications.js test');
    console.log('  node test-push-notifications.js test demo-restaurant-1');
    console.log('  node test-push-notifications.js list');
    console.log('  node test-push-notifications.js cleanup');
}
