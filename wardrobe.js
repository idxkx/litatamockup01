// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化衣橱管理页面
    initWardrobePage();
});

// 初始化衣橱管理页面
function initWardrobePage() {
    // 设置分类标签切换
    setupCategoryTabs();
    
    // 设置添加衣物功能
    setupAddItemFunctionality();
    
    // 设置过滤和排序功能
    setupFilterAndSort();
    
    // 设置衣物项操作
    setupClothingItemActions();
}

// 设置分类标签切换
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tabs .tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的活动状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 添加当前标签的活动状态
            this.classList.add('active');
            
            // 获取选中的分类
            const category = this.textContent;
            console.log(`选择分类: ${category}`);
            
            // 过滤衣物显示 (模拟)
            filterClothingItems(category);
        });
    });
}

// 过滤衣物显示（模拟）
function filterClothingItems(category) {
    const clothingItems = document.querySelectorAll('.clothing-item');
    
    clothingItems.forEach(item => {
        const itemCategory = item.querySelector('.item-category').textContent;
        
        if (category === '全部' || category === itemCategory) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // 显示结果提示
    showToast(`已为您筛选${category}分类的衣物`);
}

// 设置添加衣物功能
function setupAddItemFunctionality() {
    const addBtn = document.querySelector('.add-item-btn');
    const floatingAddBtn = document.querySelector('.floating-add-btn');
    const modal = document.querySelector('.add-item-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    const saveBtn = document.querySelector('.save-btn');
    
    // 打开模态框
    function openModal() {
        modal.classList.add('active');
        // 添加iOS风格的进入动画
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease-out';
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 10);
    }
    
    // 关闭模态框
    function closeModal() {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            modalContent.style.transition = '';
        }, 300);
    }
    
    // 绑定打开模态框事件
    addBtn.addEventListener('click', openModal);
    floatingAddBtn.addEventListener('click', openModal);
    
    // 绑定关闭模态框事件
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // 设置可选择标签的切换功能
    const selectableTags = document.querySelectorAll('.tag.selectable');
    selectableTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });
    
    // 设置保存按钮事件
    saveBtn.addEventListener('click', function() {
        // 模拟保存新衣物
        closeModal();
        showToast('新衣物已添加到您的衣橱');
    });
    
    // 设置图片上传预览
    const uploadContainer = document.querySelector('.image-upload-container');
    uploadContainer.addEventListener('click', function() {
        // 模拟图片选择对话框
        console.log('选择图片');
        showToast('选择图片上传');
        
        // 模拟上传后的预览（在实际应用中会有文件选择器）
        setTimeout(() => {
            const placeholder = this.querySelector('.upload-placeholder');
            placeholder.innerHTML = '<img src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" alt="预览图片">';
        }, 1000);
    });
}

// 设置过滤和排序功能
function setupFilterAndSort() {
    const filterItems = document.querySelectorAll('.filter-item');
    
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            const actionType = this.querySelector('span').textContent;
            console.log(`点击了 ${actionType}`);
            
            // 根据不同的操作类型执行相应功能
            switch(actionType) {
                case '筛选':
                    showFilterOptions();
                    break;
                case '排序':
                    showSortOptions();
                    break;
                case '视图':
                    toggleViewMode();
                    break;
            }
        });
    });
}

// 显示筛选选项（模拟）
function showFilterOptions() {
    showToast('打开筛选选项');
    // 这里可以弹出筛选菜单
}

// 显示排序选项（模拟）
function showSortOptions() {
    showToast('打开排序选项');
    // 这里可以弹出排序菜单
}

// 切换视图模式（模拟）
function toggleViewMode() {
    const grid = document.querySelector('.wardrobe-grid');
    
    // 在网格和列表视图之间切换
    if (grid.style.gridTemplateColumns === 'repeat(1, 1fr)') {
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        showToast('切换为网格视图');
    } else {
        grid.style.gridTemplateColumns = 'repeat(1, 1fr)';
        showToast('切换为列表视图');
    }
}

// 设置衣物项操作
function setupClothingItemActions() {
    const clothingItems = document.querySelectorAll('.clothing-item');
    const actionBtns = document.querySelectorAll('.clothing-actions');
    
    // 衣物项点击事件
    clothingItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 防止点击操作按钮时触发
            if (!e.target.closest('.clothing-actions')) {
                const clothingName = this.querySelector('.clothing-name').textContent;
                console.log(`查看衣物: ${clothingName}`);
                showToast(`查看衣物详情: ${clothingName}`);
            }
        });
    });
    
    // 操作按钮点击事件
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止冒泡
            
            const clothingItem = this.closest('.clothing-item');
            const clothingName = clothingItem.querySelector('.clothing-name').textContent;
            
            // 显示操作菜单（模拟）
            showItemActionMenu(clothingName);
        });
    });
}

// 显示衣物操作菜单（模拟）
function showItemActionMenu(clothingName) {
    console.log(`显示 ${clothingName} 的操作菜单`);
    showToast(`编辑 "${clothingName}" 的信息`);
}

// 显示Toast消息（复用主脚本中的函数）
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