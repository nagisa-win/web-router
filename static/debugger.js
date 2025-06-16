/**
 * simple devtools f**ker
 */
(function () {
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        alert('右键菜单已被禁用');
    });
    document.addEventListener('keydown', function (e) {
        // 禁用 F12
        if (e.key === 'F12') {
            e.preventDefault();
            alert('F12 快捷键已被禁用');
            return;
        }

        // 禁用 Ctrl+Shift+I
        if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
            e.preventDefault();
            alert('键盘快捷键已被禁用');
            return;
        }
    });
    function detectDevTools() {
        const start = Date.now();

        // 创建一个调试器"陷阱"
        try {
            (function () {
                (function () {})['constructor']('debugger')();
            })();
        } catch (e) {}

        const diff = Date.now() - start;

        // 如果调试器被打开，代码执行会暂停，时间差会比较大
        if (diff > 100) {
            document.body.innerHTML = '<h1>检测到开发者工具喵！V我88！</h1><br><img style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:200px;" src="/static/qrcode.svg">';
            alert('检测到开发者工具已打开！');
        }
    }
    setInterval(detectDevTools, 1000);

    function setupConsoleDetection() {
        const originalConsole = {};
        const consoleMethods = ['log', 'warn', 'error', 'info', 'debug'];

        consoleMethods.forEach(method => {
            originalConsole[method] = console[method];

            console[method] = function () {
                detectDevTools();
                originalConsole[method].apply(console, arguments);
            };
        });
    }
    setupConsoleDetection();

    document.addEventListener('copy', e => {
        e.preventDefault();
        alert('内容复制已被禁用');
    });

    document.addEventListener('cut', e => {
        e.preventDefault();
        alert('内容剪切已被禁用');
    });
})();
