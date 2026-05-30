const AppState = {
    isPremiumUser: false,
    selectedRole: 'host',
    currentUser: null
};

// Open-Ended Topic Library Array Data Mockups
const plugAndPlayTopics = {
    topic1: "<h3>Curriculum Block: The Creed (CCC Part 1)</h3><p style='margin-top:0.5rem;'>Focus this week centers around Paragraph 26: 'I Believe in God the Father Almighty, Creator of Heaven and Earth.' Examine scriptural ties back to Genesis 1 and the visible framework of order.</p><h4>Discussion Core Prompt:</h4><p style='font-style:italic;'>How does acknowledging God as Creator modify your stance on daily anxieties?</p>",
    topic2: "<h3>Curriculum Block: Epistles of St. Paul</h3><p style='margin-top:0.5rem;'>Focus tracks through Romans Chapter 12: 'Present your bodies as a living sacrifice, holy and acceptable to God.' Mapping out communal boundaries outside secular fragmentation variables.</p><h4>Discussion Core Prompt:</h4><p style='font-style:italic;'>What practical boundary must your household shift this week to remain a living sacrifice?</p>",
    topic3: "<h3>Curriculum Block: Sacred Marital Vows</h3><p style='margin-top:0.5rem;'>Focus tracks directly through the Res Tantum architectural pillars: Marriage modeled directly after Christ's alignment to the Holy Church. Exploring sacrificial love loops.</p><h4>Discussion Core Prompt:</h4><p style='font-style:italic;'>Where can you explicitly choose sacrificial concession for your spouse before the upcoming session?</p>"
};

const coachPodDatabase = [
    { location: "St. Jude Room (Tuesday Night)", topic: "The Creed Masterclass", schedule: "✅ Confirmed Week 4", score: "96.4% Health Score" },
    { location: "North Olathe Host Circle (Thursdays)", topic: "Romans Pauline Study", schedule: "✅ Confirmed Week 4", score: "91.8% Health Score" },
    { location: "Holy Family Annex (Saturdays)", topic: "Res Tantum Marital Core", schedule: "⚠️ Delay Flag (Awaiting Logs)", score: "94.5% Health Score" }
];

const leadershipMasterCRM = [
    { name: "Robert Burnos", assignment: "Pod Coach 1 (Oversees 4 Hosts)", email: "bob.b@parishmail.org", role: "Small Group Coach" },
    { name: "Maria Fernanda", assignment: "Marriage & Family Circle Host", email: "fernanda.n@homemail.com", role: "Small Group Host" },
    { name: "Simon Johnston", assignment: "Pod Coach 2 (Oversees 3 Hosts)", email: "simon.j@scoutleader.net", role: "Small Group Coach" },
    { name: "Reston Miller", assignment: "St. Jude Room Session Facilitator", email: "reston.m@fllroboticscoach.org", role: "Small Group Host" }
];

const premiumAssetsRepo = {
    agendas: { title: "The 5 Endeavors Meeting Structure (90-Minute Canvas)", description: "A balanced framework combining structured catechesis with unstructured fellowship.", content: "<strong>1. Gathering Buffer (15 min)</strong><br><strong>2. Check-in Opening (10 min)</strong><br><strong>3. Plug Content Module (30 min)</strong><br><strong>4. Vulnerability Core Prompt (25 min)</strong><br><strong>5. Survey Hand-off & Logs (10 min)</strong>" },
    emails: { title: "Parish Launch Communication Sequences & Bulletins", description: "Strategic campaign strings designed for program admins to introduce small groups.", content: "<div class='template-box-code'><strong>Subject:</strong> Moving Beyond the Crowd: Introducing Koinonia Small Groups<br><br>Dear Parishioners, discipleship doesn't happen sitting in rows; it grows in circles...</div>" },
    activities: { title: "The Three Bonds Vulnerability Exercises", description: "Icebreakers designed to pivot groups safely away from simple trauma-bonding toward sacramental fellowship.", content: "<h4>The Trust Transition Exercise</h4><p>Plot critical life milestones: Baptism, seasons of trial, and deep peace moments inside the Church.</p>" }
};

// --- Render Arrays ---
function renderHostTopic() {
    const selector = document.getElementById('host-topic-selector');
    const viewport = document.getElementById('dynamic-topic-content-box');
    if (selector && viewport) {
        viewport.innerHTML = plugAndPlayTopics[selector.value];
    }
}

function renderCoachPodView() {
    const tbody = document.getElementById('coach-pod-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    coachPodDatabase.forEach(group => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${group.location}</strong></td><td><span class="table-group-tag">${group.topic}</span></td><td><code>${group.schedule}</code></td><td><span class="status-indicator">${group.score}</span></td><td><button class="btn btn-secondary" style="font-size:0.8rem; padding:0.25rem 0.5rem;" onclick="alert('Opening check-in session console...');">Verify Host</button></td>`;
        tbody.appendChild(row);
    });
}

function renderCoachAssetSelection() {
    const selectEl = document.getElementById('coach-asset-selector');
    const viewport = document.getElementById('coach-asset-viewport');
    if (!selectEl || !viewport) return;
    const data = premiumAssetsRepo[selectEl.value];
    viewport.innerHTML = `<h4>${data.title}</h4><p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:1rem;">${data.description}</p><div>${data.content}</div>`;
}

function renderLeadershipCRMView() {
    const tbody = document.getElementById('leadership-master-table-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    leadershipMasterCRM.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `<td><strong>${user.name}</strong></td><td><span class="table-group-tag">${user.assignment}</span></td><td><code>${user.email}</code></td><td><span class="status-indicator" style="color:#c084fc;">${user.role}</span></td><td><button class="btn btn-secondary" style="font-size:0.8rem; padding:0.25rem 0.5rem;" onclick="alert('Accessing localized survey records analysis...');">Review Records</button></td>`;
        tbody.appendChild(row);
    });
}

// --- Platform Auth Engines ---
function authenticatePlatformSession() {
    const roleSelector = document.getElementById('portal-role-selector');
    if (!roleSelector) return;
    
    AppState.isPremiumUser = true;
    AppState.selectedRole = roleSelector.value;
    saveToLocalStorage();
    
    // Clear out splash view card layout
    document.getElementById('portal-splash-gateway').innerHTML = `
        <div style="text-align:center; padding:1rem 0;">
            <p style="color:#4ade80; font-weight:700;">✅ Secure Access Cleared</p>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:0.25rem;">Role-based dashboards loaded below.</p>
        </div>
    `;
    
    // Smooth navigation into view containers
    document.getElementById('authorized-platform-core').style.display = 'block';
    
    // Hide all panel variants first, then release the matching role targeted screen
    document.querySelectorAll('.role-panel-suite').forEach(p => p.style.display = 'none');
    
    const badge = document.getElementById('role-badge-pill');
    const title = document.getElementById('role-welcome-title');
    
    if (AppState.selectedRole === 'host') {
        badge.innerText = "SG Grassroots Host";
        title.innerText = "Plug-and-Play Host Workstation";
        document.getElementById('panel-host-workspace').style.display = 'block';
        renderHostTopic();
    } else if (AppState.selectedRole === 'coach') {
        badge.innerText = "Extended Admin Pod Coach";
        title.innerText = "Coach Pod Control Center";
        document.getElementById('panel-coach-workspace').style.display = 'block';
        renderCoachPodView();
        renderCoachAssetSelection();
    } else if (AppState.selectedRole === 'leadership') {
        badge.innerText = "Parish Governance Authority";
        title.innerText = "Pastoral Analytics Command Center";
        document.getElementById('panel-leadership-workspace').style.display = 'block';
        renderLeadershipCRMView();
    }
    
    showToastNotification(`🔑 Authorized session established as: ${AppState.selectedRole.toUpperCase()}`);
}

function resetApplicationState() {
    localStorage.removeItem('final_summit_session_state');
    AppState.isPremiumUser = false;
    AppState.selectedRole = 'host';
    location.reload();
}

function saveToLocalStorage() {
    localStorage.setItem('final_summit_session_state', JSON.stringify({
        isPremiumUser: AppState.isPremiumUser, selectedRole: AppState.selectedRole
    }));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('final_summit_session_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        AppState.isPremiumUser = parsed.isPremiumUser;
        AppState.selectedRole = parsed.selectedRole;
    }
}

function showToastNotification(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('toast-show');
    setTimeout(() => toast.classList.remove('toast-show'), 3500);
}

// --- Wire Event Handlers ---
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();

    if (AppState.isPremiumUser) {
        // Trigger simulation pipeline matching saved session vectors automatically
        document.getElementById('authorized-platform-core').style.display = 'block';
        const selectMock = document.getElementById('portal-role-selector');
        if(selectMock) { selectMock.value = AppState.selectedRole; }
        authenticatePlatformSession();
    }

    // Global Login Interceptors
    document.getElementById('gateway-unlock-btn').addEventListener('click', authenticatePlatformSession);
    document.getElementById('nav-signin-btn').addEventListener('click', () => {
        document.getElementById('book-marketing').scrollIntoView({behavior:'smooth'});
        showToastNotification("✨ Please select your authorized workspace profile tier below.");
    });
    document.getElementById('admin-gateway-link').addEventListener('click', (e) => { e.preventDefault(); document.getElementById('book-marketing').scrollIntoView({behavior:'smooth'}); });

    // Host Workspace Live Topic Select Listener
    const hostTopicSelect = document.getElementById('host-topic-selector');
    if (hostTopicSelect) { hostTopicSelect.addEventListener('change', renderHostTopic); }

    // Coach Workspace Dropdown Asset Pipeline Listener
    const coachAssetSelect = document.getElementById('coach-asset-selector');
    if (coachAssetSelect) { coachAssetSelect.addEventListener('change', renderCoachAssetSelection); }

    // Council Print Action Report Trigger
    const printBtn = document.getElementById('btn-print-summary');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            showToastNotification("📊 Gathering aggregated parish small group survey data matrices...");
            setTimeout(() => alert("The Final Summit Summary Report: Packets compiled and transmitted securely to parish leadership offices."), 800);
        });
    }
});