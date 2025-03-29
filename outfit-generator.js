// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化穿搭生成页面
    initOutfitGenerator();
});

// 初始化穿搭生成页面
function initOutfitGenerator() {
    // 设置状态栏时间
    updateStatusBarTime();
    
    // 设置选项选择功能
    setupSelectionOptions();
    
    // 设置生成按钮功能
    setupGenerateButton();
    
    // 设置结果区域交互
    setupResultInteractions();
    
    // 设置历史记录交互
    setupHistoryInteractions();
}

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

// 设置选项选择功能
function setupSelectionOptions() {
    // 场景选择
    setupSceneOptions();
    
    // 风格选择
    setupStyleOptions();
    
    // 颜色选择
    setupColorOptions();
}

// 设置场景选择
function setupSceneOptions() {
    const sceneOptions = document.querySelectorAll('.scene-option');
    
    sceneOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的活动状态
            sceneOptions.forEach(item => item.classList.remove('active'));
            
            // 添加当前选项的活动状态
            this.classList.add('active');
            
            // 获取场景名称
            const sceneName = this.querySelector('span').textContent;
            console.log(`选择场景: ${sceneName}`);
        });
    });
}

// 设置风格选择
function setupStyleOptions() {
    const styleOptions = document.querySelectorAll('.style-option');
    
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的活动状态
            styleOptions.forEach(item => item.classList.remove('active'));
            
            // 添加当前选项的活动状态
            this.classList.add('active');
            
            // 获取风格名称
            const styleName = this.querySelector('span').textContent;
            console.log(`选择风格: ${styleName}`);
        });
    });
}

// 设置颜色选择
function setupColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的活动状态
            colorOptions.forEach(item => item.classList.remove('active'));
            
            // 添加当前选项的活动状态
            this.classList.add('active');
            
            // 获取选中的颜色（使用背景色）
            const colorValue = this.style.backgroundColor;
            console.log(`选择颜色: ${colorValue}`);
        });
    });
}

// 设置生成按钮功能
function setupGenerateButton() {
    const generateBtn = document.querySelector('.generate-btn');
    
    generateBtn.addEventListener('click', function() {
        console.log('生成穿搭');
        
        // 添加按钮点击效果
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 200);
        
        // 显示生成中提示
        showToast('正在为您生成穿搭方案...');
        
        // 模拟生成过程（实际应用中会根据选择的选项调用API）
        setTimeout(() => {
            // 显示结果区域
            showOutfitResult();
        }, 1500);
    });
}

// 显示穿搭结果
function showOutfitResult() {
    const resultContainer = document.querySelector('.result-container');
    
    // 如果结果区域是隐藏的，显示它
    if (resultContainer.style.display === 'none') {
        resultContainer.style.display = 'block';
        
        // 添加显示动画
        resultContainer.style.opacity = '0';
        resultContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultContainer.style.transition = 'all 0.3s ease-out';
            resultContainer.style.opacity = '1';
            resultContainer.style.transform = 'translateY(0)';
        }, 10);
        
        // 滚动到结果区域
        setTimeout(() => {
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// 设置结果区域交互
function setupResultInteractions() {
    // 设置重新生成按钮
    const regenerateBtn = document.querySelector('.result-actions .fa-redo-alt');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', function() {
            console.log('重新生成穿搭');
            showToast('正在为您重新生成穿搭方案...');
            
            // 模拟重新生成过程
            setTimeout(() => {
                // 更新结果内容（实际应用中会调用API）
                updateOutfitResult();
            }, 1500);
        });
    }
    
    // 设置分享按钮
    const shareBtn = document.querySelector('.result-actions .fa-share-alt');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            console.log('分享穿搭');
            showToast('分享到社区');
        });
    }
    
    // 设置保存穿搭按钮
    const saveOutfitBtn = document.querySelector('.save-outfit-btn');
    if (saveOutfitBtn) {
        saveOutfitBtn.addEventListener('click', function() {
            console.log('保存穿搭');
            showToast('已保存到我的穿搭');
        });
    }
    
    // 设置分享穿搭按钮
    const shareOutfitBtn = document.querySelector('.share-outfit-btn');
    if (shareOutfitBtn) {
        shareOutfitBtn.addEventListener('click', function() {
            console.log('分享穿搭到社区');
            showToast('已分享到社区');
        });
    }
}

// 更新穿搭结果内容（模拟）
function updateOutfitResult() {
    // 在实际应用中，这里会使用新的数据更新结果视图
    // 这里只是简单模拟效果：添加淡出淡入动画
    
    const outfitCombination = document.querySelector('.outfit-combination');
    
    // 淡出
    outfitCombination.style.transition = 'opacity 0.3s ease';
    outfitCombination.style.opacity = '0';
    
    setTimeout(() => {
        // 这里可以更新内容
        
        // 淡入
        outfitCombination.style.opacity = '1';
    }, 300);
}

// 设置历史记录交互
function setupHistoryInteractions() {
    const historyItems = document.querySelectorAll('.history-item');
    const viewAllBtn = document.querySelector('.history-section .view-all');
    
    // 历史记录项点击事件
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.history-title').textContent;
            console.log(`查看历史穿搭: ${title}`);
            showToast(`加载历史穿搭: ${title}`);
        });
    });
    
    // 查看全部按钮点击事件
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            console.log('查看全部历史穿搭');
            showToast('查看全部历史穿搭');
        });
    }
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