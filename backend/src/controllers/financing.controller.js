import { saveFinancing } from "../repositories/financing.repository.js";

export async function createFinancingRequest(req,res,next){

  try{

    const result = await saveFinancing(req.body);

    res.json(result);

  }catch(error){

    next(error);

  }

}