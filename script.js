const charsets = {
    numbers: '0123456789',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

let currentPassword = '';
let bruteForceActive = false;

document.getElementById('lengthSlider').addEventListener('input', updateDisplay);
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', updateDisplay);
});

function getSelectedCharset() {
    let charset = '';
    Object.keys(charsets).forEach(key => {
        if (document.getElementById(key).checked) {
            charset += charsets[key];
        }
    });
    return charset;
}

function updateDisplay() {
    const length = document.getElementById('lengthSlider').value;
    document.getElementById('lengthDisplay').textContent = length;
    
    const charset = getSelectedCharset();
    const charsetSize = charset.length;
    const combinations = Math.pow(charsetSize, length);
    
    document.getElementById('charsetSize').textContent = charsetSize;
    document.getElementById('combinations').textContent = combinations.toLocaleString();
    
    // 強度計算（1秒間に100万回の試行と仮定）
    const attemptsPerSecond = 1000000;
    const averageTime = combinations / (2 * attemptsPerSecond);
    
    // ブレークシミュレーション用の計算（1秒間に1000回）
    const simulationAttemptsPerSecond = 1000;
    const simulationMaxTime = combinations / simulationAttemptsPerSecond;
    const canSimulate = simulationMaxTime <= 600; // 10分以内
    
    let strengthLevel, strengthText, timeText;
    
    if (averageTime < 1) {
        strengthLevel = 0;
        strengthText = '非常に弱い';
        timeText = '1秒未満';
    } else if (averageTime < 3600) {
        strengthLevel = 25;
        strengthText = '弱い';
        timeText = Math.round(averageTime) + '秒';
    } else if (averageTime < 86400) {
        strengthLevel = 50;
        strengthText = '普通';
        timeText = Math.round(averageTime / 3600) + '時間';
    } else if (averageTime < 31536000) {
        strengthLevel = 75;
        strengthText = '強い';
        timeText = Math.round(averageTime / 86400) + '日';
    } else {
        strengthLevel = 100;
        strengthText = '非常に強い';
        timeText = Math.round(averageTime / 31536000) + '年';
    }
    
    const strengthFill = document.getElementById('strengthFill');
    strengthFill.style.width = strengthLevel + '%';
    strengthFill.className = `strength-fill strength-${strengthText === '非常に弱い' ? 'weak' : 
                                                    strengthText === '弱い' ? 'weak' :
                                                    strengthText === '普通' ? 'medium' :
                                                    strengthText === '強い' ? 'strong' : 'very-strong'}`;
    
    const simulationStatus = canSimulate ? '✅ シミュレーション可能' : '❌ シミュレーション不可（10分超）';
    
    document.getElementById('timeDisplay').innerHTML = 
        `破られる予想時間: ${timeText} (強度: ${strengthText})<br>
         <small style="color: ${canSimulate ? '#10ac84' : '#ff6b6b'}; font-weight: normal;">${simulationStatus}</small>`;
    
    // ブレークボタンの有効/無効を制御
    const bruteForceBtn = document.getElementById('bruteForceBtn');
    if (bruteForceBtn && !bruteForceActive) {
        bruteForceBtn.disabled = !canSimulate;
        bruteForceBtn.style.opacity = canSimulate ? '1' : '0.5';
    }
}

function generatePassword() {
    const charset = getSelectedCharset();
    if (charset.length === 0) {
        alert('少なくとも一つの文字セットを選択してください');
        return;
    }
    
    const length = document.getElementById('lengthSlider').value;
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    currentPassword = password;
    document.getElementById('passwordField').value = password;
}

function startBruteForce() {
    if (!currentPassword) {
        alert('まずパスワードを生成してください');
        return;
    }
    
    if (bruteForceActive) {
        alert('既にシミュレーション中です');
        return;
    }
    
    const charset = getSelectedCharset();
    const maxAttempts = Math.pow(charset.length, currentPassword.length);
    
    // 10分 = 600秒、1秒間に1000回の試行と仮定
    // 最悪ケースでの予想時間を計算
    const attemptsPerSecond = 1000;
    const maxTimeSeconds = maxAttempts / attemptsPerSecond;
    
    if (maxTimeSeconds > 600) { // 10分を超える場合
        const timeEstimate = maxTimeSeconds < 3600 ? 
            Math.round(maxTimeSeconds / 60) + '分' :
            maxTimeSeconds < 86400 ?
            Math.round(maxTimeSeconds / 3600) + '時間' :
            Math.round(maxTimeSeconds / 86400) + '日';
        
        alert(`このパスワードのブレークには最大${timeEstimate}かかる可能性があるため、\nシミュレーションを実行できません。\n\nより短いパスワードまたは文字種類を減らしてお試しください。`);
        return;
    }
    
    bruteForceActive = true;
    document.getElementById('bruteForceBtn').disabled = true;
    document.getElementById('bruteForceBtn').textContent = 'シミュレーション中...';
    document.getElementById('simulationProgress').style.display = 'block';
    document.getElementById('simulationResult').style.display = 'none';
    
    document.getElementById('maxAttempts').textContent = maxAttempts.toLocaleString();
    
    const startTime = Date.now();
    let attempts = 0;
    
    function generateCombination(index, charset, length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result = charset[index % charset.length] + result;
            index = Math.floor(index / charset.length);
        }
        return result;
    }
    
    function bruteForceStep() {
        const batchSize = Math.min(1000, maxAttempts - attempts);
        
        for (let i = 0; i < batchSize; i++) {
            const candidate = generateCombination(attempts, charset, currentPassword.length);
            attempts++;
            
            if (candidate === currentPassword) {
                // パスワード発見
                const endTime = Date.now();
                const actualTime = (endTime - startTime) / 1000;
                
                document.getElementById('finalAttempts').textContent = attempts.toLocaleString();
                document.getElementById('actualTime').textContent = actualTime.toFixed(3);
                document.getElementById('crackedPassword').textContent = candidate;
                document.getElementById('simulationResult').style.display = 'block';
                
                bruteForceActive = false;
                document.getElementById('bruteForceBtn').disabled = false;
                document.getElementById('bruteForceBtn').textContent = 'ブレーク開始';
                updateDisplay(); // ボタンの状態を更新
                return;
            }
        }
        
        // 進捗更新
        document.getElementById('attempts').textContent = attempts.toLocaleString();
        document.getElementById('progressFill').style.width = (attempts / maxAttempts * 100) + '%';
        document.getElementById('elapsedTime').textContent = ((Date.now() - startTime) / 1000).toFixed(1);
        
        if (attempts < maxAttempts) {
            setTimeout(bruteForceStep, 1);
        } else {
            // 見つからなかった（理論上起こらないはず）
            bruteForceActive = false;
            document.getElementById('bruteForceBtn').disabled = false;
            document.getElementById('bruteForceBtn').textContent = 'ブレーク開始';
            updateDisplay(); // ボタンの状態を更新
            alert('パスワードが見つかりませんでした（エラー）');
        }
    }
    
    setTimeout(bruteForceStep, 100);
}

// 初期表示更新
updateDisplay();
generatePassword();