function IncomingCall({ caller, onAccept, onDecline }) {
    return (
        <div data-name="incoming-call" className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg text-white">
                <h3 className="text-xl mb-4">Incoming Call from {caller}</h3>
                <div className="flex gap-4">
                    <button
                        data-name="accept-call"
                        onClick={onAccept}
                        className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
                    >
                        Accept
                    </button>
                    <button
                        data-name="decline-call"
                        onClick={onDecline}
                        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
