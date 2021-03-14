class AccountManager {
    constructor() {
        if(AccountManager.instance !== undefined) {
            return AccountManager.instance;
        }

        AccountManager.instance = this;
    }

    getMail() {
        let cookie = document.cookie;
        let pairs = cookie.split(";");

        for(let pair of pairs) {
            let [key, value] = pair.split("=");

            if(key === "mail") {
                return decodeURIComponent(value);
            }
        }

        return null;
    }

    setCookie(name, value, options = {}) {
        options = {
            path: '/',
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    setMail(value) {
        this.setCookie("mail", value);
    }

    deleteMail() {
        this.setCookie("mail", "", {
            'max-age': -1
        })
    }
}

export default AccountManager;