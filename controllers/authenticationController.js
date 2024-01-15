const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

exports.isUserAuthenticated = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        return true;
    } else {
        return false;
    }
}

exports.getUserEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        return user.email;
    } else {
        return null;
    }
}

exports.getUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        return user.uid;
    } else {
        return null;
    }
}

exports.handleLogout = (req, res) => {
    const auth = getAuth();
    auth.signOut().then(() => {
        res.redirect('/');
    }).catch((error) => {
        res.redirect('/');
    });
}

exports.handleRegisterForm = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const passwordRepeat = req.body.passwordRepeat;

    if (!email || !password) {
        const errorMessage = 'Please enter email and password!';
        res.render('/register', { query: req.query });
    }
    if (password != passwordRepeat) {
        const errorMessage = 'Password don\'t match!';
        res.redirect('/register?error=' + errorMessage);
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.redirect('/');
        })
        .catch((error) => {
            const errorMessage = error.message;
            res.redirect('/register?error=' + errorMessage);
        });
}

exports.handleLoginForm = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const errorMessage = 'Please enter email and password!';
        res.redirect('/login?error=' + errorMessage);
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            res.redirect('/');
        })
        .catch((error) => {
            const errorMessage = error.message;
            res.redirect('/login?error=' + errorMessage);
        });
}
