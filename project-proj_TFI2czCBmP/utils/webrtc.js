function createPeerConnection(configuration = null) {
    try {
        return new RTCPeerConnection(configuration);
    } catch (error) {
        reportError(error);
        return null;
    }
}

async function getLocalStream() {
    try {
        return await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
    } catch (error) {
        reportError(error);
        return null;
    }
}

async function createCallOffer() {
    try {
        const peerConnection = createPeerConnection();
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        return { peerConnection, offer };
    } catch (error) {
        reportError(error);
        return null;
    }
}

async function handleIncomingCall(offer, localStream) {
    try {
        const peerConnection = createPeerConnection();
        
        // Add local stream
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Set remote description (offer)
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        // Create answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        return { peerConnection, answer };
    } catch (error) {
        reportError(error);
        return null;
    }
}

async function handleCallAnswer(peerConnection, answer) {
    try {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
        reportError(error);
    }
}

function handleICECandidate(event, peerConnection) {
    try {
        if (event.candidate) {
            // Here you would send the candidate to the remote peer
            // Implementation depends on your signaling method
        }
    } catch (error) {
        reportError(error);
    }
}

function handleTrack(event, onTrack) {
    try {
        if (event.streams && event.streams[0]) {
            onTrack(event.streams[0]);
        }
    } catch (error) {
        reportError(error);
    }
}
