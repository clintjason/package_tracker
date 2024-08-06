const WebSocket = require('ws');
const Delivery = require('../models/Delivery');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        const { event, delivery_id, location, status } = JSON.parse(message);

        switch (event) {
            case 'location_changed':
                await updateLocation(delivery_id, location);
                break;
            case 'status_changed':
                await updateStatus(delivery_id, status);
                break;
            default:
                console.error(`Unknown event: ${event}`);
        }
    });
});

async function updateLocation(delivery_id, location) {
    await Delivery.findByIdAndUpdate(delivery_id, { location });
    broadcastEvent('location_changed', { delivery_id, location });
}

async function updateStatus(delivery_id, status) {
    const delivery = await Delivery.findById(delivery_id);
    if (!delivery) return;

    delivery.status = status;
    const currentTime = new Date();

    switch (status) {
        case 'picked-up':
            delivery.pickup_time = currentTime;
            break;
        case 'in-transit':
            delivery.start_time = currentTime;
            break;
        case 'delivered':
        case 'failed':
            delivery.end_time = currentTime;
            break;
    }

    await delivery.save();
    broadcastEvent('status_changed', { delivery_id, status });
    broadcastEvent('delivery_updated', { delivery: delivery.toObject() });
}

function broadcastEvent(event, payload) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ event, ...payload }));
        }
    });
}

module.exports = wss;