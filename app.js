const AppState = {
    isPremiumUser: false,
    currentUser: null,
    completedLessons: [1]
};

const parishCrmDatabase = [
    { name: "Robert Burnos", group: "Men's Sacramental Cohort", email: "bob.b@parishmail.org", status: "Active Leader" },
    { name: "Maria Fernanda", group: "Marriage & Family Circle", email: "fernanda.n@homemail.com", status: "Active Member" },
    { name: "Simon Johnston", group: "Young Adult Apologetics Track", email: "simon.j@scoutleader.net", status: "Active Leader" },
    { name: "Reston Miller", group: "Tech & Mentorship Hub", email: "reston.m@fllroboticscoach.org", status: "In Training" }
];

const premiumAssetsRepo = {
    agendas: { title: "The 5 Endeavors Meeting Structure (90-Minute Canvas)", description: "A balanced framework combining structured catechesis with unstructured fellowship.", content: "<div class='agenda-timeline'><div class='time-node'><strong>1. Welcome & Food (15 min):</strong> Gathering, refreshments, and check-ins.</div><div class='time-node'><strong>2. Core Check-in (10 min):</strong> Open sharing of personal milestones or challenges.</div><div class='time-node'><strong>3. Catechesis (30 min):</strong> Engaging with sacramental instruction material frameworks.</div><div class='time-node'><strong>4. Unstructured Fellowship (30 min):</strong> Organic connection time.</div></div>" },
    emails: { title: "Parish Launch Email Sequences & Bulletin Blurbs", description: "Strategic campaign strings designed for program admins to introduce small groups.", content: "<div class='template-box-code'><strong>Subject:</strong> Moving Beyond the Crowd: Introducing Koinonia Small Groups<br><br>Dear Parishioners, discipleship doesn't happen sitting in rows; it grows in circles...</div>" },
    activities: { title: "The Three Bonds Vulnerability Exercises", description: "Icebreakers designed to pivot groups safely away from simple trauma-bonding toward sacramental fellowship.", content: "<h4>The Trust Transition Exercise</h4><p>Plot critical life milestones: Baptism, seasons of trial, and deep peace moments inside the Church.</p>" }
};

const apologeticsRepo = {
    eucharist: { title: "Defense Pillar 1: The Real Presence (John Chapter 6)", premise: "Catholics hold that the Eucharist is the literal Body, Blood, Soul, and Divinity of Jesus Christ.", scripture: "\"Eat the flesh of the Son of Man and drink his blood...\" — John 6:53", challenge: "A friend says communion is just a metaphor to remember Jesus.", solution: "When disciples took offense and walked away, Jesus did not call it a metaphor. He turned to the Apostles and asked if they would leave too." },
    sacraments: { title: "Defense Pillar 2: The Sacramental Pipeline vs. Solas", premise: "The Catholic Church offers seven distinct direct channels of assured grace.", scripture: "\"Unless you are born of water and the Spirit...\" — John 3:5", challenge: "A colleague tells you that good works are completely irrelevant to salvation.", solution: "Works are the living fruit of salvation. James 2:24 notes that a person is justified by works and not by faith alone." },
    authority: { title: "Defense Pillar 3: Apostolic Authority and Unity", premise: "Without a visible magisterium, protestant communities face a crisis of scriptural interpretation authority.", scripture: "\"On this rock I will build my church...\" — Matthew 16:18", challenge: "Someone challenges you saying the Bible is the only authority a Christian needs.", solution: "Christ did not write a book; He established a visible Church. The Church compiled, canonized, and preserved the Holy Scriptures." }
};

const paideiaCourseData = [
    { id: 0, title: "Module 1: Fostering Intimacy & Safe Vulnerability Boundaries", videoUrl: "https://www.w3schools.com/html/movie.mp4", curriculumText: "<h4>Ground Rules for Sharing</h4><ul><li>Active Listening: No feedback unless requested.</li><li>No Time Limits: Share thoroughly.</li><li>Prioritize Feelings Over Debates: Keep discussions relational.</li></ul>" },
    { id: 1, title: "Module 2: Overcoming Barriers to Active Listening", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", curriculumText: "<h4>The MaSeR Communication Model</h4><p>Use the Message-Sender-Receiver model to systematically analyze group dialogue breakdowns objectively.</p>" },
    { id: 2, title: "Module 3: Navigating the Four Stages of Team Evolution", videoUrl: "https://www.w3schools.com/html/movie.mp4", curriculumText: "<h4>Recognizing Group Dynamics</h4><ul><li><strong>Forming:</strong> High enthusiasm, low productivity.</li><li><strong>Storming:</strong> Excitement fades, friction surfaces.</li><li><strong>Norming:</strong> Skills and cohesion increase.</li><li><strong>Performing:</strong> High motivation and unified alignment.</li></ul>" }
];

function renderUserDashboard() {
    const container = document.getElementById('dashboard-container');
    if (!container) return;
    if (!AppState.isPremiumUser) { container.innerHTML = ''; return; }
    container.innerHTML = `
        <section class="dashboard-section"><div class="container"><div class="dashboard-card">
            <h2>Welcome Back, ${AppState.currentUser.name}</h2>
            <p style="color: var(--text-muted);">Secure session verified. You have authorized clearance to internal parish data analytics.</p>
        </div></div></section>
    `;
}

function renderParishCrm() {
    const tableBody = document.getElementById('crm-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    parishCrmDatabase.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${member.name}</strong></td><td><span class="table-group-tag">${member.group}</span></td><td><code>${member.email}</code></td><td><span class="status-indicator">${member.status}</span></td><td><button class="btn btn-secondary" style="font-size:0.8rem; padding:0.2rem 0.5rem;" onclick="alert('Opening secure messaging channel...');">Message</button></td>`;
        tableBody.appendChild(row);
    });
}

function renderAssetSelection() {
    const selectEl = document.getElementById('asset-category-select');
    const viewport = document.getElementById('asset-viewport');
    if (!selectEl || !viewport) return;
    const data = premiumAssetsRepo[selectEl.value];
    viewport.innerHTML = `<h4>${data.title}</h4><p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1rem;">${data.description}</p><div>${data.content}</div>`;
}

function renderApologeticsDefense(key) {
    const viewport = document.getElementById('apologetics-viewport');
    if (!viewport) return;
    const data = apologeticsRepo[key];
    viewport.innerHTML = `
        <h4>${data.title}</h4><p style="margin:0.5rem 0;"><strong>Premise:</strong> ${data.premise}</p><div class="scripture-callout-box"><p>${data.scripture}</p></div>
        <div class="apologetics-interactive-quiz" style="margin-top:1rem; background:rgba(0,0,0,0.2); padding:1rem; border-radius:8px;">
            <p><strong>Scenario:</strong> ${data.challenge}</p><button class="btn btn-secondary" id="btn-reveal-defense-script" style="margin-top:1rem; width:100%;">Formulate Defense Script</button>
            <div id="defense-script-reply" style="display:none; margin-top:1rem; border-top:1px solid var(--border-color); padding-top:1rem;"><p style="color:#4ade80;"><strong>Verified Defense:</strong></p><p>${data.solution}</p></div>
        </div>
    `;
    document.getElementById('btn-reveal-defense-script').addEventListener('click', (e) => {
        document.getElementById('defense-script-reply').style.display = 'block';
        e.target.style.display = 'none';
        showToastNotification("🛡️ Apologetics script defense mapped successfully.");
    });
}

function renderTrainingModule(index) {
    const displayPanel = document.getElementById('training-display-panel');
    if (!displayPanel) return;
    const data = paideiaCourseData[index];
    displayPanel.innerHTML = `
        <div class="video-container" style="margin-bottom:1rem;"><video id="training-course-video" controls><source src="${data.videoUrl}" type="video/mp4"></video></div>
        <h3>${data.title}</h3><div style="margin:1rem 0;">${data.curriculumText}</div><button class="btn btn-primary" id="btn-mark-mod-done">Mark Lesson Completed</button>
    `;
    document.getElementById('btn-mark-mod-done').addEventListener('click', () => {
        document.getElementById('kpi-moderator-count').innerText = "13 / 16";
        showToastNotification("✅ Lay Leadership Track progress recorded reactively.");
    });
}

function updateNavbarAuthUI() {
    const btn = document.getElementById('nav-signin-btn');
    if (!btn) return;
    if (AppState.isPremiumUser) {
        btn.innerHTML = '👑 Dashboard Active';
        btn.style.background = 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)';
    } else {
        btn.innerHTML = 'Client Sign In';
        btn.style.background = '';
    }
}

function authenticatePremiumUser() {
    AppState.isPremiumUser = true;
    AppState.currentUser = { name: "Jonathan", role: "Parish Admin" };
    saveToLocalStorage();
    updateNavbarAuthUI();
    renderUserDashboard();
    
    document.getElementById('portal-splash-gateway').innerHTML = `
        <div style="text-align:center; padding: 1rem 0;">
            <p style="color:#4ade80; font-weight:700; margin-bottom:0.5rem;">✅ Authorization Cleared</p>
            <p style="font-size:0.9rem; color:var(--text-muted);">The Parish Command Suite is unlocked below.</p>
        </div>
    `;
    
    document.getElementById('authorized-platform-core').style.display = 'block';
    renderParishCrm();
    renderAssetSelection();
    renderApologeticsDefense('eucharist');
    renderTrainingModule(0);
}

function resetApplicationState() {
    localStorage.removeItem('koinonia_user_state');
    AppState.isPremiumUser = false;
    AppState.currentUser = null;
    updateNavbarAuthUI();
    renderUserDashboard();
    document.getElementById('authorized-platform-core').style.display = 'none';
    location.reload(); 
}

function saveToLocalStorage() {
    localStorage.setItem('koinonia_user_state', JSON.stringify({
        isPremiumUser: AppState.isPremiumUser, currentUser: AppState.currentUser
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('koinonia_user_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        AppState.isPremiumUser = parsed.isPremiumUser;
        AppState.currentUser = parsed.currentUser;
    }
}

function showToastNotification(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'app-toast'; document.body.appendChild(toast); }
    toast.innerText = message;
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    updateNavbarAuthUI();
    renderUserDashboard();

    if (AppState.isPremiumUser) {
        document.getElementById('authorized-platform-core').style.display = 'block';
        renderParishCrm();
    }

    document.getElementById('nav-signin-btn').addEventListener('click', () => { if(!AppState.isPremiumUser) authenticatePremiumUser(); });
    document.getElementById('gateway-unlock-btn').addEventListener('click', () => { authenticatePremiumUser(); document.getElementById('authorized-platform-core').scrollIntoView({behavior:'smooth'}); });
    document.getElementById('admin-gateway-link').addEventListener('click', (e) => { e.preventDefault(); document.getElementById('book-marketing').scrollIntoView({behavior:'smooth'}); });

    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active-content'));
            e.target.classList.add('active');
            document.getElementById(`tab-${e.target.getAttribute('data-tab')}`).classList.add('active-content');
        });
    });

    const assetSelect = document.getElementById('asset-category-select');
    if (assetSelect) { assetSelect.addEventListener('change', renderAssetSelection); }

    document.querySelectorAll('.defense-node').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.defense-node').forEach(b => b.classList.remove('active-node'));
            e.target.classList.add('active-node');
            renderApologeticsDefense(e.target.getAttribute('data-defense'));
        });
    });

    document.querySelectorAll('.sidebar-module-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.sidebar-module-btn').forEach(b => b.classList.remove('active-mod'));
            const target = e.target.closest('.sidebar-module-btn');
            target.classList.add('active-mod');
            renderTrainingModule(parseInt(target.getAttribute('data-mod')));
        });
    });

    document.getElementById('btn-print-summary').addEventListener('click', () => {
        showToastNotification("📊 Packing analytical records ledger summary...");
        setTimeout(() => alert("Koinonia Platform: Dispatched securely to Stakeholders."), 800);
    });
});