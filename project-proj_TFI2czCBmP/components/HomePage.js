function HomePage({ users, currentUser, onUserSelect, onSignOut }) {
    return (
        <div data-name="home-page" className="min-h-screen bg-gray-900">
            <Header onSignOut={onSignOut} userName={currentUser.objectData.name} />
            
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl text-white mb-6">Available Users</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map(user => (
                        user.objectId !== currentUser.objectId && (
                            <div
                                key={user.objectId}
                                data-name="user-card"
                                className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={() => onUserSelect(user)}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-white text-lg font-semibold">
                                            {user.objectData.name}
                                        </h3>
                                        <p className="text-gray-400">
                                            {user.objectData.email}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 rounded-full ${user.objectData.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                        <span className="text-white">
                                            {user.objectData.isOnline ? 'Online' : 'Offline'}
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    data-name="call-button"
                                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
                                >
                                    <span>📞</span> Call Now
                                </button>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
