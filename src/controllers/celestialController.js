import { 
    getAllBodies,
    getBodyById,
    createBody,
    updateBody,
    deleteBody,
} from "../services/celestialService.js";

/**
 * GET /api/celestial-bodies
 */
export async function getAllCelestialBodiesHandler(req, res, next) {
  try {
    const bodies = await getAllBodies();
    res.status(200).json(bodies);
  } catch (error) {
    next(error); 
  }
}

/**
 * GET /api/celestial-bodies/:id
 */
export async function getCelestialBodyByIdHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const body = await getBodyById(id);
    res.status(200).json(body);
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/celestial-bodies (ADMIN ONLY)
 */
export async function createCelestialBodyHandler(req, res, next) {
  try {
    // Explicitly mapping fields
    const bodyData = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        distance: parseFloat(req.body.distance),
        imageUrl: req.body.image_url
    };

    const newBody = await createBody(bodyData);
    res.status(201).json(newBody);
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/celestial-bodies/:id (ADMIN ONLY)
 */
export async function updateCelestialBodyHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    
    // Explicitly mapping fields for update
    const updateData = {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        distance: parseFloat(req.body.distance),
        image_url: req.body.image_url
    };

    const updated = await updateBody(id, updateData);
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/celestial-bodies/:id (ADMIN ONLY)
 */
export async function deleteCelestialBodyHandler(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await deleteBody(id);
    res.status(204).send(); 
  } catch (error) {
    next(error);
  }
}