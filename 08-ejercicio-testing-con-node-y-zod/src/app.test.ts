import { test, before, after, describe } from 'node:test'
import assert from 'node:assert'
import app from './app.js'
import { Server } from 'http'

let server: Server
const PORT = 5678
const BASE_URL = `http://localhost:${PORT}/jobs`

before(() => {
  return new Promise(resolve => {
    server = app.listen(PORT, () => {
      console.log(`Test server running on ${PORT}`)
      resolve(undefined)
    })
  })
})

after(() => {
  return new Promise(resolve => {
    server.close(() => {
      resolve(undefined)
    })
  })
})

// --- GET /jobs ------------------------------------------------------------------

describe('GET /jobs', () => {
  test('Debe responder con 200 y un array de trabajos', async () => {
    const response = await fetch(BASE_URL)
    const json = await response.json()

    assert.strictEqual(response.status, 200)
    assert.ok(Array.isArray(json.data))
  })

  test('Debe filtrar trabajos por tecnología', async () => {
    const response = await fetch(`${BASE_URL}?technology=react`)
    const json = await response.json()

    assert.strictEqual(response.status, 200)
    assert.ok(Array.isArray(json.data))

    for (const job of json.data) {
      assert.ok(
        job.data.technology.includes('react'),
        `El job "${job.titulo}" no incluye la tecnología "react"`,
      )
    }
  })

  test('Debe respetar el límite de resultados', async () => {
    const response = await fetch(`${BASE_URL}?limit=2`)
    const json = await response.json()

    assert.strictEqual(response.status, 200)
    assert.strictEqual(json.limit, 2)
    assert.strictEqual(json.data.length, 2)
  })

  test('Debe aplicar offset correctamente', async () => {
    const response = await fetch(`${BASE_URL}?offset=1`)
    const json = await response.json()

    assert.strictEqual(response.status, 200)
    assert.strictEqual(json.data[0].id, 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57')
  })
})

// --- POST /jobs -----------------------------------------------------------------

describe('POST /jobs', () => {
  test('El nuevo trabajo se añade correctamente con buen formato', async () => {
    const newJob = {
      titulo: 'Test Job for Testing',
      empresa: 'Test Corp',
      ubicacion: 'Remote',
      descripcion: 'A job created during testing',
      data: {
        technology: ['Node.js', 'TypeScript'],
        modalidad: 'Full-time',
        nivel: 'Senior',
      },
      content: {
        description: 'Test description',
        responsibilities: 'Test responsibilities',
        requirements: 'Test requirements',
        about: 'Test about',
      },
    }

    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newJob),
    })

    const json = await response.json()

    assert.strictEqual(response.status, 201)
    assert.ok(json.id)
    assert.strictEqual(json.titulo, newJob.titulo)
    assert.strictEqual(json.empresa, newJob.empresa)
    assert.strictEqual(json.ubicacion, newJob.ubicacion)
  })

  test('Debe devolver 400 cuando titulo tiene menos de 3 caracteres', async () => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'Ab',
        empresa: 'Test',
        ubicacion: 'Test',
        data: { technology: [] },
      }),
    })

    assert.strictEqual(response.status, 400)
  })

  test('Debe devolver 400 cuando titulo tiene más de 100 caracteres', async () => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'A'.repeat(101),
        empresa: 'Test',
        ubicacion: 'Test',
        data: { technology: [] },
      }),
    })

    assert.strictEqual(response.status, 400)
  })

  test('Debe devolver 400 cuando falta el campo titulo', async () => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        empresa: 'Test',
        ubicacion: 'Test',
        data: { technology: [] },
      }),
    })

    assert.strictEqual(response.status, 400)
  })

  test('Debe devolver 400 cuando titulo no es string', async () => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 12345,
        empresa: 'Test',
        ubicacion: 'Test',
        data: { technology: [] },
      }),
    })

    assert.strictEqual(response.status, 400)
  })

  test('Debe devolver 201 cuando falta descripcion (es opcional)', async () => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: 'Job sin descripcion',
        empresa: 'Test Corp',
        ubicacion: 'Remote',
        data: { technology: ['Node.js'] },
      }),
    })

    assert.strictEqual(response.status, 201)
  })
})

// --- GET /jobs/:id --------------------------------------------------------------

describe('GET /jobs/:id', () => {
  const VALID_ID = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'

  test('Debe devolver el trabajo con ID especificado', async () => {
    const response = await fetch(`${BASE_URL}/${VALID_ID}`)
    const json = await response.json()

    assert.strictEqual(response.status, 200)
    assert.strictEqual(json.id, VALID_ID)
  })

  test('Debe enviar 404 cuando el ID no existe', async () => {
    const response = await fetch(
      `${BASE_URL}/00000000-0000-1000-a000-000000000000`,
    )
    const json = await response.json()

    assert.strictEqual(response.status, 404)
    assert.ok(json.error)
  })
})

// --- PUT /jobs/:id --------------------------------------------------------------

describe('PUT /jobs/:id', () => {
  const VALID_ID = '7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4'

  test('Debe recibir 204 y actualizar el trabajo', async () => {
    const updatedJob = {
      titulo: 'Trabajo Actualizado con PUT',
      empresa: 'Empresa PUT',
      ubicacion: 'Nueva Ubicacion',
      data: {
        technology: ['python'],
        modalidad: 'remoto',
        nivel: 'junior',
      },
    }

    const putResponse = await fetch(`${BASE_URL}/${VALID_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedJob),
    })

    assert.strictEqual(putResponse.status, 204)

    // Verificar que se actualizó haciendo un GET
    const getResponse = await fetch(`${BASE_URL}/${VALID_ID}`)
    const json = await getResponse.json()

    assert.strictEqual(json.titulo, updatedJob.titulo)
    assert.strictEqual(json.empresa, updatedJob.empresa)
    assert.strictEqual(json.ubicacion, updatedJob.ubicacion)
  })

  test('Debe devolver 404 cuando el ID no existe', async () => {
    const response = await fetch(
      `${BASE_URL}/00000000-0000-1000-a000-000000000000`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: 'Test',
          empresa: 'Test',
          ubicacion: 'Test',
          data: { technology: [] },
        }),
      },
    )

    assert.strictEqual(response.status, 404)
  })
})

// --- PATCH /jobs/:id ------------------------------------------------------------

describe('PATCH /jobs/:id', () => {
  const VALID_ID = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'

  test('Debe recibir 204 y actualizar solo los campos enviados', async () => {
    // Primero obtenemos el job original para comparar después
    const originalResponse = await fetch(`${BASE_URL}/${VALID_ID}`)
    const originalJob = await originalResponse.json()

    const partialUpdate = {
      titulo: 'Titulo Parcialmente Actualizado',
      ubicacion: 'Ubicacion Parcial',
    }

    const patchResponse = await fetch(`${BASE_URL}/${VALID_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partialUpdate),
    })

    assert.strictEqual(patchResponse.status, 204)

    // Verificar que solo esos campos cambiaron
    const getResponse = await fetch(`${BASE_URL}/${VALID_ID}`)
    const updatedJob = await getResponse.json()

    assert.strictEqual(updatedJob.titulo, partialUpdate.titulo)
    assert.strictEqual(updatedJob.ubicacion, partialUpdate.ubicacion)
    // El campo empresa no fue enviado, debe mantenerse igual
    assert.strictEqual(updatedJob.empresa, originalJob.empresa)
  })

  test('Debe devolver 404 cuando el ID no existe', async () => {
    const response = await fetch(
      `${BASE_URL}/00000000-0000-1000-a000-000000000000`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: 'Test Update' }),
      },
    )

    assert.strictEqual(response.status, 404)
  })
})

// --- DELETE /jobs/:id -----------------------------------------------------------

describe('DELETE /jobs/:id', () => {
  const VALID_ID = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'

  test('Debe recibir 204 y eliminar el trabajo', async () => {
    const deleteResponse = await fetch(`${BASE_URL}/${VALID_ID}`, {
      method: 'DELETE',
    })

    assert.strictEqual(deleteResponse.status, 204)

    // Verificar que fue eliminado
    const getResponse = await fetch(`${BASE_URL}/${VALID_ID}`)
    assert.strictEqual(getResponse.status, 404)
  })

  test('Debe devolver 404 cuando el ID no existe', async () => {
    const response = await fetch(
      `${BASE_URL}/00000000-0000-1000-a000-000000000000`,
      {
        method: 'DELETE',
      },
    )

    assert.strictEqual(response.status, 404)
  })
})
