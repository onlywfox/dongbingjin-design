// 滚动时导航栏动态效果
export function initScrollEffects() {
    let lastScroll = 0;
    const nav = document.querySelector('.glass-nav');
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 向下滚动隐藏导航
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }

        // 高亮当前区域
        document.querySelectorAll('section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                const id = section.id;
                document.querySelectorAll('.nav-links li').forEach(li => {
                    li.classList.toggle('active', li.dataset.filter === id);
                });
            }
        });

        lastScroll = currentScroll;
    }, { passive: true });
}

// 视差滚动效果
export function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.dataset.parallax) || 0.3;
        
        gsap.to(element, {
            y: () => -window.pageYOffset * speed,
            ease: 'none',
            scrollTrigger: {
                scrub: true
            }
        });
    });
}