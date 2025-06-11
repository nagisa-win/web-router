var $router = (function (window) {
    var router = {};

    router.redirect = function (path) {
        if (window.$stay) {
            console.log('Stayed', path);
            return;
        }
        console.log('Redirect', path);
        setTimeout(() => {
            window.location.href = path;
        }, 1000);
    };
    router.roll = function (...arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return '';
        }
        var randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    };

    function _isMobile() {
        var ua = window.navigator.userAgent || window.navigator.vendor || window.opera;
        return !!(/android/i.test(ua) || /iPhone|iPad|iPod/i.test(ua) || /mobile/i.test(ua));
    }

    router._random = Math.random();
    router._rand = Math.random;
    router._date = new Date();
    router._now = Date.now();
    router._year = router._date.getFullYear();
    router._month = router._date.getMonth() + 1;
    router._day = router._date.getDate();
    router._week = router._date.getDay();
    router._hour = router._date.getHours();
    router._minute = router._date.getMinutes();
    router._second = router._date.getSeconds();
    router._isMobile = _isMobile();

    router.Map = {
        vip: [
            {
                mobile: 'https://pages-fast.m.taobao.com/wow/z/blackvip/v/super-c',
                pc: 'https://pages-fast.m.taobao.com/wow/z/blackvip/v/pc-super',
            },
            {
                mobile: 'https://plus.jd.com/index',
                pc: 'https://plus.jd.com/index',
            },
        ],
        food: [
            {
                mobile: 'https://www.cnhls.com/',
                pc: 'https://www.cnhls.com/',
            },
            {
                mobile: 'https://m.kfc.com.cn/',
                pc: 'https://www.kfc.com.cn/',
            },
            {
                mobile: 'https://www.mcdonalds.com.cn/',
                pc: 'https://www.mcdonalds.com.cn/',
            },
            {
                mobile: 'https://bkchina.cn/mobile/main.html',
                pc: 'https://www.bkchina.cn/',
            },
            {
                mobile: 'http://weixin.qq.com/r/xTpVTY3ERtA5rcku92-X',
                pc: 'http://www.saizeriya.com.cn/',
            },
            {
                mobile: 'https://www.pizzahut.com.cn/',
                pc: 'https://www.pizzahut.com.cn/',
            },
        ],
    };

    return router;
})(window);

function doRedirect() {
    var key = $router._isMobile ? 'mobile' : 'pc';
    var category, dest;
    if ($router._week === 6 || $router._week === 0) {
        category = $router.roll('food', 'vip');
    } else {
        category = 'food';
    }

    if (category === 'food') {
        if ($router._random < 0.1) {
            dest = $router.Map[category][0][key];
        } else if ($router._rand() > 0.9) {
            var period =
                $router._hour < 6
                    ? ''
                    : $router._hour < 9
                    ? '早餐'
                    : $router._hour < 13
                    ? '午餐'
                    : $router._hour < 19
                    ? '晚餐'
                    : '夜宵';
            dest =
                'https://chat.baidu.com/search?word=' +
                encodeURIComponent('今天' + period + '吃什么');
        } else if ($router._week === 4) {
            dest = $router.Map[category][1][key];
        } else if ($router._week === 5) {
            dest = $router.Map[category][2][key];
        } else {
            dest = $router.roll(...$router.Map[category].map(item => item[key]));
        }
    } else {
        dest = $router.roll(...$router.Map[category].map(item => item[key]));
    }
    $router.redirect(dest);
}

doRedirect();
