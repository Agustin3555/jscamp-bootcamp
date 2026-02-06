# Aquí puedes dejar tus dudas

## Primera parte

<!-- Dudas de la primera parte del ejercicio -->

## Segunda parte

<!-- Dudas de la segunda parte del ejercicio -->

## Tercera parte

<!-- Dudas de la tercera parte del ejercicio -->

## Cuarta parte

<!-- Dudas de la cuarta parte del ejercicio -->

## Quinta parte

<!-- Dudas de la quinta parte del ejercicio -->

## Sexta parte

<!-- Dudas de la sexta parte del ejercicio -->

## Séptima parte

El contenido de la página [404](https://github.com/Agustin3555/jscamp-bootcamp/blob/main/03-ejercicio-react/src/pages/NotFound/NotFound.tsx) lo pude crear, pero no sé como controlar que se renderice en [App](https://github.com/Agustin3555/jscamp-bootcamp/blob/main/03-ejercicio-react/src/App.tsx) cuando la ruta no se encuentra. Por lo tanto, lo registré en la ruta `'/*'`.

**Respuesta:**

Tu implementación actual con `'/*'` está muy bien pensada pero no funciona como tal, porque tu componente `Route` hace una comparación exacta (`currentPath === path`), por lo que `'/*'` nunca va a coincidir con rutas como `/ejemplo-invalido` o `/fdafafakj`.

**Solución alternativa:**

Podes renderizar `NotFound` condicionalmente y verificar si alguna ruta coincide:

```tsx
export const App = () => {
  const { currentPath } = useRouter()
  const validPaths = ['/', '/search']
  const isValidPath = validPaths.includes(currentPath)
  
  return (
    <div className="cmp-app">
      <Header />
      {isValidPath ? (
        <>
          <Route path="/" component={<Home />} />
          <Route path="/search" component={<Search />} />
        </>
      ) : (
        <NotFound />
      )}
      <Footer />
    </div>
  )
}
```

Con esto podes controlar que se renderice `NotFound` cuando la ruta no se encuentra.
Esto mismo se podría hacer en el propio componente `Route`, pero así creo que queda mas claro. Después en el siguiente módulo podrás ver como lo hace React Router.

## Ejercicio extra

<!-- Dudas del ejercicio extra -->
