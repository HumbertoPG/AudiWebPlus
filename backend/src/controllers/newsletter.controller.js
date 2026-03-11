export async function subscribeNewsletter(req, res, next) {
  try {
    const { email } = req.body;
    const result = await addSubscriber(email);
    res.status(201).json(result);
  } catch (error) {
    // Si el error es por email duplicado (código 23505 en Postgres)
    if (error.code === '23505') {
      return res.status(400).json({ 
        error: "already_subscribed", 
        message: "Este correo ya está registrado." 
      });
    }
    next(error); // Otros errores (conexión, etc.) van al middleware global
  }
}