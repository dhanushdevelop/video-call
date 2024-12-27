async function loginUser(email, password) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        const users = await trickleObjAPI.listObjects('user', 100, true);
        const user = users.items.find(u => 
            u.objectData.email === email && u.objectData.password === password
        );
        
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Update user status to online
        await trickleObjAPI.updateObject('user', user.objectId, {
            ...user.objectData,
            isOnline: true
        });
        
        return user;
    } catch (error) {
        reportError(error);
        throw error;
    }
}

async function registerUser(name, email, password) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        
        // Check if user already exists
        const users = await trickleObjAPI.listObjects('user', 100, true);
        const existingUser = users.items.find(u => u.objectData.email === email);
        
        if (existingUser) {
            throw new Error('User already exists');
        }
        
        // Create new user
        const user = await trickleObjAPI.createObject('user', {
            name,
            email,
            password,
            isOnline: true
        });
        
        return user;
    } catch (error) {
        reportError(error);
        throw error;
    }
}

async function signOutUser(userId) {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        const user = await trickleObjAPI.getObject('user', userId);
        
        // Update user status to offline
        await trickleObjAPI.updateObject('user', userId, {
            ...user.objectData,
            isOnline: false
        });
    } catch (error) {
        reportError(error);
        throw error;
    }
}

async function listAvailableUsers() {
    try {
        const trickleObjAPI = new TrickleObjectAPI();
        const users = await trickleObjAPI.listObjects('user', 100, true);
        return users.items;
    } catch (error) {
        reportError(error);
        throw error;
    }
}
