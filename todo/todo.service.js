const db = require("_helpers/db");

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
  getByName,
  getTodoListByName,
};

async function getAll() {
  return await db.Todo.findAll();
}

async function getById(id) {
  return await getTodo(id);
}

async function getByName(name) {
  return await getTodoByName(name);
}

async function create(params) {
  // save todo
  await db.Todo.create(params);
}

async function update(id, params) {
  const todo = await getTodo(id);

  // copy params to user and save
  Object.assign(todo, params);
  await todo.save();

  return omitHash(todo.get());
}


async function getTodoListByName(name){
  const rows = await db.Todo.findByPk(1, { include: ["td"] })
  .then((todo) => {
    return todo;
  })
  .catch((err) => {
    console.log(">> Error while finding tutorial: ", err);
  });

}

async function _delete(id) {
  const todo = await getTodo(id);
  await todo.destroy();
}

// helper functions

async function getTodo(id) {
  const todo = await db.Todo.findByPk(id);
  if (!todo) throw "Todo not found";
  return todo;
}

async function getTodoByName(name) {
  const todos = await db.Todo
    .findAll({
      where: {
        name: name,
      },
    });
    return todos;
}



function omitHash(todo) {
  const { hash, ...userWithoutHash } = todo;
  return userWithoutHash;
}
