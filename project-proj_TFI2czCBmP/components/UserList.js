function UserList({ users, onUserSelect, currentUser }) {
    return (
        <div data-name="user-list" className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-white text-lg mb-4">Available Users</h3>
            <div className="space-y-2">
                {users.map(user => (
                    user.objectId !== currentUser.objectId && (
                        <div
                            key={user.objectId}
                            data-name="user-item"
                            className="flex items-center justify-between bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
                            onClick={() => onUserSelect(user)}
                        >
                            <span className="text-white">{user.objectData.name}</span>
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
