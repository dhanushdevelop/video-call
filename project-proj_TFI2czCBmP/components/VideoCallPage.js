function VideoCallPage({ 
    localStream, 
    remoteStream, 
    isConnected,
    isAudioEnabled,
    isVideoEnabled,
    onToggleAudio,
    onToggleVideo,
    onEndCall,
    userName,
    remoteName
}) {
    return (
        <div data-name="video-call-page" className="fixed inset-0 bg-black">
            <div className="absolute top-4 right-4 z-10">
                <div data-name="connection-status" 
                    className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
                    {isConnected ? 'Connected' : 'Disconnected'}
                </div>
            </div>

            <div className="relative h-full">
                {remoteStream && (
                    <div className="absolute inset-0">
                        <VideoPlayer
                            stream={remoteStream}
                            username={remoteName}
                            muted={false}
                        />
                    </div>
                )}
                
                {localStream && (
                    <div className="absolute bottom-20 right-4 w-1/4 aspect-video">
                        <VideoPlayer
                            stream={localStream}
                            username={userName}
                            muted={true}
                        />
                    </div>
                )}

                <Controls
                    onToggleAudio={onToggleAudio}
                    onToggleVideo={onToggleVideo}
                    onEndCall={onEndCall}
                    isAudioEnabled={isAudioEnabled}
                    isVideoEnabled={isVideoEnabled}
                />
            </div>
        </div>
    );
}
