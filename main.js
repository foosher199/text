// 切换语言的函数
function changeLanguage(lang) {
    // 获取所有需要翻译的元素
    const elements = document.querySelectorAll('[data-translate]');
    
    // 遍历每个元素并更新文本
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            let text = translations[lang][key];
            
            // 处理带有动态参数的文本
            const params = element.dataset.params;
            if (params) {
                const paramsObj = JSON.parse(params);
                Object.keys(paramsObj).forEach(key => {
                    text = text.replace(`{${key}}`, paramsObj[key]);
                });
            }
            
            element.textContent = text;
        }
    });

    // 更新所有按钮文本
    updateButtonTexts(lang);

    // 更新页面标题
    document.title = translations[lang].page_title;

    // 保存用户的语言选择到本地存储
    localStorage.setItem('preferredLanguage', lang);
}

// 更新按钮文本
function updateButtonTexts(lang) {
    // 更新选择图片按钮
    const selectButton = document.querySelector('#selectButton');
    if (selectButton) {
        selectButton.textContent = translations[lang].select_image;
    }

    // 更新开始提取按钮
    const startButton = document.querySelector('.button-container .button[data-translate="start_extract"]');
    if (startButton) {
        startButton.textContent = translations[lang].start_extract;
    }

    // 更新复制按钮
    const copyButton = document.querySelector('.button-container .button[data-translate="copy_text"]');
    if (copyButton) {
        copyButton.textContent = translations[lang].copy_text;
    }
}

// 检测用户浏览器语言
function detectUserLanguage() {
    const userLang = navigator.language || navigator.userLanguage;
    return userLang.startsWith('zh') ? 'zh' : 'en';
}

// 页面加载时初始化语言设置
document.addEventListener('DOMContentLoaded', () => {
    // 首先检查本地存储中的语言设置
    const savedLanguage = localStorage.getItem('preferredLanguage');
    // 如果没有保存的语言设置，则使用浏览器语言
    const initialLanguage = savedLanguage || detectUserLanguage();
    
    // 设置语言选择器的值
    document.getElementById('languageSelector').value = initialLanguage;
    // 应用语言设置
    changeLanguage(initialLanguage);
});

// 修改进度显示函数
function updateProgress(message, params = {}) {
    const lang = document.getElementById('languageSelector').value;
    const progressElement = document.getElementById('progress');
    
    if (translations[lang][message]) {
        let text = translations[lang][message];
        Object.keys(params).forEach(key => {
            text = text.replace(`{${key}}`, params[key]);
        });
        progressElement.textContent = text;
        // 更新 data-translate 属性，以便语言切换时能够正确翻译
        progressElement.setAttribute('data-translate', message);
        // 如果有参数，将其保存到 data-params 中
        if (Object.keys(params).length > 0) {
            progressElement.setAttribute('data-params', JSON.stringify(params));
        } else {
            progressElement.removeAttribute('data-params');
        }
    }
} 