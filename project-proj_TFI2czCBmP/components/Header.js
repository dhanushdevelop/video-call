function Header({ onSignOut, userName }) {
    return (
        <div data-name="header" className="bg-gray-800 p-4 flex justify-between items-center">
            <div data-name="user-name" className="text-white font-semibold">
                Welcome, {userName}
            </div>
            <button
                data-name="sign-out-button"
                onClick={onSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Sign Out
            </button>
        </div>
    );
}
