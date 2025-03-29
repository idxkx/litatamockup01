// 收藏详情页面脚本

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
    
    // 设置返回按钮
    document.querySelector('.back-button').addEventListener('click', function() {
        window.history.back();
    });
    
    // 设置筛选选项点击
    setupFilterOptions();
    
    // 设置排序按钮点击
    setupSortButton();
    
    // 设置项目操作按钮点击
    setupItemActions();
    
    // 设置加载更多按钮
    setupLoadMore();
    
    // 设置底部菜单按钮
    setupBottomMenu();
});

// 更新状态栏时间
function updateStatusBarTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // 格式化时间
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    document.querySelector('.status-bar-time').textContent = `${hours}:${minutes}`;
}

// 设置筛选选项点击
function setupFilterOptions() {
    const filterOptions = document.querySelectorAll('.filter-option');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的active类
            filterOptions.forEach(opt => {
                opt.classList.remove('active');
            });
            
            // 给当前点击的选项添加active类
            this.classList.add('active');
            
            // 根据筛选选项过滤内容
            filterCollectionItems(this.textContent.trim());
        });
    });
}

// 根据筛选选项过滤收藏内容
function filterCollectionItems(filterType) {
    const items = document.querySelectorAll('.collection-item');
    
    // 显示加载中的Toast
    showToast(`筛选: ${filterType}`);
    
    if (filterType === '全部') {
        // 显示所有项目
        items.forEach(item => {
            item.style.display = 'flex';
        });
    } else {
        // 根据类型筛选
        items.forEach(item => {
            const tags = item.querySelectorAll('.item-tags span');
            let matchFound = false;
            
            // 检查标签是否匹配筛选类型
            tags.forEach(tag => {
                if (tag.textContent === filterType) {
                    matchFound = true;
                }
            });
            
            // 对于单品项目，检查类型
            if (item.classList.contains('product-item')) {
                const itemType = item.querySelector('.item-type').textContent;
                if (itemType === filterType) {
                    matchFound = true;
                }
            }
            
            // 根据匹配结果显示或隐藏
            item.style.display = matchFound ? 'flex' : 'none';
        });
    }
}

// 设置排序按钮点击
function setupSortButton() {
    const sortButton = document.querySelector('.sort-button');
    const sortModal = document.querySelector('.sort-modal');
    const modalOverlay = sortModal.querySelector('.modal-overlay');
    const closeButton = sortModal.querySelector('.close-modal');
    const sortOptions = sortModal.querySelectorAll('.modal-option');
    
    // 打开排序模态框
    sortButton.addEventListener('click', function() {
        sortModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });
    
    // 点击遮罩层关闭模态框
    modalOverlay.addEventListener('click', function() {
        closeModal();
    });
    
    // 点击关闭按钮关闭模态框
    closeButton.addEventListener('click', function() {
        closeModal();
    });
    
    // 点击排序选项
    sortOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除所有选项的active类
            sortOptions.forEach(opt => {
                opt.classList.remove('active');
                opt.querySelector('i')?.remove();
            });
            
            // 给当前点击的选项添加active类
            this.classList.add('active');
            
            // 添加勾选图标
            if (!this.querySelector('i')) {
                const checkIcon = document.createElement('i');
                checkIcon.className = 'fas fa-check';
                this.appendChild(checkIcon);
            }
            
            // 获取排序类型
            const sortType = this.querySelector('span').textContent;
            
            // 根据排序类型对内容进行排序
            sortCollectionItems(sortType);
            
            // 关闭模态框
            closeModal();
        });
    });
    
    // 关闭模态框的函数
    function closeModal() {
        sortModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
    }
}

// 根据排序类型排序收藏内容
function sortCollectionItems(sortType) {
    const container = document.querySelector('.collection-items');
    const items = Array.from(container.children);
    
    showToast(`排序方式: ${sortType}`);
    
    // 根据不同的排序类型对项目进行排序
    if (sortType === '最近添加') {
        // 默认顺序，不做任何改变
    } else if (sortType === '最早添加') {
        // 反转顺序
        items.reverse();
    } else if (sortType === '点赞数量') {
        // 按点赞数排序
        items.sort((a, b) => {
            const likesA = a.querySelector('.item-meta span:first-child');
            const likesB = b.querySelector('.item-meta span:first-child');
            
            if (likesA && likesB) {
                const countA = parseInt(likesA.textContent.match(/\d+/)[0]);
                const countB = parseInt(likesB.textContent.match(/\d+/)[0]);
                return countB - countA; // 降序
            }
            
            return 0;
        });
    } else if (sortType === '评论数量') {
        // 按评论数排序
        items.sort((a, b) => {
            const commentsA = a.querySelector('.item-meta span:nth-child(2)');
            const commentsB = b.querySelector('.item-meta span:nth-child(2)');
            
            if (commentsA && commentsB) {
                const countA = parseInt(commentsA.textContent.match(/\d+/)[0]);
                const countB = parseInt(commentsB.textContent.match(/\d+/)[0]);
                return countB - countA; // 降序
            }
            
            return 0;
        });
    }
    
    // 重新添加排序后的项目
    items.forEach(item => {
        container.appendChild(item);
    });
}

// 设置项目操作按钮点击
function setupItemActions() {
    const actionButtons = document.querySelectorAll('.item-actions');
    const actionsModal = document.querySelector('.item-actions-modal');
    const modalOverlay = actionsModal.querySelector('.modal-overlay');
    const modalOptions = actionsModal.querySelectorAll('.modal-option');
    const cancelButton = actionsModal.querySelector('.modal-cancel button');
    
    let currentItem = null; // 当前操作的项目
    
    // 点击项目操作按钮
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止事件冒泡
            currentItem = this.closest('.collection-item');
            actionsModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 点击遮罩层关闭模态框
    modalOverlay.addEventListener('click', function() {
        closeModal();
    });
    
    // 点击取消按钮关闭模态框
    cancelButton.addEventListener('click', function() {
        closeModal();
    });
    
    // 点击操作选项
    modalOptions.forEach(option => {
        option.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            // 根据操作类型处理不同的行为
            handleItemAction(action, currentItem);
            
            // 关闭模态框
            closeModal();
        });
    });
    
    // 关闭模态框的函数
    function closeModal() {
        actionsModal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复背景滚动
        currentItem = null;
    }
}

// 处理项目操作
function handleItemAction(action, item) {
    if (!item) return;
    
    const itemTitle = item.querySelector('.item-title').textContent;
    
    switch (action) {
        case '查看详情':
            showToast(`查看详情: ${itemTitle}`);
            // 这里可以跳转到详情页面
            if (item.classList.contains('outfit-item')) {
                window.location.href = 'outfit-detail.html';
            } else {
                // 对于单品，可以跳转到单品详情页
                showToast('单品详情页暂未实现');
            }
            break;
        case '从收藏中移除':
            // 在真实环境中应该调用API删除
            item.style.opacity = '0';
            item.style.transition = 'opacity 0.3s';
            setTimeout(() => {
                item.remove();
            }, 300);
            showToast(`已从收藏中移除: ${itemTitle}`);
            break;
        case '移动到其他收藏夹':
            showToast(`将 ${itemTitle} 移动到其他收藏夹`);
            // 这里可以打开一个选择收藏夹的模态框
            break;
        case '分享':
            showToast(`分享: ${itemTitle}`);
            // 这里可以打开分享面板
            break;
    }
}

// 设置加载更多按钮
function setupLoadMore() {
    const loadMoreButton = document.querySelector('.load-more-button');
    
    loadMoreButton.addEventListener('click', function() {
        // 显示加载中状态
        this.textContent = '加载中...';
        this.disabled = true;
        
        // 模拟加载更多内容
        setTimeout(() => {
            // 加载更多内容
            loadMoreContent();
            
            // 恢复按钮状态
            this.textContent = '加载更多';
            this.disabled = false;
        }, 1000);
    });
}

// 加载更多内容
function loadMoreContent() {
    const container = document.querySelector('.collection-items');
    
    // 模拟新加载的内容
    const newItems = [
        createOutfitItem('初秋出街穿搭', 'images/outfit5.jpg', 76, 9, ['秋季', '街头']),
        createProductItem('针织开衫', 'images/product3.jpg', 'Uniqlo', '199'),
        createOutfitItem('休闲周末风', 'images/outfit6.jpg', 102, 23, ['休闲', '周末'])
    ];
    
    // 添加新内容到容器
    newItems.forEach(item => {
        container.appendChild(item);
    });
    
    // 为新项目添加操作事件
    setupNewItemActions();
    
    showToast('已加载更多内容');
}

// 创建穿搭项目元素
function createOutfitItem(title, imgSrc, likes, comments, tags) {
    const item = document.createElement('div');
    item.className = 'collection-item outfit-item';
    
    let tagsHTML = '';
    tags.forEach(tag => {
        tagsHTML += `<span>${tag}</span>`;
    });
    
    item.innerHTML = `
        <div class="item-image">
            <img src="${imgSrc}" alt="${title}">
            <div class="item-type">穿搭</div>
        </div>
        <div class="item-info">
            <h3 class="item-title">${title}</h3>
            <div class="item-meta">
                <span><i class="far fa-heart"></i> ${likes}</span>
                <span><i class="far fa-comment"></i> ${comments}</span>
            </div>
            <div class="item-tags">
                ${tagsHTML}
            </div>
        </div>
        <div class="item-actions">
            <i class="fas fa-ellipsis-v"></i>
        </div>
    `;
    
    return item;
}

// 创建单品项目元素
function createProductItem(title, imgSrc, brand, price) {
    const item = document.createElement('div');
    item.className = 'collection-item product-item';
    
    item.innerHTML = `
        <div class="item-image">
            <img src="${imgSrc}" alt="${title}">
            <div class="item-type">单品</div>
        </div>
        <div class="item-info">
            <h3 class="item-title">${title}</h3>
            <div class="item-brand">${brand}</div>
            <div class="item-price">¥${price}</div>
        </div>
        <div class="item-actions">
            <i class="fas fa-ellipsis-v"></i>
        </div>
    `;
    
    return item;
}

// 为新添加的项目设置操作事件
function setupNewItemActions() {
    const newActionButtons = document.querySelectorAll('.collection-item:not([data-has-action])');
    
    newActionButtons.forEach(item => {
        const actionButton = item.querySelector('.item-actions');
        
        actionButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const currentItem = this.closest('.collection-item');
            const actionsModal = document.querySelector('.item-actions-modal');
            
            actionsModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // 记录当前操作的项目
            window.currentActionItem = currentItem;
        });
        
        // 标记已添加事件
        item.setAttribute('data-has-action', 'true');
    });
}

// 设置底部菜单按钮
function setupBottomMenu() {
    const addButton = document.querySelector('.menu-button.add-button');
    const selectButton = document.querySelector('.menu-button.select-button');
    
    // 点击添加按钮
    addButton.addEventListener('click', function() {
        showToast('添加穿搭功能开发中');
    });
    
    // 点击多选按钮
    selectButton.addEventListener('click', function() {
        showToast('多选功能开发中');
    });
    
    // 设置分享和编辑按钮
    setupCollectionActions();
}

// 设置收藏集操作按钮
function setupCollectionActions() {
    const shareButton = document.querySelector('.collection-actions .primary-button');
    const editButton = document.querySelector('.collection-actions .action-button:not(.primary-button)');
    
    // 点击分享按钮
    shareButton.addEventListener('click', function() {
        showToast('分享收藏集功能开发中');
    });
    
    // 点击编辑按钮
    editButton.addEventListener('click', function() {
        showToast('编辑收藏集功能开发中');
    });
}

// 显示Toast提示
function showToast(message) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加样式
    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.padding = '10px 20px';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.borderRadius = '20px';
    toast.style.zIndex = '1000';
    toast.style.fontSize = '14px';
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 500);
    }, 2000);
} 