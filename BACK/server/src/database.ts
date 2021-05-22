import  mysql  from 'promise-mysql';

import keys from './keys';

const db = mysql.createPool(keys.database);


///recuerda que estamos usando la version 3.3.1
//npm i promise-mysql@3.3.1 
db.getConnection()
    .then(connection => {
        db.releaseConnection(connection);
        console.log('DB is connected');
    });

export default db;