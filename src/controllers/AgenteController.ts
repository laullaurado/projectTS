import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import DepartamentoModel from "../modelsNoSQL/departamentoNoSQL";

class AgenteController extends AbstractController {
  //Singleton, se crea una sola instancia de la clase
  //Atributos de clase
  private static _instance: AgenteController;
  public static get instance(): AgenteController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new AgenteController("agente");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    //CRUD
    this.router.get("/consultar", this.getConsultar.bind(this));
    this.router.post("/crear", this.postCrear.bind(this));
    this.router.post("/crearDepto", this.postCrearDepto.bind(this));
    this.router.get("/consultarDepto", this.getConsultarDepto.bind(this));
    //this.router.post("/cambiar",);
    //this.router.post("/eliminar",);
  }

  private async getConsultar(req: Request, res: Response) {
    try {
      console.log("Consultando agentes");
      let agentes = await db["Agente"].findAll();
      res.status(200).json(agentes);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al consultar agentes");
    }
  }

  private async postCrear(req: Request, res: Response) {
    try {
      console.log(req.body);
      await db.Agente.create(req.body);
      console.log("Agente creado");
      res.status(200).send("Agente creado");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al crear agente");
    }
  }

  private async postCrearDepto(req: Request, res: Response) {
    try {
      console.log(req.body);
      await DepartamentoModel.create(req.body);
      console.log("Departamento creado");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al crear departamento");
    }
  }

  private async getConsultarDepto(req: Request, res: Response) {
    try {
      const deptos = await DepartamentoModel.scan().exec().promise();
      res.status(200).json(deptos[0].Items);
      console.log(deptos);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error al consultar departamentos");
    }
  }

  private async getTest(req: Request, res: Response) {
    try {
      console.log("AgenteController works");
      res.status(200).send("AgenteController works");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error en AgenteController");
    }
  }
}

export default AgenteController;
