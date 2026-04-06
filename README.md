# CLOUDKINGZ — Estructura de archivos

```
pagina/
├── index.html       ← Página principal
├── style.css        ← Todos los estilos
├── main.js          ← JavaScript (cursor, menú, animaciones)
└── img/
    ├── cartuchos.jpeg          ← Ya existe ✅
    │
    │   === AGREGA ESTAS IMÁGENES ===
    ├── hero-bg.jpg             ← Imagen fondo hero (opcional)
    ├── categoria-cartuchos.jpg ← Imagen tarjeta Cartuchos
    ├── categoria-baterias.jpg  ← Imagen tarjeta Baterías
    ├── categoria-desechables.jpg
    ├── categoria-pods.jpg
    ├── blue-dream.jpg          ← Foto producto Blue Dream
    ├── bateria-stealth.jpg     ← Foto Batería Stealth Pro
    ├── sour-diesel.jpg         ← Foto Sour Diesel
    ├── gelato.jpg              ← Foto Gelato 41
    ├── starter-kit.jpg         ← Foto Starter Kit
    ├── banner-lifestyle.jpg    ← Banner ancho completo (opcional)
    └── why-us.jpg              ← Foto sección "Por qué nosotros" (opcional)
```

## Cómo agregar imágenes a los productos

En `index.html`, busca el producto y descomenta la línea `<img>`:

```html
<!-- ANTES (solo emoji) -->
<div class="prod-card__icon-fallback">🛢️</div>

<!-- DESPUÉS (con imagen real) -->
<img src="img/nombre-foto.jpg" alt="Nombre producto" class="prod-card__img" />
<div class="prod-card__icon-fallback">🛢️</div>
```

Si la imagen no carga, el emoji aparece automáticamente como fallback.

## Cómo activar el banner full width

Busca esta sección comentada en `index.html` y descomenta:

```html
<div class="banner-full">
  <img
    src="img/banner-lifestyle.jpg"
    alt="CLOUDKINGZ Lifestyle"
    class="banner-full__img"
  />
  ...
</div>
```

## Número de WhatsApp

Busca y reemplaza `573000000000` con tu número real en todos los archivos.
Formato: 57 (Colombia) + número sin el 0 inicial.
Ejemplo: 573001234567

## Tamaños de imagen recomendados

| Imagen           | Tamaño     |
| ---------------- | ---------- |
| Hero principal   | 800×1000px |
| Categorías       | 600×400px  |
| Productos        | 600×600px  |
| Banner lifestyle | 1920×800px |
| Why us           | 800×1000px |
