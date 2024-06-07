import { Router } from "express"; // Router sirve para hacer un esquema de rutas

export default abstract class AbstractController {
  // Atributos de la instancia
  private _router: Router; // Aplicación para definir métodos http
  private _prefix: string; // Define el prefijo de la ruta (antecede lo que defina en routes)

  // Métodos getters
  public get router(): Router {
    return this._router;
  }

  public get prefix(): string {
    return this._prefix;
  }

  // Método constructor
  protected constructor(prefix: string) {
    this._router = Router();
    this._prefix = prefix;
    this.initializeRoutes();
  }

  // Método abstracto (debe ser implementado en las clases hijas)
  protected abstract initializeRoutes(): void;
}
