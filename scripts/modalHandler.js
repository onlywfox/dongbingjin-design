// 模态框管理器
export class ModalSystem {
    constructor() {
        this.modal = this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    bindEvents() {
        this.modal.querySelector('.close-btn').addEventListener('click', () => this.close());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
    }

    open(content) {
        this.modal.querySelector('.modal-body').innerHTML = content;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// 作品详情加载
export async function loadWorkDetail(id) {
    const response = await fetch(`data/works.json`);
    const works = await response.json();
    const work = works.find(w => w.id === id);
    
    return `
        <div class="detail-grid">
            <div class="media-column">
                ${work.video ? `
                    <video controls autoplay muted loop>
                        <source src="${work.video}" type="video/mp4">
                    </video>
                ` : `
                    <img src="${work.thumbnail}" alt="${work.title}">
                `}
            </div>
            <div class="info-column">
                <h2>${work.title}</h2>
                <div class="tech-stack">
                    ${work.software.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <p>${work.description}</p>
                <div class="meta-data">
                    <div class="meta-item">
                        <i class="icon-calendar"></i>
                        ${work.date}
                    </div>
                    <div class="meta-item">
                        <i class="icon-clock"></i>
                        ${work.duration}周完成
                    </div>
                </div>
            </div>
        </div>
    `;
}