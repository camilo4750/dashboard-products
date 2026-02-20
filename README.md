# Dashboard Products

Dashboard de productos construido con Vue 3, que consume la API pública de [DummyJSON](https://dummyjson.com) para listar, filtrar, buscar y visualizar el detalle de productos.

## Tecnologías

| Tecnología | Versión |
|---|---|
| Vue | ^3.5 |
| Vue Router | ^4.5 |
| PrimeVue | ^4.5 |
| Tailwind CSS | ^4.2 |
| Axios | ^1.13 |
| TypeScript | ^5.9 |
| Vite | ^6.0 |

# API
Este proyecto consume la API pública de DummyJSON:
- GET /products — Listado paginado
- GET /products/:id — Detalle de producto
- GET /products/search?q= — Búsqueda por texto
- GET /products/category/:category — Filtro por categoría
- GET /products/category-list — Lista de categorías

# Arquitectura
Se utilizó una arquitectura Modular por dominio (Feature-based) Nos permite tener módulos independientes donde se agrupa todo lo relacionado a ese dominio manejando una alta cohesión que facilita su mantenimiento y crecimiento.
```plaintext
src/
├── App.vue                          # Componente raíz
├── main.ts                          # Punto de entrada
├── env.d.ts                         # Tipos de entorno
├── assets/
│   └── main.css                     # Estilos globales
├── router/
│   └── index.ts                     # Router raíz (agrega módulos)
│
└── Modules/                         # Capa modular por dominio
    └── Products/                    # Módulo: Products
        ├── components/
        │   ├── CardProduct.vue      # Componente de tarjeta
        │   └── SkeletonProduct.vue  # Componente de skeleton/loading
        ├── pages/
        │   ├── Products.vue         # Página: listado
        │   └── Product.vue          # Página: detalle
        ├── router/
        │   └── index.ts             # Rutas del módulo
        └── types/
            └── Product.ts           # Tipado del dominio
```            

# Docker
permite ejecutar el entorno de desarrollo dentro de un contenedor con Node.js 24, eliminando la necesidad de tener Node instalado localmente y garantizando un entorno consistente entre desarrolladores. El código fuente se monta como volumen para mantener el hot-reload de Vite.

```plaintext
.devops/
└── docker/
    └── develop/
        ├── docker-compose.yml           # Configuración base
        └── docker-compose.override.yml  # Sobrescritura de puertos
```

# Pasos para correr el entorno Docker

## Levantar el contenedor
```plaintext
sudo docker compose -f .devops/docker/develop/docker-compose.yml -f .devops/docker/develop/docker-compose.override.yml up
 ```

## Instalar dependencias dentro del contenedor
```plaintext
sudo docker exec -it dashboard-products npm install
```

## Iniciar el servidor de desarrollo
```plaintext
sudo docker exec -it dashboard-products npm run dev
```

Acceder a la aplicación en el navegador
- 📍 URL: `http://localhost:3001`

Detener contenedor al finalizar revisión 
```plaintext
sudo docker compose -f .devops/docker/develop/docker-compose.yml -f .devops/docker/develop/docker-compose.override.yml down
```