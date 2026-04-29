import 'dotenv/config';
import prisma from '../src/config/db.js';

async function main() {
    console.log('Clearing database nd resetting IDs...');
    await prisma.$queryRaw`TRUNCATE "Favorite", "Resource", "CelestialBody", "User" RESTART IDENTITY CASCADE;`;
    console.log('Database cleared!');

    // Create Users
    const admin = await prisma.user.create({
        data: {
            username: 'commander_leddy',
            email: 'shannon@stardrifter.com',
            password: 'admin_password_123',
            role: 'ADMIN',
        },
    });

    const user = await prisma.user.create({
        data: {
            username: 'stargazer_jim',
            email: 'jim@example.com',
            password: 'user_password_123',
            role: 'USER',
        },
    });

    // Create Celestial Bodies
    const mars = await prisma.celestialBody.create({
        data: {
            name: 'Mars',
            type: 'Planet',
            description: 'The Red Planet.',
            distance: 225.0,
            imageUrl: 'https://images-assets.nasa.gov/image/PIA04591/PIA04591~orig.jpg',
        },
    });

    const moon = await prisma.celestialBody.create({
        data: {
            name: 'Moon',
            type: 'Natural Satellite',
            description: 'Earth’s companion.',
            distance: 0.384,
        },
    });

    // Create Resource
    await prisma.resource.create({
        data: {
            title: 'Mars Rover Mission',
            type: 'Article',
            celestialBodyId: mars.id,
            url: 'https://science.nasa.gov/mission/mars-2020-perseverance/'
        },
    });

    // Create Initial Favorite
    await prisma.favorite.create({
        data: {
            userId: user.id,
            celestialBodyId: mars.id,
        },
    }); 

    console.log('Database seeded successfully with plain text passwords!');   
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());