# MCP Ejemplo — Servidor (TypeScript)

Este proyecto implementa un servidor [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) sencillo en `main.ts` que trae una herramienta `fetch-weather` para obtener el tiempo de una ciudad usando la API pública de Open‑Meteo. (No se requiere API Token).

## Requisitos

- Node.js 18 o superior (requiere `fetch` nativo)
- pnpm 10.x (o usa `pnpm` embebido con Corepack)

Comprueba tu versión de Node:

```bash
node -v
```

## Instalación

Instala dependencias con pnpm:

```bash
pnpm install
```

## Uso local con un cliente MCP

Para probar la herramienta de forma interactiva y local puedes usar el siguiente comando para arrancar el inspector de MCP:

```bash
npx -y @modelcontextprotocol/inspector npx -y tsx main.ts
```

Tendrás que darle a `Connect` para que el inspector se conecte al servidor MCP. En el panel de Tools verás `fetch-weather`. Ejemplo de ejecución con argumentos:

```json
{
  "city": "Madrid"
}
```

La respuesta incluirá el JSON del pronóstico de Open‑Meteo para la ciudad encontrada.

## Estructura principal

- `main.ts`: inicializa el `Server` de `@modelcontextprotocol/sdk`, registra la herramienta `fetch-weather` y maneja las peticiones `ListTools` y `CallTool`.
- `package.json`: tipo de módulo ESM y dependencias.

## Licencia

ISC
