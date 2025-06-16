/**
 * simple dom mutation observer
 */
var $detector = (function () {
    // 创建监控实例
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // 检测新增节点
            if (mutation.addedNodes.length > 0) {
                console.warn('检测到可疑DOM注入:', mutation.addedNodes);
                observer.disconnect();
                document.body.innerHTML = `<main style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;"><h1>被我发现dom注入了喵！V我88！</h1><br><img style="width:200px;" src="/static/qrcode.svg"></main>`;
            }
        });
    });
    const detector = function (hook, vm) {
        hook.ready(function () {
            // 开始监控整个文档
            observer.observe(document.documentElement, {
                childList: true, // 监控直接子节点
                subtree: true, // 监控所有后代节点
                attributes: true, // 监控属性变化
            });
        });
    };
    $docsify = $docsify || {};
    $docsify.plugins = [].concat($docsify.plugins || [], detector);
    return {
        observer
    };
})();
