import { NextApiRequest, NextApiResponse } from "next";

const httpStatus = {
  Success: 200,
  BadRequest: 400,
  InternalServerError: 500,
}

const controllerByMethod = {
  POST(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    console.log(request.body);
    
    response
      .status(httpStatus.Success)
      .json({ message: "Post request!" })
  },
  GET(
    request: NextApiRequest,
    response: NextApiResponse
  ) {
    response
      .status(httpStatus.Success)
      .json({ message: "Get request!" })
  }
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  console.log(request.method);
  
  const controller = controllerByMethod[request.method];
  if (!controller) {
    response
      .status(httpStatus.BadRequest)
      .json({ message: "Nada encontrado aqui! :(" });
  }
  controller(request, response)
}