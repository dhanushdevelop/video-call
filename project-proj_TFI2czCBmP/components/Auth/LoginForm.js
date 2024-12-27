function LoginForm({ onLogin, onSwitchToSignup }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser(email, password);
            onLogin(user);
        } catch (error) {
            reportError(error);
            setError('Invalid email or password');
        }
    };

    return (
        <div data-name="auth-container" className="auth-container">
            <form data-name="login-form" className="auth-form" onSubmit={handleSubmit}>
                <h2 className="text-2xl text-white mb-6 text-center">Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
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
                <button data-name="login-button" type="submit" className="auth-button">
                    Login
                </button>
                <div className="auth-switch">
                    Don't have an account?{' '}
                    <span 
                        data-name="signup-link"
                        className="auth-switch-link"
                        onClick={onSwitchToSignup}
                    >
                        Sign up
                    </span>
                </div>
            </form>
        </div>
    );
}
