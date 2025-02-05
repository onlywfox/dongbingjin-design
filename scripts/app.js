// 获取导航链接和作品展示容器
const navLinks = document.querySelectorAll('.nav-links li');
const portfolioContainer = document.getElementById('portfolioContainer');

// 定义作品数据
const works = [
    {
        id: 1,
        title: '作品1',
        category: 'vfx',
        image: 'assets/images/work1.jpg',
        description: '这是一个特效设计作品。'
    },
    {
        id: 2,
        title: '作品2',
        category: 'ui',
        image: 'assets/images/work2.jpg',
        description: '这是一个界面设计作品。'
    },
    {
        id: 3,
        title: '作品3',
        category: 'concept',
        image: 'assets/images/work3.jpg',
        description: '这是一个概念原画作品。'
    },
    {
        id: 4,
        title: '作品4',
        category: 'ui',
        image: 'assets/images/work4.jpg',
        description: '这是一个界面设计作品。'
    },
    // 添加更多作品数据
];

// 生成作品项
function generateWorkItem(work) {
    const workItem = document.createElement('div');
    workItem.classList.add('work-item');
    workItem.dataset.category = work.category;
    workItem.innerHTML = `
        <img src="${work.image}" alt="${work.title}">
        <h3>${work.title}</h3>
        <p>${work.description}</p>
    `;
    return workItem;
}

// 渲染作品
function renderWorks(category) {
    portfolioContainer.innerHTML = '';
    works.forEach(work => {
        if (category === 'all' || work.category === category) {
            const workItem = generateWorkItem(work);
            portfolioContainer.appendChild(workItem);
        }
    });
}
// 初始化Swiper
var swiper = new Swiper('.portfolio-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 初始化作品展示
renderWorks('all');
// 获取模态框和关闭按钮
const modal = document.getElementById('workModal');
const closeBtn = document.querySelector('.close');

// 作品项点击事件
portfolioContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('work-item')) {
        const work = works.find(work => work.id === parseInt(e.target.dataset.id));
        if (work) {
            const modalImage = modal.querySelector('.modal-image');
            const modalTitle = modal.querySelector('.modal-title');
            const modalDescription = modal.querySelector('.modal-description');
            modalImage.src = work.image;
            modalTitle.textContent = work.title;
            modalDescription.textContent = work.description;
            modal.style.display = 'block';
        }
    }
});

// 关闭按钮点击事件
closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
});

// 模态框外部点击事件
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.dataset.filter;
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// 监听页面滚动事件
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const nav = document.querySelector('.glass-nav');
    const navHeight = nav.offsetHeight;
    const opacity = Math.min(scrollY / navHeight, 1);
    nav.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
});
// 滚动动画效果
gsap.registerPlugin(ScrollTrigger);

gsap.to('.work-item', {
    opacity: 1,
    y: 0,
    stagger: 0.2,
    scrollTrigger: {
        trigger: '.portfolio-grid',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        markers: true
    }
});

// 社交链接点击事件
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = this.dataset.tooltip;
        window.open(url, '_blank');
    });
});

// 获取所有带有qr-code-trigger类名的元素
const qrCodeTriggers = document.querySelectorAll('.qr-code-trigger');

// 为每个元素添加点击事件监听器
qrCodeTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        const qrCodePopup = this.querySelector('.qr-code-popup');
        qrCodePopup.style.display = 'block';
    });
});
// 获取头像和二维码元素
const avatar = document.getElementById('avatar');
const qrCodePopup = document.querySelector('qr-code');

// 鼠标移入头像显示二维码提示框
avatar.addEventListener('mouseenter', () => {
    qrCodePopup.style.display = 'block';
});

// 鼠标移出头像隐藏二维码提示框
avatar.addEventListener('mouseleave', () => {
    qrCodePopup.style.display = 'none';
});

// 为文档添加点击事件监听器，当点击其他地方时隐藏二维码图片
document.addEventListener('click', function(e) {
    if (!e.target.closest('.qr-code-trigger')) {
        const qrCodePopups = document.querySelectorAll('.qr-code-popup');
        qrCodePopups.forEach(popup => {
            popup.style.display = 'none';
        });
    }
});