import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ToDoItem} from './index';
const tableName = 'History';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'Scanner.db', location: 'default'});
};

export const createTable = async db => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS "${tableName}"(
    "title" TEXT ,
    "data" TEXT ,
    );`;

  await db.executeSql(query);
};

export const getTodoItems = async db => {
  try {
    const todoItems = [];
    const results = await db.executeSql(
      `SELECT rowid as id,title,data FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        todoItems.push(result.rows.item(index));
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (db, todoItems) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, title, data) values` +
    todoItems.map(i => `(${i.id}, '${i.title}', '${i.data}')`).join(',');

  return db.executeSql(insertQuery);
};
