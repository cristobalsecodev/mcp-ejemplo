import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js'

// Crear servidor usando la clase Server base
const server = new Server(
  {
    name: 'MCP Demo',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
)

// Definir las herramientas disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {

  return {
    tools: [
      {
        name: 'fetch-weather',
        description: 'Tool to fetch the weather of a city',
        inputSchema: {
          type: 'object',
          properties: {
            city: {
              type: 'string',
              description: 'City name'
            }
          },
          required: ['city']
        }
      }
    ]
  }

})

// Manejar la ejecución de herramientas
server.setRequestHandler(CallToolRequestSchema, async (request) => {

  if (request.params.name === 'fetch-weather') {

    const { city } = request.params.arguments as { city: string }
    
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
    )

    const data = await response.json()

    if (!data.results || data.results.length === 0) {

      return {
        content: [
          {
            type: 'text',
            text: `No se encontró información para la ciudad: ${city}`
          }
        ]
      }

    }

    const { latitude, longitude } = data.results[0]

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,is_day,relative_humidity_2m,precipitation,rain,apparent_temperature&forecast_days=1`
    )

    const weatherData = await weatherResponse.json()

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(weatherData, null, 2)
        }
      ]
    }

  }
  
  throw new Error(`Herramienta desconocida: ${request.params.name}`)

})

// Escuchar las conexiones del cliente
const transport = new StdioServerTransport()

// Conecta el servidor con el transporte
await server.connect(transport)