// GitHub API 토큰을 전역 변수에서 가져옵니다
const GITHUB_TOKEN = window.GITHUB_TOKEN;

async function loadPendingComments() {
    try {
        const response = await fetch(`https://api.github.com/repos/daysandmoons1/blog-comments/issues?state=open&labels=comment`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load pending comments');
        }
        
        const issues = await response.json();
        const pendingList = document.getElementById('pending-comments-list');
        pendingList.innerHTML = '';
        
        for (const issue of issues) {
            const commentMatch = issue.body.match(/Comment by: (.*?)\nPost: (.*?)\nURL: (.*?)\n\n([\s\S]*)/);
            
            if (commentMatch && commentMatch[2] === '첫 사냥 이야기') {
                const author = commentMatch[1];
                const content = commentMatch[4];
                const date = new Date(issue.created_at).toLocaleString();
                
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment pending';
                commentDiv.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${author}</span>
                        <span class="comment-date">${date}</span>
                    </div>
                    <div class="comment-content">${content}</div>
                    <div class="comment-status">대기 중인 댓글입니다. 승인되면 표시됩니다.</div>
                `;
                pendingList.appendChild(commentDiv);
            }
        }
    } catch (error) {
        console.error('Error loading pending comments:', error);
    }
}

async function loadComments() {
    try {
        const response = await fetch(`https://api.github.com/repos/daysandmoons1/blog-comments/issues?state=closed&labels=comment,approved`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to load comments');
        }
        
        const issues = await response.json();
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '<h3>승인된 댓글</h3>';
        
        for (const issue of issues) {
            const commentMatch = issue.body.match(/Comment by: (.*?)\nPost: (.*?)\nURL: (.*?)\n\n([\s\S]*)/);
            
            if (commentMatch && commentMatch[2] === '첫 사냥 이야기') {
                const author = commentMatch[1];
                const content = commentMatch[4];
                const date = new Date(issue.created_at).toLocaleString();
                
                const commentDiv = document.createElement('div');
                commentDiv.className = 'comment';
                commentDiv.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${author}</span>
                        <span class="comment-date">${date}</span>
                    </div>
                    <div class="comment-content">${content}</div>
                `;
                commentsList.appendChild(commentDiv);
            }
        }
    } catch (error) {
        console.error('Error loading comments:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadComments();
    loadPendingComments();
});

document.getElementById('comment-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('comment-name').value;
    const content = document.getElementById('comment-content').value;
    const postTitle = '첫 사냥 이야기';
    const postUrl = window.location.href;
    
    const issueTitle = `Comment on ${postTitle}`;
    const issueBody = `
Comment by: ${name}
Post: ${postTitle}
URL: ${postUrl}

${content}
    `;
    
    try {
        const response = await fetch(`https://api.github.com/repos/daysandmoons1/blog-comments/issues`, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: issueTitle,
                body: issueBody,
                labels: ['comment']
            })
        });
        
        if (response.ok) {
            alert('댓글이 성공적으로 제출되었습니다! 승인되면 댓글이 표시됩니다.');
            document.getElementById('comment-form').reset();
            
            loadComments();
            loadPendingComments();
        } else {
            const error = await response.json();
            console.error('GitHub API Error:', error);
            alert(`댓글 제출 중 오류가 발생했습니다: ${error.message || '알 수 없는 오류'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('댓글 제출 중 오류가 발생했습니다: ' + error.message);
    }
}); 