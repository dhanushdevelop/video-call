function Controls({ onToggleAudio, onToggleVideo, onEndCall, isAudioEnabled, isVideoEnabled }) {
    return (
        <div data-name="controls" className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900">
            <div className="flex justify-center gap-4">
                <button
                    data-name="toggle-audio"
                    onClick={onToggleAudio}
                    className={`p-3 rounded-full ${isAudioEnabled ? 'bg-gray-600' : 'bg-red-500'}`}
                >
                    {isAudioEnabled ? '🎤' : '🔇'}
                </button>
                <button
                    data-name="toggle-video"
                    onClick={onToggleVideo}
                    className={`p-3 rounded-full ${isVideoEnabled ? 'bg-gray-600' : 'bg-red-500'}`}
                >
                    {isVideoEnabled ? '📹' : '🚫'}
                </button>
                <button
                    data-name="end-call"
                    onClick={onEndCall}
                    className="p-3 rounded-full bg-red-500"
                >
                    ❌
                </button>
            </div>
        </div>
    );
}
