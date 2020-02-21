import bcrypt from 'bcrypt';
import express from 'express';
import verifyPermission from '../helpers/verifyPermission';
import Role from '../models/Role';
import Sector from '../models/Sector';
import User from '../models/User';

const router = express.Router();

router.use(verifyPermission);

/**
 * @api {delete} /user/:id/ Delete a User
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {Number} id    (param) ID of the selected User
 *
 * @apiParam {Number} count  number of deleted rows
 */
router.delete('/:id(\\d+)', async (req, res) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!user) throw new Error(`ID ${req.params.id} not delete`);

    res.send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

/**
 * @api {put} /user/:id/ Update a User
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {Number} id the unique ID of the selected User
 *
 * @apiParam {Object} body            shape of the request body.
 * @apiParam {String} body.name       name of the User.
 * @apiParam {String} body.lastname   last name of the User.
 * @apiParam {String} body.address    address of the User.
 * @apiParam {String} body.email      email of the User.
 * @apiParam {String} body.password   secret password of the User.
 * @apiParam {String} body.roleId     ID of the Role of the User.
 * @apiParam {String} body.sectorId   ID of the Sector of the User.
 *
 * @apiSuccess {Number} id              ID of the User.
 * @apiSuccess {String} name            name of the User.
 * @apiSuccess {String} lastname        last name of the User.
 * @apiSuccess {String} address         address of the User.
 * @apiSuccess {String} email           email of the User.
 * @apiSuccess {Number} roleId          unique ID of the Role of the User.
 * @apiSuccess {Number} sectorId        unique ID of the Sector of the User.
 *
 */
router.put('/:id(\\d+)', async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const result = await User.update(
      {
        name: req.body.name,
        lastname: req.body.lastname,
        address: req.body.address,
        email: req.body.email,
        password: hash,
        roleId: req.body.roleId,
        sectorId: req.body.sectorId,
      },
      {
        where: { id: req.params.id },
        returning: true,
        validate: true,
      },
    );

    const [rowsUpdate, [updatedUser]] = result;

    if (updatedUser) {
      res.status(200).json({
        id: updatedUser.id,
        name: updatedUser.name,
        lastname: updatedUser.lastname,
        address: updatedUser.address,
        email: updatedUser.email,
        roleId: updatedUser.roleId,
        sectorId: updatedUser.sectorId,
      });
    } else {
      res.status(400).json({ error: "Cet utilisateur n'existe pas." });
    }
  } catch (err) {
    res.status(500);
  }
});

/**
 * @api {get} /user/:id/ Request a User
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id the unique ID of the selected User
 *
 * @apiSuccess {Number} id            ID of the User.
 * @apiSuccess {String} name          name of the User.
 * @apiSuccess {String} lastname      last name of the User.
 * @apiSuccess {String} address       address of the User.
 * @apiSuccess {Object} role          User Role informations.
 * @apiSuccess {Number} role.id       ID of the User Role.
 * @apiSuccess {String} role.name     name of the User Role.
 * @apiSuccess {Object} sector        User Sector informations.
 * @apiSuccess {Object} sector.id     ID of the User Sector.
 * @apiSuccess {String} sector.name   name of the User Sector.
 */
router.get(
  '/:id(\\d+)',
  async (req, res): Promise<void> => {
    try {
      const userFound: User = await User.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: Sector,
            attributes: ['id', 'name'],
          },
          {
            model: Role,
            attributes: ['id', 'name'],
          },
        ],
        attributes: ['id', 'name', 'lastname', 'address'],
        raw: true,
        nest: true,
      });

      if (!userFound) {
        res.status(501).json({ error: "Cet utilisateur n'existe pas." });
      }

      res.status(200).json(userFound);
    } catch (err) {
      res.status(500);
    }
  },
);

/**
 * @api {post} /user/create Create a User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {Number} id the unique ID of the selected User
 *
 * @apiSuccess {Object} created             informations about created User.
 * @apiSuccess {Object} created.id          ID of the created User.
 * @apiSuccess {String} created.name        name of the created User.
 * @apiSuccess {String} created.lastName    last name of the created user.
 * @apiSuccess {String} created.address     address of the created User.
 * @apiSuccess {String} created.roleId      ID of the created User Role.
 * @apiSuccess {String} created.sectorId    ID of the created User Sector.
 *
 * @apiParam {Object} body            shape of the request body.
 * @apiParam {String} body.name       name of the User.
 * @apiParam {String} body.lastname   last name of the User.
 * @apiParam {String} body.address    address of the User.
 * @apiParam {String} body.email      email of the User.
 * @apiParam {String} body.password   secret password of the User.
 * @apiParam {String} body.roleId     ID of the Role of the User.
 * @apiParam {String} body.sectorId   ID of the Sector of the User.
 */
router.post(
  '/create',
  async (req, res): Promise<void> => {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);

      const result = await User.findOrCreate({
        where: { email: req.body.email },
        defaults: {
          name: req.body.name,
          lastname: req.body.lastname,
          address: req.body.address,
          email: req.body.email,
          password: hash,
          roleId: req.body.roleId,
          sectorId: req.body.sectorId,
        },
      });

      const [model, created] = result;

      if (created === false) {
        res.status(500).json({ error: 'Utilisateur déjà existant.' });
      } else {
        res.status(201).json({
          created: {
            id: model.dataValues.id,
            name: model.dataValues.name,
            lastname: model.dataValues.lastname,
            email: model.dataValues.lastname,
            roleId: model.dataValues.roleId,
            sectorId: model.dataValues.sectorId,
          },
        });
      }
    } catch (err) {
      res.status(500);
    }
  },
);

/**
 * @api {put} /user/ Request all Users
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiParam {Number} page (query) Page number for pagination
 * @apiparam {Number} pageSize (query) Number of items for each page
 *
 * @apiSuccess {Object[]} users              list of User.
 * @apiSuccess {Number}   users.id           ID of the User.
 * @apiSuccess {String}   users.name         name of the User.
 * @apiSuccess {String}   users.lastname     last name of the User.
 * @apiSuccess {String}   users.address      address of the User.
 * @apiSuccess {String}   users.email        email of the User.
 * @apiSuccess {Object}   users.role         informations about User role.
 * @apiSuccess {Number}   users.role.id      ID of the User Role.
 * @apiSuccess {String}   users.role.name    name of the User Role.
 * @apiSuccess {Object}   users.sector       informations about the User Sector.
 * @apiSuccess {Number}   users.sector.id    ID of the User Sector.
 * @apiSuccess {String}   users.sector.name  name of the User Sector.
 */
router.get('/', async function(req, res): Promise<void> {
  const users: User[] = await User.findAll({
    attributes: ['id', 'name', 'lastname', 'address', 'email'],
    include: [
      {
        model: Sector,
        attributes: ['id', 'name'],
      },
      {
        model: Role,
        attributes: ['id', 'name'],
      },
    ],
  });

  res.send(users);
});

export default router;
