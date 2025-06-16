const $service = (function (window) {
    const services = {};

    services.storage = {

        get(key) {
            const value = localStorage.getItem(key) || null;
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        },
        set(key, value) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
        }
    };

    return services;
})(window);
