// Supertest
const supertest = require("supertest");
// Server express
const server = require("../index");
// Conexión mongo. Lanza la BBDD
const mongoose = require("../config/db_mongo");
// Lanzar server con supertest --> npm start
const request = supertest(server);

beforeAll(async () => {
  // Ensure the MongoDB connection is established before running tests
  await mongoose.connection.once('open', () => console.log('Connection to MongoDB established'));
});

afterAll(async () => {
  // Close the server and MongoDB connection after tests
  await server.close();
  await mongoose.connection.close();
});

describe("GET /api/search", () => {
  it("should return 200 and an array of ofertas", async () => {
    const response = await request.get("/api/search").expect(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it("should return 200 and filter ofertas by keyword", async () => {
    const response = await request.post("/api/search").send({ inputBuscador: "prueba" }).expect(200);
    expect(response.body).toEqual(expect.any(Array));
  });
});

describe("POST /api/ads", () => {
  it("should create a new oferta and return 201", async () => {
    const newOferta = {
      title: "prueba",
      empresa: "empresa de prueba",
      salario: "30.000€",
      localizacion: "Madrid",
      logo: "nuevo logo",
      url: "www.google.com",
      fuente: "test fuente"
    };
    const response = await request.post("/api/ads").send(newOferta).expect(201);
    expect(response.body.items_created).toBeTruthy();
    expect(response.body.data).toEqual(expect.objectContaining(newOferta));
  });

  it("should return 400 for missing fields", async () => {
    const response = await request.post("/api/ads").send({}).expect(400);
    expect(response.body.error).toBe("Faltan campos de oferta");
  });
});

describe("PUT /api/ads", () => {
  it("should update an existing oferta and return 200", async () => {
    const updateData = { empresa: "empresa actualizada" };
    const response = await request.put("/api/ads?title=prueba").send(updateData).expect(200);
    expect(response.body.empresa).toBe(updateData.empresa);
  });
});

describe("DELETE /api/ads", () => {
  it("should delete an oferta and return 201", async () => {
    const response = await request.delete("/api/ads").send({ title: "prueba" }).expect(201);
    expect(response.body.items_deleted).toBeTruthy();
  });
});
