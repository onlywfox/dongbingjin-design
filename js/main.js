let carouselIndex = 0;
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const itemWidth = carouselItems[0].offsetWidth; // 包括左右外边距
const totalItems = carouselItems.length;

// 初始化轮播图
function initCarousel() {
  carouselIndex = 0; // 确保初始索引为 0
  carouselItems[carouselIndex].classList.add('active'); // 添加 active 类
  carouselInner.style.transform = `translateX(-${carouselIndex * 100}%)`; // 初始化位置
}

// 移动轮播图
function moveCarousel(step) {
  carouselIndex += step;
  if (carouselIndex >= totalItems) carouselIndex = 0;
  if (carouselIndex < 0) carouselIndex = totalItems - 1;

  const translateX = -carouselIndex * itemWidth + 'px';
  carouselInner.style.transform = `translateX(${translateX})`;
}

// 初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
});

// 定时器
setInterval(() => moveCarousel(1), 6000);

// 初始化导航栏按钮的激活状态
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links li.dropdown');
  const activeDropdown = document.querySelector('.nav-links li.dropdown.active');

  // 默认展开第一个下拉列表
  if (activeDropdown) {
    activeDropdown.classList.add('active');
  }

  // 添加点击事件
  navLinks.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    dropdownLink.addEventListener('click', (e) => {
      e.preventDefault(); // 阻止默认跳转行为
      navLinks.forEach(link => link.classList.remove('active'));
      dropdown.classList.add('active');
    });
  });
});
// 加载作品集数据
document.addEventListener('DOMContentLoaded', () => {
  // 加载作品集数据
  fetch('assets.json')
    .then(response => response.json())
    .then(data => {
      const portfolioItems = data.portfolioItems;
      const container = document.querySelector('.portfolio-items');

      portfolioItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.dataset.category = item.type; // 隐藏分类信息
        div.innerHTML = `
          <img class="thumbnail" src="${item.thumbnail}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        `;
        container.appendChild(div);
      });

      // 初始化分类按钮
      const categoryButtons = document.querySelectorAll('.category-btn');
      categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
          const category = button.dataset.category;
          filterWorks(category);
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
        });
      });

      // 初始激活“全部”按钮
      categoryButtons[0].classList.add('active');
    });

  // 过滤作品
  function filterWorks(category) {
    const works = document.querySelectorAll('.portfolio-item');
    works.forEach(work => {
      if (category === 'all') {
        work.style.display = 'flex';
      } else {
        work.style.display = work.dataset.category === category ? 'flex' : 'none';
      }
    });
  }
});