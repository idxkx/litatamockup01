// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    
    // 设置底部导航交互
    setupTabBarNavigation();
    
    // 添加水平滚动区域的触摸滑动效果
    enhanceScrollableAreas();
    
    // 添加按钮点击效果
    setupButtonEffects();
    
    // 模拟iOS页面转场效果
    setupPageTransitions();
    
    // 设置快速穿搭交互
    setupQuickOutfitInteraction();
});

// 更新状态栏时间
function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-bar-time');
    
    function setTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // 格式化为两位数
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        timeElement.textContent = `${hours}:${minutes}`;
    }
    
    // 立即设置一次
    setTime();
    
    // 每分钟更新一次
    setInterval(setTime, 60000);
}

// 设置底部标签栏导航
function setupTabBarNavigation() {
    const tabItems = document.querySelectorAll('.tab-item');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            // 获取当前标签名称
            const tabName = this.querySelector('span').textContent;
            
            // 如果当前页面已经是该标签页，不执行跳转
            if (this.classList.contains('active')) {
                console.log(`已在${tabName}页面`);
                return;
            }
            
            // 添加页面跳转前的过渡效果
            const contentContainer = document.querySelector('.content-container');
            if (contentContainer) {
                contentContainer.classList.add('slide-out');
            }
            
            // 延迟一小段时间后执行页面跳转
            setTimeout(() => {
                switch (tabName) {
                    case '发现':
                        window.location.href = 'index.html';
                        break;
                    case '衣橱':
                        window.location.href = 'wardrobe.html';
                        break;
                    case '穿搭':
                        window.location.href = 'outfit-generator.html';
                        break;
                    case '社区':
                        window.location.href = 'community.html';
                        break;
                    case '我的':
                        window.location.href = 'profile.html';
                        break;
                    default:
                        console.log(`未知标签: ${tabName}`);
                        break;
                }
            }, 100);
        });
    });
    
    // 根据当前页面URL自动设置活动标签
    setActiveTabByCurrentPage();
}

// 根据当前页面URL设置活动标签
function setActiveTabByCurrentPage() {
    const currentPath = window.location.pathname;
    const fileName = currentPath.split('/').pop();
    
    const tabItems = document.querySelectorAll('.tab-item');
    
    // 移除所有活动状态
    tabItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 根据当前页面设置活动标签
    if (fileName === 'index.html' || fileName === '' || fileName === '/') {
        // 首页/发现页
        const discoverTab = document.querySelector('.tab-item:nth-child(1)');
        if (discoverTab) discoverTab.classList.add('active');
    } else if (fileName === 'wardrobe.html') {
        // 衣橱页
        const wardrobeTab = document.querySelector('.tab-item:nth-child(2)');
        if (wardrobeTab) wardrobeTab.classList.add('active');
    } else if (fileName === 'outfit-generator.html') {
        // 穿搭页
        const outfitTab = document.querySelector('.tab-item:nth-child(3)');
        if (outfitTab) outfitTab.classList.add('active');
    } else if (fileName === 'community.html') {
        // 社区页
        const communityTab = document.querySelector('.tab-item:nth-child(4)');
        if (communityTab) communityTab.classList.add('active');
    } else if (fileName === 'profile.html') {
        // 个人中心页
        const profileTab = document.querySelector('.tab-item:nth-child(5)');
        if (profileTab) profileTab.classList.add('active');
    }
}

// 模拟页面切换
function simulatePageChange(tabName) {
    const contentContainer = document.querySelector('.content-container');
    
    // 添加切出动画
    contentContainer.classList.add('slide-out');
    
    // 动画结束后切换内容
    setTimeout(() => {
        // 在实际应用中，这里会根据标签名加载不同的内容
        
        // 移除切出动画，添加切入动画
        contentContainer.classList.remove('slide-out');
        contentContainer.classList.add('slide-in');
        
        // 动画完成后清除
        setTimeout(() => {
            contentContainer.classList.remove('slide-in');
        }, 300);
    }, 300);
}

// 增强可滚动区域的滑动体验
function enhanceScrollableAreas() {
    const scrollableAreas = document.querySelectorAll('.outfit-scroll');
    
    scrollableAreas.forEach(area => {
        // 添加触摸滑动效果
        let isDown = false;
        let startX;
        let scrollLeft;
        
        area.addEventListener('mousedown', (e) => {
            isDown = true;
            area.classList.add('active');
            startX = e.pageX - area.offsetLeft;
            scrollLeft = area.scrollLeft;
        });
        
        area.addEventListener('mouseleave', () => {
            isDown = false;
            area.classList.remove('active');
        });
        
        area.addEventListener('mouseup', () => {
            isDown = false;
            area.classList.remove('active');
        });
        
        area.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - area.offsetLeft;
            const walk = (x - startX) * 2; // 滚动速度
            area.scrollLeft = scrollLeft - walk;
        });
    });
}

// 设置按钮点击效果
function setupButtonEffects() {
    const buttons = document.querySelectorAll('button, .outfit-item, .popular-item, .quick-outfit-item');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击反馈效果
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.9';
            
            // 恢复原状
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 150);
            
            // 如果是一键生成按钮，添加特殊处理
            if (this.classList.contains('primary-button')) {
                console.log('生成穿搭...');
                showToast('正在为您生成今日穿搭...');
            }
        });
    });
}

// 设置页面转场效果
function setupPageTransitions() {
    // 添加点击查看全部的交互
    const viewAllLinks = document.querySelectorAll('.view-all, .section-more');
    
    viewAllLinks.forEach(link => {
        link.addEventListener('click', function() {
            const sectionTitle = this.parentElement.querySelector('h2, .section-title')?.textContent || '内容';
            console.log(`查看全部 ${sectionTitle}`);
            showToast(`正在加载更多${sectionTitle}...`);
        });
    });
}

// 设置快速穿搭交互
function setupQuickOutfitInteraction() {
    const quickOutfitItems = document.querySelectorAll('.quick-outfit-item');
    
    quickOutfitItems.forEach(item => {
        item.addEventListener('click', function() {
            // 获取场景名称
            const sceneName = this.querySelector('.quick-title').textContent;
            
            // 添加点击反馈样式
            this.classList.add('active');
            
            // 显示加载提示
            showToast(`正在为您生成${sceneName}场景穿搭...`);
            
            // 模拟加载，500ms后显示生成结果
            setTimeout(() => {
                // 移除点击反馈样式
                this.classList.remove('active');
                
                // 模拟打开场景穿搭页面
                showSceneOutfitModal(sceneName);
            }, 500);
        });
    });
}

// 显示场景穿搭模态框
function showSceneOutfitModal(sceneName) {
    // 检查是否已存在模态框
    let modal = document.querySelector('.scene-outfit-modal');
    
    // 如果不存在，创建新的模态框
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'scene-outfit-modal';
        document.body.appendChild(modal);
    }
    
    // 根据不同场景准备不同的穿搭建议和图片
    let outfitImage, outfitTitle, outfitDescription;
    
    switch(sceneName) {
        case '上班族':
            outfitImage = 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            outfitTitle = '职场精英风格';
            outfitDescription = '简约大气的西装搭配修身裤装，展现职场自信与专业形象';
            break;
        case '学生党':
            outfitImage = 'https://images.unsplash.com/photo-1613375920388-f1f70f341431?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            outfitTitle = '青春校园风格';
            outfitDescription = '舒适休闲的T恤搭配牛仔裤，活力清新又不失时尚感';
            break;
        case '约会':
            outfitImage = 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            outfitTitle = '浪漫约会风格';
            outfitDescription = '精致优雅的连衣裙搭配细节配饰，展现甜美气质吸引眼球';
            break;
        case '派对':
            outfitImage = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            outfitTitle = '活力派对风格';
            outfitDescription = '亮色系单品搭配个性饰品，成为派对焦点散发独特魅力';
            break;
        default:
            outfitImage = 'https://images.unsplash.com/photo-1589465885857-44edb59bbff2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            outfitTitle = '日常休闲风格';
            outfitDescription = '舒适百搭的单品组合，轻松应对各种日常场景';
    }
    
    // 设置模态框内容
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${sceneName}穿搭推荐</h3>
                <i class="fas fa-times close-modal"></i>
            </div>
            <div class="modal-body">
                <div class="outfit-preview">
                    <img src="${outfitImage}" alt="${sceneName}穿搭">
                </div>
                <div class="outfit-details">
                    <h4>${outfitTitle}</h4>
                    <p>${outfitDescription}</p>
                    <div class="outfit-items">
                        <div class="outfit-item-tag">上装: 白色衬衫/T恤</div>
                        <div class="outfit-item-tag">下装: 修身长裤/裙装</div>
                        <div class="outfit-item-tag">鞋子: 百搭平底鞋/小皮鞋</div>
                        <div class="outfit-item-tag">配饰: 简约手表/项链</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="save-outfit-btn">保存到我的穿搭</button>
                <button class="try-outfit-btn">试试看</button>
            </div>
        </div>
    `;
    
    // 显示模态框
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // 绑定关闭事件
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    });
    
    // 绑定按钮点击事件
    const saveBtn = modal.querySelector('.save-outfit-btn');
    const tryBtn = modal.querySelector('.try-outfit-btn');
    
    saveBtn.addEventListener('click', () => {
        showToast('已保存到我的穿搭');
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }, 1000);
    });
    
    tryBtn.addEventListener('click', () => {
        showToast('正在为您搭配衣橱中的相似单品...');
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }, 1000);
    });
}

// 显示Toast消息
function showToast(message) {
    // 如果已有Toast，先移除
    const existingToast = document.querySelector('.ios-toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    // 创建新Toast
    const toast = document.createElement('div');
    toast.className = 'ios-toast';
    toast.textContent = message;
    
    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '20px';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '10000';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease-in-out';
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示Toast
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        
        // 移除元素
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
} 