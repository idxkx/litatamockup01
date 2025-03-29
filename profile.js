// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化个人中心页面
    initProfilePage();
});

// 初始化个人中心页面
function initProfilePage() {
    // 设置状态栏时间
    updateStatusBarTime();
    
    // 设置个人信息编辑功能
    setupProfileEditing();
    
    // 设置会员卡点击功能
    setupVipCard();
    
    // 设置功能入口点击
    setupFeatureEntries();
    
    // 设置穿搭和收藏查看功能
    setupOutfitsAndCollections();
    
    // 设置底部导航栏
    setupBottomNavigation();
    
    // 设置编辑资料弹窗功能
    setupEditProfileModal();
    
    // 设置会员权益弹窗功能
    setupVipBenefitsModal();
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

// 设置个人信息编辑功能
function setupProfileEditing() {
    const editProfileBtn = document.querySelector('.edit-profile-btn');
    const editAvatarBtn = document.querySelector('.edit-avatar');
    const editCoverBtn = document.querySelector('.edit-cover');
    
    // 编辑个人资料
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            console.log('编辑个人资料');
            openEditProfileModal();
        });
    }
    
    // 编辑头像
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // 阻止冒泡，避免触发编辑资料
            console.log('编辑头像');
            showToast('选择新头像');
            
            // 打开编辑资料弹窗并聚焦到头像部分
            openEditProfileModal('avatar');
        });
    }
    
    // 编辑封面
    if (editCoverBtn) {
        editCoverBtn.addEventListener('click', function() {
            console.log('编辑封面');
            showToast('选择新封面图片');
            
            // 此处可以实现打开选择封面图片的功能
        });
    }
}

// 设置会员卡点击功能
function setupVipCard() {
    const vipCard = document.querySelector('.vip-card');
    
    if (vipCard) {
        vipCard.addEventListener('click', function() {
            console.log('查看会员权益');
            openVipBenefitsModal();
        });
    }
}

// 设置功能入口点击
function setupFeatureEntries() {
    const entryItems = document.querySelectorAll('.entry-item');
    
    entryItems.forEach(item => {
        item.addEventListener('click', function() {
            const entryName = this.querySelector('.entry-name').textContent;
            console.log(`点击功能: ${entryName}`);
            showToast(`进入${entryName}`);
            
            // 根据不同功能执行相应操作
            handleFeatureClick(entryName);
        });
    });
}

// 处理功能点击
function handleFeatureClick(featureName) {
    switch (featureName) {
        case '穿搭历史':
            // 打开穿搭历史页面
            console.log('打开穿搭历史');
            break;
        case '我的收藏':
            // 打开收藏页面
            console.log('打开收藏页面');
            break;
        case '我的分享':
            // 打开分享页面
            console.log('打开分享页面');
            break;
        case '我的点赞':
            // 打开点赞页面
            console.log('打开点赞页面');
            break;
        case '购买记录':
            // 打开购买记录
            console.log('打开购买记录');
            break;
        case '我的积分':
            // 打开积分页面
            console.log('打开积分页面');
            break;
        case '我的礼物':
            // 打开礼物页面
            console.log('打开礼物页面');
            break;
        case '设置':
            // 打开设置页面
            console.log('打开设置页面');
            break;
        default:
            console.log('未知功能');
    }
}

// 设置穿搭和收藏查看功能
function setupOutfitsAndCollections() {
    // 我的穿搭
    setupOutfitsView();
    
    // 我的收藏
    setupCollectionsView();
}

// 设置穿搭查看功能
function setupOutfitsView() {
    const outfitItems = document.querySelectorAll('.my-outfits-section .outfit-item');
    const viewAllOutfits = document.querySelector('.my-outfits-section .section-more');
    
    // 穿搭项点击
    outfitItems.forEach(item => {
        item.addEventListener('click', function() {
            const outfitTitle = this.querySelector('.outfit-title').textContent;
            console.log(`查看穿搭: ${outfitTitle}`);
            
            // 打开穿搭详情页面
            openOutfitDetail(this);
        });
    });
    
    // 查看全部穿搭
    if (viewAllOutfits) {
        viewAllOutfits.addEventListener('click', function() {
            console.log('查看全部穿搭');
            showToast('查看全部穿搭');
            
            // 此处可以实现打开全部穿搭列表的功能
        });
    }
}

// 打开穿搭详情页面
function openOutfitDetail(outfitItem) {
    // 获取穿搭信息
    const outfitImage = outfitItem.querySelector('.outfit-image img').src;
    const outfitTitle = outfitItem.querySelector('.outfit-title').textContent;
    const likeCount = outfitItem.querySelector('.outfit-stats span:first-child').textContent.trim();
    const commentCount = outfitItem.querySelector('.outfit-stats span:last-child').textContent.trim();
    
    // 使用构建的信息在新页面中打开详情
    // 实际应用中，这里可能会使用 URL 参数传递数据或调用 API 获取详细数据
    
    // 为了演示，这里使用本地存储传递数据
    localStorage.setItem('currentOutfit', JSON.stringify({
        image: outfitImage,
        title: outfitTitle,
        likes: likeCount,
        comments: commentCount
    }));
    
    // 跳转到穿搭详情页
    window.location.href = 'outfit-detail.html';
}

// 设置收藏查看功能
function setupCollectionsView() {
    const collectionItems = document.querySelectorAll('.my-collections-section .collection-item');
    const viewAllCollections = document.querySelector('.my-collections-section .section-more');
    
    // 收藏项点击
    collectionItems.forEach(item => {
        item.addEventListener('click', function() {
            const authorName = this.querySelector('.collection-author span').textContent;
            console.log(`查看收藏: ${authorName}的穿搭`);
            
            // 打开收藏详情页面
            openCollectionDetail(this);
        });
    });
    
    // 查看全部收藏
    if (viewAllCollections) {
        viewAllCollections.addEventListener('click', function() {
            console.log('查看全部收藏');
            showToast('查看全部收藏');
            
            // 此处可以实现打开全部收藏列表的功能
        });
    }
}

// 打开收藏详情页面
function openCollectionDetail(collectionItem) {
    // 获取收藏信息
    const collectionImage = collectionItem.querySelector('.collection-image img').src;
    const authorAvatar = collectionItem.querySelector('.collection-author img').src;
    const authorName = collectionItem.querySelector('.collection-author span').textContent;
    const tags = [];
    collectionItem.querySelectorAll('.collection-tags span').forEach(tag => {
        tags.push(tag.textContent);
    });
    
    // 使用构建的信息在新页面中打开详情
    // 实际应用中，这里可能会使用 URL 参数传递数据或调用 API 获取详细数据
    
    // 为了演示，这里使用本地存储传递数据
    localStorage.setItem('currentCollection', JSON.stringify({
        image: collectionImage,
        authorAvatar: authorAvatar,
        authorName: authorName,
        tags: tags
    }));
    
    // 跳转到收藏详情页
    window.location.href = 'collection-detail.html';
}

// 设置底部导航栏
function setupBottomNavigation() {
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
            
            // 根据标签执行页面跳转
            console.log(`切换到 ${tabName} 标签`);
            
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
                        // 已在个人中心页面，不需要跳转
                        break;
                    default:
                        console.log(`未知标签: ${tabName}`);
                        break;
                }
            }, 100);
        });
    });
}

// 设置编辑资料弹窗功能
function setupEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    const modalClose = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const saveBtn = modal.querySelector('.save-btn');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarInput = document.getElementById('avatarInput');
    const avatarEditIcon = modal.querySelector('.avatar-edit-icon');
    const bioInput = document.getElementById('bioInput');
    const bioCount = document.getElementById('bioCount');
    const form = document.getElementById('profileEditForm');
    
    // 初始化个人简介字数统计
    updateBioCounter();
    
    // 关闭按钮点击事件
    modalClose.addEventListener('click', closeEditProfileModal);
    
    // 取消按钮点击事件
    cancelBtn.addEventListener('click', closeEditProfileModal);
    
    // 点击模态窗口背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeEditProfileModal();
        }
    });
    
    // 头像编辑图标点击事件
    avatarEditIcon.addEventListener('click', function() {
        avatarInput.click();
    });
    
    // 头像文件输入变化事件
    avatarInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                avatarPreview.src = e.target.result;
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    // 个人简介输入事件
    bioInput.addEventListener('input', updateBioCounter);
    
    // 表单提交事件
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfileChanges();
    });
}

// 设置会员权益弹窗功能
function setupVipBenefitsModal() {
    const modal = document.getElementById('vipBenefitsModal');
    const modalClose = modal.querySelector('.modal-close');
    const upgradeBtn = modal.querySelector('.upgrade-vip-btn');
    
    // 关闭按钮点击事件
    modalClose.addEventListener('click', closeVipBenefitsModal);
    
    // 点击模态窗口背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeVipBenefitsModal();
        }
    });
    
    // 升级会员按钮点击事件
    upgradeBtn.addEventListener('click', function() {
        console.log('升级金卡会员');
        showToast('正在为您跳转到会员升级页面...');
        
        // 关闭弹窗
        closeVipBenefitsModal();
        
        // 这里可以添加跳转到会员升级页面的逻辑
    });
}

// 更新个人简介字数统计
function updateBioCounter() {
    const bioInput = document.getElementById('bioInput');
    const bioCount = document.getElementById('bioCount');
    
    if (bioInput && bioCount) {
        const count = bioInput.value.length;
        bioCount.textContent = count;
        
        // 如果超出字数限制，添加警告样式
        if (count > 50) {
            bioCount.style.color = '#f56c6c';
        } else {
            bioCount.style.color = '#999';
        }
    }
}

// 打开编辑资料弹窗
function openEditProfileModal(focusElement) {
    const modal = document.getElementById('editProfileModal');
    
    // 显示模态窗口
    modal.classList.add('active');
    
    // 防止页面滚动
    document.body.style.overflow = 'hidden';
    
    // 如果指定了要聚焦的元素
    if (focusElement === 'avatar') {
        // 模拟点击头像编辑图标
        setTimeout(() => {
            const avatarEditIcon = modal.querySelector('.avatar-edit-icon');
            if (avatarEditIcon) {
                avatarEditIcon.click();
            }
        }, 300);
    }
}

// 关闭编辑资料弹窗
function closeEditProfileModal() {
    const modal = document.getElementById('editProfileModal');
    
    // 隐藏模态窗口
    modal.classList.remove('active');
    
    // 恢复页面滚动
    document.body.style.overflow = '';
}

// 打开会员权益弹窗
function openVipBenefitsModal() {
    const modal = document.getElementById('vipBenefitsModal');
    
    // 显示模态窗口
    modal.classList.add('active');
    
    // 防止页面滚动
    document.body.style.overflow = 'hidden';
}

// 关闭会员权益弹窗
function closeVipBenefitsModal() {
    const modal = document.getElementById('vipBenefitsModal');
    
    // 隐藏模态窗口
    modal.classList.remove('active');
    
    // 恢复页面滚动
    document.body.style.overflow = '';
}

// 保存个人资料修改
function saveProfileChanges() {
    // 获取表单数据
    const nameInput = document.getElementById('nameInput').value;
    const idInput = document.getElementById('idInput').value;
    const bioInput = document.getElementById('bioInput').value;
    const avatarPreview = document.getElementById('avatarPreview').src;
    
    // 在实际应用中，这里会进行数据验证和服务器保存
    // 这里模拟更新页面上的数据
    
    // 验证个人简介长度
    if (bioInput.length > 50) {
        showToast('个人简介最多50个字');
        return;
    }
    
    // 更新页面上的数据
    document.querySelector('.profile-name').textContent = nameInput;
    document.querySelector('.profile-id').textContent = `ID: ${idInput}`;
    document.querySelector('.profile-bio').textContent = bioInput;
    
    // 更新头像
    const profileAvatar = document.querySelector('.profile-avatar');
    if (profileAvatar) {
        profileAvatar.src = avatarPreview;
    }
    
    // 关闭弹窗
    closeEditProfileModal();
    
    // 显示成功提示
    showToast('个人资料已更新');
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