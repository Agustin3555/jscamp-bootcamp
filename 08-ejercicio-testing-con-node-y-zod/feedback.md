<!-- Aquí irá el feedback del ejercicio -->
Buenísimo! Hiciste muy buen trabajo.
Tuve que modificar los imports de los archivos por un error de typescript para poder correr los tests, fuera de eso, todo genial!

Los tests estuvieron muy bien planteados.

Una observación que podría mejorar la lectura del código y evitar repetir tantas peticiones, es hacer una función que resuma eso:

```js
const baseURL = 'http://localhost:3000'

const handleGetRequestByPathAndCheckFormat = async (path = '/', expectedStatus = 200) => {
    const res = await fetch(`${baseURL}${path}`);
    assert.strictEqual(res.status, expectedStatus);
    assert.strictEqual(
      res.headers.get('content-type')?.includes('application/json'),
      true,
    );

    const data = await res.json();
    return data;
};
```

O también:

```js
const handlePostRequestByPathAndCheckFormat = async (path = '/', expectedStatus = 200, body = {}) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    assert.strictEqual(res.status, expectedStatus);
    assert.strictEqual(
      res.headers.get('content-type')?.includes('application/json'),
      true,
    );

    const data = await res.json();
    return data;
};
```

De esta manera, podes reutilizar estas funciones en todos los tests y evitar repetir código.