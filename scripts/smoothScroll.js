// 通用平滑滚动函数
export function smoothScroll(target, duration=1000) {
    const startPos = window.pageYOffset;
    const targetPos = target.offsetTop;
    const distance = targetPos - startPos;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        window.scrollTo(0, startPos + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    // 缓动函数
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    requestAnimationFrame(animation);
}

// 初始化导航链接点击事件
export function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) smoothScroll(target);
        });
    });
}