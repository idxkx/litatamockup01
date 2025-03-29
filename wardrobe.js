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
    
    // 设置批量管理功能
    setupBatchManagement();
    
    // 设置无限滚动加载更多
    setupInfiniteScroll();
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

// 设置批量管理功能
function setupBatchManagement() {
    const manageBtn = document.querySelector('.floating-manage-btn');
    const batchActionsBar = document.querySelector('.batch-actions-bar');
    const wardrobeGrid = document.querySelector('.wardrobe-grid');
    const contentContainer = document.querySelector('.content-container');
    const selectAllCheckbox = document.getElementById('selectAll');
    const selectionCounter = createSelectionCounter();
    const batchButtons = document.querySelectorAll('.batch-btn');
    
    // 创建选择计数器
    function createSelectionCounter() {
        const counter = document.createElement('div');
        counter.className = 'selection-counter';
        counter.textContent = '已选择 0 件衣物';
        document.body.appendChild(counter);
        return counter;
    }
    
    // 更新选择计数
    function updateSelectionCount() {
        const selectedItems = wardrobeGrid.querySelectorAll('.clothing-item.selected');
        const count = selectedItems.length;
        
        selectionCounter.textContent = `已选择 ${count} 件衣物`;
        
        // 更新所有模态框中的计数
        if (document.getElementById('selectedCount')) {
            document.getElementById('selectedCount').textContent = count;
        }
        if (document.getElementById('selectedMoveCount')) {
            document.getElementById('selectedMoveCount').textContent = count;
        }
        if (document.getElementById('deleteCount')) {
            document.getElementById('deleteCount').textContent = count;
        }
        
        // 显示/隐藏选择计数器
        if (count > 0 && wardrobeGrid.classList.contains('select-mode')) {
            selectionCounter.classList.add('active');
        } else {
            selectionCounter.classList.remove('active');
        }
        
        // 更新全选状态
        const allItems = wardrobeGrid.querySelectorAll('.clothing-item');
        selectAllCheckbox.checked = count > 0 && count === allItems.length;
    }
    
    // 进入批量管理模式
    function enterBatchMode() {
        wardrobeGrid.classList.add('select-mode');
        contentContainer.classList.add('select-mode');
        batchActionsBar.classList.add('active');
        manageBtn.style.display = 'none';
        
        // 绑定选择事件到衣物项
        const clothingItems = document.querySelectorAll('.clothing-item');
        clothingItems.forEach(item => {
            // 移除之前可能存在的事件监听器
            item.removeEventListener('click', toggleSelectItem);
            // 添加新的事件监听器
            item.addEventListener('click', toggleSelectItem);
        });
        
        // 初始化选择状态
        updateSelectionCount();
        
        // 显示toast提示
        showToast('已进入批量管理模式，点击衣物可选择');
    }
    
    // 退出批量管理模式
    function exitBatchMode() {
        wardrobeGrid.classList.remove('select-mode');
        contentContainer.classList.remove('select-mode');
        batchActionsBar.classList.remove('active');
        manageBtn.style.display = 'flex';
        selectionCounter.classList.remove('active');
        
        // 移除所有选择状态
        const clothingItems = document.querySelectorAll('.clothing-item');
        clothingItems.forEach(item => {
            item.classList.remove('selected');
            item.removeEventListener('click', toggleSelectItem);
            
            // 恢复普通点击事件
            item.addEventListener('click', function(e) {
                if (!e.target.closest('.clothing-actions')) {
                    const clothingName = this.querySelector('.clothing-name').textContent;
                    showToast(`查看衣物详情: ${clothingName}`);
                }
            });
        });
        
        showToast('已退出批量管理模式');
    }
    
    // 切换选择状态
    function toggleSelectItem(e) {
        // 阻止冒泡防止触发衣物详情
        e.stopPropagation();
        
        if (!wardrobeGrid.classList.contains('select-mode')) return;
        
        // 不要在点击操作按钮时选择
        if (e.target.closest('.clothing-actions')) return;
        
        this.classList.toggle('selected');
        updateSelectionCount();
    }
    
    // 绑定批量管理按钮事件
    manageBtn.addEventListener('click', enterBatchMode);
    
    // 添加退出批量模式的按钮
    const exitBatchBtn = document.createElement('div');
    exitBatchBtn.className = 'floating-exit-btn';
    exitBatchBtn.innerHTML = '<i class="fas fa-times"></i>';
    exitBatchBtn.style.display = 'none';
    document.body.appendChild(exitBatchBtn);
    
    exitBatchBtn.addEventListener('click', exitBatchMode);
    
    // 当进入批量模式时显示退出按钮
    manageBtn.addEventListener('click', function() {
        exitBatchBtn.style.display = 'flex';
    });
    
    // 绑定全选事件
    selectAllCheckbox.addEventListener('change', function() {
        const clothingItems = document.querySelectorAll('.clothing-item');
        clothingItems.forEach(item => {
            if (this.checked) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
        updateSelectionCount();
    });
    
    // 设置批量操作按钮
    batchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const selectedItems = wardrobeGrid.querySelectorAll('.clothing-item.selected');
            
            if (selectedItems.length === 0) {
                showToast('请先选择衣物');
                return;
            }
            
            // 执行相应的批量操作
            switch (action) {
                case 'move':
                    openBatchMoveModal();
                    break;
                case 'tag':
                    openBatchTagModal();
                    break;
                case 'delete':
                    openDeleteConfirmModal();
                    break;
            }
        });
    });
    
    // 批量标签模态框
    const batchTagModal = document.querySelector('.batch-tag-modal');
    if (batchTagModal) {
        const tagCloseBtn = batchTagModal.querySelector('.close-modal');
        const tagCancelBtn = batchTagModal.querySelector('.cancel-btn');
        const tagSaveBtn = batchTagModal.querySelector('.save-btn');
        
        function openBatchTagModal() {
            batchTagModal.classList.add('active');
            updateSelectionCount();
            
            // 设置标签选择
            const tags = batchTagModal.querySelectorAll('.tag.selectable');
            tags.forEach(tag => {
                tag.classList.remove('selected');
                tag.addEventListener('click', function() {
                    this.classList.toggle('selected');
                });
            });
        }
        
        function closeBatchTagModal() {
            batchTagModal.classList.remove('active');
        }
        
        if (tagCloseBtn) tagCloseBtn.addEventListener('click', closeBatchTagModal);
        if (tagCancelBtn) tagCancelBtn.addEventListener('click', closeBatchTagModal);
        
        if (tagSaveBtn) {
            tagSaveBtn.addEventListener('click', function() {
                const selectedTags = Array.from(batchTagModal.querySelectorAll('.tag.selectable.selected')).map(tag => tag.textContent);
                const selectedItems = wardrobeGrid.querySelectorAll('.clothing-item.selected');
                
                if (selectedTags.length === 0) {
                    showToast('请先选择标签');
                    return;
                }
                
                // 模拟为选中的衣物添加标签
                selectedItems.forEach(item => {
                    const tagsContainer = item.querySelector('.clothing-tags');
                    
                    // 确保不重复添加已有标签
                    selectedTags.forEach(tagText => {
                        let tagExists = false;
                        
                        // 检查标签是否已存在
                        Array.from(tagsContainer.querySelectorAll('.tag')).forEach(existingTag => {
                            if (existingTag.textContent === tagText) {
                                tagExists = true;
                            }
                        });
                        
                        // 如果标签不存在，则添加
                        if (!tagExists) {
                            const newTag = document.createElement('span');
                            newTag.className = 'tag';
                            newTag.textContent = tagText;
                            tagsContainer.appendChild(newTag);
                        }
                    });
                });
                
                closeBatchTagModal();
                showToast(`已为 ${selectedItems.length} 件衣物添加标签`);
            });
        }
    }
    
    // 批量移动模态框
    const batchMoveModal = document.querySelector('.batch-move-modal');
    if (batchMoveModal) {
        const moveCloseBtn = batchMoveModal.querySelector('.close-modal');
        const moveCancelBtn = batchMoveModal.querySelector('.cancel-btn');
        const moveSaveBtn = batchMoveModal.querySelector('.save-btn');
        const categorySelect = batchMoveModal.querySelector('select');
        
        function openBatchMoveModal() {
            batchMoveModal.classList.add('active');
            updateSelectionCount();
            
            // 重置选择
            if (categorySelect) categorySelect.selectedIndex = 0;
        }
        
        function closeBatchMoveModal() {
            batchMoveModal.classList.remove('active');
        }
        
        if (moveCloseBtn) moveCloseBtn.addEventListener('click', closeBatchMoveModal);
        if (moveCancelBtn) moveCancelBtn.addEventListener('click', closeBatchMoveModal);
        
        if (moveSaveBtn && categorySelect) {
            moveSaveBtn.addEventListener('click', function() {
                const selectedCategory = categorySelect.value;
                const selectedItems = wardrobeGrid.querySelectorAll('.clothing-item.selected');
                
                if (selectedCategory === '请选择分类') {
                    showToast('请选择要移动到的分类');
                    return;
                }
                
                // 模拟更改衣物分类
                selectedItems.forEach(item => {
                    const categoryElement = item.querySelector('.item-category');
                    if (categoryElement) {
                        categoryElement.textContent = selectedCategory;
                    }
                });
                
                closeBatchMoveModal();
                showToast(`已将 ${selectedItems.length} 件衣物移动到 ${selectedCategory} 分类`);
            });
        }
    }
    
    // 删除确认模态框
    const deleteModal = document.querySelector('.delete-confirm-modal');
    if (deleteModal) {
        const deleteCloseBtn = deleteModal.querySelector('.close-modal');
        const deleteCancelBtn = deleteModal.querySelector('.cancel-btn');
        const deleteConfirmBtn = deleteModal.querySelector('.delete-confirm-btn');
        
        function openDeleteConfirmModal() {
            deleteModal.classList.add('active');
            updateSelectionCount();
        }
        
        function closeDeleteModal() {
            deleteModal.classList.remove('active');
        }
        
        if (deleteCloseBtn) deleteCloseBtn.addEventListener('click', closeDeleteModal);
        if (deleteCancelBtn) deleteCancelBtn.addEventListener('click', closeDeleteModal);
        
        if (deleteConfirmBtn) {
            deleteConfirmBtn.addEventListener('click', function() {
                const selectedItems = wardrobeGrid.querySelectorAll('.clothing-item.selected');
                const count = selectedItems.length;
                
                // 模拟删除衣物
                selectedItems.forEach(item => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.remove();
                    }, 300);
                });
                
                closeDeleteModal();
                exitBatchMode();
                
                // 更新衣物统计
                const statNumber = document.querySelector('.stat-number');
                if (statNumber) {
                    const currentTotal = parseInt(statNumber.textContent);
                    statNumber.textContent = (currentTotal - count).toString();
                }
                
                showToast(`已删除 ${count} 件衣物`);
                
                // 隐藏退出按钮
                if (exitBatchBtn) {
                    exitBatchBtn.style.display = 'none';
                }
            });
        }
    }
}

// 设置无限滚动加载更多
function setupInfiniteScroll() {
    const contentContainer = document.querySelector('.content-container');
    const wardrobeGrid = document.querySelector('.wardrobe-grid');
    let isLoading = false;
    
    // 创建加载更多指示器
    const loadMoreIndicator = document.createElement('div');
    loadMoreIndicator.className = 'load-more';
    loadMoreIndicator.innerHTML = '<i class="fas fa-spinner"></i> 加载更多...';
    contentContainer.appendChild(loadMoreIndicator);
    
    // 检测滚动到底部
    window.addEventListener('scroll', function() {
        // 如果正在加载，则跳过
        if (isLoading) return;
        
        const rect = loadMoreIndicator.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
        
        if (isVisible) {
            loadMoreClothes();
        }
    });
    
    // 加载更多衣物
    function loadMoreClothes() {
        isLoading = true;
        
        // 模拟加载延迟
        setTimeout(() => {
            // 获取所有现有的衣物项
            const existingItems = wardrobeGrid.querySelectorAll('.clothing-item');
            
            // 如果衣物数量已达到阈值，则不再加载更多
            if (existingItems.length >= 30) {
                loadMoreIndicator.innerHTML = '没有更多衣物了';
                return;
            }
            
            // 模拟加载2-4件新衣物
            const newItemsCount = Math.floor(Math.random() * 3) + 2;
            
            // 衣物图片
            const images = [
                'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1580682312385-e94d8de1cf3c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1578932750355-5eb30ece487f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1565693413579-8a73e63f9c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
            ];
            
            // 衣物名称
            const names = ['休闲T恤', '运动上衣', '格纹衬衫', '复古卫衣', '皮质短靴', '棒球帽', '羊绒围巾'];
            
            // 衣物分类
            const categories = ['上装', '下装', '外套', '鞋子', '配饰', '连衣裙'];
            
            // 风格标签
            const tags = ['休闲', '正式', '商务', '约会', '运动', '基础款', '百搭', '时尚', '舒适'];
            
            for (let i = 0; i < newItemsCount; i++) {
                // 随机选择数据
                const imageUrl = images[Math.floor(Math.random() * images.length)];
                const name = names[Math.floor(Math.random() * names.length)];
                const category = categories[Math.floor(Math.random() * categories.length)];
                
                // 随机选择2个标签
                const tag1 = tags[Math.floor(Math.random() * tags.length)];
                let tag2;
                do {
                    tag2 = tags[Math.floor(Math.random() * tags.length)];
                } while (tag2 === tag1);
                
                // 创建新衣物项
                const newItem = document.createElement('div');
                newItem.className = 'clothing-item';
                newItem.innerHTML = `
                    <div class="clothing-image">
                        <img src="${imageUrl}" alt="${name}">
                        <div class="item-category">${category}</div>
                    </div>
                    <div class="clothing-info">
                        <div class="clothing-name">${name + ' ' + Math.floor(Math.random() * 100)}</div>
                        <div class="clothing-tags">
                            <span class="tag">${tag1}</span>
                            <span class="tag">${tag2}</span>
                        </div>
                    </div>
                    <div class="clothing-actions">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                `;
                
                // 添加到网格
                wardrobeGrid.appendChild(newItem);
                
                // 如果在选择模式，则绑定相应事件
                if (wardrobeGrid.classList.contains('select-mode')) {
                    newItem.addEventListener('click', function(e) {
                        e.stopPropagation();
                        this.classList.toggle('selected');
                        updateSelectionCount();
                    });
                } else {
                    // 绑定普通点击事件
                    newItem.addEventListener('click', function(e) {
                        if (!e.target.closest('.clothing-actions')) {
                            const clothingName = this.querySelector('.clothing-name').textContent;
                            showToast(`查看衣物详情: ${clothingName}`);
                        }
                    });
                }
                
                // 绑定操作按钮事件
                const actionBtn = newItem.querySelector('.clothing-actions');
                actionBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const clothingItem = this.closest('.clothing-item');
                    const clothingName = clothingItem.querySelector('.clothing-name').textContent;
                    showItemActionMenu(clothingName);
                });
            }
            
            // 更新衣物统计
            const statNumber = document.querySelector('.stat-number');
            const currentTotal = parseInt(statNumber.textContent);
            statNumber.textContent = (currentTotal + newItemsCount).toString();
            
            isLoading = false;
        }, 1500);
    }
} 