// 初始化粒子动画
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('Particle animation loaded');
});

// 弹出窗口功能
function showPopup(title, details) {
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popup-title');
  const popupDetails = document.getElementById('popup-details');

  popupTitle.textContent = title;
  popupDetails.textContent = details;
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

// 加密表单提交
function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('contact-form'));
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // 加密表单数据
  const encryptedData = btoa(JSON.stringify({ name, email, message }));

  // 发送加密数据到服务器
  fetch('https://your-server.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: encryptedData }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert('Message sent successfully!');
    })
    .catch((error) => {
      alert('Error sending message');
    });
}

document.getElementById('contact-form').addEventListener('submit', submitForm);