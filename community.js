// 在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化社区页面
    initCommunityPage();
});

// 初始化社区页面
function initCommunityPage() {
    // 设置状态栏时间
    updateStatusBarTime();
    
    // 设置分类标签交互
    setupCategoryTabs();
    
    // 设置动态交互
    setupPostInteractions();
    
    // 设置达人推荐交互
    setupStylistInteractions();
    
    // 设置发布功能
    setupPublishFunctionality();
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

// 设置分类标签交互
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
            
            // 切换内容（模拟）
            showToast(`切换到${category}分类`);
            
            // 在实际应用中，这里会根据分类加载不同的内容
            simulateCategoryChange(category);
        });
    });
}

// 模拟分类切换
function simulateCategoryChange(category) {
    const feedContainer = document.querySelector('.community-feed');
    
    // 添加切换动画
    feedContainer.style.opacity = '0.5';
    
    // 模拟加载新内容
    setTimeout(() => {
        // 恢复显示
        feedContainer.style.opacity = '1';
    }, 500);
}

// 设置动态交互
function setupPostInteractions() {
    // 点赞功能
    setupLikeActions();
    
    // 评论功能
    setupCommentActions();
    
    // 收藏功能
    setupBookmarkActions();
    
    // 分享功能
    setupShareActions();
    
    // 动态菜单功能
    setupPostMenuActions();
}

// 设置点赞功能
function setupLikeActions() {
    const likeButtons = document.querySelectorAll('.post-stats .stat-item:nth-child(1)');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.querySelector('span');
            const currentLikes = parseInt(likeCount.textContent);
            
            // 检查是否已点赞
            if (this.classList.contains('liked')) {
                // 取消点赞
                likeCount.textContent = (currentLikes - 1).toString();
                this.classList.remove('liked');
            } else {
                // 点赞
                likeCount.textContent = (currentLikes + 1).toString();
                this.classList.add('liked');
                
                // 点赞动画
                const heart = this.querySelector('i');
                heart.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// 设置评论功能
function setupCommentActions() {
    const commentButtons = document.querySelectorAll('.post-stats .stat-item:nth-child(2)');
    const viewAllComments = document.querySelectorAll('.view-all-comments');
    
    // 评论按钮点击
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const postUser = postItem.querySelector('.user-name').textContent;
            
            console.log(`评论 ${postUser} 的动态`);
            showToast('打开评论区');
            
            // 这里可以实现打开评论区域的功能
        });
    });
    
    // 查看全部评论点击
    viewAllComments.forEach(element => {
        element.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const postUser = postItem.querySelector('.user-name').textContent;
            
            console.log(`查看 ${postUser} 动态的全部评论`);
            showToast('查看全部评论');
            
            // 这里可以实现打开完整评论列表的功能
        });
    });
}

// 设置收藏功能
function setupBookmarkActions() {
    const bookmarkButtons = document.querySelectorAll('.post-stats .stat-item:nth-child(3)');
    
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bookmarkCount = this.querySelector('span');
            const currentBookmarks = parseInt(bookmarkCount.textContent);
            
            // 检查是否已收藏
            if (this.classList.contains('bookmarked')) {
                // 取消收藏
                bookmarkCount.textContent = (currentBookmarks - 1).toString();
                this.classList.remove('bookmarked');
                showToast('已取消收藏');
            } else {
                // 收藏
                bookmarkCount.textContent = (currentBookmarks + 1).toString();
                this.classList.add('bookmarked');
                showToast('已添加到收藏');
                
                // 收藏动画
                const bookmark = this.querySelector('i');
                bookmark.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    bookmark.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// 设置分享功能
function setupShareActions() {
    const shareButtons = document.querySelectorAll('.post-stats .stat-item:nth-child(4)');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const postUser = postItem.querySelector('.user-name').textContent;
            
            console.log(`分享 ${postUser} 的动态`);
            showToast('分享此穿搭');
            
            // 这里可以实现分享功能
        });
    });
}

// 设置动态菜单功能
function setupPostMenuActions() {
    const menuButtons = document.querySelectorAll('.post-actions i');
    
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            const postItem = this.closest('.post-item');
            const postUser = postItem.querySelector('.user-name').textContent;
            
            console.log(`打开 ${postUser} 动态的菜单`);
            showToast('打开菜单');
            
            // 这里可以实现打开动态操作菜单的功能
        });
    });
}

// 设置达人推荐交互
function setupStylistInteractions() {
    const followButtons = document.querySelectorAll('.follow-btn');
    const viewAllStylist = document.querySelector('.stylist-header .view-all');
    
    // 关注按钮点击
    followButtons.forEach(button => {
        button.addEventListener('click', function() {
            const stylistItem = this.closest('.stylist-item');
            const stylistName = stylistItem.querySelector('.stylist-name').textContent;
            
            // 切换关注状态
            if (this.classList.contains('following')) {
                // 取消关注
                this.classList.remove('following');
                this.textContent = '关注';
                showToast(`已取消关注 ${stylistName}`);
            } else {
                // 关注
                this.classList.add('following');
                this.textContent = '已关注';
                showToast(`已关注 ${stylistName}`);
            }
        });
    });
    
    // 查看更多达人点击
    if (viewAllStylist) {
        viewAllStylist.addEventListener('click', function() {
            console.log('查看更多达人');
            showToast('查看更多穿搭达人');
            
            // 这里可以实现查看更多达人的功能
        });
    }
}

// 设置发布功能
function setupPublishFunctionality() {
    const publishBtn = document.querySelector('.publish-btn');
    const publishModal = document.querySelector('.publish-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const draftBtn = document.querySelector('.draft-btn');
    const publishSubmitBtn = document.querySelector('.publish-submit-btn');
    
    // 打开发布弹窗
    publishBtn.addEventListener('click', function() {
        publishModal.classList.add('active');
        
        // 添加iOS风格的进入动画
        const modalContent = publishModal.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transition = 'all 0.3s ease-out';
            modalContent.style.transform = 'translateY(0)';
            modalContent.style.opacity = '1';
        }, 10);
    });
    
    // 关闭发布弹窗
    closeModalBtn.addEventListener('click', function() {
        const modalContent = publishModal.querySelector('.modal-content');
        modalContent.style.transform = 'translateY(20px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            publishModal.classList.remove('active');
            modalContent.style.transition = '';
        }, 300);
    });
    
    // 存草稿按钮
    draftBtn.addEventListener('click', function() {
        showToast('已保存到草稿箱');
        
        // 关闭弹窗
        closeModalBtn.click();
    });
    
    // 发布按钮
    publishSubmitBtn.addEventListener('click', function() {
        showToast('发布成功');
        
        // 关闭弹窗
        closeModalBtn.click();
        
        // 这里可以添加实际发布的逻辑，例如表单提交等
    });
    
    // 设置图片上传预览
    setupImageUpload();
    
    // 设置标签建议
    setupTagSuggestions();
}

// 设置图片上传预览
function setupImageUpload() {
    const uploadBtn = document.querySelector('.image-upload-btn');
    const previewContainer = document.querySelector('.image-preview-container');
    
    uploadBtn.addEventListener('click', function() {
        // 模拟图片选择对话框
        console.log('选择图片');
        
        // 模拟上传后的预览
        setTimeout(() => {
            // 添加预览图片（在实际应用中，这里会显示用户选择的图片）
            const previewItems = [
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'
            ];
            
            previewContainer.innerHTML = '';
            previewItems.forEach(item => {
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-item');
                previewItem.innerHTML = `
                    <img src="${item}" style="width:80px;height:80px;object-fit:cover;border-radius:4px;">
                    <i class="fas fa-times remove-preview" style="position:absolute;top:2px;right:2px;background:rgba(0,0,0,0.5);color:white;padding:3px;border-radius:50%;font-size:10px;"></i>
                `;
                previewItem.style.position = 'relative';
                previewContainer.appendChild(previewItem);
                
                // 设置删除预览图片
                const removeBtn = previewItem.querySelector('.remove-preview');
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    previewItem.remove();
                });
            });
        }, 500);
    });
}

// 设置标签建议
function setupTagSuggestions() {
    const tagInput = document.querySelector('.tag-input');
    const suggestedTags = document.querySelectorAll('.suggested-tag');
    
    // 标签输入
    tagInput.addEventListener('input', function() {
        // 这里可以根据输入内容动态调整建议标签
        console.log(`标签输入: ${this.value}`);
    });
    
    // 标签建议点击
    suggestedTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagText = this.textContent;
            
            // 添加标签到输入框
            tagInput.value = tagText;
            console.log(`选择标签: ${tagText}`);
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