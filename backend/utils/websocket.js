const WebSocket = require('ws');
const Delivery = require('../models/Delivery');
const Package = require('../models/Package');

let wss;
function initWebSocketServer(server) {
    wss = new WebSocket.Server({ noServer: true });

    server.on('upgrade', (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request);
        });
    });

    wss.on('connection', (ws) => {
        ws.on('message', async (message) => {
            const { event, delivery_id, location, status } = JSON.parse(message);
            console.log("The message: ",JSON.parse(message))
            switch (event) {
                case 'location_changed':
                    console.log('location_changed');
                    await updateLocation(delivery_id, location);
                    break;
                case 'status_changed':
                    console.log("Status changed")
                    await updateStatus(delivery_id, status);
                    break;
                default:
                    console.error(`Unknown event: ${event}`);
            }
        });
    });

    return wss;
}

async function updateLocation(delivery_id, location) {
    console.log('in updateLocation');
    const delivery = await Delivery.findByIdAndUpdate(
        delivery_id,
        { $set: { location: location } },
        { new: true, runValidators: true }
      ).populate('package_id');
    console.log('Updating delivery: ', delivery);
    broadcastEvent('delivery_updated', { delivery: delivery.toObject(), location });
}

async function updateStatus(delivery_id, status) {
    console.log('updateStatus');
    const delivery = await Delivery.findById(delivery_id).populate('package_id');
    if (!delivery) {
        return res.status(404).json({ message: 'Delivery not found' });
    }
    delivery.status = status;
    const currentTime = new Date();

    switch (status) {
        case 'picked-up':
            delivery.pickup_time = currentTime;
            delivery.package_id.active_delivery_id = delivery_id;
            const pkg = await Package.findByIdAndUpdate(
                delivery.package_id._id,
                { $set: { active_delivery_id: delivery_id } },
                { new: true, runValidators: true });
            console.log('set active delivery: ', pkg);
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
    console.log('updateStatus delivery: ', delivery);
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

module.exports = { initWebSocketServer };