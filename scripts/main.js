// 在JavaScript文件中初始化Swiper实例
document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        // 配置选项
        loop: true, // 循环模式选项
        autoplay: {
            delay: 5000, // 自动播放的延迟时间，单位为毫秒
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
