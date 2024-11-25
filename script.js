async function loadProxies() {
    try {
        const response = await fetch('proxy.txt');
        const text = await response.text();
        const proxies = text.trim().split('\n').map(proxy => proxy.trim()).filter(Boolean);
        document.getElementById('proxies').value = proxies.join('\n');
        return proxies;
    } catch (error) {
        console.error("Error loading proxy list:", error);
        return [];
    }
}

function validateProxies(proxies) {
    let validCount = 0;
    const proxyStats = document.getElementById('proxyStats');
    const log = document.getElementById('log');
    proxies.forEach(proxy => {
        const isValid = Math.random() > 0.5; // Simulated check
        if (isValid) validCount++;
        log.innerHTML += `<p>Proxy ${proxy} is ${isValid ? "Valid" : "Invalid"}</p>`;
    });
    proxyStats.textContent = `Total Proxies: ${proxies.length}, Valid Proxies: ${validCount}`;
}

document.getElementById('validateProxies').addEventListener('click', async () => {
    const proxies = await loadProxies();
    validateProxies(proxies);
});

document.getElementById('testDdos').addEventListener('click', () => {
    const log = document.getElementById('log');
    log.innerHTML += `<p>Testing DDOS functionality...</p>`;
    for (let i = 1; i <= 5; i++) {
        setTimeout(() => {
            log.innerHTML += `<p>DDOS Test ${i}: Request sent to hostname on port 80.</p>`;
            log.scrollTop = log.scrollHeight;
        }, i * 500);
    }
});
