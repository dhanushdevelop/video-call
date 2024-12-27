function App() {
    const [localStream, setLocalStream] = React.useState(null);
    const [remoteStream, setRemoteStream] = React.useState(null);
    const [isAudioEnabled, setIsAudioEnabled] = React.useState(true);
    const [isVideoEnabled, setIsVideoEnabled] = React.useState(true);
    const [isConnected, setIsConnected] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null);
    const [isLogin, setIsLogin] = React.useState(true);
    const [availableUsers, setAvailableUsers] = React.useState([]);
    const [peerConnection, setPeerConnection] = React.useState(null);
    const [incomingCall, setIncomingCall] = React.useState(null);
    const [isInCall, setIsInCall] = React.useState(false);
    const [remoteUser, setRemoteUser] = React.useState(null);

    React.useEffect(() => {
        if (currentUser) {
            loadAvailableUsers();
            const interval = setInterval(loadAvailableUsers, 5000);
            const callCheckInterval = setInterval(checkCalls, 2000);
            return () => {
                clearInterval(interval);
                clearInterval(callCheckInterval);
            };
        }
    }, [currentUser]);

    React.useEffect(() => {
        return () => {
            if (currentUser) {
                handleSignOut();
            }
        };
    }, []);

    const checkCalls = async () => {
        try {
            if (currentUser) {
                const call = await checkIncomingCalls(currentUser.objectId);
                if (call && !incomingCall) {
                    const caller = availableUsers.find(u => u.objectId === call.objectData.fromUserId);
                    if (caller) {
                        setIncomingCall({
                            ...call,
                            callerName: caller.objectData.name
                        });
                    }
                }
            }
        } catch (error) {
            reportError(error);
        }
    };

    const loadAvailableUsers = async () => {
        try {
            const users = await listAvailableUsers();
            setAvailableUsers(users);
        } catch (error) {
            reportError(error);
        }
    };

    async function initializeMedia() {
        try {
            const stream = await getLocalStream();
            if (stream) {
                setLocalStream(stream);
            }
        } catch (error) {
            reportError(error);
        }
    }

    const handleLogin = (user) => {
        setCurrentUser(user);
        initializeMedia();
    };

    const handleSignup = (user) => {
        setCurrentUser(user);
        initializeMedia();
    };

    const handleSignOut = async () => {
        try {
            if (currentUser) {
                await signOutUser(currentUser.objectId);
                handleEndCall();
                setCurrentUser(null);
                setIsLogin(true);
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleUserSelect = async (user) => {
        try {
            setRemoteUser(user);
            const { peerConnection: pc, offer } = await createCallOffer();
            
            if (pc && offer) {
                // Add local stream
                localStream.getTracks().forEach(track => {
                    pc.addTrack(track, localStream);
                });

                // Handle incoming tracks
                pc.ontrack = (event) => handleTrack(event, setRemoteStream);

                // Send call request
                await sendCallRequest(currentUser.objectId, user.objectId, offer);
                setPeerConnection(pc);
                setIsConnected(true);
                setIsInCall(true);
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleAcceptCall = async () => {
        try {
            const caller = availableUsers.find(u => u.objectId === incomingCall.objectData.fromUserId);
            setRemoteUser(caller);

            const { peerConnection: pc, answer } = await handleIncomingCall(
                incomingCall.objectData.offer,
                localStream
            );

            if (pc && answer) {
                // Handle incoming tracks
                pc.ontrack = (event) => handleTrack(event, setRemoteStream);

                // Send answer
                await sendCallAnswer(
                    currentUser.objectId,
                    incomingCall.objectData.fromUserId,
                    answer
                );

                setPeerConnection(pc);
                setIsConnected(true);
                setIsInCall(true);
                setIncomingCall(null);
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleDeclineCall = async () => {
        try {
            if (incomingCall) {
                await deleteCall(incomingCall.objectId, currentUser.objectId);
                setIncomingCall(null);
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleToggleAudio = () => {
        try {
            if (localStream) {
                const audioTrack = localStream.getAudioTracks()[0];
                if (audioTrack) {
                    audioTrack.enabled = !audioTrack.enabled;
                    setIsAudioEnabled(audioTrack.enabled);
                }
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleToggleVideo = () => {
        try {
            if (localStream) {
                const videoTrack = localStream.getVideoTracks()[0];
                if (videoTrack) {
                    videoTrack.enabled = !videoTrack.enabled;
                    setIsVideoEnabled(videoTrack.enabled);
                }
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleEndCall = () => {
        try {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
                setLocalStream(null);
            }
            if (remoteStream) {
                remoteStream.getTracks().forEach(track => track.stop());
                setRemoteStream(null);
            }
            if (peerConnection) {
                peerConnection.close();
                setPeerConnection(null);
            }
            setIsConnected(false);
            setIsInCall(false);
            setRemoteUser(null);
            initializeMedia(); // Reinitialize media for next call
        } catch (error) {
            reportError(error);
        }
    };

    window.addEventListener('beforeunload', () => {
        if (currentUser) {
            handleSignOut();
        }
    });

    if (!currentUser) {
        return isLogin ? (
            <LoginForm 
                onLogin={handleLogin} 
                onSwitchToSignup={() => setIsLogin(false)} 
            />
        ) : (
            <SignupForm 
                onSignup={handleSignup} 
                onSwitchToLogin={() => setIsLogin(true)} 
            />
        );
    }

    if (isInCall) {
        return (
            <div data-name="app-container">
                <VideoCallPage
                    localStream={localStream}
                    remoteStream={remoteStream}
                    isConnected={isConnected}
                    isAudioEnabled={isAudioEnabled}
                    isVideoEnabled={isVideoEnabled}
                    onToggleAudio={handleToggleAudio}
                    onToggleVideo={handleToggleVideo}
                    onEndCall={handleEndCall}
                    userName={currentUser.objectData.name}
                    remoteName={remoteUser?.objectData.name || 'Remote User'}
                />
                {incomingCall && (
                    <IncomingCall
                        caller={incomingCall.callerName}
                        onAccept={handleAcceptCall}
                        onDecline={handleDeclineCall}
                    />
                )}
            </div>
        );
    }

    return (
        <HomePage
            users={availableUsers}
            currentUser={currentUser}
            onUserSelect={handleUserSelect}
            onSignOut={handleSignOut}
        />
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
