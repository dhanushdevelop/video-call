function SignupForm({ onSignup, onSwitchToLogin }) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await registerUser(name, email, password);
            onSignup(user);
        } catch (error) {
            reportError(error);
            setError('Failed to create account');
        }
    };

    return (
        <div data-name="auth-container" className="auth-container">
            <form data-name="signup-form" className="auth-form" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-white mb-6 text-center">Sign Up</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <input
                    data-name="name-input"
                    type="text"
                    placeholder="Name"
                    className="auth-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    data-name="email-input"
                    type="email"
                    placeholder="Email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    data-name="password-input"
                    type="password"
                    placeholder="Password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button data-name="signup-button" type="submit" className="auth-button">
                    Sign Up
                </button>
                <div className="auth-switch">
                    Already have an account?{' '}
                    <span 
                        data-name="login-link"
                        className="auth-switch-link"
                        onClick={onSwitchToLogin}
                    >
                        Login
                    </span>
                </div>
            </form>
        </div>
    );
}
