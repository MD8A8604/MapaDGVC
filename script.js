// --- CONFIGURACIÓN ---
mapboxgl.accessToken = window.MAPBOX_ACCESS_TOKEN || '';
if (!mapboxgl.accessToken) {
    throw new Error('Falta configurar MAPBOX_ACCESS_TOKEN en config.js o en Netlify.');
}

// --- CONSTANTES ---
const GEOJSON_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTmvtknwAW3b2TB_6edYnmVjR70T5lOFOAqLsVmbcqdSksUS0zNRuJc2gh9EIoVGDnxC2wC4UOuiSgk/pub?gid=2080902303&single=true&output=csv';
const ESTADOS_URL = 'https://raw.githubusercontent.com/MD8A8604/EDOSMEX1/refs/heads/main/Mapa%20M%C3%A9xico.json';
const DENSIDAD_URL = 'https://raw.githubusercontent.com/MD8A8604/Densidad/refs/heads/main/DP.json';
const POBINDIGENA_URL = 'https://raw.githubusercontent.com/MD8A8604/ponindigena/refs/heads/main/PI.json';
const ESPACIOS_URL = 'https://raw.githubusercontent.com/MD8A8604/Espaciosculturales/main/Espacios%20culturales.geojson';
const DELITOS_URL = 'https://raw.githubusercontent.com/MD8A8604/Incidencia-delictiva/main/Delitos_oct.geojson';
const NINECES_URL = 'https://raw.githubusercontent.com/MD8A8604/NNYJ/main/Concentraci%C3%B3n_ni%C3%B1eces.geojson';
const PLAN_MICHOACAN_URL = 'https://raw.githubusercontent.com/MD8A8604/Michoacan/refs/heads/main/PlanMichoacan.geojson';
const PLANES_URL = 'https://raw.githubusercontent.com/MD8A8604/Cuenca_Istmo/main/Istmo_cuenca.geojson';
const TERRITORIOS_PAZ_URL = 'https://raw.githubusercontent.com/MD8A8604/TP/main/Territorios%20de%20paz.geojson';

const ID_CAPA_DENSIDAD = 'capa-densidad-limpia';
const ID_CAPA_PLANES = 'capa-planes';
const ID_CAPA_INDIGENA = 'capa-poblacion-indigena';
const ID_CAPA_ESPACIOS = 'capa-espacios-culturales';
const ID_CAPA_DELITOS = 'capa-incidencia-delictiva';
const ID_CAPA_NINECES = 'capa-concentracion-nineces';
const ID_CAPA_PLAN_MICHOACAN = 'capa-plan-michoacan';
const ID_CAPA_PLAN_MICHOACAN_BORDE = 'capa-plan-michoacan-borde';
const ID_CAPA_TERRITORIOS_PAZ = 'capa-territorios-paz';
const ID_CAPA_TERRITORIOS_PAZ_BORDE = 'capa-territorios-paz-borde';

const PROP_ENTIDAD = 'Entidad';
const PROP_DENSIDAD = 'Dens_Pob_km2';
const PROP_INDIGENA = 'PORCENTAJEPOBINDIGENA';
const PROP_ESPACIOS = 'EC_MUNICIPIO';
const PROP_DELITOS_ACUMULADO = 'Acumulado';
const PROP_DELITOS_TASA = 'Tasa_ok';
const PROP_DELITOS_LEGACY = 'Delitos_oct_Incidencia delictiva';
const PROP_NINECES_3_11 = '3_A_11';
const PROP_NINECES_12_17 = '12_A_17';
const PROP_NINECES_18_29 = '18_A_29';
let modoNinecesActual = '3_11';
const PROP_ACCIONES = 'Acciones';

const programasOriginales = [
    { nombre: 'Semilleros Creativos', color: '#0d0887', cantidad: 0 },
    { nombre: 'Semilleros de Paz', color: '#5302a3', cantidad: 0 },
    { nombre: 'Semilleros de Música', color: '#febd2a', cantidad: 0 },
    { nombre: 'Semilleros Creativos INPI', color: '#db5c68', cantidad: 0 },
    { nombre: 'Convite Cultural', color: '#a34cfa', cantidad: 0 },
    { nombre: 'Cine Sillita', color: '#a57f2c', cantidad: 0 },
    { nombre: "PAICE 24", color: '#8b0aa5', cantidad: 0 },
    { nombre: "PAICE 25", color: '#32CD32', cantidad: 0 }
];

const COLORES_DENSIDAD = ['#FFF8F0', '#F7EEDD', '#EFE4CC', '#E5D7B8', '#D8C8A2', '#CBB98D', '#B9A57A'];
const COLORES_INDIGENA = ['#F0FDF4', '#CEF4DB', '#ABEAC2', '#84C99D', '#5FB77F', '#3BA662', '#179445'];
const COLORES_ESPACIOS = ['#F2DEF2', '#DEB9DE', '#CA94C9', '#B670B5', '#A24BA0', '#8E268C', '#7A0177'];
const COLORES_DELITOS = ['#EDECEE', '#D6C8CF', '#BEA3AF', '#A77F90', '#905B71', '#783651', '#611232'];
const COLORES_NINECES = ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801'];
const COLORES_PLAN_MICHOACAN = ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#004d40'];

const escalaNacional = [0, 8, 21, 37, 63, 110, 251, 15509];

// Estados cubiertos por cada capa especial
const ESTADOS_PLAN_MICHOACAN = ['Michoacán'];
const ESTADOS_ISTMO_CUENCA = ['Oaxaca', 'Veracruz', 'Chiapas', 'Tabasco', 'Guerrero', 'Michoacán', 'Puebla', 'Tlaxcala', 'Estado de México', 'Jalisco'];

// --- ESTADO ---
let filtroEstadoActual = 'Todos los estados';
let filtroMunicipioActual = 'Todos los municipios';
let filtrosProgramasActivos = [];
let filtroEstatus = 'Activo';
let territoriosPazVisible = false;
let densidadVisible = false;
let indigenaVisible = false;
let espaciosVisible = false;
let delitosVisible = false;
let modoDelitosActual = 'acumulado';
let ninecesVisible = false;
let planesVisible = false;
let planMichoacanVisible = false;

let datosOriginales = [];
let datosDensidadLimpios = null;
let datosIndigenaLimpios = null;
let datosEspaciosLimpios = null;
let datosDelitosLimpios = null;
let datosNinecesLimpios = null;
let datosPlanMichoacan = null;
let datosEstadosMexico = null;
let mapaListo = false;
let popupDelitosHover = null;
let popupEspaciosHover = null;
let popupTerritoriosPazHover = null;
let popupPlanMichoacanHover = null;

function parseValorNumerico(rawVal, fallback = 0) {
    const val = typeof rawVal === 'string' ? parseFloat(rawVal.replace(/,/g, '')) : Number(rawVal);
    return Number.isFinite(val) ? val : fallback;
}

function obtenerNombreMunicipio(propiedades = {}) {
    const posiblesCampos = [
        'Municipio',
        'MUNICIPIO',
        'nom_mun',
        'NOM_MUN',
        'Nom_Mun',
        'NOMGEO',
        'nomgeo'
    ];

    for (const campo of posiblesCampos) {
        const valor = propiedades[campo];
        if (typeof valor === 'string' && valor.trim()) return valor.trim();
    }

    return 'Municipio no disponible';
}

function obtenerPropiedadDelitosActiva() {
    return modoDelitosActual === 'tasa' ? PROP_DELITOS_TASA : PROP_DELITOS_ACUMULADO;
}

function obtenerEtiquetaDelitosActiva() {
    return modoDelitosActual === 'tasa' ? 'Tasa por 100,000 hab.' : 'Total de delitos';
}

function formatearValorDelitos(valor) {
    const numero = parseValorNumerico(valor, 0);
    if (modoDelitosActual === 'tasa') {
        return numero.toLocaleString('es-MX', { minimumFractionDigits: 1, maximumFractionDigits: 2 });
    }
    return Math.round(numero).toLocaleString('es-MX');
}

function extenderBoundsConCoordenadas(bounds, coords) {
    if (!Array.isArray(coords) || coords.length === 0) return;
    if (typeof coords[0] === 'number' && typeof coords[1] === 'number') {
        bounds.extend([coords[0], coords[1]]);
        return;
    }
    coords.forEach(subcoords => extenderBoundsConCoordenadas(bounds, subcoords));
}

function calcularAreaAnillo(coords = []) {
    if (!Array.isArray(coords) || coords.length < 3) return 0;
    let area = 0;
    for (let i = 0; i < coords.length; i++) {
        const actual = coords[i];
        const siguiente = coords[(i + 1) % coords.length];
        area += actual[0] * siguiente[1] - siguiente[0] * actual[1];
    }
    return Math.abs(area) / 2;
}

function obtenerGeometriaPrincipalEstado(geometry) {
    if (!geometry?.coordinates) return null;
    if (geometry.type === 'Polygon') return geometry.coordinates;
    if (geometry.type !== 'MultiPolygon') return geometry.coordinates;

    const poligonoPrincipal = geometry.coordinates.reduce((mayor, poligonoActual) => {
        const areaMayor = calcularAreaAnillo(mayor?.[0] || []);
        const areaActual = calcularAreaAnillo(poligonoActual?.[0] || []);
        return areaActual > areaMayor ? poligonoActual : mayor;
    }, null);

    return poligonoPrincipal || geometry.coordinates[0];
}

function obtenerPaddingFitBounds(esVistaNacional = false) {
    const esMobile = window.innerWidth <= 768;
    return esMobile
        ? (esVistaNacional ? 20 : 24)
        : (esVistaNacional ? 24 : 40);
}

function obtenerOffsetMapaParaPanel() {
    const esMobile = window.innerWidth <= 768;
    if (esMobile) return [0, 0];

    const legend = document.getElementById('legend');
    const legendVisible = legend && !legend.classList.contains('collapsed');
    if (!legendVisible) return [0, 0];

    const panelWidth = Math.ceil(legend.getBoundingClientRect().width);
    return [Math.round(panelWidth * 0.32), 0];
}

function enfocarBounds(bounds, opciones = {}) {
    if (!bounds) return;

    const {
        esVistaNacional = false,
        maxZoom,
        duration = 1000,
        usarOffsetPanel = !esVistaNacional
    } = opciones;

    const padding = obtenerPaddingFitBounds(esVistaNacional);
    const offset = usarOffsetPanel ? obtenerOffsetMapaParaPanel() : [0, 0];

    if (typeof map.cameraForBounds === 'function') {
        const camera = map.cameraForBounds(bounds, { padding, maxZoom });
        if (camera) {
            map.easeTo({
                center: camera.center,
                zoom: camera.zoom,
                bearing: camera.bearing ?? map.getBearing(),
                pitch: camera.pitch ?? map.getPitch(),
                offset,
                duration,
                essential: true
            });
            return;
        }
    }

    map.fitBounds(bounds, {
        padding,
        duration,
        maxZoom,
        retainPadding: false
    });
}

function obtenerBoundsEstado(nombreEstado) {
    if (nombreEstado === 'Todos los estados') {
        return estadosMexico[0]?.bbox || null;
    }

    const featureEstado = datosEstadosMexico?.features?.find(
        feature => feature?.properties?.NAME_1 === nombreEstado
    );

    const geometriaPrincipal = obtenerGeometriaPrincipalEstado(featureEstado?.geometry);
    if (geometriaPrincipal) {
        const bounds = new mapboxgl.LngLatBounds();
        extenderBoundsConCoordenadas(bounds, geometriaPrincipal);
        if (!bounds.isEmpty()) return bounds;
    }

    return estadosMexico.find(e => e.nombre === nombreEstado)?.bbox || null;
}

function obtenerResumenPuntosParaZoom(estado = filtroEstadoActual, municipio = 'Todos los municipios') {
    const puntos = datosOriginales.filter(feature => {
        const props = feature?.properties || {};
        const coords = feature?.geometry?.coordinates;
        if (!coords || !Array.isArray(coords) || coords.length < 2) return false;
        if (!Number.isFinite(coords[0]) || !Number.isFinite(coords[1])) return false;
        if (filtroEstatus !== 'Todos' && props.Estatus !== filtroEstatus) return false;
        if (estado !== 'Todos los estados' && props.Estado !== estado) return false;
        if (municipio !== 'Todos los municipios' && props.Municipio !== municipio) return false;
        if (filtrosProgramasActivos.length > 0 && !filtrosProgramasActivos.includes(props.Programa)) return false;
        if (territoriosPazVisible && props['Atención a las causas'] !== 'Sí') return false;
        if (planMichoacanVisible && !ESTADOS_PLAN_MICHOACAN.includes(props.Estado)) return false;
        if (!planMichoacanVisible && planesVisible && !ESTADOS_ISTMO_CUENCA.includes(props.Estado)) return false;
        return true;
    });

    if (!puntos.length) return null;

    const bounds = new mapboxgl.LngLatBounds();
    let sumaLng = 0;
    let sumaLat = 0;

    puntos.forEach(feature => {
        const [lng, lat] = feature.geometry.coordinates;
        bounds.extend([lng, lat]);
        sumaLng += lng;
        sumaLat += lat;
    });

    return {
        bounds,
        center: [sumaLng / puntos.length, sumaLat / puntos.length],
        count: puntos.length,
        spreadLng: Math.abs(bounds.getEast() - bounds.getWest()),
        spreadLat: Math.abs(bounds.getNorth() - bounds.getSouth())
    };
}

function actualizarBotonesModoDelitos() {
    const esAcumulado = modoDelitosActual === 'acumulado';
    const idsAcumulado = ['delitos-mode-acumulado', 'mobile-delitos-mode-acumulado'];
    const idsTasa = ['delitos-mode-tasa', 'mobile-delitos-mode-tasa'];

    idsAcumulado.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle('active', esAcumulado);
    });
    idsTasa.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle('active', !esAcumulado);
    });
}

function actualizarVisibilidadSelectorModoDelitos() {
    const visible = delitosVisible ? 'block' : 'none';
    const desktop = document.getElementById('delitos-mode-container');
    const mobile = document.getElementById('mobile-delitos-mode-container');
    if (desktop) desktop.style.display = visible;
    if (mobile) mobile.style.display = visible;
}

window.manejarCambioModoDelitos = function (modo) {
    if (modo !== 'acumulado' && modo !== 'tasa') return;
    modoDelitosActual = modo;
    actualizarBotonesModoDelitos();
    if (delitosVisible) aplicarEscalaDelitos(filtroEstadoActual);
    if (popupDelitosHover) popupDelitosHover.remove();
}

function obtenerPropiedadNinecesActiva() {
    if (modoNinecesActual === '3_11') return PROP_NINECES_3_11;
    if (modoNinecesActual === '12_17') return PROP_NINECES_12_17;
    return PROP_NINECES_18_29;
}

function actualizarBotonesModoNineces() {
    ['3_11', '12_17', '18_29'].forEach(m => {
        const id = 'nineces-mode-' + m.replace('_', '-');
        const btn = document.getElementById(id);
        if (btn) btn.classList.toggle('active', modoNinecesActual === m);
    });
}

function actualizarVisibilidadSelectorModoNineces() {
    const visible = ninecesVisible ? 'block' : 'none';
    const container = document.getElementById('nineces-mode-container');
    if (container) container.style.display = visible;
}

window.manejarCambioModoNineces = function (modo) {
    if (!['3_11', '12_17', '18_29'].includes(modo)) return;
    modoNinecesActual = modo;
    actualizarBotonesModoNineces();
    if (ninecesVisible) aplicarEscalaNineces(filtroEstadoActual);
}

const estadosMexico = [
    { nombre: 'Todos los estados', bbox: [[-118.4, 14.5], [-86.7, 32.7]] },
    { nombre: 'Aguascalientes', bbox: [[-102.90, 21.45], [-101.84, 22.50]] },
    { nombre: 'Baja California', bbox: [[-117.13, 28.0], [-109.4, 32.7]] },
    { nombre: 'Baja California Sur', bbox: [[-115.0, 22.9], [-109.4, 28.0]] },
    { nombre: 'Campeche', bbox: [[-92.47, 17.82], [-89.04, 20.85]] },
    { nombre: 'Chiapas', bbox: [[-94.11, 14.54], [-90.22, 17.99]] },
    { nombre: 'Chihuahua', bbox: [[-109.07, 25.64], [-103.35, 31.79]] },
    { nombre: 'Ciudad de México', bbox: [[-99.37, 19.05], [-98.94, 19.59]] },
    { nombre: 'Coahuila', bbox: [[-103.96, 24.55], [-99.87, 29.89]] },
    { nombre: 'Colima', bbox: [[-104.76, 18.65], [-103.46, 19.51]] },
    { nombre: 'Durango', bbox: [[-107.17, 22.31], [-102.89, 26.87]] },
    { nombre: 'Guanajuato', bbox: [[-102.09, 19.93], [-99.61, 21.67]] },
    { nombre: 'Guerrero', bbox: [[-102.11, 16.55], [-98.00, 18.89]] },
    { nombre: 'Hidalgo', bbox: [[-99.89, 19.65], [-97.96, 21.40]] },
    { nombre: 'Jalisco', bbox: [[-105.67, 18.93], [-101.41, 22.75]] },
    { nombre: 'Estado de México', bbox: [[-100.37, 18.35], [-98.61, 20.42]] },
    { nombre: 'Michoacán', bbox: [[-103.77, 17.92], [-100.09, 20.44]] },
    { nombre: 'Morelos', bbox: [[-99.51, 18.35], [-98.64, 19.14]] },
    { nombre: 'Nayarit', bbox: [[-105.73, 20.61], [-105.73, 23.08]] },
    { nombre: 'Nuevo León', bbox: [[-101.20, 23.74], [-98.84, 27.81]] },
    { nombre: 'Oaxaca', bbox: [[-98.57, 15.62], [-93.95, 18.67]] },
    { nombre: 'Puebla', bbox: [[-99.05, 17.93], [-96.43, 20.85]] },
    { nombre: 'Querétaro', bbox: [[-100.51, 20.02], [-99.03, 21.62]] },
    { nombre: 'Quintana Roo', bbox: [[-89.25, 17.81], [-86.71, 21.60]] },
    { nombre: 'San Luis Potosí', bbox: [[-102.04, 21.16], [-98.42, 24.41]] },
    { nombre: 'Sinaloa', bbox: [[-109.46, 22.50], [-105.34, 26.96]] },
    { nombre: 'Sonora', bbox: [[-115.05, 26.01], [-108.41, 32.51]] },
    { nombre: 'Tabasco', bbox: [[-94.54, 17.33], [-91.89, 18.65]] },
    { nombre: 'Tamaulipas', bbox: [[-100.09, 22.22], [-97.14, 27.67]] },
    { nombre: 'Tlaxcala', bbox: [[-98.77, 19.06], [-97.65, 19.81]] },
    { nombre: 'Veracruz', bbox: [[-98.65, 17.15], [-93.55, 22.47]] },
    { nombre: 'Yucatán', bbox: [[-90.42, 19.52], [-87.32, 21.61]] },
    { nombre: 'Zacatecas', bbox: [[-104.41, 21.04], [-101.45, 25.14]] }
];

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/miguelochoa/cmq5ozdrp001w01qrgm54dge6',
    center: [-100.910019, 25.946378],
    zoom: window.innerWidth < 768 ? 4.2 : 4.5,
    customAttribution: '© DGVC 2025'
});

map.addControl(new mapboxgl.NavigationControl(), 'top-right');
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true
    }),
    'top-right'
);
if (typeof mapboxgl.FullscreenControl === 'function') {
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right');
}

// --- BUSCADOR: Botón lupa + flyout ---
const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    marker: false,
    placeholder: 'Buscar un lugar'
});

// Custom control: magnifying glass button
class SearchControl {
    onAdd(map) {
        this._map = map;

        // Button (sin wrapper mapboxgl-ctrl-group para evitar doble caja)
        this._btn = document.createElement('button');
        this._btn.className = 'search-toggle-btn mapboxgl-ctrl';
        this._btn.type = 'button';
        this._btn.title = 'Buscar';
        this._btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;

        // Flyout container
        this._flyout = document.createElement('div');
        this._flyout.className = 'search-flyout';
        this._flyout.appendChild(geocoder.onAdd(map));
        document.body.appendChild(this._flyout);

        // Toggle logic
        this._btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = this._flyout.classList.toggle('active');
            if (isActive) {
                setTimeout(() => {
                    const input = this._flyout.querySelector('.mapboxgl-ctrl-geocoder--input');
                    if (input) input.focus();
                }, 100);
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!this._flyout.contains(e.target) && !this._btn.contains(e.target)) {
                this._flyout.classList.remove('active');
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this._flyout.classList.remove('active');
        });

        // Close after result selected
        geocoder.on('result', () => {
            setTimeout(() => this._flyout.classList.remove('active'), 600);
        });

        return this._btn;
    }
    onRemove() {
        this._btn.parentNode.removeChild(this._btn);
        if (this._flyout) this._flyout.remove();
    }
}
map.addControl(new SearchControl(), 'top-right');

// --- CONFIGURACIÓN DE RUTAS (Modo Regla) ---
// --- CONFIGURACIÓN DE RUTAS (Modo Regla - API Manual) ---
// En lugar de usar el plugin, usaremos la API directamente para tener control total
let perfilActual = 'mapbox/driving';

// Función para obtener ruta desde la API de Mapbox
async function getRoute(start, end, profile) {
    const query = await fetch(
        `https://api.mapbox.com/directions/v5/${profile}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&language=es&access_token=${mapboxgl.accessToken}`,
        { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    // Dibujar la ruta en el mapa
    const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: route
        }
    };

    if (map.getSource('ruler-route')) {
        map.getSource('ruler-route').setData(geojson);
    } else {
        map.addLayer({
            id: 'ruler-route-line',
            type: 'line',
            source: {
                type: 'geojson',
                data: geojson
            },
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 4,
                'line-dasharray': [2, 2]
            }
        });
        // Agregar source implícito si no existía (mapbox lo maneja al añadir layer con source obj)
        // Pero para setData necesitamos el ID del source.
        // Mejor añadir source explícito si falla.
        // Mapbox addLayer con source object crea el source con el mismo ID que el layer si no se especifica? No.
        // Vamos a hacerlo robusto:
    }

    // Actualizar Popup (reutilizando lógica de visualización)
    mostrarPopupRuta(data, profile);
}

// Función auxiliar para añadir capa si no existe (llamada al inicio o bajo demanda)
// Función auxiliar para añadir capa si no existe (llamada al inicio o bajo demanda)
function initRulerLayer() {
    if (!map.getSource('ruler-route')) {
        map.addSource('ruler-route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: []
                }
            }
        });

        map.addLayer({
            id: 'ruler-route-line',
            type: 'line',
            source: 'ruler-route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#3887be',
                'line-width': 4,
                'line-dasharray': [2, 2]
            }
        });
    }

    // Capa para los puntos (marcadores visuales A y B)
    if (!map.getSource('ruler-points')) {
        map.addSource('ruler-points', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        map.addLayer({
            id: 'ruler-point-circle',
            type: 'circle',
            source: 'ruler-points',
            paint: {
                'circle-radius': 6,
                'circle-color': '#ffffff',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ff0000'
            }
        });
    }
}

function mostrarPopupRuta(data, profile) {
    try {
        const distanciaKm = (data.distance / 1000).toFixed(1);
        const duracionSegundos = data.duration;
        let textoDuracion;

        if (duracionSegundos < 3600) {
            let min = Math.round(duracionSegundos / 60);
            if (min === 0) min = '< 1';
            textoDuracion = `${min} min`;
        } else {
            const horas = Math.floor(duracionSegundos / 3600);
            const min = Math.round((duracionSegundos % 3600) / 60);
            textoDuracion = `${horas} h ${min} min`;
        }

        const textoModo = profile.includes('walking') ? 'caminando' : 'en auto';

        // Coordenada central (punto medio de la geometría) para que no tape el punto B
        const coords = data.geometry.coordinates;
        const midIndex = Math.floor(coords.length / 2);
        const coordCentral = coords[midIndex];

        // Procesar pasos de la ruta
        let pasosHTML = '';
        if (data.legs && data.legs[0].steps) {
            pasosHTML = '<div id="ruta-pasos" style="display:none; text-align:left; margin-top:10px; max-height:150px; overflow-y:auto; font-size:12px; border-top:1px solid #ddd; padding-top:5px;">';
            data.legs[0].steps.forEach((step, index) => {
                pasosHTML += `<div style="margin-bottom:4px;">${index + 1}. ${step.maneuver.instruction}</div>`;
            });
            pasosHTML += '</div>';
        }

        const popupContent = document.createElement('div');
        popupContent.style.textAlign = 'center';
        popupContent.style.minWidth = '200px';
        // Quitamos estilos inline que ya están en CSS o que chocan con la transparencia
        popupContent.innerHTML = `
            <strong style="font-size:16px; color:#333;">${distanciaKm} km</strong><br>
            <span style="color:#555; font-size:13px;">${textoDuracion} ${textoModo}</span>
            <div style="margin-top:8px; border-top:1px solid rgba(0,0,0,0.1); padding-top:8px; display:flex; justify-content:center; gap:10px;">
                <button id="btn-auto-popup" type="button" style="background:none; border:none; cursor:pointer; font-size:20px; padding:4px 8px; border-radius:6px; transition: all 0.2s; ${profile.includes('driving') ? 'background-color:rgba(0,0,0,0.05); border:1px solid rgba(0,0,0,0.1);' : 'opacity:0.6;'}" title="Auto">🚗</button>
                <button id="btn-pie-popup" type="button" style="background:none; border:none; cursor:pointer; font-size:20px; padding:4px 8px; border-radius:6px; transition: all 0.2s; ${profile.includes('walking') ? 'background-color:rgba(0,0,0,0.05); border:1px solid rgba(0,0,0,0.1);' : 'opacity:0.6;'}" title="Caminando">🚶</button>
            </div>
            ${pasosHTML ? `<button id="btn-ver-pasos" style="background:none; border:none; color:#007bff; cursor:pointer; font-size:12px; margin-top:8px; text-decoration:none; font-weight:500;">Ver indicaciones ⬇️</button>` : ''}
            ${pasosHTML}
        `;

        // Asignar listeners
        const btnAuto = popupContent.querySelector('#btn-auto-popup');
        const btnPie = popupContent.querySelector('#btn-pie-popup');
        const btnPasos = popupContent.querySelector('#btn-ver-pasos');

        if (btnPasos) {
            btnPasos.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const divPasos = popupContent.querySelector('#ruta-pasos');
                if (divPasos.style.display === 'none') {
                    divPasos.style.display = 'block';
                    btnPasos.innerText = 'Ocultar indicaciones ⬆️';
                } else {
                    divPasos.style.display = 'none';
                    btnPasos.innerText = 'Ver indicaciones ⬇️';
                }
            });
        }

        btnAuto.addEventListener('click', (ev) => {
            ev.stopPropagation();
            if (perfilActual === 'mapbox/driving') return;
            perfilActual = 'mapbox/driving';
            if (puntosMedicion.length >= 2) {
                getRoute(puntosMedicion[0], puntosMedicion[1], 'mapbox/driving');
            }
        });

        btnPie.addEventListener('click', (ev) => {
            ev.stopPropagation();
            if (perfilActual === 'mapbox/walking') return;
            perfilActual = 'mapbox/walking';
            if (puntosMedicion.length >= 2) {
                getRoute(puntosMedicion[0], puntosMedicion[1], 'mapbox/walking');
            }
        });

        // Cerrar otros popups abiertos
        const popupsAbiertos = document.getElementsByClassName('mapboxgl-popup');
        while (popupsAbiertos.length > 0) {
            popupsAbiertos[0].remove();
        }

        if (popupMedicion) popupMedicion.remove();

        popupMedicion = new mapboxgl.Popup({
            className: 'medida-popup',
            closeButton: true,
            closeOnClick: false,
            focusAfterOpen: false,
            anchor: 'center' // Centrar el popup en el punto medio
        })
            .setLngLat(coordCentral)
            .setDOMContent(popupContent)
            .addTo(map);

    } catch (err) {
        console.error('Error al mostrar ruta:', err);
    }
}

// Variable de estado para el perfil (ya declarada arriba)
// let perfilActual = 'mapbox/driving'; // ELIMINADO

// Lógica de la Herramienta Regla
let modoMedicion = false;
let puntosMedicion = [];
let popupMedicion = null;

// Clase de Control Personalizado para el Botón Regla
class RulerControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
        this._container.innerHTML = `
            <button id="btn-medir" class="mapboxgl-ctrl-icon" type="button" aria-label="Medir distancia" title="Medir distancia" style="font-size: 18px; display: flex; align-items: center; justify-content: center;">
                📏
            </button>
        `;

        this._btn = this._container.querySelector('#btn-medir');
        this._btn.addEventListener('click', () => {
            this.toggleRuler();
        });

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }


    // Eliminar funciones obsoletas
    // function cambiarPerfil... (ya no se usa)

    toggleRuler() {
        modoMedicion = !modoMedicion;
        const btn = this._btn;

        if (modoMedicion) {
            btn.classList.add('active');
            btn.style.backgroundColor = '#e0e0e0';
            this._map.getCanvas().style.cursor = 'crosshair';
            document.body.classList.add('cursor-crosshair');

            // Limpiar mediciones previas
            initRulerLayer(); // Asegurar capa
            map.getSource('ruler-route').setData({
                type: 'FeatureCollection',
                features: []
            });
            // Limpiar puntos visuales
            map.getSource('ruler-points').setData({
                type: 'FeatureCollection',
                features: []
            });

            puntosMedicion = [];
            if (popupMedicion) popupMedicion.remove();

            // Resetear perfil a auto por defecto
            perfilActual = 'mapbox/driving';
        } else {
            this.desactivar();
        }
    }

    desactivar() {
        modoMedicion = false;
        if (this._btn) {
            this._btn.classList.remove('active');
            this._btn.style.backgroundColor = '';
        }
        if (this._map) this._map.getCanvas().style.cursor = '';
        document.body.classList.remove('cursor-crosshair');

        // Limpiar linea visualmente al salir
        if (map.getSource('ruler-route')) {
            map.getSource('ruler-route').setData({
                type: 'FeatureCollection',
                features: []
            });
        }
        if (map.getSource('ruler-points')) {
            map.getSource('ruler-points').setData({
                type: 'FeatureCollection',
                features: []
            });
        }
    }
}

// Agregar el control al mapa
const rulerControl = new RulerControl();
map.addControl(rulerControl, 'top-right');

function desactivarModoMedicion() {
    rulerControl.desactivar();
}

map.on('click', (e) => {
    if (!modoMedicion) return;

    const coords = [e.lngLat.lng, e.lngLat.lat];
    puntosMedicion.push(coords);

    // Actualizar visualización de puntos inmediatamente
    const pointsGeoJSON = {
        type: 'FeatureCollection',
        features: puntosMedicion.map(coord => ({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: coord
            }
        }))
    };

    if (map.getSource('ruler-points')) {
        map.getSource('ruler-points').setData(pointsGeoJSON);
    }

    if (puntosMedicion.length === 1) {
        // Punto A visible
    } else if (puntosMedicion.length === 2) {
        // Calcular ruta manual
        getRoute(puntosMedicion[0], puntosMedicion[1], perfilActual);

        // No limpiamos puntosMedicion inmediatamente para permitir 'toggle' de modo con los mismos puntos
        // Pero si el usuario hace clic otra vez, ¿qué pasa?
        // Vamos a dejarlo activo para que vea el resultado.
        // Si quiere medir otra vez, tiene que desactivar/activar o podríamos resetear al 3er clic?
        // La UX original era "clic A, clic B -> ruta".
        // Vamos a reiniciar puntosMedicion DESPUÉS de un tiempo O al siguiente clic.
        // Mejor: al tercer clic, empieza nueva medición.
    } else if (puntosMedicion.length > 2) {
        // Nuevo inicio
        puntosMedicion = [coords];
        if (map.getSource('ruler-route')) {
            map.getSource('ruler-route').setData({
                type: 'FeatureCollection',
                features: []
            });
        }
        // Actualizar puntos para mostrar solo el nuevo
        if (map.getSource('ruler-points')) {
            map.getSource('ruler-points').setData({
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    }
                }]
            });
        }
        if (popupMedicion) popupMedicion.remove();
    }
});

// Interceptar ruta para mostrar resultados personalizados
function manejarRuta(e) {
    try {
        if (e.route && e.route.length > 0) {
            const ruta = e.route[0];
            const distanciaKm = (ruta.distance / 1000).toFixed(1);
            let duracionMin = Math.round(ruta.duration / 60);
            if (duracionMin === 0) duracionMin = '< 1';

            // Usamos la variable global perfilActual
            const textoModo = perfilActual.includes('walking') ? 'caminando' : 'en auto';

            // Punto final para el popup
            // Intentamos obtenerlo de la geometría de la ruta (ahora que forzamos geojson)
            let coordDestino = null;
            if (ruta.geometry && ruta.geometry.coordinates && ruta.geometry.coordinates.length > 0) {
                coordDestino = ruta.geometry.coordinates[ruta.geometry.coordinates.length - 1];
            }

            // Fallback: usar el destino del control si la ruta falló
            if (!coordDestino) {
                const dest = directions.getDestination();
                if (dest && dest.geometry) {
                    coordDestino = dest.geometry.coordinates;
                }
            }

            // Si aún es null, no podemos poner el popup
            if (!coordDestino) return;

            // Crear elemento DOM para el popup
            const popupContent = document.createElement('div');
            popupContent.style.textAlign = 'center';
            popupContent.innerHTML = `
                <strong style="font-size:16px;">${distanciaKm} km</strong><br>
                <span style="color:#666;">${duracionMin} min ${textoModo}</span>
                <div style="margin-top:8px; border-top:1px solid #eee; padding-top:4px; display:flex; justify-content:center; gap:10px;">
                    <button id="btn-auto-popup" type="button" style="background:none; border:none; cursor:pointer; font-size:20px; padding:2px 6px; border-radius:4px; transition: all 0.2s; ${perfilActual.includes('driving') ? 'background-color:#eee; border:1px solid #ccc;' : 'opacity:0.5;'}" title="Auto">🚗</button>
                    <button id="btn-pie-popup" type="button" style="background:none; border:none; cursor:pointer; font-size:20px; padding:2px 6px; border-radius:4px; transition: all 0.2s; ${perfilActual.includes('walking') ? 'background-color:#eee; border:1px solid #ccc;' : 'opacity:0.5;'}" title="Caminando">🚶</button>
                </div>
            `;

            // Asignar listeners directamente al elemento DOM antes de añadirlo al mapa
            const btnAuto = popupContent.querySelector('#btn-auto-popup');
            const btnPie = popupContent.querySelector('#btn-pie-popup');

            btnAuto.addEventListener('click', (ev) => {
                ev.stopPropagation();
                if (perfilActual === 'mapbox/driving') return;
                cambiarPerfil('mapbox/driving');
            });

            btnPie.addEventListener('click', (ev) => {
                ev.stopPropagation();
                if (perfilActual === 'mapbox/walking') return;
                cambiarPerfil('mapbox/walking');
            });

            // Cerrar otros popups abiertos
            const popupsAbiertos = document.getElementsByClassName('mapboxgl-popup');
            while (popupsAbiertos.length > 0) {
                popupsAbiertos[0].remove();
            }

            if (popupMedicion) popupMedicion.remove();

            popupMedicion = new mapboxgl.Popup({
                className: 'medida-popup',
                closeButton: true,
                closeOnClick: false,
                focusAfterOpen: false
            })
                // Usamos la coordenada extraída de la geometría
                .setLngLat(coordDestino)
                .setDOMContent(popupContent)
                .addTo(map);

            // Estilizar línea
            if (map.getLayer('directions-route-line')) {
                map.setPaintProperty('directions-route-line', 'line-color', '#ff0000');
                map.setPaintProperty('directions-route-line', 'line-dasharray', [2, 2]);
            }
            if (map.getLayer('directions-route-line-alt')) {
                map.setPaintProperty('directions-route-line-alt', 'line-color', '#ff0000');
                map.setPaintProperty('directions-route-line-alt', 'line-dasharray', [2, 2]);
            }
        }
    } catch (err) {
        console.error('Error al mostrar ruta:', err);
    }
}

function cambiarPerfil(nuevoPerfil) {
    perfilActual = nuevoPerfil;

    // Guardar origen y destino actuales
    const origin = directions.getOrigin();
    const dest = directions.getDestination();

    // Recrear control con nuevo perfil
    crearDirecciones(nuevoPerfil);

    // Restaurar ruta una vez que el control haya cargado
    if (origin && dest) {
        directions.on('load', () => {
            directions.setOrigin(origin.geometry.coordinates);
            directions.setDestination(dest.geometry.coordinates);
        });

        // Fallback por si el evento load ya pasó o no se dispara (aunque con recreation debería dispararse)
        // setTimeout(() => { ... }, 50) era muy arriesgado.
    }
}

// --- UTILIDADES ---
async function fetchCSVAsGeoJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const csvText = await response.text();

        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const features = results.data
                        .filter(row => row.Latitud && row.Longitud && !isNaN(row.Latitud) && !isNaN(row.Longitud))
                        .map(row => ({
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: [parseFloat(row.Longitud), parseFloat(row.Latitud)]
                            },
                            properties: row
                        }));

                    resolve({
                        type: 'FeatureCollection',
                        features: features
                    });
                },
                error: function (err) {
                    reject(err);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
        throw error;
    }
}

function toWGS84(x, y) {
    const R2D = 180 / Math.PI;
    const A = 6378137.0;
    return [(x / A) * R2D, (Math.PI / 2 - 2 * Math.atan(Math.exp(-y / A))) * R2D];
}

function corregirGeometria(geometry) {
    if (!geometry || !geometry.coordinates) return geometry;
    const corregirAnillo = ring => ring.map(c => Math.abs(c[0]) > 180 ? toWGS84(c[0], c[1]) : c);
    if (geometry.type === 'Polygon') {
        geometry.coordinates = geometry.coordinates.map(corregirAnillo);
    } else if (geometry.type === 'MultiPolygon') {
        geometry.coordinates = geometry.coordinates.map(poly => poly.map(corregirAnillo));
    }
    return geometry;
}

function calcularQuantiles(valores, numClases = 7) {
    const nums = valores.map(v => Number(v)).filter(v => !isNaN(v)).sort((a, b) => a - b);
    if (!nums.length) return [];
    const q = [nums[0]];
    for (let i = 1; i < numClases; i++) {
        q.push(nums[Math.floor((nums.length * i) / numClases)]);
    }
    q.push(nums[nums.length - 1]);
    return [...new Set(q)];
}

function calcularJenks(valores, numClases = 7) {
    const data = valores.map(v => Number(v)).filter(v => !isNaN(v) && isFinite(v)).sort((a, b) => a - b);
    if (!data.length) return [];
    if (data.length <= numClases) return [...new Set(data)].sort((a, b) => a - b);

    const n = data.length;
    const mat1 = Array(n + 1).fill(0).map(() => Array(numClases + 1).fill(0));
    const mat2 = Array(n + 1).fill(0).map(() => Array(numClases + 1).fill(0));

    for (let i = 1; i <= numClases; i++) {
        mat1[1][i] = 1;
        mat2[1][i] = 0;
        for (let j = 2; j <= n; j++) mat2[j][i] = Infinity;
    }

    let v = 0;
    for (let l = 2; l <= n; l++) {
        let s1 = 0, s2 = 0, w = 0;
        for (let m = 1; m <= l; m++) {
            const i3 = l - m + 1;
            const val = data[i3 - 1];
            s2 += val * val;
            s1 += val;
            w++;
            v = s2 - (s1 * s1) / w;
            const i4 = i3 - 1;
            if (i4 !== 0) {
                for (let j = 2; j <= numClases; j++) {
                    if (mat2[l][j] >= (v + mat2[i4][j - 1])) {
                        mat1[l][j] = i3;
                        mat2[l][j] = v + mat2[i4][j - 1];
                    }
                }
            }
        }
        mat1[l][1] = 1;
        mat2[l][1] = v;
    }

    const breaks = [];
    let k = n;
    for (let j = numClases; j >= 1; j--) {
        const id = mat1[k][j] - 1;
        breaks.push(data[id]);
        k = mat1[k][j] - 1;
    }

    breaks.reverse();
    breaks[0] = data[0];
    breaks.push(data[n - 1]);

    return [...new Set(breaks)].sort((a, b) => a - b);
}

// --- CARGA DEL MAPA ---
map.on('load', () => {

    map.addSource('fuente-densidad-limpia', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
    });
    map.addLayer({
        id: ID_CAPA_DENSIDAD,
        type: 'fill',
        source: 'fuente-densidad-limpia',
        layout: { visibility: 'none' },
        paint: { 'fill-color': '#ccc', 'fill-opacity': 0.5 }
    });

    map.addSource('fuente-poblacion-indigena', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
    });
    map.addLayer({
        id: ID_CAPA_INDIGENA,
        type: 'fill',
        source: 'fuente-poblacion-indigena',
        layout: { visibility: 'none' },
        paint: { 'fill-color': '#ccc', 'fill-opacity': 0.5 }
    });

    map.addSource('fuente-espacios-culturales', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
    });
    map.addLayer({
        id: ID_CAPA_ESPACIOS,
        type: 'fill',
        source: 'fuente-espacios-culturales',
        layout: { visibility: 'none' },
        paint: { 'fill-color': '#ccc', 'fill-opacity': 0.5 }
    });

    map.addSource('fuente-incidencia-delictiva', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
    });
    map.addLayer({
        id: ID_CAPA_DELITOS,
        type: 'fill',
        source: 'fuente-incidencia-delictiva',
        layout: { visibility: 'none' },
        paint: { 'fill-color': '#ccc', 'fill-opacity': 0.5 }
    });

    map.addSource('fuente-concentracion-nineces', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] }
    });
    map.addLayer({
        id: ID_CAPA_NINECES,
        type: 'fill',
        source: 'fuente-concentracion-nineces',
        layout: { visibility: 'none' },
        paint: { 'fill-color': '#ccc', 'fill-opacity': 0.5 }
    });

    popupDelitosHover = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'delitos-hover-popup'
    });
    popupEspaciosHover = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'delitos-hover-popup'
    });
    popupTerritoriosPazHover = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'delitos-hover-popup'
    });
    popupPlanMichoacanHover = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: 'delitos-hover-popup'
    });

    map.addSource('estados-mexico', { type: 'geojson', data: ESTADOS_URL });
    fetch(ESTADOS_URL)
        .then(r => r.json())
        .then(data => {
            datosEstadosMexico = data;
            const sourceEstados = map.getSource('estados-mexico');
            if (sourceEstados) sourceEstados.setData(data);
        })
        .catch(e => console.error('Error cargando estados:', e));

    map.addLayer({
        id: 'overlay-oscuro',
        type: 'fill',
        source: 'estados-mexico',
        paint: { 'fill-color': '#e0e0e0', 'fill-opacity': 0 }
    });

    map.addLayer({
        id: 'estados-borde',
        type: 'line',
        source: 'estados-mexico',
        paint: { 'line-color': '#888', 'line-width': 1, 'line-opacity': 0 }
    });

    map.addSource('fuente-planes', { type: 'geojson', data: PLANES_URL });
    map.addLayer({
        id: ID_CAPA_PLANES,
        type: 'fill',
        source: 'fuente-planes',
        layout: { visibility: 'none' },
        paint: {
            'fill-color': [
                'match',
                ['get', 'Istmo cuenca'],
                'Istmo', '#bdbdbd',
                'Cuenca del Balsas', '#90a4ae',
                '#cccccc'
            ],
            'fill-opacity': 0.5
        },
        filter: ['!=', ['get', 'Istmo cuenca'], null]
    });

    // --- CAPA PLAN MICHOACÁN ---
    // (source and layers are created dynamically when PLAN_MICHOACAN_URL is fetched below)

    map.addSource('programas-source', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
    map.addLayer({
        id: 'puntos-geojson',
        type: 'circle',
        source: 'programas-source',
        paint: {
            'circle-color': [
                'match', ['get', 'Programa'],
                'Semilleros Creativos', '#0d0887',
                'Semilleros de Paz', '#5302a3',
                'Semilleros de Música', '#febd2a',
                'Semilleros Creativos INPI', '#db5c68',
                'Convite Cultural', '#a34cfa',
                'Cine Sillita', '#a57f2c',
                "PAICE 24", '#8b0aa5',
                "PAICE 25", '#32CD32',
                '#cccccc'
            ],
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                4, 4,
                8, 6,
                12, 7,
                16, 9
            ],
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    map.addSource('fuente-territorios-paz', {
        type: 'geojson',
        data: TERRITORIOS_PAZ_URL
    });
    map.addLayer({
        id: ID_CAPA_TERRITORIOS_PAZ,
        type: 'fill',
        source: 'fuente-territorios-paz',
        layout: { visibility: 'none' },
        paint: {
            'fill-color': '#9AD9A6',
            'fill-opacity': 0.35,
            'fill-outline-color': '#9AD9A6'
        },
        filter: [
            'all',
            ['!=', ['get', 'TP'], null],
            ['!=', ['get', 'TP'], '']
        ]
    }, 'puntos-geojson');
    map.addLayer({
        id: ID_CAPA_TERRITORIOS_PAZ_BORDE,
        type: 'line',
        source: 'fuente-territorios-paz',
        layout: { visibility: 'none' },
        paint: {
            'line-color': '#6CBF7D',
            'line-width': 1.2,
            'line-opacity': 0.9
        },
        filter: [
            'all',
            ['!=', ['get', 'TP'], null],
            ['!=', ['get', 'TP'], '']
        ]
    }, 'puntos-geojson');

    // --- INTERACCIÓN: CLIC EN PUNTOS (TOOLTIP / POPUP) ---
    map.on('click', 'puntos-geojson', (e) => {
        if (modoMedicion) return;
        const p = e.features[0].properties;

        // 1. Definimos qué campo usar como "Nombre" principal. 
        // Usamos 'Nombre del semillero' como prioridad, si no existe, usamos 'Programa'.
        const nombreTitulo = p['Nombre'] || p.Programa || 'Sin nombre';

        // 2. Función para generar las filas con el estilo solicitado:
        // Etiqueta en gris claro (#888) y Valor en negro (#000).
        const generarFila = (etiqueta, valor) => {
            // Si el valor está vacío, null o undefined, no mostramos la línea
            if (!valor || valor === 'null' || valor === 'undefined') return '';

            return `
                <div style="margin-bottom: 4px; line-height: 1.4;">
                    <span style="color: #999; font-weight: 400;">${etiqueta}:</span> 
                    <span style="color: #000; font-weight: 500;">${valor}</span>
                </div>
            `;
        };

        // 3. Construimos el HTML
        let htmlContent = `
            <div style="font-family: 'Noto Sans', sans-serif; min-width: 240px; padding: 5px 0;">
                
                <h3 style="margin: 0 0 10px 0; color: #000; font-size: 1.17em; font-weight: bold; line-height: 1.2;">
                    ${nombreTitulo}
                </h3>

                ${generarFila('Estado', p.Estado)}
                ${generarFila('Municipio', p.Municipio)}
                ${generarFila('Localidad', p.Localidad)}
                ${generarFila('Sede', p.Sedes)}
                ${generarFila('Dirección', p.Direcciones)}
                ${generarFila('Coordinación', p['Área'])}
                
                ${generarFila('Cantidad de participantes', p['Cantidad de participantes'] || p.Participantes)}
                
            </div>
        `;

        new mapboxgl.Popup({ maxWidth: '300px' })
            .setLngLat(e.lngLat)
            .setHTML(htmlContent)
            .addTo(map);
    });

    map.on('mouseenter', 'puntos-geojson', () => map.getCanvas().style.cursor = 'pointer');
    map.on('mouseleave', 'puntos-geojson', () => map.getCanvas().style.cursor = '');

    map.on('mousemove', ID_CAPA_ESPACIOS, (e) => {
        if (modoMedicion || !espaciosVisible || !popupEspaciosHover || !e.features?.length) return;

        const propiedades = e.features[0].properties || {};
        const valorEspacios = propiedades[PROP_ESPACIOS];
        const nombreMunicipio = obtenerNombreMunicipio(propiedades);
        const valorNumerico = typeof valorEspacios === 'string'
            ? parseFloat(valorEspacios.replace(/,/g, ''))
            : Number(valorEspacios);
        const totalEspacios = Number.isFinite(valorNumerico) ? valorNumerico.toLocaleString('es-MX') : '0';

        popupEspaciosHover
            .setLngLat(e.lngLat)
            .setHTML(`
                <div>
                    <div><strong>Municipio:</strong> ${nombreMunicipio}</div>
                    <div><strong>Total de espacios:</strong> ${totalEspacios}</div>
                </div>
            `)
            .addTo(map);

        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', ID_CAPA_ESPACIOS, () => {
        if (popupEspaciosHover) popupEspaciosHover.remove();
        map.getCanvas().style.cursor = '';
    });

    map.on('mousemove', ID_CAPA_DELITOS, (e) => {
        if (modoMedicion || !delitosVisible || !popupDelitosHover || !e.features?.length) return;

        const propiedades = e.features[0].properties || {};
        const propiedadDelitos = obtenerPropiedadDelitosActiva();
        const valorDelitos = propiedades[propiedadDelitos];
        const nombreMunicipio = obtenerNombreMunicipio(propiedades);
        const totalDelitos = formatearValorDelitos(valorDelitos);
        const etiquetaDelitos = obtenerEtiquetaDelitosActiva();

        popupDelitosHover
            .setLngLat(e.lngLat)
            .setHTML(`
                <div>
                    <div><strong>Municipio:</strong> ${nombreMunicipio}</div>
                    <div><strong>${etiquetaDelitos}:</strong> ${totalDelitos}</div>
                </div>
            `)
            .addTo(map);

        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', ID_CAPA_DELITOS, () => {
        if (popupDelitosHover) popupDelitosHover.remove();
        map.getCanvas().style.cursor = '';
    });

    // --- INTERACCIÓN: HOVER EN TERRITORIOS DE PAZ ---
    map.on('mousemove', ID_CAPA_TERRITORIOS_PAZ, (e) => {
        if (modoMedicion || !territoriosPazVisible || !popupTerritoriosPazHover || !e.features?.length) return;

        const propiedades = e.features[0].properties || {};
        const nombreMunicipio = obtenerNombreMunicipio(propiedades);
        const nombreEstado = propiedades['NOM_ENT'] || propiedades['Entidad'] || '';

        popupTerritoriosPazHover
            .setLngLat(e.lngLat)
            .setHTML(`
                <div>
                    <div><strong>Municipio:</strong> ${nombreMunicipio}</div>
                    ${nombreEstado ? `<div><strong>Estado:</strong> ${nombreEstado}</div>` : ''}
                </div>
            `)
            .addTo(map);

        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', ID_CAPA_TERRITORIOS_PAZ, () => {
        if (popupTerritoriosPazHover) popupTerritoriosPazHover.remove();
        map.getCanvas().style.cursor = '';
    });

    // --- INTERACCIÓN: HOVER EN PLAN MICHOACÁN ---
    map.on('mousemove', ID_CAPA_PLAN_MICHOACAN, (e) => {
        if (modoMedicion || !planMichoacanVisible || !popupPlanMichoacanHover || !e.features?.length) return;
        const region = e.features[0].properties['Regiones'] || 'Región sin nombre';
        popupPlanMichoacanHover
            .setLngLat(e.lngLat)
            .setHTML(`
                <div style="font-family:'Noto Sans',sans-serif; font-size:13px;">
                    <strong style="color:#FF6A00;">Región:</strong> ${region}
                </div>
            `)
            .addTo(map);
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', ID_CAPA_PLAN_MICHOACAN, () => {
        if (popupPlanMichoacanHover) popupPlanMichoacanHover.remove();
        map.getCanvas().style.cursor = '';
    });

    crearSelectorEstado();
    crearLeyenda();
    mapaListo = true;

    fetch(DENSIDAD_URL).then(r => r.json()).then(data => {
        const feats = data.features.map(f => {
            if (!f.geometry) return f;
            let necesitaCorreccion = false;
            const c = f.geometry.coordinates;
            if (c[0] && c[0][0]) {
                const testCoord = typeof c[0][0][0] === 'number' ? c[0][0][0] : c[0][0][0][0];
                if (Math.abs(testCoord) > 180) necesitaCorreccion = true;
            }
            if (necesitaCorreccion) f.geometry = corregirGeometria(f.geometry);

            const rawVal = f.properties[PROP_DENSIDAD];
            const val = typeof rawVal === 'string' ? parseFloat(rawVal.replace(/,/g, '')) : Number(rawVal);
            f.properties[PROP_DENSIDAD] = isNaN(val) ? 0 : val;
            f.properties[PROP_ENTIDAD] = f.properties[PROP_ENTIDAD] ? f.properties[PROP_ENTIDAD].trim() : '';
            return f;
        });

        datosDensidadLimpios = { type: 'FeatureCollection', features: feats };
        map.getSource('fuente-densidad-limpia').setData(datosDensidadLimpios);
        console.log('✓ Densidad cargada');
    }).catch(e => console.error("Error densidad:", e));

    fetch(POBINDIGENA_URL).then(r => r.json()).then(data => {
        const feats = data.features.map(f => {
            if (!f.geometry) return f;
            let necesitaCorreccion = false;
            const c = f.geometry.coordinates;
            if (c[0] && c[0][0]) {
                const testCoord = typeof c[0][0][0] === 'number' ? c[0][0][0] : c[0][0][0][0];
                if (Math.abs(testCoord) > 180) necesitaCorreccion = true;
            }
            if (necesitaCorreccion) f.geometry = corregirGeometria(f.geometry);

            const rawVal = f.properties[PROP_INDIGENA];
            const val = typeof rawVal === 'string' ? parseFloat(rawVal.replace(/,/g, '')) : Number(rawVal);
            f.properties[PROP_INDIGENA] = isNaN(val) ? 0 : val;
            f.properties.Entidad = f.properties.Entidad ? f.properties.Entidad.trim() : '';
            return f;
        });

        datosIndigenaLimpios = { type: 'FeatureCollection', features: feats };
        map.getSource('fuente-poblacion-indigena').setData(datosIndigenaLimpios);
        console.log('✓ Población indígena cargada');
    }).catch(e => console.error("Error población indígena:", e));

    fetch(ESPACIOS_URL).then(r => r.json()).then(data => {
        const feats = data.features.map(f => {
            if (!f.geometry) return f;
            let necesitaCorreccion = false;
            const c = f.geometry.coordinates;
            if (c[0] && c[0][0]) {
                const testCoord = typeof c[0][0][0] === 'number' ? c[0][0][0] : c[0][0][0][0];
                if (Math.abs(testCoord) > 180) necesitaCorreccion = true;
            }
            if (necesitaCorreccion) f.geometry = corregirGeometria(f.geometry);

            const rawVal = f.properties[PROP_ESPACIOS];
            const val = typeof rawVal === 'string' ? parseFloat(rawVal.replace(/,/g, '')) : Number(rawVal);
            f.properties[PROP_ESPACIOS] = isNaN(val) ? 0 : val;
            f.properties.Entidad = f.properties.Entidad ? f.properties.Entidad.trim() : '';
            return f;
        });

        datosEspaciosLimpios = { type: 'FeatureCollection', features: feats };
        map.getSource('fuente-espacios-culturales').setData(datosEspaciosLimpios);
        console.log('✓ Espacios culturales cargados');
    }).catch(e => console.error("Error espacios culturales:", e));

    fetch(DELITOS_URL).then(r => r.json()).then(data => {
        const feats = data.features.map(f => {
            if (!f.geometry) return f;
            let necesitaCorreccion = false;
            const c = f.geometry.coordinates;
            if (c[0] && c[0][0]) {
                const testCoord = typeof c[0][0][0] === 'number' ? c[0][0][0] : c[0][0][0][0];
                if (Math.abs(testCoord) > 180) necesitaCorreccion = true;
            }
            if (necesitaCorreccion) f.geometry = corregirGeometria(f.geometry);

            const rawAcumulado = f.properties[PROP_DELITOS_ACUMULADO] ?? f.properties[PROP_DELITOS_LEGACY];
            const rawTasa = f.properties[PROP_DELITOS_TASA];
            f.properties[PROP_DELITOS_ACUMULADO] = parseValorNumerico(rawAcumulado, 0);
            f.properties[PROP_DELITOS_TASA] = parseValorNumerico(rawTasa, 0);
            // Mantener compatibilidad con lógica legacy existente
            f.properties[PROP_DELITOS_LEGACY] = f.properties[PROP_DELITOS_ACUMULADO];
            f.properties.Entidad = f.properties.Entidad ? f.properties.Entidad.trim() : '';
            return f;
        });

        datosDelitosLimpios = { type: 'FeatureCollection', features: feats };
        map.getSource('fuente-incidencia-delictiva').setData(datosDelitosLimpios);
        console.log('✓ Incidencia delictiva cargada');
    }).catch(e => console.error("Error delitos:", e));

    fetch(NINECES_URL).then(r => r.json()).then(data => {
        const feats = data.features.map(f => {
            if (!f.geometry) return f;
            let necesitaCorreccion = false;
            const c = f.geometry.coordinates;
            if (c[0] && c[0][0]) {
                const testCoord = typeof c[0][0][0] === 'number' ? c[0][0][0] : c[0][0][0][0];
                if (Math.abs(testCoord) > 180) necesitaCorreccion = true;
            }
            if (necesitaCorreccion) f.geometry = corregirGeometria(f.geometry);

            const processVal = (prop) => {
                const rawVal = f.properties[prop];
                const val = typeof rawVal === 'string' ? parseFloat(rawVal.replace(/,/g, '')) : Number(rawVal);
                return isNaN(val) ? 0 : val;
            };

            f.properties[PROP_NINECES_3_11] = processVal(PROP_NINECES_3_11) * 100;
            // The file has a typo '18_A_20' instead of '12_A_17'
            f.properties[PROP_NINECES_12_17] = (processVal(PROP_NINECES_12_17) || processVal('18_A_20')) * 100;
            f.properties[PROP_NINECES_18_29] = processVal(PROP_NINECES_18_29) * 100;
            f.properties.Entidad = f.properties.Entidad ? f.properties.Entidad.trim() : '';
            return f;
        });

        datosNinecesLimpios = { type: 'FeatureCollection', features: feats };
        map.getSource('fuente-concentracion-nineces').setData(datosNinecesLimpios);
        console.log('✓ Concentración de niñeces cargada');
    }).catch(e => console.error("Error niñeces:", e));

    // Cargar Plan Michoacán
    fetch(PLAN_MICHOACAN_URL)
        .then(response => response.json())
        .then(data => {
            datosPlanMichoacan = corregirGeometria(data);

            map.addSource('fuente-plan-michoacan', {
                type: 'geojson',
                data: datosPlanMichoacan
            });

            map.addLayer({
                id: ID_CAPA_PLAN_MICHOACAN,
                type: 'fill',
                source: 'fuente-plan-michoacan',
                layout: { visibility: 'none' },
                paint: {
                    'fill-color': '#FF8C00',
                    'fill-opacity': 0.25
                }
            }, 'puntos-geojson');

            map.addLayer({
                id: ID_CAPA_PLAN_MICHOACAN_BORDE,
                type: 'line',
                source: 'fuente-plan-michoacan',
                layout: { visibility: 'none' },
                paint: {
                    'line-color': '#FF8C00',
                    'line-width': 1.5,
                    'line-opacity': 0.7
                }
            }, 'puntos-geojson');

            aplicarEscalaPlanMichoacan(filtroEstadoActual);
            console.log('✓ Plan Michoacán cargado');
        })
        .catch(error => console.error('Error cargando Plan Michoacán:', error));

    fetchCSVAsGeoJSON(GEOJSON_URL).then(d => {
        // Actualizar la fuente del mapa
        map.getSource('programas-source').setData(d);

        datosOriginales = d.features;
        aplicarFiltros(); // Aplicar filtro de Estatus desde el inicio
        actualizarSelectorMunicipio(filtroEstadoActual); // poblar municipios si hay estado seleccionado
        console.log('✓ Datos CSV cargados y contadores actualizados');
    }).catch(e => console.error("Error cargando CSV principal:", e));

    console.log('✓ Mapa iniciado');
});

// --- LÓGICA DE CAPAS DEMOGRÁFICAS ---
function aplicarEscalaDensidad(nombreEstado) {
    if (!datosDensidadLimpios || !map.getLayer(ID_CAPA_DENSIDAD)) return;

    if (!densidadVisible) {
        map.setLayoutProperty(ID_CAPA_DENSIDAD, 'visibility', 'none');
        return;
    }

    map.setLayoutProperty(ID_CAPA_DENSIDAD, 'visibility', 'visible');

    let stops = [], valores = [];

    if (nombreEstado === 'Todos los estados') {
        valores = escalaNacional;
        map.setFilter(ID_CAPA_DENSIDAD, null);
        stops = [COLORES_DENSIDAD[0]];
        for (let i = 1; i < escalaNacional.length; i++) {
            stops.push(escalaNacional[i], COLORES_DENSIDAD[Math.min(i, COLORES_DENSIDAD.length - 1)]);
        }
    } else {
        const feats = datosDensidadLimpios.features.filter(
            f => f.properties[PROP_ENTIDAD] === nombreEstado
        );

        if (feats.length) {
            const vals = feats.map(f => f.properties[PROP_DENSIDAD]).filter(v => v !== null && v !== undefined && !isNaN(v));
            // BUG FIX: Ensure we don't request more classes than valid data points
            const numClases = Math.min(7, new Set(vals).size);
            if (numClases > 0) {
                valores = calcularQuantiles(vals, numClases);
                map.setFilter(ID_CAPA_DENSIDAD, ['==', ['get', PROP_ENTIDAD], nombreEstado]);
            }
        }
    }

    if (valores.length >= 2) {
        stops = [COLORES_DENSIDAD[0]];
        for (let i = 1; i < valores.length; i++) {
            stops.push(valores[i], COLORES_DENSIDAD[Math.min(i, COLORES_DENSIDAD.length - 1)]);
        }

        try {
            map.setPaintProperty(ID_CAPA_DENSIDAD, 'fill-color', [
                'step',
                ['get', PROP_DENSIDAD],
                ...stops
            ]);
        } catch (e) {
            console.error('Error aplicando colores densidad:', e);
        }

        actualizarLeyendaDemografica(valores, 'densidad');
    }
}

function aplicarEscalaIndigena(nombreEstado) {
    if (!datosIndigenaLimpios || !map.getLayer(ID_CAPA_INDIGENA)) return;

    if (!indigenaVisible) {
        map.setLayoutProperty(ID_CAPA_INDIGENA, 'visibility', 'none');
        return;
    }

    map.setLayoutProperty(ID_CAPA_INDIGENA, 'visibility', 'visible');

    let stops = [], valores = [];

    if (nombreEstado === 'Todos los estados') {
        map.setFilter(ID_CAPA_INDIGENA, null);
        const vals = datosIndigenaLimpios.features.map(f => f.properties[PROP_INDIGENA]).filter(v => v !== null && v !== undefined && !isNaN(v));
        valores = calcularJenks(vals, 6);
    } else {
        const feats = datosIndigenaLimpios.features.filter(
            f => f.properties[PROP_ENTIDAD] === nombreEstado
        );

        if (feats.length) {
            const vals = feats.map(f => f.properties[PROP_INDIGENA]).filter(v => v !== null && v !== undefined && !isNaN(v));
            // BUG FIX: Ensure we don't request more classes than valid data points
            const numClases = Math.min(6, new Set(vals).size);
            if (numClases > 0) {
                valores = calcularJenks(vals, numClases);
                map.setFilter(ID_CAPA_INDIGENA, ['==', ['get', PROP_ENTIDAD], nombreEstado]);
            }
        }
    }

    if (valores.length >= 2) {
        stops = [COLORES_INDIGENA[0]];
        for (let i = 1; i < valores.length; i++) {
            stops.push(valores[i], COLORES_INDIGENA[Math.min(i, COLORES_INDIGENA.length - 1)]);
        }

        try {
            map.setPaintProperty(ID_CAPA_INDIGENA, 'fill-color', [
                'step',
                ['get', PROP_INDIGENA],
                ...stops
            ]);
        } catch (e) {
            console.error('Error aplicando colores indígena:', e);
        }

        actualizarLeyendaDemografica(valores, 'indigena');
    }
}

function aplicarEscalaEspacios(nombreEstado) {
    if (!datosEspaciosLimpios || !map.getLayer(ID_CAPA_ESPACIOS)) return;
    if (!espaciosVisible) {
        map.setLayoutProperty(ID_CAPA_ESPACIOS, 'visibility', 'none');
        if (popupEspaciosHover) popupEspaciosHover.remove();
        return;
    }

    map.setLayoutProperty(ID_CAPA_ESPACIOS, 'visibility', 'visible');

    let stops = [], valores = [];

    if (nombreEstado === 'Todos los estados') {
        map.setFilter(ID_CAPA_ESPACIOS, null);
        const vals = datosEspaciosLimpios.features.map(f => f.properties[PROP_ESPACIOS]).filter(v => v !== null && v !== undefined && !isNaN(v));
        valores = calcularJenks(vals, 7);
    } else {
        const feats = datosEspaciosLimpios.features.filter(
            f => f.properties.Entidad === nombreEstado
        );

        if (feats.length) {
            const vals = feats.map(f => f.properties[PROP_ESPACIOS]).filter(v => v !== null && v !== undefined && !isNaN(v));
            const numClases = Math.min(7, new Set(vals).size);
            if (numClases > 0) {
                valores = calcularJenks(vals, numClases);
                map.setFilter(ID_CAPA_ESPACIOS, ['==', ['get', 'Entidad'], nombreEstado]);
            }
        }
    }

    if (valores.length >= 2) {
        stops = [COLORES_ESPACIOS[0]];
        for (let i = 1; i < valores.length; i++) {
            stops.push(valores[i], COLORES_ESPACIOS[Math.min(i, COLORES_ESPACIOS.length - 1)]);
        }

        try {
            map.setPaintProperty(ID_CAPA_ESPACIOS, 'fill-color', [
                'step',
                ['get', PROP_ESPACIOS],
                ...stops
            ]);
        } catch (e) {
            console.error('Error aplicando colores espacios:', e);
        }

        actualizarLeyendaDemografica(valores, 'espacios');
    }
}

function aplicarEscalaDelitos(nombreEstado) {
    if (!datosDelitosLimpios || !map.getLayer(ID_CAPA_DELITOS)) return;
    const propiedadDelitos = obtenerPropiedadDelitosActiva();

    if (!delitosVisible) {
        map.setLayoutProperty(ID_CAPA_DELITOS, 'visibility', 'none');
        if (popupDelitosHover) popupDelitosHover.remove();
        return;
    }

    map.setLayoutProperty(ID_CAPA_DELITOS, 'visibility', 'visible');

    let stops = [], valores = [];

    if (nombreEstado === 'Todos los estados') {
        map.setFilter(ID_CAPA_DELITOS, null);
        const vals = datosDelitosLimpios.features.map(f => f.properties[propiedadDelitos]).filter(v => v !== null && v !== undefined && !isNaN(v));
        valores = calcularJenks(vals, 7);
    } else {
        const feats = datosDelitosLimpios.features.filter(
            f => f.properties.Entidad === nombreEstado
        );

        if (feats.length) {
            const vals = feats.map(f => f.properties[propiedadDelitos]).filter(v => v !== null && v !== undefined && !isNaN(v));
            const numClases = Math.min(7, new Set(vals).size);
            if (numClases > 0) {
                valores = calcularJenks(vals, numClases);
                map.setFilter(ID_CAPA_DELITOS, ['==', ['get', 'Entidad'], nombreEstado]);
            }
        }
    }

    if (valores.length >= 2) {
        stops = [COLORES_DELITOS[0]];
        for (let i = 1; i < valores.length; i++) {
            stops.push(valores[i], COLORES_DELITOS[Math.min(i, COLORES_DELITOS.length - 1)]);
        }

        try {
            map.setPaintProperty(ID_CAPA_DELITOS, 'fill-color', [
                'step',
                ['get', propiedadDelitos],
                ...stops
            ]);
        } catch (e) {
            console.error('Error aplicando colores delitos:', e);
        }

        actualizarLeyendaDemografica(valores, 'delitos');
    }
}

function aplicarEscalaNineces(nombreEstado) {
    if (!datosNinecesLimpios || !map.getLayer(ID_CAPA_NINECES)) return;
    if (!ninecesVisible) {
        map.setLayoutProperty(ID_CAPA_NINECES, 'visibility', 'none');
        return;
    }

    map.setLayoutProperty(ID_CAPA_NINECES, 'visibility', 'visible');

    let stops = [], valores = [];
    let colorsToUse = COLORES_NINECES;
    const propActiva = obtenerPropiedadNinecesActiva();

    if (nombreEstado === 'Todos los estados') {
        map.setFilter(ID_CAPA_NINECES, null);
        const vals = datosNinecesLimpios.features.map(f => f.properties[propActiva]).filter(v => v > 0);
        valores = calcularJenks(vals, 7);
    } else {
        const feats = datosNinecesLimpios.features.filter(
            f => f.properties.Entidad === nombreEstado
        );

        if (feats.length) {
            const vals = feats.map(f => f.properties[propActiva]).filter(v => v > 0);

            // VISUALIZATION FIX: Use fewer classes for state view and shift palette to darker tones
            const numClases = Math.min(5, new Set(vals).size);
            if (numClases > 0) {
                valores = calcularJenks(vals, numClases);
                colorsToUse = COLORES_NINECES.slice(1, numClases + 1);
                map.setFilter(ID_CAPA_NINECES, ['==', ['get', 'Entidad'], nombreEstado]);
            }
        }
    }

    if (valores.length >= 2) {
        stops = [colorsToUse[0]];
        for (let i = 1; i < valores.length; i++) {
            stops.push(valores[i], colorsToUse[Math.min(i, colorsToUse.length - 1)]);
        }

        try {
            map.setPaintProperty(ID_CAPA_NINECES, 'fill-color', [
                'step',
                ['get', propActiva],
                ...stops
            ]);
        } catch (e) {
            console.error('Error aplicando colores niñeces:', e);
        }

        actualizarLeyendaDemografica(valores, 'nineces', colorsToUse);
    }
}

function aplicarEscalaPlanMichoacan(nombreEstado) {
    if (!datosPlanMichoacan || !map.getLayer(ID_CAPA_PLAN_MICHOACAN)) return;
    const visibilidad = planMichoacanVisible ? 'visible' : 'none';
    map.setLayoutProperty(ID_CAPA_PLAN_MICHOACAN, 'visibility', visibilidad);

    if (map.getLayer(ID_CAPA_PLAN_MICHOACAN_BORDE)) {
        map.setLayoutProperty(ID_CAPA_PLAN_MICHOACAN_BORDE, 'visibility', visibilidad);
    }
}

function actualizarLeyendaDemografica(valores, tipo, customColors = null) {
    if (!valores || valores.length < 2) return;
    const colores = customColors || (tipo === 'densidad' ? COLORES_DENSIDAD :
        tipo === 'indigena' ? COLORES_INDIGENA :
            tipo === 'espacios' ? COLORES_ESPACIOS :
                tipo === 'nineces' ? COLORES_NINECES :
                    tipo === 'plan-michoacan' ? COLORES_PLAN_MICHOACAN : COLORES_DELITOS);

    const unidad = tipo === 'densidad' ? 'hab/km²' :
        tipo === 'indigena' ? '%' :
            tipo === 'nineces' ? '%' :
                tipo === 'plan-michoacan' ? 'Acciones' :
                    tipo === 'delitos' ? (modoDelitosActual === 'tasa' ? 'Tasa por 100,000 hab.' : 'Acumulado de delitos') : '';

    // --- NUEVA LÓGICA DE FUENTES Y DESCRIPCIONES ---
    let descripcionTexto = '';
    let fuente = '';

    // Asignar fuentes
    if (tipo === 'densidad' || tipo === 'indigena') {
        fuente = 'Fuente: INEGI CPV 2020';
    } else if (tipo === 'espacios') {
        fuente = 'Fuente: CNDI - SC';
    } else if (tipo === 'delitos') {
        fuente = 'Fuente: SESNSP';
    } else if (tipo === 'nineces') {
        fuente = 'Fuente: INEGI CPV 2020';
    } else if (tipo === 'plan-michoacan') {
        fuente = 'Fuente: Drive Plan Michoacán';
    }

    // Construir descripción
    if (tipo === 'espacios') {
        descripcionTexto = `Casas de artesanías, Casas y Centros de Cultura, Complejos cinematográficos, Galerías, Librerías, Museos, Red Nacional de Bibliotecas y Teatros.<br><em>${fuente}</em>`;
    } else if (tipo === 'delitos') {
        descripcionTexto = modoDelitosActual === 'tasa'
            ? `La incidencia delictiva se expresa como tasa por cada 100,000 habitantes.<br><em>${fuente}</em>`
            : `La incidencia delictiva se compone de los siguientes delitos del fuero común: Feminicidios, homicidio doloso y culposo.<br><em>${fuente}</em>`;
    } else if (tipo === 'nineces') {
        const etiqueta = modoNinecesActual === '3_11' ? 'de 3 a 11 años' :
            modoNinecesActual === '12_17' ? 'de 12 a 17 años' : 'de 18 a 29 años';
        descripcionTexto = `Concentración de población ${etiqueta}.<br><em>${fuente}</em>`;
    } else if (tipo === 'plan-michoacan') {
        descripcionTexto = `Acciones de Cultura realizadas en el marco del Plan Michoacán.<br><em>${fuente}</em>`;
    } else {
        // Para Densidad e Indígena que antes no tenían descripción, ahora mostramos la fuente
        descripcionTexto = `<em>${fuente}</em>`;
    }

    const fmt = v => {
        if (tipo === 'indigena') return Math.round(v * 100) + '%';
        if (tipo === 'nineces') return Math.round(v) + '%';
        if (tipo === 'delitos') return formatearValorDelitos(v);
        if (tipo === 'espacios') return Math.round(v);
        return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : Math.round(v);
    };

    let indices = valores.length >= 6
        ? [0, Math.floor(valores.length * 0.2), Math.floor(valores.length * 0.4),
            Math.floor(valores.length * 0.6), Math.floor(valores.length * 0.8), valores.length - 1]
        : valores.map((_, i) => i);

    const labs = [...new Set(indices.map(i => valores[i]))]
        .sort((a, b) => a - b)
        .map(v => `<span>${fmt(v)}</span>`)
        .join('');

    const cssGrad = `background: linear-gradient(to right, ${colores.join(', ')}); width:100%; height:12px; border-radius:2px; margin-bottom:4px;`;
    const cssLabs = "display:flex; justify-content:space-between; font-size:10px; width:100%; color:#555;";

    ['.density-legend', '.mobile-density-legend'].forEach(sel => {
        const g = document.querySelector(`${sel} .density-gradient`);
        const l = document.querySelector(`${sel} .density-labels`);
        const u = document.querySelector(`${sel} .density-unit`);
        const d = document.querySelector(`${sel} .density-description`);

        if (g) g.style.cssText = cssGrad;
        if (l) {
            l.innerHTML = labs;
            l.style.cssText = cssLabs;
        }
        if (u) u.textContent = unidad;
        if (d) {
            d.innerHTML = descripcionTexto; // Usamos innerHTML para permitir <br> y <em>
            d.style.display = 'block'; // Forzamos que se muestre siempre si hay texto
        }
    });
}

// --- FILTROS Y CONTROLES ---

// Populates the municipality selects based on CSV data for the given state
function actualizarSelectorMunicipio(estado) {
    const isAll = (estado === 'Todos los estados');
    let municipios = [];
    if (!isAll && datosOriginales.length > 0) {
        const set = new Set();
        datosOriginales.forEach(f => {
            const mun = f.properties.Municipio;
            const est = f.properties.Estado;
            if (est === estado && mun && mun !== 'null' && mun !== 'undefined') {
                set.add(mun.trim());
            }
        });
        municipios = [...set].sort((a, b) => a.localeCompare(b, 'es'));
    }

    const mListDesktop = document.getElementById('municipio-dropdown-list');
    const mLabelDesktop = document.getElementById('municipio-select-label');
    const wrapper = document.getElementById('municipio-selector-wrapper');

    if (mListDesktop && mLabelDesktop && wrapper) {
        const defaultOpt = `<div class="custom-dropdown-item" onclick="manejarCambioMunicipio('Todos los municipios')">Todos los municipios</div>`;
        const opts = municipios.map(m => `<div class="custom-dropdown-item" onclick="manejarCambioMunicipio('${m}')">${m}</div>`).join('');
        mListDesktop.innerHTML = defaultOpt + opts;
        mLabelDesktop.textContent = 'Todos los municipios';
        wrapper.style.display = isAll ? 'none' : '';
    }

    // Si también lo necesitas en mobile, se haría homólogo para mobileSel...
    const mListMobile = document.getElementById('mobile-municipio-dropdown-list');
    const mLabelMobile = document.getElementById('mobile-municipio-select-label');
    const mobileWrapper = document.getElementById('mobile-municipio-selector-wrapper');
    if (mListMobile && mLabelMobile && mobileWrapper) {
        const defaultOpt = `<div class="custom-dropdown-item" onclick="manejarCambioMunicipio('Todos los municipios')">Todos los municipios</div>`;
        const opts = municipios.map(m => `<div class="custom-dropdown-item" onclick="manejarCambioMunicipio('${m}')">${m}</div>`).join('');
        mListMobile.innerHTML = defaultOpt + opts;
        mLabelMobile.textContent = 'Todos los municipios';
        mobileWrapper.style.display = isAll ? 'none' : '';
    }
}

window.toggleDropdown = function (listId) {
    const list = document.getElementById(listId);
    if (list) {
        // Cierra los demás
        document.querySelectorAll('.custom-dropdown-list').forEach(l => {
            if (l.id !== listId) l.classList.remove('open');
        });
        list.classList.toggle('open');
    }
};

// Cierra el dropdown al hacer click fuera
document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown-container')) {
        document.querySelectorAll('.custom-dropdown-list').forEach(l => l.classList.remove('open'));
    }
});

window.manejarCambioMunicipio = function (municipio) {
    // 1. Update Labels and close dropdowns
    filtroMunicipioActual = municipio;
    document.querySelectorAll('#municipio-select-label, #mobile-municipio-select-label').forEach(el => {
        if (el) el.textContent = municipio;
    });
    document.querySelectorAll('.custom-dropdown-list').forEach(l => l.classList.remove('open'));
    aplicarFiltros();

    // 2. FlyTo Logic
    if (municipio === 'Todos los municipios') {
        const isAll = (filtroEstadoActual === 'Todos los estados');
        const boundsEstado = obtenerBoundsEstado(filtroEstadoActual);
        if (boundsEstado) {
            enfocarBounds(boundsEstado, {
                esVistaNacional: isAll,
                maxZoom: isAll ? undefined : 10.5,
                duration: 1000,
                usarOffsetPanel: !isAll
            });
        }
        return;
    }

    // Check data and calculate bounding box
    const puntosMunicipio = datosOriginales.filter(f =>
        f.properties.Municipio === municipio &&
        f.properties.Estado === filtroEstadoActual &&
        f.geometry && f.geometry.coordinates
    );

    if (puntosMunicipio.length > 0) {
        const bounds = new mapboxgl.LngLatBounds();
        let sumaLng = 0;
        let sumaLat = 0;
        puntosMunicipio.forEach(f => {
            bounds.extend(f.geometry.coordinates);
            sumaLng += f.geometry.coordinates[0];
            sumaLat += f.geometry.coordinates[1];
        });
        const center = [sumaLng / puntosMunicipio.length, sumaLat / puntosMunicipio.length];
        const spreadLng = Math.abs(bounds.getEast() - bounds.getWest());
        const spreadLat = Math.abs(bounds.getNorth() - bounds.getSouth());
        const esAgrupacionCompacta = puntosMunicipio.length === 1 || (spreadLng < 0.03 && spreadLat < 0.03);

        if (esAgrupacionCompacta) {
            map.flyTo({
                center,
                zoom: puntosMunicipio.length === 1 ? 12.8 : 12.4,
                offset: obtenerOffsetMapaParaPanel(),
                duration: 1200,
                essential: true
            });
            return;
        }

        enfocarBounds(bounds, {
            esVistaNacional: false,
            maxZoom: 12.5,
            duration: 1200,
            usarOffsetPanel: true
        });
    }
};

window.manejarCambioEstado = function (estado) {
    // Update label and close dropdown
    const stateLabel = document.getElementById('state-select-label');
    if (stateLabel) stateLabel.textContent = estado;
    document.querySelectorAll('.custom-dropdown-list').forEach(l => l.classList.remove('open'));

    filtroEstadoActual = estado;
    filtroMunicipioActual = 'Todos los municipios';
    actualizarSelectorMunicipio(estado);

    const isAll = (estado === 'Todos los estados');
    if (isAll) {
        map.setFilter('overlay-oscuro', null);
        map.setPaintProperty('overlay-oscuro', 'fill-opacity', 0);
        map.setFilter('estados-borde', null);
        map.setPaintProperty('estados-borde', 'line-opacity', 0);
    } else {
        map.setFilter('overlay-oscuro', null);
        map.setPaintProperty('overlay-oscuro', 'fill-opacity', [
            'case',
            ['==', ['get', 'NAME_1'], estado],
            0,
            0.6
        ]);

        map.setFilter('estados-borde', ['==', ['get', 'NAME_1'], estado]);
        map.setPaintProperty('estados-borde', 'line-opacity', 0.8);
    }

    const boundsEstado = obtenerBoundsEstado(estado);
    if (boundsEstado) {
        enfocarBounds(boundsEstado, {
            esVistaNacional: isAll,
            maxZoom: isAll ? undefined : 10.5,
            duration: 1000,
            usarOffsetPanel: !isAll
        });
    }

    aplicarEscalaDensidad(estado);
    aplicarEscalaIndigena(estado);
    aplicarEscalaEspacios(estado);
    aplicarEscalaDelitos(estado);
    aplicarEscalaNineces(estado);
    aplicarFiltros();
}

function aplicarFiltros() {
    let f = ['all'];
    if (filtroEstatus !== 'Todos') {
        f.push(['==', ['get', 'Estatus'], filtroEstatus]);
    }
    if (filtroEstadoActual !== 'Todos los estados') {
        f.push(['==', ['get', 'Estado'], filtroEstadoActual]);
    }

    if (filtrosProgramasActivos.length > 0) {
        const matchProgramas = ['any', ...filtrosProgramasActivos.map(p => ['==', ['get', 'Programa'], p])];
        f.push(matchProgramas);
    }

    if (territoriosPazVisible) {
        f.push(['==', ['get', 'Atención a las causas'], 'Sí']);
    }

    // Filtro geográfico por capa activa
    if (planMichoacanVisible) {
        f.push(['in', ['get', 'Estado'], ['literal', ESTADOS_PLAN_MICHOACAN]]);
    } else if (planesVisible) {
        f.push(['in', ['get', 'Estado'], ['literal', ESTADOS_ISTMO_CUENCA]]);
    }

    if (map.getLayer('puntos-geojson')) {
        map.setFilter('puntos-geojson', f.length > 1 ? f : null);
    }

    actualizarContadores();
    actualizarEstilosVisuales();
}

function actualizarEstilosVisuales() {
    document.querySelectorAll('.legend-item, .mobile-legend-item').forEach(item => {
        const n = item.querySelector('.program-name')?.textContent.trim();
        const key = item.querySelector('.legend-key, .mobile-legend-key');
        const activo = filtrosProgramasActivos.length === 0 || filtrosProgramasActivos.includes(n);

        const color = programasOriginales.find(p => p.nombre === n)?.color || '#999';

        if (activo) {
            item.style.opacity = '1';
            item.style.fontWeight = 'bold';
            if (key) {
                key.style.background = color;
                key.style.color = 'white';
                key.style.borderColor = color;
            }
        } else {
            item.style.opacity = '0.7';
            item.style.fontWeight = 'normal';
            if (key) {
                key.style.background = 'transparent';
                key.style.color = 'transparent';
                key.style.borderColor = color;
            }
        }
    });
}

function actualizarContadores() {
    let d = datosOriginales;
    if (filtroEstatus !== 'Todos') {
        d = d.filter(f => f.properties.Estatus === filtroEstatus);
    }
    if (filtroEstadoActual !== 'Todos los estados') {
        d = d.filter(f => f.properties.Estado === filtroEstadoActual);
    }
    if (filtroMunicipioActual !== 'Todos los municipios') {
        d = d.filter(f => f.properties.Municipio === filtroMunicipioActual);
    }
    if (filtrosProgramasActivos.length > 0) {
        d = d.filter(f => filtrosProgramasActivos.includes(f.properties.Programa));
    }
    if (territoriosPazVisible) {
        d = d.filter(f => f.properties['Atención a las causas'] === 'Sí');
    }
    // Filtro geográfico por capa activa
    if (planMichoacanVisible) {
        d = d.filter(f => ESTADOS_PLAN_MICHOACAN.includes(f.properties.Estado));
    } else if (planesVisible) {
        d = d.filter(f => ESTADOS_ISTMO_CUENCA.includes(f.properties.Estado));
    }
    const c = {};
    programasOriginales.forEach(p => c[p.nombre] = 0);
    d.forEach(f => {
        if (c[f.properties.Programa] !== undefined) c[f.properties.Programa]++;
    });

    programasOriginales.forEach((p, i) => {
        const t = `(${c[p.nombre] || 0})`;
        const l = document.querySelectorAll('#legend .legend-item .program-count')[i];
        const m = document.querySelectorAll('.mobile-legend-item .program-count')[i];
        if (l) l.textContent = t;
        if (m) m.textContent = t;
    });
}

function manejarFiltroPrograma(p) {
    const index = filtrosProgramasActivos.indexOf(p);
    if (index === -1) {
        filtrosProgramasActivos.push(p);
    } else {
        filtrosProgramasActivos.splice(index, 1);
    }
    aplicarFiltros();
}

window.manejarSwitchTerritoriosPaz = function (v) {
    territoriosPazVisible = v;
    if (map.getLayer(ID_CAPA_TERRITORIOS_PAZ)) {
        map.setLayoutProperty(ID_CAPA_TERRITORIOS_PAZ, 'visibility', v ? 'visible' : 'none');
    }
    if (map.getLayer(ID_CAPA_TERRITORIOS_PAZ_BORDE)) {
        map.setLayoutProperty(ID_CAPA_TERRITORIOS_PAZ_BORDE, 'visibility', v ? 'visible' : 'none');
    }
    
    const divLeyenda = document.getElementById('territorios-paz-legend');
    if (divLeyenda) divLeyenda.style.display = v ? 'block' : 'none';

    toggleChecks('territorios-paz', v);
    aplicarFiltros();
    if (!v && !planMichoacanVisible && !planesVisible) {
        manejarCambioEstado(filtroEstadoActual);
    }
}

// --- SWITCH HANDLERS (TIMEOUT FIX) ---

window.manejarSwitchDensidad = function (v) {
    densidadVisible = v;
    if (v) {
        if (indigenaVisible) { indigenaVisible = false; toggleChecks('indigena', false); aplicarEscalaIndigena(filtroEstadoActual); }
        if (espaciosVisible) { espaciosVisible = false; toggleChecks('espacios', false); aplicarEscalaEspacios(filtroEstadoActual); }
        if (delitosVisible) { delitosVisible = false; toggleChecks('delitos', false); aplicarEscalaDelitos(filtroEstadoActual); }
        if (ninecesVisible) { ninecesVisible = false; toggleChecks('nineces', false); aplicarEscalaNineces(filtroEstadoActual); }
        if (planesVisible) { planesVisible = false; toggleChecks('planes', false); manejarSwitchPlanes(false); }
    }
    actualizarVisibilidadLeyendaDemografica();
    // BUG FIX: Increased delay to 200ms to allow visibility/filter changes to propagate
    setTimeout(() => aplicarEscalaDensidad(filtroEstadoActual), 200);
}

window.manejarSwitchIndigena = function (v) {
    indigenaVisible = v;
    if (v) {
        if (densidadVisible) { densidadVisible = false; toggleChecks('densidad', false); aplicarEscalaDensidad(filtroEstadoActual); }
        if (espaciosVisible) { espaciosVisible = false; toggleChecks('espacios', false); aplicarEscalaEspacios(filtroEstadoActual); }
        if (delitosVisible) { delitosVisible = false; toggleChecks('delitos', false); aplicarEscalaDelitos(filtroEstadoActual); }
        if (ninecesVisible) { ninecesVisible = false; toggleChecks('nineces', false); aplicarEscalaNineces(filtroEstadoActual); }
        if (planesVisible) { planesVisible = false; toggleChecks('planes', false); manejarSwitchPlanes(false); }
    }
    actualizarVisibilidadLeyendaDemografica();
    // BUG FIX: Increased delay to 200ms
    setTimeout(() => aplicarEscalaIndigena(filtroEstadoActual), 200);
}

window.manejarSwitchEspacios = function (v) {
    espaciosVisible = v;
    if (v) {
        if (densidadVisible) { densidadVisible = false; toggleChecks('densidad', false); aplicarEscalaDensidad(filtroEstadoActual); }
        if (indigenaVisible) { indigenaVisible = false; toggleChecks('indigena', false); aplicarEscalaIndigena(filtroEstadoActual); }
        if (delitosVisible) { delitosVisible = false; toggleChecks('delitos', false); aplicarEscalaDelitos(filtroEstadoActual); }
        if (ninecesVisible) { ninecesVisible = false; toggleChecks('nineces', false); aplicarEscalaNineces(filtroEstadoActual); }
        if (planesVisible) { planesVisible = false; toggleChecks('planes', false); manejarSwitchPlanes(false); }
    }
    actualizarVisibilidadLeyendaDemografica();
    // BUG FIX: Increased delay to 200ms
    setTimeout(() => aplicarEscalaEspacios(filtroEstadoActual), 200);
}

window.manejarSwitchDelitos = function (v) {
    delitosVisible = v;
    if (v) {
        if (densidadVisible) { densidadVisible = false; toggleChecks('densidad', false); aplicarEscalaDensidad(filtroEstadoActual); }
        if (indigenaVisible) { indigenaVisible = false; toggleChecks('indigena', false); aplicarEscalaIndigena(filtroEstadoActual); }
        if (espaciosVisible) { espaciosVisible = false; toggleChecks('espacios', false); aplicarEscalaEspacios(filtroEstadoActual); }
        if (ninecesVisible) { ninecesVisible = false; toggleChecks('nineces', false); aplicarEscalaNineces(filtroEstadoActual); }
        if (planesVisible) { planesVisible = false; toggleChecks('planes', false); manejarSwitchPlanes(false); }
    }
    actualizarVisibilidadLeyendaDemografica();
    // BUG FIX: Increased delay to 200ms
    setTimeout(() => aplicarEscalaDelitos(filtroEstadoActual), 200);
}

window.manejarSwitchNineces = function (v) {
    ninecesVisible = v;
    if (v) {
        if (densidadVisible) { densidadVisible = false; toggleChecks('densidad', false); aplicarEscalaDensidad(filtroEstadoActual); }
        if (indigenaVisible) { indigenaVisible = false; toggleChecks('indigena', false); aplicarEscalaIndigena(filtroEstadoActual); }
        if (espaciosVisible) { espaciosVisible = false; toggleChecks('espacios', false); aplicarEscalaEspacios(filtroEstadoActual); }
        if (delitosVisible) { delitosVisible = false; toggleChecks('delitos', false); aplicarEscalaDelitos(filtroEstadoActual); }
        if (planesVisible) { planesVisible = false; toggleChecks('planes', false); manejarSwitchPlanes(false); }
    }
    actualizarVisibilidadLeyendaDemografica();
    // BUG FIX: Increased delay to 200ms
    setTimeout(() => aplicarEscalaNineces(filtroEstadoActual), 200);
}

window.manejarSwitchPlanes = function (v) {
    planesVisible = v;
    if (v) {
        if (densidadVisible) { densidadVisible = false; toggleChecks('densidad', false); aplicarEscalaDensidad(filtroEstadoActual); }
        if (indigenaVisible) { indigenaVisible = false; toggleChecks('indigena', false); aplicarEscalaIndigena(filtroEstadoActual); }
        if (espaciosVisible) { espaciosVisible = false; toggleChecks('espacios', false); aplicarEscalaEspacios(filtroEstadoActual); }
        if (delitosVisible) { delitosVisible = false; toggleChecks('delitos', false); aplicarEscalaDelitos(filtroEstadoActual); }
        if (ninecesVisible) { ninecesVisible = false; toggleChecks('nineces', false); aplicarEscalaNineces(filtroEstadoActual); }
        if (planMichoacanVisible) { planMichoacanVisible = false; toggleChecks('plan-michoacan', false); manejarSwitchPlanMichoacan(false); }

        if (map.getLayer(ID_CAPA_PLANES)) {
            map.setLayoutProperty(ID_CAPA_PLANES, 'visibility', 'visible');
            enfocarBounds([[-104, 15], [-90, 20]], {
                esVistaNacional: false,
                maxZoom: 7.5,
                duration: 1000,
                usarOffsetPanel: true
            });
        }
        document.querySelectorAll('.planes-legend').forEach(el => el.style.display = 'block');
    } else {
        if (map.getLayer(ID_CAPA_PLANES)) {
            map.setLayoutProperty(ID_CAPA_PLANES, 'visibility', 'none');
        }
        document.querySelectorAll('.planes-legend').forEach(el => el.style.display = 'none');
    }
    toggleChecks('planes', v);
    aplicarFiltros(); // Actualizar filtro geográfico de puntos
}

window.manejarSwitchPlanMichoacan = function (v) {
    planMichoacanVisible = v;
    if (v) {
        if (planesVisible) { planesVisible = false; toggleChecks('planes', false); manejarSwitchPlanes(false); }

        if (map.getLayer(ID_CAPA_PLAN_MICHOACAN)) {
            // Zoom to Michoacán when activated
            const boundsMichoacan = obtenerBoundsEstado('Michoacán');
            if (boundsMichoacan) {
                enfocarBounds(boundsMichoacan, {
                    esVistaNacional: false,
                    maxZoom: 8.5,
                    duration: 1000,
                    usarOffsetPanel: true
                });
            }
        }
    } else if (!territoriosPazVisible && !planesVisible) {
        manejarCambioEstado(filtroEstadoActual);
    }

    actualizarVisibilidadLeyendaDemografica();
    toggleChecks('plan-michoacan', v);

    // Apply visual scale
    aplicarEscalaPlanMichoacan(filtroEstadoActual);
    aplicarFiltros(); // Actualizar filtro geográfico de puntos
}

function toggleChecks(tipo, estado) {
    document.querySelectorAll(`#${tipo}-switch, #mobile-${tipo}`).forEach(c => c.checked = estado);
}

function hayCapaDemograficaActivaParaLeyenda() {
    return densidadVisible || indigenaVisible || espaciosVisible || delitosVisible || ninecesVisible;
}

function actualizarVisibilidadLeyendaDemografica() {
    toggleLegend(hayCapaDemograficaActivaParaLeyenda());
    actualizarVisibilidadSelectorModoDelitos();
    actualizarVisibilidadSelectorModoNineces();
}

function toggleLegend(visible) {
    document.querySelectorAll('.density-legend, .mobile-density-legend').forEach(d => {
        d.style.display = visible ? 'block' : 'none';
    });
    // Si se activa leyenda demográfica, asegurar que la de planes se oculte (por si acaso, aunque el switch lo maneja)
    if (visible) {
        document.querySelectorAll('.planes-legend').forEach(el => el.style.display = 'none');
    }
}

window.resetearFiltros = function () {
    filtrosProgramasActivos = [];
    territoriosPazVisible = false;
    filtroEstatus = 'Activo';
    filtroEstadoActual = 'Todos los estados';
    filtroMunicipioActual = 'Todos los municipios';
    document.querySelectorAll('.switch-checkbox, .mobile-switch-checkbox').forEach(c => c.checked = false);
    // Reset state selectors
    ['state-select', 'mobile-select'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 'Todos los estados';
    });
    // Hide and reset municipality selectors
    actualizarSelectorMunicipio('Todos los estados');
    // Actualizar botones de estatus en desktop y mobile
    document.querySelectorAll('.estatus-btn[data-estatus]').forEach(b => {
        b.classList.toggle('active', b.dataset.estatus === 'Activo');
    });
    actualizarBotonesModoDelitos();
    manejarSwitchTerritoriosPaz(false);
    manejarSwitchDensidad(false);
    manejarSwitchIndigena(false);
    manejarSwitchEspacios(false);
    manejarSwitchDelitos(false);
    manejarSwitchNineces(false);
    manejarSwitchPlanes(false);
    manejarSwitchPlanMichoacan(false);
    document.querySelectorAll('.planes-legend').forEach(el => el.style.display = 'none');
    manejarCambioEstado('Todos los estados');
    actualizarEstilosVisuales();
    map.fitBounds(estadosMexico[0].bbox, {
        padding: obtenerPaddingFitBounds(true),
        duration: 1000,
        retainPadding: false
    });
}

window.manejarCambioEstatus = function (estatus) {
    filtroEstatus = estatus;
    document.querySelectorAll('.estatus-btn[data-estatus]').forEach(b => {
        b.classList.toggle('active', b.dataset.estatus === estatus);
    });
    actualizarBotonesModoDelitos();
    aplicarFiltros();
}

// --- UI ---
function crearSelectorEstado() {
    // Los selectores de estado/municipio ahora viven dentro del panel de leyenda (crearLeyenda).
    // Esta función se mantiene por compatibilidad pero no hace nada.
}

function crearLeyenda() {
    const l = document.getElementById('legend');
    if (!l) return;

    // --- Header (siempre visible, con toggle) ---
    const header = document.createElement('div');
    header.className = 'legend-header';
    header.innerHTML = `
        <span class="legend-header-title">Estrategias DGVC 2026</span>
        <div class="legend-header-controls">
            <button class="legend-clear-btn" title="Limpiar todos los filtros" onclick="event.stopPropagation(); resetearFiltros();">
                <svg viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <span class="legend-header-chevron">▾</span>
        </div>
    `;
    header.addEventListener('click', () => {
        l.classList.toggle('collapsed');
    });
    l.appendChild(header);

    // --- Body (contenido colapsable) ---
    const body = document.createElement('div');
    body.className = 'legend-body';
    l.appendChild(body);

    // --- Selectores geográficos integrados en el panel ---
    const geoFiltros = document.createElement('div');
    geoFiltros.className = 'geo-filters-panel';
    geoFiltros.innerHTML = `
        <div class="geo-filter-row">
            <label class="geo-filter-label">Estado</label>
            <div class="custom-dropdown-container">
                <div class="custom-dropdown-header" onclick="toggleDropdown('state-dropdown-list')">
                    <span id="state-select-label">Todos los estados</span>
                    <span class="custom-dropdown-chevron">▾</span>
                </div>
                <div class="custom-dropdown-list" id="state-dropdown-list">
                    <div class="custom-dropdown-item" onclick="manejarCambioEstado('Todos los estados')">Todos los estados</div>
                    ${estadosMexico
            .filter(e => e.nombre !== 'Todos los estados')
            .map(e => `<div class="custom-dropdown-item" onclick="manejarCambioEstado('${e.nombre}')">${e.nombre}</div>`)
            .join('')}
                </div>
            </div>
        </div>
        <div class="geo-filter-row" id="municipio-selector-wrapper" style="display:none;">
            <label class="geo-filter-label">Municipio</label>
            <div class="custom-dropdown-container">
                <div class="custom-dropdown-header" onclick="toggleDropdown('municipio-dropdown-list')">
                    <span id="municipio-select-label">Todos los municipios</span>
                    <span class="custom-dropdown-chevron">▾</span>
                </div>
                <div class="custom-dropdown-list" id="municipio-dropdown-list">
                    <div class="custom-dropdown-item" onclick="manejarCambioMunicipio('Todos los municipios')">Todos los municipios</div>
                </div>
            </div>
        </div>
        </div>
    `;
    body.appendChild(geoFiltros);

    // Estatus segmented control
    body.insertAdjacentHTML('beforeend', `
        <div class="estatus-segmented">
            <button class="estatus-btn active" data-estatus="Activo" onclick="manejarCambioEstatus('Activo')">Activos</button>
            <button class="estatus-btn" data-estatus="Por activar" onclick="manejarCambioEstatus('Por activar')">Por activar</button>
            <button class="estatus-btn" data-estatus="Todos" onclick="manejarCambioEstatus('Todos')">Todos</button>
        </div>
        <div style="margin-bottom:8px;font-weight:normal;font-size:11px;color:#777;">Selecciona las casillas para filtrar:</div>
    `);

    programasOriginales.forEach((p, i) => {
        const d = document.createElement('div');
        d.className = 'legend-item';
        d.style.cursor = 'pointer';
        d.onclick = () => manejarFiltroPrograma(p.nombre);

        d.innerHTML = `
            <span class="legend-key" id="legend-key-${i}" style="
                background:${p.color}; 
                border-color: ${p.color};
            ">✓</span>
            <span class="program-name" style="color:${p.color}">${p.nombre}</span>&nbsp;
            <span class="program-count">(0)</span>
        `;
        body.appendChild(d);
    });

    const addSw = (id, txt, fn) => {
        const d = document.createElement('div');
        d.className = 'switch-container';
        d.innerHTML = `
            <label class="switch-label">
                <input type="checkbox" id="${id}" class="switch-checkbox" onchange="${fn}">
                <span class="switch-slider"></span>
                <span class="switch-text">${txt}</span>
            </label>
        `;
        body.appendChild(d);
    };

    addSw('territorios-paz-switch', 'Territorios de Paz', 'manejarSwitchTerritoriosPaz(this.checked)');
    
    const pazLegend = document.createElement('div');
    pazLegend.id = 'territorios-paz-legend';
    pazLegend.className = 'switch-container';
    pazLegend.style.display = 'none';
    pazLegend.innerHTML = `
        <div style="font-size:11px; margin-left:24px; margin-top:-8px; padding-bottom:8px; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:center; gap:6px;"><div style="width:12px; height:12px; background:#C92A3A; opacity:0.8;"></div><span style="color:#555">Prioridad Alta</span></div>
            <div style="display:flex; align-items:center; gap:6px;"><div style="width:12px; height:12px; background:#F4CE4A; opacity:0.8;"></div><span style="color:#555">Prioridad Media</span></div>
            <div style="display:flex; align-items:center; gap:6px;"><div style="width:12px; height:12px; background:#22586A; opacity:0.8;"></div><span style="color:#555">Prioridad Baja</span></div>
        </div>
    `;
    body.appendChild(pazLegend);

    addSw('plan-michoacan-switch', 'Plan Michoacán', 'manejarSwitchPlanMichoacan(this.checked)');

    const separador = document.createElement('div');
    separador.className = 'switch-container demograficas-header';
    separador.innerHTML = '<span class="section-title">Capas sociodemográficas</span>';
    body.appendChild(separador);

    addSw('densidad-switch', 'Densidad poblacional', 'manejarSwitchDensidad(this.checked)');
    addSw('nineces-switch', 'Concentración Niñeces y jóvenes', 'manejarSwitchNineces(this.checked)');

    const ninecesModo = document.createElement('div');
    ninecesModo.id = 'nineces-mode-container';
    ninecesModo.className = 'switch-container delitos-mode-container';
    ninecesModo.style.display = 'none';
    ninecesModo.innerHTML = `
        <div class="delitos-mode-title">Selecciona el grupo de edad:</div>
        <div class="estatus-segmented delitos-mode-segmented">
            <button id="nineces-mode-3-11" class="estatus-btn active" onclick="manejarCambioModoNineces('3_11')">3 a 11</button>
            <button id="nineces-mode-12-17" class="estatus-btn" onclick="manejarCambioModoNineces('12_17')">12 a 17</button>
            <button id="nineces-mode-18-29" class="estatus-btn" onclick="manejarCambioModoNineces('18_29')">18 a 29</button>
        </div>
    `;
    body.appendChild(ninecesModo);

    addSw('indigena-switch', '% de población indígena', 'manejarSwitchIndigena(this.checked)');
    addSw('espacios-switch', 'Núm. de espacios culturales por municipio', 'manejarSwitchEspacios(this.checked)');
    addSw('delitos-switch', 'Incidencia delictiva <span style="font-size:10.5px; color:#888; font-weight:normal; margin-left:4px;">(Ene-Feb 2026)</span>', 'manejarSwitchDelitos(this.checked)');

    const delitosModo = document.createElement('div');
    delitosModo.id = 'delitos-mode-container';
    delitosModo.className = 'switch-container delitos-mode-container';
    delitosModo.style.display = 'none';
    delitosModo.innerHTML = `
        <div class="delitos-mode-title">Visualizar incidencia como:</div>
        <div class="estatus-segmented delitos-mode-segmented">
            <button id="delitos-mode-acumulado" class="estatus-btn active" onclick="manejarCambioModoDelitos('acumulado')">Acumulado</button>
            <button id="delitos-mode-tasa" class="estatus-btn" onclick="manejarCambioModoDelitos('tasa')">Tasa x 100k</button>
        </div>
    `;
    body.appendChild(delitosModo);

    addSw('planes-switch', 'Istmo/Cuenca', 'manejarSwitchPlanes(this.checked)');

    const dl = document.createElement('div');
    dl.className = 'density-legend';
    dl.style.display = 'none';
    dl.innerHTML = `
        <div class="density-gradient"></div>
        <div class="density-labels"></div>
        <div class="density-unit">hab/km²</div>
        <div class="density-description" style="display:none;font-size:10px;color:#666;margin-top:6px;line-height:1.3;">
        </div>
    `;
    body.appendChild(dl);

    // LEYENDA PLANES
    const pl = document.createElement('div');
    pl.className = 'planes-legend';
    pl.style.display = 'none';
    pl.style.cssText = 'display:none; margin-top:10px; border-top:1px solid rgba(0,0,0,0.06); padding-top:10px;';
    pl.innerHTML = `
        <div style="font-size:11px; font-weight:bold; margin-bottom:5px; color:#333;">Regiones</div>
        <div style="display:flex; align-items:center; margin-bottom:4px;">
            <span style="width:12px; height:12px; background:#bdbdbd; border:1px solid #999; margin-right:8px; display:inline-block;"></span>
            <span style="font-size:11px; color:#555;">Istmo</span>
        </div>
        <div style="display:flex; align-items:center;">
            <span style="width:12px; height:12px; background:#90a4ae; border:1px solid #78909c; margin-right:8px; display:inline-block;"></span>
            <span style="font-size:11px; color:#555;">Cuenca del Balsas</span>
        </div>
    `;
    body.appendChild(pl);

    // CRÉDITOS
    const meta = document.createElement('div');
    meta.style.cssText = 'margin-top:12px; padding-top:8px; border-top:1px solid rgba(0,0,0,0.06); font-size:10px; color:#999; text-align:right; font-family: sans-serif;';
    meta.innerHTML = `
        Actualización: <strong>9 de marzo de 2026</strong><br>
        Elaboración: <strong>DT - DGVC</strong>
    `;
    body.appendChild(meta);

    // Initialize collapsed state on mobile devices more forcefully
    const isMobile = window.innerWidth <= 900 || screen.width <= 900 || window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
        l.classList.add('collapsed');
    }
}
