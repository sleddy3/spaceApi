import {
    getAllResourcesService,
    getResourceByIdService,
    createResourceService,
    updateResourceService,
    deleteResourceService,
} from "../services/resourceService.js";

/**
 * GET /api/resources
 */
export async function getAllResourcesHandler(req, res, next) {
    try {
        const resources = await getAllResourcesService();
        res.status(200).json(resources);
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/resources/:id
 */
export async function getResourceByIdHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const resource = await getResourceByIdService(id);
        res.status(200).json(resource);
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/resources (ADMIN ONLY)
 */
export async function createResourceHandler(req, res, next) {
    try {
        const resourceData = {
            title: req.body.title,
            type: req.body.type,
            content: req.body.content,
            celestialBodyId: req.body.celestialBodyId
        };

        const newResource = await createResourceService(resourceData);
        res.status(201).json(newResource);
    } catch (error) {
        next(error);
    }
}

/**
 * PUT /api/resources/:id (ADMIN ONLY)
 */
export async function updateResourceHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const updateData = {
            title: req.body.title,
            type: req.body.type,
            content: req.body.content,
            celestialBodyId: req.body.celestialBodyId
        };

        const updated = await updateResourceService(id, updateData);
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
}

/**
 * DELETE /api/resources/:id (ADMIN ONLY)
 */
export async function deleteResourceHandler(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        await deleteResourceService(id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
}