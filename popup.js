document.addEventListener('DOMContentLoaded', function() {  
    // 恢复之前保存的链接  
    restoreLinks();  
  
    // 处理自定义链接的添加  
    document.getElementById('add-link-form').addEventListener('submit', function(event) {  
        event.preventDefault(); // 阻止表单默认提交行为  
  
        var customUrl = document.getElementById('custom-url').value.trim();  
        var customNickname = document.getElementById('custom-nickname').value.trim();  
  
        // 验证URL并添加https://前缀（如果需要）  
        if (!/^https?:\/\//.test(customUrl)) {  
            customUrl = 'https://' + customUrl;  
        }  
  
        if (customUrl && customNickname) {  
            // 将链接保存到localStorage  
            localStorage.setItem(customNickname, customUrl);  
  
            // 清空输入框以便输入新的链接  
            document.getElementById('custom-url').value = '';  
            document.getElementById('custom-nickname').value = '';  
  
            // 无需立即在页面上添加链接，因为restoreLinks会在页面加载时处理  
            // 可以添加一个提示，告诉用户链接已保存  
            alert('ok!');  
        } else {  
            // 显示错误提示  
            var errorElement = document.getElementById('error-message');  
            errorElement.textContent = '请输入有效的链接地址和昵称。';  
            errorElement.style.display = 'block';  
            setTimeout(function() {  
                errorElement.style.display = 'none';  
            }, 3000); // 错误提示显示3秒后自动隐藏  
        }  
    });  
});  
  
// 从localStorage恢复链接并在页面上显示它们  
function restoreLinks() {  
    var userDefinedLinks = document.getElementById('user-defined-links');  
    userDefinedLinks.innerHTML = ''; // 清空当前列表内容  
  
    // 获取localStorage中保存的所有链接  
    for (var i = 0; i < localStorage.length; i++) {  
        var key = localStorage.key(i); // 昵称  
        var value = localStorage.getItem(key); // URL  
  
        var listItem = document.createElement('li');  
        listItem.classList.add('link-item');  
        var link = document.createElement('a');  
        link.href = value;  
        link.target = '_blank'; // 在新标签页打开链接  
        link.textContent = key;  
        listItem.appendChild(link);  
  
        // 添加删除链接的按钮  
        var deleteButton = document.createElement('button');  
        deleteButton.textContent = 'Delete';  
        deleteButton.addEventListener('click', function() {  
            // 从localStorage中删除链接  
            localStorage.removeItem(key);  
            // 从页面上删除链接项  
            listItem.remove();  
        });  
        listItem.appendChild(deleteButton);  
  
        userDefinedLinks.appendChild(listItem);  
    }  
}