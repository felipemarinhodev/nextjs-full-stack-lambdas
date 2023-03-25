import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

// Supabase Setup
// =========
const SUPABASE_KEY = process.env.SUPABASE_KEY
const SUPABASE_URL = process.env.SUPABASE_URL
  const dbClient = createClient(SUPABASE_URL, SUPABASE_KEY)
// =========

const httpStatus = {
  Success: 200,
  BadRequest: 400,
  InternalServerError: 500,
}

const controllerByMethod = {
  async POST(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    const email = request.body.emailNewsletter;
    // Fail Fast validation
    if (!Boolean(email) || !email.includes("@")) {
      response  
        .status(httpStatus.BadRequest)
        .json({ message: "Você precisa enviar um email valido ex: test@test.com"})
        return;
    }

    // Sanitize do email
    // - Remover potenciais códigos maliciosos
    // - Remover X coisas

    // Adiciona a pessoa na newsletter
    const { data, error } = await dbClient
      .from("newsletter_users")
      .insert({ email, optin: true})
    // if (error) retorna resposta caso aconteça um problema

    // Cria usuário de fato do sistema
    await dbClient.auth.admin.createUser({ email })

    response
      .status(httpStatus.Success)
      .json({ message: "Post request!" })
  },
  async GET(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    const { data, error } = await dbClient
      .from("newsletter_users")
      .select("*")

      console.log("data", data);
      console.log("error ", error );

    response
      .status(httpStatus.Success)
      .json({ message: "Get request!" })
  }
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  
  const controller = controllerByMethod[request.method];
  if (!controller) {
    response
      .status(httpStatus.BadRequest)
      .json({ message: "Nada encontrado aqui! :(" });
  }
  controller(request, response)
}