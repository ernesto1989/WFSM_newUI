const mysql = require('mysql2')
//const constants = require("../constants");
require('dotenv').config()

const {HOST, PORT, USER, PASS,DB} = process.env


/**
 * Class that responds with an object of the result of a database interaction.
 */
class QueryResult{

  constructor(status,rows, gen_id, changes ,err){
      this.status = status;
      this.rows = rows;
      this.gen_id = gen_id;
      this.changes = changes;
      this.err = err;
  }

  getStatus = () => { return this.status;}
  getRows = () => { return this.rows;}
  getGenId = () => { return this.gen_id;}
  getChanges = () => { return this.changes;}
  getErr = () => { return this.err;}
}


/**
 * Connection to database
 * @returns DB Connection Object
 */
async function open(){
    
    const connection = mysql.createConnection({
      host: HOST,//constants.dbHost,
      user: USER,//constants.dbUser,
      port: PORT,//constants.dbPort,
      password: PASS,//constants.dbPass,
      database: DB,//constants.dbName,
      decimalNumbers:true
    });
  
    return connection;
}

/**
 * Method that extracts Data without params from a database.
 * 
 * @param {String} query the query to extract data
 * @returns A Query Result object
 */
async function getData(query){
  try{
    console.log("Get Data");
    const conn = await open();
    return new Promise(function(resolve,reject){
      conn.connect((err)=>{
        if (err){
          reject(err.message);
        } else{
          conn.execute(query,(error,data,fields)=>{
            conn.end();
            if(error){
              reject(error.message)
            }
            resolve(new QueryResult(true,data,0,0,''));
          })
        }
      });
    });

  }catch(error){
    console.log(error);
  }
}


/**
 * This method executes a query with params
 * Perfect for search queries.
 * 
 * @param {String} query the search query
 * @param {Array} params array of params
 * @returns {Object} An object of the class QueryResult
 */
async function getDataWithParams(query,params){
  try{
      console.log("GetData");
      const conn = await open();
      return new Promise(function (resolve, reject) {
          conn.connect((err)=>{
            if (err){
              reject(err.message);
            } else{
              conn.query(query,params,(error,data,fields)=>{
                conn.end();
                if(error){
                  reject(error.message)
                }
                resolve(new QueryResult(true,data,0,0,''));
              })
            }
          });
      });
  }catch(error){
    console.log(error);
  }
}

/**
 * Makes an insert of an object on the Database.
 * 
 * @param {String} query The insert query that will be executed
 * @param {Array} params the params for the insert
 * @returns {Object} An object of the class QueryResult
 */
async function insertData(query,params){
  try{
      console.log("Insert Data");
      const conn = await open();
      return new Promise(function (resolve, reject) {
          conn.connect((err)=>{
            if (err){
              reject(err.message);
            } else{
              conn.query(query,params,(error,data,fields)=>{
                conn.end();
                if(error){
                  reject(new QueryResult(false,null,0,0,error))
                }else{
                  resolve(new QueryResult(true,data,data.insertId,data.affectedRows,''));
                }
              })
            }
          });
      });
  }catch(error){
    console.log(error);
  }
}

/**
 * Bulk insert method for inserting multiple rows on a database table.
 * 
 * @param {String} query The insert query that will be executed
 * @param {Array} params the params for the insert
 * @returns {Object} An object of the class QueryResult
 */
async function bulkInsertData(query,elements){
  try{
      console.log("BULK Insert Data");
      const conn = await open();
      return new Promise(function (resolve, reject) {
          conn.connect((err)=>{
            if (err){
              reject(err.message);
            } else{
              conn.query(query,[elements],(error,data,fields)=>{
                conn.end();
                //data.affectedRows, data.changedRows, data.insertId
                if(error){
                  reject(new QueryResult(false,null,0,0,error))
                }else{
                  resolve(new QueryResult(true,data,data.insertId,data.affectedRows,''));
                }
              })
            }
          });
      });
  }catch(error){
    console.log(error);
  }
}

/**
 * Method that executes a query update on the database.
 * It can be an update or delete.
 * 
 * @param {String} query the update query
 * @param {*} params the array of params
 * @returns a Query Result Object
 */
async function updateData(query,params){
  try{
      console.log("Update Data");
      const conn = await open();
      return new Promise(function (resolve, reject) {
          conn.connect((err)=>{
            if (err){
              reject(err.message);
            } else{
              conn.query(query,params,(error,data,fields)=>{
                conn.end();
                if(error){
                  reject(new QueryResult(false,null,0,0,error))
                }else{
                  resolve(new QueryResult(true,data,0,data.affectedRows,''));
                }
              })
            }
          });
      });
  }catch(error){
    console.log(error);
  }
}



  module.exports = {getData,getDataWithParams,insertData,bulkInsertData,updateData}