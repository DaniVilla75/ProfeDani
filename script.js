// Datos de las aplicaciones (podría cargarse desde apps.json)
const appsData = {
    desktopIcons: [
        {
            name: "Computer",
            icon: "https://cdn-icons-png.flaticon.com/512/732/732221.png",
            tooltip: "Introducción a la Informática",
            url: "https://sites.google.com/abc.gob.ar/intropc/dato-e-informaci%C3%B3n"
        },
        {
            name: "Binary Code",
            icon: "img/binary-code.png",
            tooltip: "Representación de la Información",
            url: "https://sites.google.com/abc.gob.ar/nticx4vela/inicio"
        },
        {
            name: "Excel",
            icon: "https://cdn-icons-png.flaticon.com/512/732/732220.png",
            tooltip: "Planilla de cálculo",
            url: "https://danivilla75.github.io/planillacalc25/"
        },
        {
            name: "ERP",
            icon: "img/erp.png",
            tooltip: "Planificación de recursos empresariales",
            url: "https://danivilla75.github.io/erp25.io/"
        },
        {
            name: "HTML",
            icon: "./img/html-5.png",
            tooltip: "Programación Web",
            url: "https://danivilla75.github.io/web1/"
        },
        {
            name: "Css",
            icon: "img/css.png",
            tooltip: "Programación Web",
            url: "https://danivilla75.github.io/web1/"
        },
        {
            name: "Javascript",
            icon: "img/js.png",
            tooltip: "Programación Web",
            url: "https://danivilla75.github.io/web1/"
        },
        {
            name: "PilasBloques",
            icon: "img/Pilas-Bloques.png",
            tooltip: "Programación con Pilas Bloques",
            url: "https://danivilla75.github.io/pilasbloques/"
        },
        {
            name: "AppInventor",
            icon: "img/mit.png",
            tooltip: "Programación con App Inventor",
            url: "https://danivilla75.github.io/appinventor/"
        },
        {
            name: "LSA",
            icon: "img/lsa.png",
            tooltip: "Lenguaje de Señas Argentina",
            url: "https://danitotdl.github.io/appcaa/"
        },
        {
            name: "Google Site",
            icon: "img/google.png",
            tooltip: "Páginas Web creadas con Google Sites",
            url: "https://sites.google.com/abc.gob.ar/educacioninformticatdl/p%C3%A1gina-principal"
        },
        {
            name: "Redes",
            icon: "img/ethernet.png",
            tooltip: "Curso de FP sobre redes de internet",
            url: "https://sites.google.com/view/cfpn401-bj/p%C3%A1gina-principal"
        }
    ],
    pinnedApps: [              
        { icon: "fas fa-folder", name: "Explorador", tooltip: "Explorador de archivos" },
        
    ],
    startMenuApps: [
        { icon: "fab fa-edge", name: "Edge" },
        { icon: "fas fa-folder", name: "Explorador" },
        { icon: "fas fa-store", name: "Microsoft Store" },
        { icon: "fas fa-cog", name: "Configuración" },
        { icon: "fab fa-spotify", name: "Spotify" },
        { icon: "fab fa-steam", name: "Steam" }
    ]
};

// Función para cargar los iconos del escritorio
function loadDesktopIcons() {
    const desktopIconsContainer = document.getElementById('desktop-icons');
    desktopIconsContainer.innerHTML = '';
    
    appsData.desktopIcons.forEach(app => {
        const iconElement = document.createElement('div');
        iconElement.className = 'icon';
        iconElement.setAttribute('data-tooltip', app.tooltip);
        iconElement.innerHTML = `
            <img src="${app.icon}" alt="${app.name}">
            <span>${app.name}</span>
        `;
        desktopIconsContainer.appendChild(iconElement);
    });
}

// Función para cargar las apps ancladas
function loadPinnedApps() {
    const pinnedAppsContainer = document.getElementById('pinned-apps');
    pinnedAppsContainer.innerHTML = '';
    
    appsData.pinnedApps.forEach(app => {
        const appElement = document.createElement('button');
        appElement.className = 'pinned-app';
        appElement.setAttribute('data-tooltip', app.tooltip);
        appElement.innerHTML = `<i class="${app.icon}"></i>`;
        pinnedAppsContainer.appendChild(appElement);
    });
}

// Función para cargar el menú de inicio
function loadStartMenu() {
    const startGrid = document.getElementById('start-grid');
    startGrid.innerHTML = '';
    
    appsData.startMenuApps.forEach(app => {
        const appElement = document.createElement('div');
        appElement.className = 'start-app';
        appElement.innerHTML = `
            <i class="${app.icon}"></i>
            <span>${app.name}</span>
        `;
        startGrid.appendChild(appElement);
    });
}

// Actualizar la hora
function updateTime() {
    const now = new Date();
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    
    const timeString = now.toLocaleTimeString('es-ES', timeOptions);
    const dateString = now.toLocaleDateString('es-ES', dateOptions);
    
    // Actualizar en todos los lugares donde aparece la hora
    document.querySelectorAll('.lock-time, .tray-time').forEach(el => {
        el.textContent = timeString;
    });
    
    // Actualizar fecha en pantalla de bloqueo
    if (document.getElementById('lock-date')) {
        document.getElementById('lock-date').textContent = dateString;
    }
    
    setTimeout(updateTime, 60000); // Actualizar cada minuto
}

// Desbloquear pantalla
function unlockScreen() {
    document.getElementById('lockscreen').style.display = 'none';
    document.getElementById('desktop').style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cargar todos los elementos
    loadDesktopIcons();
    loadPinnedApps();
    loadStartMenu();
    updateTime();
    
    // Desbloquear al hacer clic en la pantalla de bloqueo
    document.getElementById('lockscreen').addEventListener('click', unlockScreen);
    
    // Menú de inicio
    document.getElementById('start-btn').addEventListener('click', () => {
        const startMenu = document.getElementById('start-menu');
        startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#start-btn') && !e.target.closest('#start-menu')) {
            document.getElementById('start-menu').style.display = 'none';
        }
    });
});

// Función para filtrar iconos
function filterIcons(searchTerm) {
    const icons = document.querySelectorAll('.desktop-icons .icon');
    const normalizedSearch = searchTerm.toLowerCase();
    
    icons.forEach(icon => {
        const appName = icon.querySelector('span').textContent.toLowerCase();
        icon.style.display = appName.includes(normalizedSearch) ? 'flex' : 'none';
    });
}

// Event listener para el buscador
document.getElementById('global-search').addEventListener('input', (e) => {
    filterIcons(e.target.value);
});

// Opcional: Limpiar búsqueda al hacer clic en ×
document.querySelector('.search-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-times')) {
        document.getElementById('global-search').value = '';
        filterIcons('');
    }
});

// Y añade este JavaScript:
document.getElementById('global-search').addEventListener('input', (e) => {
    const clearIcon = e.target.nextElementSibling;
    clearIcon.style.display = e.target.value ? 'block' : 'none';
    filterIcons(e.target.value);
});

function loadDesktopIcons() {
    const container = document.getElementById('desktop-icons');
    container.innerHTML = appsData.desktopIcons.map(app => `
        <a href="${app.url}" target="_blank" class="icon-link"> <!-- Envuelve en <a> -->
            <div class="icon" data-tooltip="${app.tooltip}">
                <img src="${app.icon}" alt="${app.name}">
                <span>${app.name}</span>
            </div>
        </a>
    `).join('');
}
