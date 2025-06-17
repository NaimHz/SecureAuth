import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { LoginSchema } from "../models/User.js";
import { AccessControl } from 'accesscontrol';


const route = new Hono();

const ac = new AccessControl();

ac.grant('user').readOwn('profile');
ac.grant('admin').readAny('profile');

ac.grant('user').createOwn('data');
ac.grant('admin').createAny('data');

ac.grant('user').updateOwn('data');
ac.grant('admin').updateAny('data');

ac.grant('user').deleteOwn('data');
ac.grant('admin').deleteAny('data');

// Ajoutez vous routes d'api ici

route.get('/profil/:id', zValidator("json", LoginSchema), async (c) => {
    if(ac.can('user').readOwn('profile').granted) {
        return c.text("J'ai réussi a récupérer le profil de l'utilisateur avec l'id " + c.req.param("id"));

    }else{
        return c.text("Vous n'avez pas les droits pour accéder à ce profil", 403);
    }
})

route.post('/data', zValidator("json", LoginSchema), async (c) => {
    if(ac.can('user').createOwn('data').granted) {
        return c.text("J'ai réussi a créer des données pour l'utilisateur");
    }else{
        return c.text("Vous n'avez pas les droits pour créer des données", 403);
    }
})

route.put('/data/:id', zValidator("json", LoginSchema), async (c) => {
    if(ac.can('user').updateOwn('data').granted) {
        return c.text("J'ai réussi a modifier les données de l'utilisateur avec l'id " + c.req.param("id"));
    }
    return c.text("Vous n'avez pas les droits pour modifier les données", 403);
})

route.delete('/data/:id', zValidator("json", LoginSchema), async (c) => {
    if(ac.can('user').deleteOwn('data').granted) {
        return c.text("J'ai réussi a supprimer les données de l'utilisateur avec l'id " + c.req.param("id"));
    }
    return c.text("Vous n'avez pas les droits pour supprimer les données", 403);
})

export default route;
