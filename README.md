# Customers Web

Aplicación web desarrollada en Angular para la gestión de clientes y visualización de indicadores consumiendo una API REST desarrollada en Spring Boot.

## Tecnologías

- Angular
- TypeScript
- npm
- RxJS
- Angular Signals
- Reactive Forms
- Chart.js
- Vitest
- SCSS

## Funcionalidades

La aplicación permite:

- Registrar nuevos clientes.
- Consultar clientes en una tabla.
- Buscar clientes por DNI.
- Buscar clientes por email.
- Consultar todos los clientes sin filtros.
- Visualizar el periodo con mayor cantidad de nacimientos.
- Visualizar el periodo con menor cantidad de nacimientos.
- Mostrar la cantidad de clientes nacidos por mes/año.
- Mostrar la tasa de natalidad por mes.
- Consumir los servicios REST expuestos por el backend.
- Mostrar estados de carga, mensajes de éxito y mensajes de error.

## Arquitectura

El proyecto está organizado utilizando separación de responsabilidades y una estructura inspirada en Clean Architecture.

Estructura principal:

src/app
├── application
│   └── services
│       └── customer.service.ts
├── domain
│   ├── models
│   │   ├── customer.model.ts
│   │   ├── customer-request.model.ts
│   │   ├── customer-search.model.ts
│   │   ├── birth-statistics.model.ts
│   │   ├── monthly-birth-rate.model.ts
│   │   └── customer-indicators.model.ts
│   └── repositories
│       └── customer.repository.ts
├── infrastructure
│   └── repositories
│       └── customer-http.repository.ts
├── features
│   ├── customers
│   │   ├── components
│   │   │   ├── customer-form
│   │   │   ├── customer-search
│   │   │   └── customer-table
│   │   └── pages
│   │       └── customers-page
│   ├── indicators
│   │   ├── components
│   │   │   ├── indicator-card
│   │   │   └── births-chart
│   │   └── pages
│   │       └── indicators-page
│   └── dashboard
│       └── pages
│           └── dashboard-page
├── shared
│   └── components
│       ├── sidebar
│       └── header
├── app.config.ts
├── app.routes.ts
└── app.ts

## Flujo de comunicación

La comunicación con el backend sigue este flujo:

Component
    ↓
CustomerService
    ↓
CustomerRepository
    ↓
CustomerHttpRepository
    ↓
HttpClient
    ↓
Spring Boot API

Los componentes visuales no realizan peticiones HTTP directamente.

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- Angular CLI

Verificar Node.js:

node -v

Verificar npm:

npm -v

Verificar Angular CLI:

ng version

## Instalación

Clonar el repositorio:

git clone <URL_REPOSITORIO_FRONTEND>

Entrar al proyecto:

cd customers-web

Instalar las dependencias:

npm install

## Ejecución

Ejecutar la aplicación en modo desarrollo:

ng serve

También puede utilizarse:

npm start

La aplicación estará disponible por defecto en:

http://localhost:4200

## Backend requerido

La aplicación consume una API Spring Boot disponible por defecto en:

http://localhost:8080/api/customers

Por lo tanto, el backend debe estar ejecutándose para utilizar las operaciones de registro, búsqueda e indicadores.

Endpoints consumidos:

POST /api/customers/register

GET /api/customers/find

GET /api/customers/indicators

## Navegación

La aplicación utiliza Angular Router.

Rutas principales:

/dashboard

/customers

/indicators

## Dashboard

La aplicación incluye un dashboard base con navegación lateral.

Desde el sidebar se puede acceder a:

- Dashboard.
- Clientes.
- Indicadores.

## Gestión de clientes

La sección Clientes permite seleccionar entre dos operaciones:

### Registrar cliente

El formulario permite registrar:

- Nombre.
- Apellido.
- Email.
- DNI.
- Fecha de nacimiento.

Ejemplo de información enviada al backend:

{
  "firstName": "Juan",
  "lastName": "Perez",
  "email": "juan@gmail.com",
  "dni": "12345678",
  "birthDate": "1998-05-15"
}

El frontend valida:

- Nombre obligatorio.
- Apellido obligatorio.
- Email obligatorio.
- Formato válido de email.
- DNI obligatorio.
- DNI de 8 dígitos.
- Fecha de nacimiento obligatoria.

El formulario utiliza Reactive Forms.

## Consulta de clientes

Al ingresar a la opción Buscar cliente, la aplicación consulta automáticamente todos los clientes.

El usuario puede utilizar los siguientes filtros:

- ALL
- DNI
- EMAIL

Comportamiento:

ALL sin texto:
Muestra todos los clientes.

ALL con texto:
Busca coincidencias por DNI o email.

DNI:
Busca clientes utilizando el DNI.

EMAIL:
Busca clientes utilizando el email.

Ejemplo:

filterType = DNI
searchTerm = 12345678

Los resultados se muestran en una tabla con información como:

- DNI.
- Nombre.
- Apellido.
- Email.
- Fecha de nacimiento.
- Fecha de creación.

## Angular Signals

La aplicación utiliza Angular Signals para manejar estados reactivos.

Ejemplos de estados:

customers = signal<Customer[]>([])

loading = signal(false)

errorMessage = signal('')

Esto permite actualizar automáticamente la interfaz cuando una petición HTTP termina.

## Indicadores

La sección Indicadores consume:

GET /api/customers/indicators

El backend devuelve información como:

{
  "birthsByPeriod": [
    {
      "month": 5,
      "year": 1998,
      "totalBirths": 4
    }
  ],
  "highestBirthPeriod": {
    "month": 5,
    "year": 1998,
    "totalBirths": 4
  },
  "lowestBirthPeriod": {
    "month": 7,
    "year": 1999,
    "totalBirths": 1
  },
  "monthlyBirthRates": [
    {
      "month": 5,
      "totalBirths": 5,
      "birthRate": 31.25
    }
  ]
}

## Periodo con mayor cantidad de nacimientos

Se muestra mediante una tarjeta de indicador.

Ejemplo:

Mayo 1998
4 clientes

## Periodo con menor cantidad de nacimientos

Se muestra mediante una tarjeta de indicador.

Ejemplo:

Julio 1999
1 cliente

## Cantidad de nacimientos por mes/año

La información se representa utilizando un gráfico de barras desarrollado con Chart.js.

Ejemplo de etiquetas:

Mayo 1998

Marzo 1999

Agosto 2000

Enero 2001

Noviembre 2002

## Tasa de natalidad por mes

La tasa de natalidad se muestra agrupada únicamente por mes.

Ejemplo:

Enero       12.50%

Mayo        31.25%

Agosto      25.00%

El frontend recibe el valor calculado por el backend mediante:

monthlyBirthRates

Cada registro contiene:

- month
- totalBirths
- birthRate

## Visualización de meses

Los números de mes recibidos desde el backend son convertidos a nombres legibles.

Ejemplo:

5 -> Mayo

8 -> Agosto

11 -> Noviembre

Para los periodos se muestra:

Mayo 1998

Agosto 2000

Noviembre 2002

## Chart.js

La aplicación utiliza Chart.js para representar las estadísticas de nacimientos.

Instalación:

npm install chart.js

El gráfico muestra:

- Eje X: mes/año.
- Eje Y: cantidad de clientes nacidos.

## Manejo de errores

Las operaciones HTTP muestran mensajes en caso de error.

Ejemplo:

No se pudo registrar el cliente.

No se pudieron obtener los clientes.

No se pudieron cargar los indicadores.

Los errores también se registran en la consola durante desarrollo.

## Comunicación con Spring Boot

Durante desarrollo local:

Frontend:

http://localhost:4200

Backend:

http://localhost:8080

El backend debe tener configurado CORS para permitir peticiones desde:

http://localhost:4200

## Pruebas unitarias

El proyecto incluye al menos una prueba unitaria para una operación del servicio.

Framework utilizado:

Vitest

Ejemplo de operación probada:

CustomerService.createCustomer()

La prueba verifica:

- Que CustomerService invoque CustomerRepository.createCustomer().
- Que el request enviado sea el esperado.
- Que se devuelva correctamente el Customer esperado.

Ejecutar las pruebas:

ng test

Resultado esperado:

Tests passed

## Build de producción

Para compilar el proyecto:

ng build

Los archivos generados estarán disponibles dentro de:

dist/

## Instalación completa

Paso 1:

Clonar el repositorio.

git clone <URL_REPOSITORIO_FRONTEND>

Paso 2:

Entrar al proyecto.

cd customers-web

Paso 3:

Instalar dependencias.

npm install

Paso 4:

Verificar que el backend esté ejecutándose en:

http://localhost:8080

Paso 5:

Ejecutar Angular.

ng serve

Paso 6:

Abrir en el navegador:

http://localhost:4200

## Flujo funcional

### Registro

Usuario
   ↓
CustomerForm
   ↓
CustomerService
   ↓
CustomerRepository
   ↓
CustomerHttpRepository
   ↓
POST /api/customers/register
   ↓
Spring Boot

### Consulta

Usuario
   ↓
CustomerSearch
   ↓
CustomerService
   ↓
CustomerRepository
   ↓
CustomerHttpRepository
   ↓
GET /api/customers/find
   ↓
Spring Boot
   ↓
Tabla de clientes

### Indicadores

Usuario
   ↓
IndicatorsPage
   ↓
CustomerService
   ↓
CustomerRepository
   ↓
CustomerHttpRepository
   ↓
GET /api/customers/indicators
   ↓
Spring Boot
   ↓
Tarjetas + gráfico + tasa mensual

## Código fuente

Repositorio frontend:

<URL_REPOSITORIO_FRONTEND>

Repositorio backend:

https://github.com/YamiDV/customers.git

## Autor

Proyecto desarrollado como prueba técnica para la gestión de clientes utilizando Angular, TypeScript y una arquitectura limpia orientada a separación de responsabilidades.
