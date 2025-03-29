// 穿搭详情页面脚本

let isLiked = false;
let isBookmarked = false;
let commentsList = [];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000);
    
    // 初始化交互事件
    initInteractions();
    
    // 加载评论
    loadComments();
    
    // 设置评论提交
    setupCommentSubmit();
    
    // 设置返回按钮
    document.querySelector('.back-button').addEventListener('click', function() {
        window.history.back();
    });
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

// 初始化交互事件
function initInteractions() {
    // 底部点赞按钮
    const likeButton = document.querySelector('.action-button.like');
    likeButton.addEventListener('click', function() {
        toggleLike(likeButton);
    });
    
    // 底部收藏按钮
    const bookmarkButton = document.querySelector('.action-button.bookmark');
    bookmarkButton.addEventListener('click', function() {
        toggleBookmark(bookmarkButton);
    });
    
    // 底部评论按钮
    document.querySelector('.action-button.comment').addEventListener('click', function() {
        document.querySelector('.comment-input-container input').focus();
    });
    
    // 底部分享按钮
    document.querySelector('.action-button.share').addEventListener('click', function() {
        shareOutfit();
    });
    
    // 卡片内互动按钮
    document.querySelectorAll('.interaction-item').forEach(item => {
        item.addEventListener('click', function() {
            const action = this.dataset.action;
            if (action === 'like') {
                toggleLike(likeButton);
            } else if (action === 'comment') {
                document.querySelector('.comment-input-container input').focus();
            } else if (action === 'bookmark') {
                toggleBookmark(bookmarkButton);
            } else if (action === 'share') {
                shareOutfit();
            }
        });
    });
    
    // 关注按钮
    document.querySelector('.follow-btn').addEventListener('click', function() {
        const followBtn = this;
        if (followBtn.textContent === '关注') {
            followBtn.textContent = '已关注';
            followBtn.style.backgroundColor = '#999';
            showToast('已关注该用户');
        } else {
            followBtn.textContent = '关注';
            followBtn.style.backgroundColor = '#ff6b81';
            showToast('已取消关注');
        }
    });
    
    // 单品查看按钮
    document.querySelectorAll('.item-view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const itemName = this.closest('.composition-item').querySelector('.item-name').textContent;
            showToast(`查看单品: ${itemName}`);
            // 这里可以跳转到单品详情页
        });
    });
    
    // 相似穿搭点击
    document.querySelectorAll('.similar-outfit-item').forEach(item => {
        item.addEventListener('click', function() {
            showToast('查看相似穿搭');
            // 这里可以跳转到相似穿搭详情页
        });
    });
}

// 切换点赞状态
function toggleLike(button) {
    isLiked = !isLiked;
    const likeIcon = button.querySelector('i');
    const likeCount = document.querySelector('.interaction-item[data-action="like"] span');
    const currentCount = parseInt(likeCount.textContent);
    
    if (isLiked) {
        button.classList.add('active');
        likeIcon.className = 'fas fa-heart';
        likeCount.textContent = (currentCount + 1).toString();
        showToast('已点赞');
    } else {
        button.classList.remove('active');
        likeIcon.className = 'far fa-heart';
        likeCount.textContent = (currentCount - 1).toString();
        showToast('已取消点赞');
    }
}

// 切换收藏状态
function toggleBookmark(button) {
    isBookmarked = !isBookmarked;
    const bookmarkIcon = button.querySelector('i');
    const bookmarkCount = document.querySelector('.interaction-item[data-action="bookmark"] span');
    const currentCount = parseInt(bookmarkCount.textContent);
    
    if (isBookmarked) {
        button.classList.add('active');
        bookmarkIcon.className = 'fas fa-bookmark';
        bookmarkCount.textContent = (currentCount + 1).toString();
        showToast('已收藏');
    } else {
        button.classList.remove('active');
        bookmarkIcon.className = 'far fa-bookmark';
        bookmarkCount.textContent = (currentCount - 1).toString();
        showToast('已取消收藏');
    }
}

// 分享穿搭
function shareOutfit() {
    showToast('分享功能开发中');
}

// 设置评论提交
function setupCommentSubmit() {
    const commentInput = document.querySelector('.comment-input-container input');
    const commentSendBtn = document.querySelector('.comment-send-btn');
    
    commentSendBtn.addEventListener('click', function() {
        submitComment(commentInput.value);
    });
    
    commentInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitComment(commentInput.value);
        }
    });
}

// 提交评论
function submitComment(commentText) {
    if (!commentText.trim()) {
        showToast('评论内容不能为空');
        return;
    }
    
    // 模拟评论数据
    const newComment = {
        id: Date.now(),
        avatar: 'images/avatar.jpg', // 假设使用当前登录用户头像
        username: '当前用户',
        content: commentText,
        time: '刚刚',
        likes: 0,
        replies: []
    };
    
    // 添加到评论列表
    commentsList.unshift(newComment);
    
    // 更新评论列表显示
    renderComment(newComment, document.querySelector('.comments-list'));
    
    // 清空输入框
    document.querySelector('.comment-input-container input').value = '';
    
    // 更新评论数
    const commentCount = document.querySelector('.interaction-item[data-action="comment"] span');
    const currentCount = parseInt(commentCount.textContent);
    commentCount.textContent = (currentCount + 1).toString();
    
    showToast('评论成功');
}

// 加载评论
function loadComments() {
    // 模拟评论数据
    commentsList = [
        {
            id: 1,
            avatar: 'images/user1.jpg',
            username: '时尚达人',
            content: '这套穿搭真的太好看了，我也想尝试一下这种搭配风格！',
            time: '2小时前',
            likes: 12,
            replies: [
                {
                    id: 3,
                    avatar: 'images/user3.jpg',
                    username: '穿搭小编',
                    content: '欢迎分享你的搭配照片哦~',
                    time: '1小时前',
                    likes: 2
                }
            ]
        },
        {
            id: 2,
            avatar: 'images/user2.jpg',
            username: '衣橱管理师',
            content: '这种搭配非常适合春季，颜色搭配很和谐。可以尝试加一条项链点缀一下~',
            time: '3小时前',
            likes: 8,
            replies: []
        }
    ];
    
    const commentsContainer = document.querySelector('.comments-list');
    commentsContainer.innerHTML = '';
    
    // 渲染评论列表
    commentsList.forEach(comment => {
        renderComment(comment, commentsContainer);
    });
}

// 渲染单条评论
function renderComment(comment, container) {
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    
    let repliesHTML = '';
    if (comment.replies && comment.replies.length > 0) {
        let repliesContent = '';
        comment.replies.forEach(reply => {
            repliesContent += `
                <div class="reply-item comment-item">
                    <img src="${reply.avatar}" alt="${reply.username}" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-user">${reply.username}</div>
                        <div class="comment-text">${reply.content}</div>
                        <div class="comment-actions">
                            <span class="comment-time">${reply.time}</span>
                            <span class="comment-like"><i class="far fa-heart"></i> ${reply.likes}</span>
                            <span class="comment-reply">回复</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        repliesHTML = `<div class="comment-replies">${repliesContent}</div>`;
    }
    
    commentElement.innerHTML = `
        <img src="${comment.avatar}" alt="${comment.username}" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-user">${comment.username}</div>
            <div class="comment-text">${comment.content}</div>
            <div class="comment-actions">
                <span class="comment-time">${comment.time}</span>
                <span class="comment-like"><i class="far fa-heart"></i> ${comment.likes}</span>
                <span class="comment-reply">回复</span>
            </div>
            ${repliesHTML}
        </div>
    `;
    
    // 插入到容器开头
    if (container.firstChild) {
        container.insertBefore(commentElement, container.firstChild);
    } else {
        container.appendChild(commentElement);
    }
    
    // 添加评论互动事件
    setupCommentInteractions(commentElement);
}

// 设置评论互动事件
function setupCommentInteractions(commentElement) {
    // 点赞评论
    const likeBtn = commentElement.querySelector('.comment-like');
    likeBtn.addEventListener('click', function() {
        const likeIcon = this.querySelector('i');
        const isLiked = likeIcon.classList.contains('fas');
        
        if (isLiked) {
            likeIcon.className = 'far fa-heart';
            this.textContent = this.textContent.replace(/\d+/, count => parseInt(count) - 1);
        } else {
            likeIcon.className = 'fas fa-heart';
            this.textContent = this.textContent.replace(/\d+/, count => parseInt(count) + 1);
        }
    });
    
    // 回复评论
    const replyBtn = commentElement.querySelector('.comment-reply');
    replyBtn.addEventListener('click', function() {
        const username = this.closest('.comment-content').querySelector('.comment-user').textContent;
        const input = document.querySelector('.comment-input-container input');
        input.value = `回复 @${username}: `;
        input.focus();
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