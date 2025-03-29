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