function VideoPlayer({ stream, username, muted }) {
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        try {
            if (videoRef.current && stream) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            reportError(error);
        }
    }, [stream]);

    return (
        <div data-name="video-container" className="video-container">
            <video
                data-name="video-element"
                ref={videoRef}
                autoPlay
                playsInline
                muted={muted}
                className="video-element"
            />
            <div data-name="video-overlay" className="video-overlay">
                {username}
            </div>
        </div>
    );
}
