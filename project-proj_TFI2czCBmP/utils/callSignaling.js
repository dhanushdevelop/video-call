async function sendCallRequest(fromUserId, toUserId, offer) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        await trickleObjAPI.createObject(`call:${toUserId}`, {
            fromUserId,
            offer,
            type: 'offer',
            status: 'pending',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        reportError(error);
        throw error;
    }
}

async function sendCallAnswer(fromUserId, toUserId, answer) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        await trickleObjAPI.createObject(`call:${toUserId}`, {
            fromUserId,
            answer,
            type: 'answer',
            status: 'accepted',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        reportError(error);
        throw error;
    }
}

async function checkIncomingCalls(userId) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        const calls = await trickleObjAPI.listObjects(`call:${userId}`, 10, true);
        return calls.items.find(call => call.objectData.status === 'pending');
    } catch (error) {
        reportError(error);
        return null;
    }
}

async function deleteCall(callId, userId) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        await trickleObjAPI.deleteObject(`call:${userId}`, callId);
    } catch (error) {
        reportError(error);
    }
}
