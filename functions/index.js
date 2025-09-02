const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Inicializar Firebase Admin
admin.initializeApp()

const db = admin.firestore()
const messaging = admin.messaging()

/**
 * Cloud Function: Enviar notificação push quando um novo pedido for criado
 * Trigger: onCreate('orders/{orderId}')
 */
exports.sendNewOrderNotification = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    try {
      const orderData = snap.data()
      const orderId = context.params.orderId
      const restaurantId = orderData.restaurantId

      if (!restaurantId) {
        console.log('RestaurantId não encontrado no pedido:', orderId)
        return null
      }

      console.log(
        `Novo pedido criado: ${orderId} para restaurante: ${restaurantId}`
      )

      // Buscar todos os tokens de dispositivos do restaurante
      const devicesSnapshot = await db
        .collection('restaurants')
        .doc(restaurantId)
        .collection('devices')
        .where('deleted', '!=', true)
        .get()

      if (devicesSnapshot.empty) {
        console.log(
          'Nenhum dispositivo registrado para o restaurante:',
          restaurantId
        )
        return null
      }

      // Extrair tokens dos dispositivos
      const tokens = []
      devicesSnapshot.forEach(doc => {
        const deviceData = doc.data()
        if (deviceData.token && !deviceData.deleted) {
          tokens.push(deviceData.token)
        }
      })

      if (tokens.length === 0) {
        console.log(
          'Nenhum token válido encontrado para o restaurante:',
          restaurantId
        )
        return null
      }

      // Preparar dados da notificação
      const orderItems = orderData.items || []
      const totalItems = orderItems.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      )
      const totalValue = orderData.total || 0

      const notificationTitle = '🍕 Novo Pedido Recebido!'
      const notificationBody = `Pedido #${orderId.slice(
        -6
      )} - ${totalItems} itens - R$ ${totalValue.toFixed(2)}`

      // Dados adicionais para a notificação
      const notificationData = {
        orderId: orderId,
        restaurantId: restaurantId,
        total: totalValue.toString(),
        itemCount: totalItems.toString(),
        timestamp: Date.now().toString(),
        type: 'new_order'
      }

      // Configurar mensagem para múltiplos dispositivos
      const message = {
        notification: {
          title: notificationTitle,
          body: notificationBody
        },
        data: notificationData,
        android: {
          notification: {
            sound: 'default',
            priority: 'high',
            channelId: 'new-orders',
            clickAction: 'FLUTTER_NOTIFICATION_CLICK'
          }
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              badge: 1,
              category: 'NEW_ORDER'
            }
          }
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
                title: 'Ver Pedido',
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
      }

      // Enviar notificação para todos os tokens
      const response = await messaging.sendToDevice(tokens, message)

      // Log dos resultados
      console.log(`Notificação enviada para ${tokens.length} dispositivos`)
      console.log('Resposta do FCM:', response)

      // Verificar tokens inválidos e removê-los
      const invalidTokens = []
      response.results.forEach((result, index) => {
        if (result.error) {
          console.log(`Erro ao enviar para token ${index}:`, result.error)
          if (
            result.error.code === 'messaging/invalid-registration-token' ||
            result.error.code === 'messaging/registration-token-not-registered'
          ) {
            invalidTokens.push(tokens[index])
          }
        }
      })

      // Remover tokens inválidos do Firestore
      if (invalidTokens.length > 0) {
        console.log(`Removendo ${invalidTokens.length} tokens inválidos`)
        const batch = db.batch()

        invalidTokens.forEach(token => {
          const deviceRef = db
            .collection('restaurants')
            .doc(restaurantId)
            .collection('devices')
            .doc(token)

          batch.update(deviceRef, {
            deleted: true,
            deletedAt: admin.firestore.FieldValue.serverTimestamp(),
            deleteReason: 'invalid_token'
          })
        })

        await batch.commit()
        console.log('Tokens inválidos removidos do Firestore')
      }

      return {
        success: true,
        sentTo: tokens.length - invalidTokens.length,
        invalidTokens: invalidTokens.length,
        orderId: orderId,
        restaurantId: restaurantId
      }
    } catch (error) {
      console.error('Erro ao enviar notificação push:', error)
      throw error
    }
  })

/**
 * Cloud Function: Limpar tokens antigos periodicamente
 * Trigger: schedule (diariamente às 2h da manhã)
 */
exports.cleanupOldTokens = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async context => {
    try {
      console.log('Iniciando limpeza de tokens antigos...')

      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      // Buscar todos os restaurantes
      const restaurantsSnapshot = await db.collection('restaurants').get()

      let totalDeleted = 0

      for (const restaurantDoc of restaurantsSnapshot.docs) {
        const restaurantId = restaurantDoc.id

        // Buscar dispositivos antigos ou deletados
        const oldDevicesSnapshot = await db
          .collection('restaurants')
          .doc(restaurantId)
          .collection('devices')
          .where('lastUsed', '<', thirtyDaysAgo)
          .get()

        const deletedDevicesSnapshot = await db
          .collection('restaurants')
          .doc(restaurantId)
          .collection('devices')
          .where('deleted', '==', true)
          .get()

        const devicesToDelete = [
          ...oldDevicesSnapshot.docs,
          ...deletedDevicesSnapshot.docs
        ]

        if (devicesToDelete.length > 0) {
          const batch = db.batch()

          devicesToDelete.forEach(deviceDoc => {
            batch.delete(deviceDoc.ref)
          })

          await batch.commit()
          totalDeleted += devicesToDelete.length

          console.log(
            `Restaurante ${restaurantId}: ${devicesToDelete.length} dispositivos removidos`
          )
        }
      }

      console.log(
        `Limpeza concluída. Total de dispositivos removidos: ${totalDeleted}`
      )
      return { success: true, deletedCount: totalDeleted }
    } catch (error) {
      console.error('Erro na limpeza de tokens:', error)
      throw error
    }
  })
